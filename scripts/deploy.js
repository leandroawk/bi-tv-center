import { Client } from 'ssh2';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const config = {
  host: process.env.DEPLOY_HOST || '192.168.30.201',
  port: parseInt(process.env.DEPLOY_PORT || '22', 10),
  username: process.env.DEPLOY_USER || 'root',
  password: process.env.DEPLOY_PASS
};

if (!config.password) {
  console.error("❌ ERRO: Senha de deploy (DEPLOY_PASS) não configurada nas variáveis de ambiente.");
  process.exit(1);
}

const conn = new Client();

console.log(`📡 Conectando via SSH2 ao servidor ${config.host}:${config.port}...`);

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    if (file === 'node_modules' || file === '.git' || file === 'dist' || file.includes('node_modules')) return;
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });
  return arrayOfFiles;
}

conn.on('ready', () => {
  console.log('✅ Conexão SSH2 estabelecida com sucesso!');

  const execRemote = (cmd) => {
    return new Promise((resolve, reject) => {
      console.log(`\n▶️ Executando no servidor: ${cmd}`);
      conn.exec(cmd, (err, stream) => {
        if (err) return reject(err);
        let output = '';
        stream.on('close', (code, signal) => {
          console.log(`✔️ Finalizado com código ${code}`);
          resolve(output);
        }).on('data', (data) => {
          process.stdout.write(data.toString());
          output += data.toString();
        }).stderr.on('data', (data) => {
          process.stderr.write(data.toString());
        });
      });
    });
  };

  async function runDeploy() {
    try {
      const remoteBase = '/opt/bi-tv-center';
      await execRemote(`mkdir -p ${remoteBase}/backend ${remoteBase}/frontend ${remoteBase}/scripts`);

      console.log('\n📤 Coletando arquivos do projeto...');
      const localFiles = getAllFiles(projectRoot);
      console.log(`Encontrados ${localFiles.length} arquivos para upload.`);

      conn.sftp(async (err, sftp) => {
        if (err) throw err;

        for (const file of localFiles) {
          const relativePath = path.relative(projectRoot, file).replace(/\\/g, '/');
          const remotePath = `${remoteBase}/${relativePath}`;
          const remoteDir = path.posix.dirname(remotePath);
          await execRemote(`mkdir -p "${remoteDir}"`);

          await new Promise((res, rej) => {
            sftp.fastPut(file, remotePath, (e) => {
              if (e) {
                console.error(`❌ Erro em ${relativePath}:`, e.message);
                res();
              } else {
                console.log(`  ✓ ${relativePath} -> ${remotePath}`);
                res();
              }
            });
          });
        }

        console.log('\n✅ Upload completo de todos os fontes!');
        
        // Setup systemd and start with docker-compose
        const systemdService = `
[Unit]
Description=BI TV Center Systemd Service (Docker Compose)
After=docker.service
Requires=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=${remoteBase}
ExecStart=/usr/bin/docker-compose up -d --build
ExecStop=/usr/bin/docker-compose down

[Install]
WantedBy=multi-user.target
`;
        await execRemote(`echo "${systemdService}" > /etc/systemd/system/bi-tv-center.service`);
        await execRemote(`systemctl daemon-reload && systemctl enable bi-tv-center && systemctl restart bi-tv-center`);
        
        console.log('\n🎉 IMPLANTAÇÃO AUTÔNOMA E REINICIALIZAÇÃO DO SERVIÇO CONCLUÍDAS COM SUCESSO!');
        conn.end();
      });
    } catch (e) {
      console.error('Erro durante o deploy:', e);
      conn.end();
    }
  }

  runDeploy();
}).on('error', (err) => {
  console.error('❌ ERRO DE CONEXÃO SSH:', err.message);
}).connect(config);

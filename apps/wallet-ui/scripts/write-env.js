const fs = require('node:fs');
const path = require('node:path');

const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:3000';

const contents = `export const environment = {\n  apiBaseUrl: ${JSON.stringify(apiBaseUrl)}\n};\n`;

const envDir = path.join(__dirname, '..', 'src', 'environments');
fs.mkdirSync(envDir, { recursive: true });

fs.writeFileSync(path.join(envDir, 'environment.ts'), contents);
fs.writeFileSync(path.join(envDir, 'environment.prod.ts'), contents);

console.log(`[env] API_BASE_URL = ${apiBaseUrl}`);

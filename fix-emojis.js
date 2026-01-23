import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, 'src', 'pages', 'MovieDetails.tsx');

// Lê o arquivo
let content = fs.readFileSync(filePath, 'utf8');

// Substitui os emojis corrompidos pelos corretos
const replacements = [
  { broken: /ðŸŽ¬/g, emoji: '🎬' },
  { broken: /ðŸ"…/g, emoji: '📅' },
  { broken: /â /g, emoji: '⭐' },
  { broken: /ðŸ'‡/g, emoji: '👇' },
  { broken: /ðŸ"/g, emoji: '📍' },
];

let hasChanges = false;
replacements.forEach(({ broken, emoji }) => {
  if (content.match(broken)) {
    console.log(`Encontrado: ${broken.source} -> substituindo por ${emoji}`);
    content = content.replace(broken, emoji);
    hasChanges = true;
  }
});

if (hasChanges) {
  // Salva o arquivo em UTF-8 (sem BOM)
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✅ Arquivo corrigido e salvo em UTF-8!');
} else {
  console.log('ℹ️ Nenhum emoji corrompido encontrado. Verificando emojis...');
  
  // Verifica se os emojis corretos estão presentes
  const correctEmojis = ['🎬', '📅', '⭐', '👇', '📍'];
  correctEmojis.forEach(emoji => {
    if (content.includes(emoji)) {
      console.log(`✅ Emoji ${emoji} presente`);
    } else {
      console.log(`❌ Emoji ${emoji} NÃO encontrado`);
    }
  });
}

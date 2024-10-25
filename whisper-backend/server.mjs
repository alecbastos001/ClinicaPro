const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const fs = require('fs');
const app = express();

const upload = multer({ dest: 'uploads/' });

app.post('/upload-audio', upload.single('audio'), (req, res) => {
  const audioPath = req.file.path;
  
  exec(`whisper ${audioPath} --language pt --model base`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).send('Erro no processamento do áudio');
    }

    const transcript = fs.readFileSync(`${audioPath}.txt`, 'utf8');
    res.json({ transcript });
  });
});

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});

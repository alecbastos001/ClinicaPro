import express from 'express';
import multer from 'multer';

// Configurando Multer para lidar com uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Função de diagnóstico
export default function handler(req, res) {
  if (req.method === 'POST') {
    upload.single('file')(req, res, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Falha no upload do arquivo' });
      }

      // Exemplo simples de processamento de texto ou dados
      const transcript = req.body.transcript || '';
      let diagnostico = '';

      if (transcript.includes('febre') && transcript.includes('dor de cabeça')) {
        diagnostico = 'Possível diagnóstico: Gripe ou Infecção viral';
      } else {
        diagnostico = 'Diagnóstico desconhecido. Mais informações são necessárias.';
      }

      return res.status(200).json({ diagnostico });
    });
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}

import multer from 'multer';

// Configurando o Multer para lidar com uploads de arquivo
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default function handler(req, res) {
  if (req.method === 'POST') {
    upload.single('file')(req, res, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Falha no upload do arquivo' });
      }

      // Processamento do arquivo
      const transcript = req.body.transcript || '';  // Exemplo de processamento

      let diagnostico = '';

      // Simples lógica de diagnóstico com base no texto transcrito
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
export default function handler(req, res) {
  if (req.method === 'POST') {
    const { transcript } = req.body;

    let diagnostico = '';

    // Lógica de diagnóstico simples
    if (transcript.includes('febre') && transcript.includes('dor de cabeça')) {
      diagnostico = 'Possível diagnóstico: Gripe ou Infecção viral';
    } else {
      diagnostico = 'Diagnóstico desconhecido. Mais informações são necessárias.';
    }

    res.status(200).json({ diagnostico });
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}

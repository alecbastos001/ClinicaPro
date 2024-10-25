import React, { useState } from 'react';
import axios from 'axios';

function ClinicaProApp() {
  const [isRecording, setIsRecording] = useState(false);
  const [anamnese, setAnamnese] = useState('');
  const [diagnostico, setDiagnostico] = useState('');
  const [audioBlob, setAudioBlob] = useState(null);

  let recorder;

  // Iniciar gravação
  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      recorder = new MediaRecorder(stream);
      recorder.start();
      setIsRecording(true);

      recorder.ondataavailable = event => {
        setAudioBlob(event.data);
      };
    }).catch(err => {
      alert('Erro ao acessar o microfone: ' + err);
    });
  };

  // Parar gravação
  const stopRecording = () => {
    recorder.stop();
    setIsRecording(false);
    processAudio();
  };

  // Processar o áudio (simulação de envio ao backend)
  const processAudio = async () => {
    const formData = new FormData();
    formData.append('file', audioBlob);

    try {
      const response = await axios.post('https://seu-backend-url/transcribeAudio', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setAnamnese(response.data.anamnese);
      setDiagnostico(response.data.diagnostico);

    } catch (error) {
      console.error('Erro ao processar o áudio', error);
    }
  };

  return (
    <div>
      <h1>Sistema de Anamnese por IA</h1>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Parar Gravação' : 'Iniciar Gravação'}
      </button>
      <p>Status: {isRecording ? 'Gravando...' : 'Aguardando'}</p>

      {anamnese && (
        <div>
          <h2>Anamnese Gerada:</h2>
          <p>{anamnese}</p>
        </div>
      )}

      {diagnostico && (
        <div>
          <h2>Diagnóstico e Tratamento:</h2>
          <p>{diagnostico}</p>
        </div>
      )}
    </div>
  );
}

export default ClinicaProApp;

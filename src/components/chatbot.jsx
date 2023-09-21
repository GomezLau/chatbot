import React, { useState } from 'react';

function Chatbot() {
  const [message, setMessage] = useState('');
  const [responses, setResponses] = useState([]);


  const projectId = 'chatbotciu-ymtg'; // Reemplaza con el ID de tu proyecto en Dialogflow
  const sessionId = '118445223992062693931'; // Reemplaza con un ID de sesión único
  const token = 'AIzaSyAxvBNjZW3EbyKkZMhvFzWTxXnKdOx9c1Q'; // Reemplaza con el token de acceso obtenido desde tu servidor

  const apiUrl = `https://dialogflow.googleapis.com/v2/projects/${projectId}/agent/sessions/${sessionId}:detectIntent`;

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  }

  async function handleSendMessage() {
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        queryInput: {
          text: {
            text: message,
            languageCode: 'es', // Ajusta el código de idioma según tus necesidades
          },
        },
      }),
    })
      .then(response => response.json())
      .then(data => {
        const fulfillmentText = data.queryResult.fulfillmentText;
        setResponses(prevResponses => [...prevResponses, fulfillmentText]);
        setMessage('');
      })
      .catch(error => {
        console.error('Error al enviar la pregunta a Dialogflow:', error);
      });
  }

  return (
    <div>
      {/* Renderiza las respuestas aquí */}
      {responses.map((response, index) => (
        <div key={index}>{response}</div>
      ))}

      {/* Input de usuario y botón de envío */}
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyUp={handleKeyPress}
      />
      <button onClick={handleSendMessage}>Enviar</button>
    </div>
  );
}

export default Chatbot;
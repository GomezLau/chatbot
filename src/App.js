import React, { useState, useEffect } from 'react';
import './App.css';
//const { SessionsClient } = require('@google-cloud/dialogflow');

function App() {
  const [inputText, setInputText] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  /*
  const [sessionClient, setSessionClient] = useState(null);
  const [sessionPath, setSessionPath] = useState('');
  */

  /*
  useEffect(() => {
    // Configura el cliente de Dialogflow y la ruta de sesión cuando el componente se monta
    const initializeDialogflow = async () => {
      const client = new SessionsClient({
        credentials: require('./path-to-your-credentials.json'), // Reemplazar con la ubicación de credenciales
      });

      const path = client.projectAgentSessionPath('your-project-id', 'your-session-id'); // Reemplaza con ID de proyecto y sesión

      setSessionClient(client);
      setSessionPath(path);
    };

    initializeDialogflow();
  }, []);
  */

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const getRandomBotResponse = () => {
    const botResponses = [
      'Bot: Hola, ¿en qué puedo ayudarte?',
      'Bot: Cuéntame más sobre tu pregunta.',
      'Bot: Lo siento, no puedo responder a eso en este momento.',
      'Bot: ¿Puedo ayudarte en algo más?',
    ];
    const randomIndex = Math.floor(Math.random() * botResponses.length);
    return botResponses[randomIndex];
  };

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    // Agrega el mensaje del usuario al estado chatMessages
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { text: inputText, isUser: true },
    ]);

    // Simula una respuesta del bot
    const botResponse = getRandomBotResponse();

    // Agrega el mensaje del bot al estado chatMessages
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { text: botResponse, isUser: false },
    ]);

    setInputText('');

/*
      // Envia el mensaje del usuario a Dialogflow
  const userMessage = inputText;
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: userMessage,
        languageCode: 'es', // Reemplaza con idioma 
      },
    },
  };

  try {
    const [response] = await sessionClient.detectIntent(request);

    // Obtiene la respuesta del bot desde la respuesta de Dialogflow
    const botMessage = response.queryResult.fulfillmentText;

    // Agrega el mensaje del usuario y la respuesta del bot al estado chatMessages
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { text: inputText, isUser: true },
      { text: botMessage, isUser: false },
    ]);

    setInputText('');
  } catch (error) {
    console.error('Error al enviar mensaje a Dialogflow:', error);
  }
  */
  };

  return (
    <div className="App">
      <header>
        <h1>Chatbot con React</h1>
        <p>Comience una conversación</p>
      </header>
      <main>
        <div className="chatbox">
          {chatMessages.map((message, index) => (
            <div
              key={index}
              className={message.isUser ? 'user-message' : 'bot-message'}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Escriba su pregunta..."
            value={inputText}
            onChange={handleInputChange}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <button onClick={handleSendMessage}>Enviar</button>
        </div>
      </main>
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import './App.css';
//1

function App() {
  const [inputText, setInputText] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
//2

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

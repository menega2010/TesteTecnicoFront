import { useState } from 'react';
import { Button } from 'react-bootstrap';
import './Confirm.css';
const Confirm = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://teste-tecnico-grava-ponto.onrender.com/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: inputValue }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
        // Faça algo com a resposta do servidor
      } else {
        console.error('Erro ao enviar a solicitação');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };
  return (
    <div className="container">
      <div className= "box">s
        <div className='container-title'>
        <span className='title'>Ponto</span> <span className='title-second'>Ilumeo</span>
        </div>
<br />
      <div className='code-container'>
      <span className="code">Código do usuário</span>
      </div>
      <input 
      value={inputValue}
      onChange={handleInputChange}
      type="text" 
      className="input-field" /> 
   
      <Button className="button" onClick={handleSubmit} variant="warning">Confirmar</Button>
      </div>
  
    </div>
   
  )


}

export default Confirm
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Bounce, toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';
import './Confirm.css';


const Confirm = () => {
 
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate()
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
    const data = await response.json();
    console.log(data)
    if (data.message === 'Login efetuado com sucesso!') {
 
      toast(data.message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
        console.log('Success:', data);
        return navigate('enter-time')
    } else {
      toast.warn(data.message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
      console.error('Erro ao enviar a solicitação', response.statusText);
    }
  } catch (error) {
    console.error('Erro:', error);
  }
  };


  return (
    
    <div className="container">
     
      <div className= "box">
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
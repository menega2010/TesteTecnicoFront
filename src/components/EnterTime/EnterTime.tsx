import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Bounce, toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';
import './EnterTime.css';


const EnterTime = () => {
 
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate()
  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Função para obter a hora atual formatada
    const getCurrentTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      return `${hours}h ${minutes}m`;
}
setCurrentTime(getCurrentTime());

const intervalId = setInterval(() => {
  setCurrentTime(getCurrentTime());
}, 1000);

return () => clearInterval(intervalId);
}, [])

const handleSubmit = async () => {
  try {
    const dataUser = await fetch('https://teste-tecnico-grava-ponto.onrender.com/getUser', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const dataUserVal = await dataUser.json()
console.log(dataUserVal[0].id)
    const response = await fetch('https://teste-tecnico-grava-ponto.onrender.com/addTime', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: dataUserVal[0].id,
        enterTime: currentTime,
        exitTime: '0',
      }),
    });
    const data = await response.json();
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
       <div className='box-rel-ponto'>
       <span className='rel-ponto'>Relógio de ponto</span>
       <span className='user-hash'>#4SXXFMF</span>
       </div> 
       <div className='user'>
       <span>Usuário</span>
       </div>

      <div>
        <p className='hora'>{currentTime}</p>
      </div>
       <div className='time-now-box'>
       <span className='time-now'>Horas de hoje</span>
       </div>
      <Button className="button" onClick={handleSubmit} variant="warning">Hora de entrada</Button>
      <div className='back-day-box'>
      <span className='back-day'>Dias anteriores</span>
      </div>
      <div className='box-register-time'>
        <span className='enter-data-date'>03/11/23</span> <span className='time-enter'>7h 30m</span>
      </div>
      </div>
  
    </div>
   
  )


}

export default EnterTime
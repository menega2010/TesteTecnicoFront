import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from "react-toastify";
import './App.css';

function App() {
  return (<>
   
    <div className="App">
      <Outlet />
    </div>
    <ToastContainer />
  </>
    
  );
}

export default App;

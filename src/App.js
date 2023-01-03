import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EmpListing from './EmpListing';
import Empcreate from './Empcreate';
import EmpEdit from './EmpEdit';
import PassCreate from './Passcreate';
import PassEdit from './PassEdit';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<EmpListing />}></Route>
          <Route path='/employee/create' element={<Empcreate />}></Route>
          <Route path='/employee/edit/:empid' element={<EmpEdit />}></Route>
          <Route path='/pass/create' element={<PassCreate />}></Route>
          <Route path='/pass/create/pass/edit/:passid' element={<PassEdit />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;
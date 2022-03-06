import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import About from './pages/About';
import Account from './pages/Account';
import Cpu4 from './pages/Cpu4';
import Home from './pages/Home';
import Limitlesswax from './pages/Limitlesswax'
import Team from './pages/Team';
//@ts-ignore
function App({ ual }) {
  return (
    <Router>
      <Sidebar ual={ual}/>
      <Routes>
        <Route path='/' element={<Home ual = { ual} />} /> 
        <Route path='/about' element={<About />} /> 
        <Route path='/account' element={<Account ual = { ual }/>} /> 
        <Route path='/cpu4' element={<Cpu4 ual= { ual }/>} /> 
        <Route path='/limitlesswax' element={<Limitlesswax />} /> 
        <Route path='/team' element={<Team />} /> 
        <Route path='*' element={<Home ual = { ual }/>} /> 
      </Routes> 
    </Router>
  );
}

export default App;

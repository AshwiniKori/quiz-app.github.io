import logo from './logo.svg';
import React from 'react';
//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Home';
import Quizintruction from './Components/Quiz/Quizintruction';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Play from './Components/Quiz/Play';
import Quizsummery from './Components/Quiz/Quizsummery';
import Login from './Components/Login';
import Signup from './Components/Singup';

function App() {
  return (
    <Router>
      <Routes>
      <Route exact={true} path='/' element = { <Home /> } />
      <Route exact={true} path='/login' element = { <Login /> } /> 
      <Route exact={true} path='/signup' element = { <Signup /> } /> 
      <Route exact={true} path='/play/instructions' element= { <Quizintruction /> } />
      <Route exact={true} path='/play/quiz' element= { < Play /> }/>
      <Route exact={true} path='/play/quizSummery' element= { < Quizsummery /> }/>
      </Routes>
    </Router>
  );
}



export default App;

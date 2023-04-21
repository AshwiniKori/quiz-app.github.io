import React from 'react'
import {Helmet} from 'react-helmet';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div>
        <Helmet><title>Quiz-App</title></Helmet>
        
        <div id="home">
            <section>
            {/* &nbsp;&nbsp;<span>Welcome To Quiz App</span> */}
            <marquee behavior="alternate" style={{fontSize:"20px"}}>Welcome To Quiz App</marquee>
            <h1 id='app'>&nbsp;&nbsp;&nbsp;Quiz App</h1>
            
            <div className='play-button-container'> 
                <ul>
                    <li><Link className='play-btn' to="/play/instructions">Play</Link></li>
                </ul>
            </div>
            <div className='auth-container'>
                <Link to="/login" className="auth-btn" id="login-btn"> Login </Link>
                <Link to="/signup" className="auth-btn" id="signup-btn"> SignUp </Link>
            </div>
            </section>
            
        </div>
    </div>
  )
}

export default Home;
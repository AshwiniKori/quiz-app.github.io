import React from 'react'
//import Play from './Play'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const Quizintruction = () => {

  return (
    <div>
        <Helmet><title>Quiz Instructions</title></Helmet>
        <div className='instruction container'>
            <h1 style={{fontSize:"50px"}}><u>How to play the Quiz</u></h1>
            <h2>Ensure you read all the instructions to start and finish the Quiz.</h2>
            <ul className='browser-default' id='main-list'>
                <li>The Quiz has duration of 15 minutes and ends as soon as your time elapses.</li>
                <li>Each Quiz consists of 15 questions. </li>
                <li>Each Question contains 4 options.</li>
                <li>There are two fifty-fifty lifelines and five hints.</li>
                <li>Select the option which best answers the question by clicking or selecting it.</li>
                <li>Feel free to quit from the quiz any time.In that case your score will be revealed afterwards.</li>
                <li>The timer starts as soon as the Quiz loads.</li>
            
            </ul>
            <div>
                <span className='left'><Link to ='/'> Back </Link></span>
                <span className='right'><Link to ='/play/quiz'> Next </Link></span>
            </div>
        </div>
    </div>
  )
}

export default Quizintruction
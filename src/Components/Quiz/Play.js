import React from 'react'
import Home from '../Home'
import { Helmet } from 'react-helmet'
import questions from '../../questions.json'
import isEmpty from '../../utils/isEmpty'
import correctNotification from '../../assets/audio/correct-answer.mp3'
import wrongNotification from '../../assets/audio/wrong-answer.mp3'
import buttonSound from '../../assets/audio/button.mp3'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
//import Openhome from './Openhome'
import { BrowserHistory } from '@remix-run/router'
import { useHistory } from 'react-router-dom'
import {push} from 'react'

//import { useNavigate } from 'react-router-dom'

class Play extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      questions: questions,
      currentQuestion: {},
      nextQuestion: {},
      previousQuestion: {},
      answer: '',
      numberOfQuestions: 0,
      numberOfQuestionsAnswered: 0,
      currentQuestionIndex: 0,
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      hints: 5,
      fiftyFifty: 2,
      usedFiftyFifty: false,
      nextButtonDisabled: false,
      previousButtonDisabled: true,
      previousRandomNumbers: [],
      time: {}
    };
    this.interval = null
    this.wrongSound = React.createRef();
    this.correctSound = React.createRef();
    this.buttonSound = React.createRef();
  }

  componentDidMount () {
    const {questions, currentQuestion, nextQuestion, previousQuestion} = this.state;
    this.displayQuestions(questions,currentQuestion,nextQuestion, previousQuestion);
     this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  displayQuestions = (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) => {
     let { currentQuestionIndex } = this.state;
     if (!isEmpty(this.state.questions)) {
      questions = this.state.questions;
      currentQuestion = questions[currentQuestionIndex];
      nextQuestion = questions[currentQuestionIndex + 1];
      previousQuestion = questions[currentQuestionIndex - 1];
      const answer = currentQuestion.answer;
      this.setState({
        currentQuestion,
        nextQuestion,
        previousQuestion,
        numberOfQuestions: questions.length,
        answer,
        previousRandomNumbers: [],
      }, () => {
        this.showOptions();
        this.handleDisabledButton();
      });
     }
     
  };

  handleOptionClick = (e) => {
      if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
        setTimeout(() => {
          this.correctSound.current.play();
        }, 0)
        this.correctAnswer();
      }
      else {
        setTimeout(() => {
          this.wrongSound.current.play();
        }, 0)
        this.wrongAnswer();
      }
  }

  handleNextButtonClick = () => {
    this.playButtonSound();
    if(this.state.nextQuestion !== undefined) {
      this.setState(prevState => ({
        currentQuestionIndex: prevState.currentQuestionIndex + 1
      }), () => {
        this.displayQuestions(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
      });
    }
  };

  handlePreviousButtonClick = () => {
    this.playButtonSound();
    if(this.state.previousQuestion !== undefined) {
      this.setState(prevState => ({
        currentQuestionIndex: prevState.currentQuestionIndex - 1
      }), () => {
        this.displayQuestions(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
      });
    }
  };

  handleQuitButtonClick = () => {
    //const navigate = useNavigate();
    this.playButtonSound();
    if(window.confirm("Are you sure to quit the Quiz.?")) {

      function  Goback() {
        const navigate = useNavigate();
        navigate('/home');
      }
      //this.context.router.push('/');
      //<NavLink activeClassName="active" to="/home">Home</NavLink>
     // this.state.istory.push('/home', this.state);
      //this.window.open('/home');
      //<Openhome />
    }
  };


  handleButtonClick = (e) => {
    switch(e.target.id) {
      case 'next':
        this.handleNextButtonClick();
          break;

      case 'previous':
        this.handlePreviousButtonClick();
          break;

      case 'quit':
        this.handleQuitButtonClick() ;
          break;
        
      default:
          break;
    }
  }

  playButtonSound = () => {
    this.buttonSound.current.play();
  }

  correctAnswer = () => {
    //alert('Correct Answer!');
    this.setState(prevState => ({
      score: prevState.score + 1,
      correctAnswers: prevState.correctAnswers + 1,
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
      numberOfQuestionsAnswered: prevState.numberOfQuestionsAnswered + 1
    }), () => {
      if(this.state.nextQuestion === undefined) {
        this.endQuiz();
      }
      else {
        this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
      } 
    });
  }

  wrongAnswer = () => {
    navigator.vibrate(1000);
    //alert('Wrong Answer!');
    this.setState(prevState => ({
      wrongAnswers: prevState.wrongAnswers + 1,
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
      numberOfQuestionsAnswered: prevState.numberOfQuestionsAnswered
    }), () => {
      if(this.state.nextQuestion === undefined) {
        this.endQuiz();
      }
      else {
        this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
      } 
    });
  }

  showOptions = () => {
    const options = Array.from(document.querySelectorAll('.option'));

    options.forEach(option => {
      option.style.visibility = 'visible';
    });

    this.setState({
      usedFiftyFifty: false
    });
  }

  handleHints = () => {
    if(this.state.hints > 0) {
      const options = Array.from(document.querySelectorAll(".option"));
      let indexOfAnswer;
  
      options.forEach((option, index) => {
        if (option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
          indexOfAnswer = index;
        }
      });
  
      while(true) {
        const randomNumber = Math.round(Math.random() * 3);
        if(randomNumber !== indexOfAnswer && !this.state.previousRandomNumbers.includes(randomNumber)) {
          options.forEach((option, index) => {
            if(index === randomNumber) {
              option.style.visibility = 'hidden';
              this.setState((prevState) => ({
                hints: prevState.hints - 1,
                previousRandomNumbers: prevState.previousRandomNumbers.concat(randomNumber)
              }));
            }
          });
          break;
        }
        if(this.state.previousRandomNumbers.length >= 3) break;
      }
    }
    
  }

  handleFiftyFifty = () => {
    if(this.state.fiftyFifty > 0 && this.state.usedFiftyFifty === false) {
      const options = document.querySelectorAll('.option');
      const randomNumbers = [];
      let indexOfAnswer;

      options.forEach((option, index) => {
        if(option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
          indexOfAnswer = index;
        }
      });
      let count = 0;
      do {
        const randomNumber = Math.round(Math.random() * 3);
        if(randomNumber !==indexOfAnswer) {
          if(randomNumbers.length < 2 && !randomNumbers.includes(randomNumber) && !randomNumbers.includes(indexOfAnswer)) {
            randomNumbers.push(randomNumber);
            count ++;
          }
          else {
            while(true) {
              const newRandomNumber = Math.round(Math.random() * 3);
              if(!randomNumbers.includes(newRandomNumber) && !randomNumbers.includes(indexOfAnswer)) {
                  randomNumbers.push(newRandomNumber);
                  count ++;
                  break;
              }
            }
          }
        }
      }while(count < 2);
      options.forEach((option, index) => {
        if(randomNumbers.includes(index)) {
          option.style.visibility = 'hidden';
        }
      });
      this.setState(prevState => ({
        fiftyFifty: prevState.fiftyFifty - 1,
        usedFiftyFifty: true
      }));
    }
  }

  startTimer = () => {
    const countDownTime = Date.now() + 300000;
    this.interval = setInterval(() => {
      const now = new Date();
      const distance = countDownTime - now;

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000 );

      if (distance < 0) {
        clearInterval(this.interval);
        this.setState({
          time: {
            minutes: 0,
            seconds: 0
          }
        }, () => {
          this.endQuiz()
        });
      } else {
        this.setState({
          time: {
            minutes,
            seconds, 
            distance
          }
        });
      }
    }, 1000);
  }

  handleDisabledButton = () => {
    if(this.state.previousQuestion === undefined || this.state.currentQuestionIndex === 0) {
      this.setState({
        previousButtonDisabled: true
      });
    }
    else {
      this.setState({
        previousButtonDisabled: false
      });
    }

    if(this.state.nextQuestion === undefined || this.state.currentQuestionIndex + 1 === this.state.numberOfQuestions) {
      this.setState({
        nextButtonDisabled: true
      });
    }
    else {
      this.setState({
        nextButtonDisabled: false
      });
    }
  }

  endQuiz = () => {
    alert('Quiz has ended!');
    const {state} = this;
    const playerStatus = {
      score: state.score,
      numberOfQuestions: state.numberOfQuestions,
      numberOfQuestionsAnswered: state.correctAnswers + state.wrongAnswers,
      correctAnswers: state.correctAnswers,
      wrongAnswers: state.wrongAnswers,
      usedFiftyFifty: 2 - state.fiftyFifty,
      usedHints: 5 - state.hints
    };

    setTimeout(() => {
      // function  Gotoback() {
      //   const navigate = useNavigate();
      //   navigate('/play/quizSummery', playerStatus);
      // }
      this.props.history.push('/play/quizSummery', playerStatus);
      //this.window.open('/play/quizSummery', playerStatus);
    }, 1000)
  }


  render() {
    const { 
      currentQuestion, 
      currentQuestionIndex, 
      fiftyFifty, 
      numberOfQuestions, 
      hints, 
      time 
    } = this.state; 

    return (
      <div>
        <Helmet><title>Quiz Page</title></Helmet>

        <div>
          <audio id="correct" ref={this.correctSound} src={correctNotification}></audio>
          <audio id="wrong" ref={this.wrongSound} src={wrongNotification}></audio>
          <audio id="sound" ref={this.buttonSound} src={buttonSound}></audio>
        </div>

        
        <div className='questions'>
        <h1 id="head">Quiz Mode</h1>
          <div className='lifeline-conatainer'>
            <p>
            <span onClick={this.handleFiftyFifty} className='left'>FiftyFifty:{fiftyFifty}</span>
            <span onClick={this.handleHints} className='right' style={{paddingLeft:"430px"}}>Hints:{hints}</span>
            </p>
            
          </div>
          <div className='timer-container'>
            <p>
              <span className='left'>{currentQuestionIndex} of {numberOfQuestions}</span>
              <span className={classnames('right1 valid', {
                'warning': time.distance <= 120000,
                'invalid': time.distance < 30000
              })} id="one">
                Time-{time.minutes}:{time.seconds}</span>
            </p>
          </div>

          <h5>{currentQuestion.question}</h5>
          <div className='options-container'>
            <p onClick={this.handleOptionClick} className='option'>{currentQuestion.A}</p>
            <p onClick={this.handleOptionClick} className='option'>{currentQuestion.B}</p>
          </div>
          <div className='options-container'>
            <p onClick={this.handleOptionClick} className='option'>{currentQuestion.C}</p>
            <p onClick={this.handleOptionClick} className='option'>{currentQuestion.D}</p>
          </div>

          

          <div className='btn-container'>
            <button 
              className={classnames('', {'disable': this.state.previousButtonDisabled})}
              id="previous" 
              onClick={this.handleButtonClick}>
              Previous
            </button>
            <button
              className={classnames('', {'disable': this.state.nextButtonDisabled})} 
              id="next" 
              onClick={this.handleButtonClick}>
              Next
            </button>
            <button 
              id="quit" 
              onClick={this.handleButtonClick }>
              Quit
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Play
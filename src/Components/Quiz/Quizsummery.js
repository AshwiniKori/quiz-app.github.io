import React from 'react'
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

class Quizsummery extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      userScore: 0,
      numberOfQuestions: 0,
      numberOfQuestionsAnswered: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      usedHints: 0,
      usedFiftyFifty: 0
    };
  }

  componentDidMount () {
    const { state } = this.state;
    this.setState({
      score: (state.score / state.numberOfQuestions) * 100,
      numberOfQuestionsAnswered: state.numberOfQuestionsAnswered,
      correctAnswers: state.correctAnswers,
      wrongAnswers: state.wrongAnswers,
      usedFiftyFifty: state.usedFiftyFifty,
      usedHints: state.usedHints
    });
  }
  render() {
    //let location = useLocation();
   // let history = useHistory();
    const { state } = this.props.location;
    let status, remark;
    const userScore = this.state.score;

    if (userScore <= 30) {
      remark = "You need more practice!";
    }
    else if (userScore > 30 && userScore <= 50) {
      remark = "Better luck next time1";
    }
    else if (userScore <= 70 && userScore > 50) {
      remark = "You can do better!";
    }
    else if (userScore >= 71 && userScore <= 85) {
      remark = "You did great!";
    }
    else {
      remark = "You are an absolute genius!";
    }

    if (state !== undefined) {
      status = (
        <div>
          <h1>Quiz has Ended</h1>
          <div className='container'>
            <h4>{remark}</h4>
            <h2>Your userScore: {this.state.userScore.toFixed(0)} &#37;</h2>
            <span className='status-left'>Total Number Of Questions:</span>
            <span className='status-right'>{this.state.numberOfQuestions}</span>
            <br />
            <span className='status-left'>Number Of Attempted Questions:</span>
            <span className='status-right'>{this.state.numberOfQuestionsAnswered}</span>
            <br />
            <span className='status-left'>Number Of Correct Answers:</span>
            <span className='status-right'>{this.state.correctAnswers}</span>
            <br />
            <span className='status-left'>Number Of Wrong Answers:</span>
            <span className='status-right'>{this.state.wrongAnswers}</span>
            <br />
            <span className='status-left'>Hints Used:</span>
            <span className='status-right'>{this.state.usedHints}</span>
            <br />
            <span className='status-left'>Fifty-Fifty Used:</span>
            <span className='status-right'>{this.state.usedFiftyFifty}</span>
            
          </div>
          <section>
            <ul>
              <li>
                <Link to="/">Back to Home</Link>
              </li>
              <li>
                <Link to="/play/quiz">Play Again</Link>
              </li>
            </ul>
          </section>
        </div>
      );
    }
    else {
      status = (
        <section>
          <h1 className='no-status'>No Status Available</h1>
          <ul>
            <li>
              <Link to="/">Back to Home</Link>
            </li>
            <li>
              <Link to="/play/quiz">Take a Quiz</Link>
            </li>
          </ul>
        </section>
      )
    }
    return (
      <div>
        <Helmet><title>Quiz-Summery</title></Helmet>
        {status}
      </div>
    )
  }
}

export default Quizsummery;
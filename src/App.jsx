import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ScoreBox from './components/ScoreBox';
import Popup from './components/Popup';

function App() {
  const [scores, setScores] = useState({
    elex: 0,
    est: 0,
    math: 0,
    geas: 0,
  });

  const handleScoreChange = (subject, score) => {
    setScores({ ...scores, [subject]: score });
  };

  const subjects = [
    { name: 'ELEX', score: scores.elex },
    { name: 'EST', score: scores.est },
    { name: 'MATH', score: scores.math },
    { name: 'GEAS', score: scores.geas },
  ];

  const averageScore =
    ((0.3) * (scores.elex + scores.est) + (0.2) * (scores.math + scores.geas));

  const isPassing =
    scores.elex >= 50 &&
    scores.est >= 50 &&
    scores.math >= 50 &&
    scores.geas >= 50 &&
    averageScore >= 65;

    const handleSubmit = (event) => {
      event.preventDefault(); // prevent the default form submission behavior
      console.log('Scores:', scores); // log the scores object to the console
      setShowPopup(true); // show the popup when the form is submitted
    };

  const [showPopup, setShowPopup] = useState(false); // state variable to control the visibility of the popup

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const popupTitle = isPassing ? 'Congratulations! 🎉' : 'Sorry! 😞';
  const popupBody = isPassing
    ? 'You have passed the CEP exam. Well done!'
    : 'You have not passed the CEP exam. Please try again next time.';

    return (
      <div className="container">
        <h3 className="display-6">Check CEP ✔</h3>
        <p className="col-sm-8 mb-3 mt-3 mx-auto criteria-text">Get a quick snapshot 📸 of your academic progress in USM BSEcE's Mock Boards with Check CEP! 💯</p>
        <form onSubmit={handleSubmit}>
          {subjects.map((subject) => (
            <ScoreBox
              key={subject.name}
              subjectName={subject.name}
              onScoreChange={(score) =>
                handleScoreChange(subject.name.toLowerCase(), parseFloat(score))
              }
            />
          ))}
          <div className="pt-3 pb-3">
            <button type="submit" className="btn btn-primary">
              Check Results
            </button>
            <Popup
              show={showPopup}
              handleClose={handleClosePopup}
              title={popupTitle}
              body={popupBody}
              scores={scores}
              averageScore={averageScore}
            />
            {/* <h4>Average score: <strong>{averageScore.toFixed(2)}</strong></h4> */}
          </div>
        </form>
        <footer className="pt-3 pb-3 col-sm-6 mx-auto">
          <div className="container">
            <div className="row">
              <div className="col text-center">
                Made by{' '}
                <a href="https://gisketch.com">Ghegi Jimenez</a> (2023) with{' '}
                <a href="https://reactjs.org/">React JS</a> and{' '}
                <a href="https://getbootstrap.com/">Bootstrap</a>. Code is{' '}
                <a href="https://github.com/gisketch/check-cep">open-source.</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  };
  

export default App

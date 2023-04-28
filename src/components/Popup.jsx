import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Badge } from 'react-bootstrap';

const Popup = ({ show, handleClose, title, body, scores, averageScore }) => {
  
  const keys = Object.keys(scores); // get an array of the keys
  const keyStrings = keys.map((key) => key.toUpperCase()); // map over the array and convert each key to uppercase

  const renderBadge = (score) => {
    if (score >=50) {
      return <><Badge bg="success">OKAY</Badge> <span className='criteria-text pass'>score is more than 50</span></>;
    } else {
      return <><Badge bg="danger">FAIL</Badge> <span className='criteria-text fail'>score is less than 50</span></>;
    }
  };
  
  const failedSubjects = keys.filter((key) => scores[key] < 50); // filter the keys array to get the keys with scores less than 50
  const passedSubjects = keys.filter((key) => scores[key] >= 50); // filter the keys array to get the keys with scores more than 50
  
    const renderAvgBadge = (averageScore) => {
      if (averageScore >= 65 && failedSubjects.length === 0) {
        return <Badge bg="success">PASSED</Badge>;
      } else {
        return <Badge bg="danger">FAIL</Badge>;
      }
    };

    const getRecommendations = () => {
      const targetAverage = 65;
      const weightElexEst = 0.3;
      const weightMathGeas = 0.2;
    
      const passedSumElexEst = passedSubjects
        .filter((subject) => subject === "elex" || subject === "est")
        .reduce((sum, subject) => sum + scores[subject], 0);
    
      const passedSumMathGeas = passedSubjects
        .filter((subject) => subject === "math" || subject === "geas")
        .reduce((sum, subject) => sum + scores[subject], 0);
    
      const requiredElexEst = (failedSubjects.includes("elex") || failedSubjects.includes("est"))
        ? Math.max(
            ((targetAverage - weightMathGeas * passedSumMathGeas) / weightElexEst) - passedSumElexEst,
            0
          )
        : 0;
    
      const requiredMathGeas = (failedSubjects.includes("math") || failedSubjects.includes("geas"))
        ? Math.max(
            ((targetAverage - weightElexEst * passedSumElexEst) / weightMathGeas) - passedSumMathGeas,
            0
          )
        : 0;
    
      const recommendations = failedSubjects.map((subject) => {
        if (subject === "elex" || subject === "est") {
          const requiredScore = Math.max(Math.ceil(requiredElexEst / (failedSubjects.includes("est") ? 1 : 2)), 50);
          return `Get at least ${requiredScore} in ${subject.toUpperCase()}`;
        } else {
          const requiredScore = Math.max(Math.ceil(requiredMathGeas / (failedSubjects.includes("geas") ? 1 : 2)), 50);
          return `Get at least ${requiredScore} in ${subject.toUpperCase()}`;
        }
      });
    
      return `To pass, try to achieve the following: ${recommendations.join(', ')}.`;
    };
    
  
  return (
    <Modal show={show} onHide={handleClose}>

      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>

      {body}

      <div className='pt-3 pb-3'>
        {keyStrings.map(
          (keyString) => (
            <div key={keyString}>
              <strong>{keyString}:</strong> {scores[keyString.toLowerCase()]}/100 {renderBadge(scores[keyString.toLowerCase()])}
            </div>
        ))}
      </div>
      
      <h4>Average score: <strong>{averageScore.toFixed(2)}</strong> / 100 {renderAvgBadge(averageScore)}</h4> 
      <p>
        <strong>Report:</strong> {passedSubjects.length} passed, {failedSubjects.length} failed <span className='criteria-text'>(must have 0 failed subjects and an average of 65 to pass)</span>
      </p>
      {failedSubjects.length > 0 && (
        <p>
          <strong>Recommendation:</strong> {getRecommendations()}
        </p>
      )}
      </Modal.Body>

      <Modal.Footer>

        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>

      </Modal.Footer>

    </Modal>
  );
};

export default Popup;

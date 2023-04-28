import React from 'react';

const ScoreBox = ({ subjectName, onScoreChange }) => {
  const handleScoreChange = (event) => {
    onScoreChange(event.target.value);
  };

  return (
    <div className="form-group row d-flex justify-content-center">
      <label htmlFor="score" className="col-sm-3 col-form-label">
        <h5>{subjectName}:</h5>
      </label>
      <div className="col-sm-3">
        <input
          type="number"
          className="form-control"
          id="score"
          min="0"
          max="100"
          placeholder="0-100"
          required
          onChange={handleScoreChange}
        />
      </div>
    </div>
  );
};

export default ScoreBox;

import React from "react";

function Steps({ StepId }) {
  const steps = [0, 1, 2, 3];
  const progressLengthArray = ["20%", "50%", "80%", "100%"];
  let progressLength = progressLengthArray[StepId];

  return (
    <div className="progressBar">
      <div className="bar">
        <div style={{ width: `${progressLength}` }}></div>
      </div>
      <div className="steps">
        {steps.map((step, index) => (
          <div key={index} className={`${StepId >= step && "active"}`}>
            {step + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Steps;

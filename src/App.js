import { useState, useEffect } from "react";
import "./App.scss";
import LogoImg from "./Assets/logo.png";
import ForMyself from "./Assets/forMyself.png";
import WithTeam from "./Assets/withTeam.png";
import Steps from "./Components/Steps/Steps";
import Tick from "./Assets/tick.png";
import stepsText from "./StepsTextData";

function App() {
  const [StepId, setStepId] = useState(0);
  const [planState, setPlanState] = useState("");
  const [isError, setIsError] = useState(false);
  const [userData, setUserData] = useState({});

  function resetApp() {
    setUserData({
      fullName: "",
      displayName: "",
      workspaceName: "",
      workspaceUrl: "",
      planToUse: "",
    });
    setPlanState("")
    setStepId(0);
  }

  

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  }

  function handleButton() {
    if (StepId === 0) {
      if (userData.fullName !== "" && userData.displayName !== "") {
        setStepId(1);
      } else {
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 1000);
      }
    }
    if (StepId === 1) {
      if (userData.workspaceName !== "") {
        setStepId(2);
      }else {
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 1000);
      }
    }
    if (StepId === 2) {
      if (userData.planToUse !== "") {
        setStepId(3);
      }else {
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 1000);
      }
    }
    if (StepId === 3) {
      resetApp();
    }
  }

  useEffect(() => {
    setUserData((prev) => ({ ...prev, planToUse: planState }));
  }, [planState]);

  useEffect(() => {
    resetApp();
  }, []);

  useEffect(() => {
    console.log(isError);
  }, [isError]);

  return (
    <div className="App">
      <div className="components-wrapper">
        <div className="logo-wrapper">
          <img src={LogoImg} alt="logo" />
          <p>Eden</p>
        </div>

        <Steps StepId={StepId} onChange={(value) => setStepId(value)} />

        {StepId === 3 && <img src={Tick} alt="tick" className="tick" />}

        <p className="step-title">
          {stepsText[StepId].title}
          {StepId === 3 && userData.displayName + "!"}
        </p>
        <p className="step-subtitle">{stepsText[StepId].subtitle}</p>
        {/* Step One Component */}
        {StepId === 0 && (
          <div className="step-form">
            <p>Full Name</p>
            <input
              value={userData.fullName}
              name="fullName"
              type="text"
              placeholder={(userData.fullName === "" && isError)?"Required!":"Steve jobs"}
              className={`${(userData.fullName === "" && isError) && "errored"}`}
              onChange={handleInputChange}
            />
            <p>Display Name</p>
            <input
              value={userData.displayName}
              name="displayName"
              type="text"
              placeholder={(userData.displayName === "" && isError)?"Required!":"Steve"}
              className={`${(userData.displayName === "" && isError) && "errored"}`}

              onChange={(e) => handleInputChange(e)}
              key={StepId}
            />
          </div>
        )}

        {/* Step Two Component */}

        {StepId === 1 && (
          <div className="step-form">
            <p>Workspace Name</p>
            <input
              type="text"
              placeholder={(userData.workspaceName === "" && isError)?"Required!":"Eden"}
              value={userData.workspaceName}
              name="workspaceName"
              className={`${isError && "errored"}`}
              onChange={(e) => handleInputChange(e)}
            />
            <p>
              Workspace URL <span>(optional)</span>
            </p>
            <div className="workspace-url">
              <input type="text" placeholder="www.eden.com/" disabled />
              <input
                type="text"
                placeholder="Example"
                value={userData.workspaceUrl}
                name="workspaceUrl"
                
                onChange={(e) => handleInputChange(e)}
              />
            </div>
          </div>
        )}

        {/* Step three Component */}
        {StepId === 2 && (
          <div className="thirdstep-form">
            <div
              onClick={() => setPlanState("forMyself")}
              id={`${planState === "forMyself" && "selected"}`}
              className={`${isError && "errored"}`}

            >
              <img src={ForMyself} alt="" />
              <span>
                <br /> For myself
              </span>{" "}
              <p>Write better. Think more clearly. Stay organized</p>
            </div>

            <div
              onClick={() => setPlanState("withMyTeam")}
              id={`${planState === "withMyTeam" && "selected"}`}
              className={`${isError && "errored"}`}

            >
              <img src={WithTeam} alt="" />
              <span>
                {" "}
                <br /> With my team
              </span>
              <p>Wikis,docs,tasks & projects,all in one place.</p>{" "}
            </div>
          </div>
        )}

        <div className="btn" onClick={() => handleButton()}>
          {StepId < 2
            ? "Next"
            : StepId < 3
            ? "Create Workspace"
            : "Launch Eden"}
        </div>
      </div>
    </div>
  );
}

export default App;

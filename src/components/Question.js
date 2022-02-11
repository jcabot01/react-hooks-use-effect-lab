import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    if(timeRemaining === 0) {
      setTimeRemaining(10);
      onAnswered(false); //assigned a false answer for not answering within 10 seconds
      return;
    }

    //setup decrementing timer:  set timeRemaining to timeRemaining - 1, every 1 second
    const timerId = setTimeout(() => {
      setTimeRemaining((timeRemaining) => timeRemaining - 1)
    }, 1000)

    //setup cleanup function to reset clock
    return function () {
      clearTimeout(timerId)
    };
  }, [timeRemaining, onAnswered]) //everytime timeremaining changes, we want to perform this useEffect





  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;

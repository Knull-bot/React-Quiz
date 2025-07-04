// Combining two components from Quiz in this one to make it possible,
// using one KEY prop in Quiz component to rerender Questions correctly
import { useState } from "react";
import QUESTIONS from "../questions.js";
import Timer from "./Timer.jsx";
import Answers from "./Answers.jsx";

export default function Question({ index, onSkip, onSelectAnswer }) {
  // State for checking if answer was right and changing css-className
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  // Added different timers with conditions to dynamicly change our Timer inside the question (to solve Timers problem)
  let TIMER = 15000;

  if (answer.selectedAnswer) {
    TIMER = 1000;
  }

  if (answer.isCorrect !== null) {
    TIMER = 2000;
  }

  function handleSelectAnswer(answer) {
    // Initial object of answer with selected answer, but we don't know if it is correct or not
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });
    // We're checking if the answer was correct
    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer,
      });
      // Giving feedback (was answer correct or not to our User and adding Answer in list of Answers in Quiz Component. Rendering next question.)
      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }
  // Declairing AnswerState for building cssClass in Answers-component
  let answerState = "";
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <div id="question">
      {/* Time will change conditionally, so this prop here will change. Components will re-rendered and useEffect will work again cuz TIMER is in his dependencies */}
      <Timer
        key={TIMER}
        time={TIMER}
        onTimeOut={answer.selectedAnswer === "" ? onSkip : null}
        mode={answerState}
      />
      {/* Printing out our Question */}
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        answers={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}

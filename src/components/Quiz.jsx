import { useState } from "react";
import QUESTIONS from "../questions.js";
import QuizCompleteImg from "../assets/quiz-complete.png";
import Timer from "./Timer.jsx";

const TIMER = 15000;

export default function Quiz() {
  const [userAnswer, setUserAnswer] = useState([]);

  // Here we getting and have control above index's withput a useState Hook
  const activeQuestionIndex = userAnswer.length;

  //Deriving condition, when all the auestins are out and our Quiz is coming to an end.
  const quisIsCompleted = activeQuestionIndex === QUESTIONS.length;

  // Handle select (answer) button
  function handleSelectAnswer(selectedAnswer) {
    setUserAnswer((prevUserAnswer) => [...prevUserAnswer, selectedAnswer]);
  }

  // Adding logic of the End of Quiz
  if (quisIsCompleted) {
    return (
      <div id="summary">
        <img src={QuizCompleteImg} alt="Trophy" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  //Shuffle our Array of Answers
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  //Debugging check
  // console.log(shuffledAnswers);

  return (
    <div id="quiz">
      <div id="question">
        <Timer time={TIMER} onTimeOut={() => handleSelectAnswer(null)} />
        {/* Printing out our Question */}
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
      </div>
      {/* Printing out our answers from Array with a map() function */}
      <ul id="answers">
        {shuffledAnswers.map((answer) => (
          <li className="answer" key={shuffledAnswers.indexOf(answer)}>
            <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

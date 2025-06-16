import { useState } from "react";
import QUESTIONS from "../questions.js";

export default function Quiz() {
  const [userAnswer, setUserAnswer] = useState([]);

  const activeQuestionIndex = userAnswer.length;

  function handleSelectAnswer(selectedAnswer) {
    setUserAnswer((prevUserAnswer) => [...prevUserAnswer, id]);
  }

  console.log(userAnswer);

  return (
    <div id="quiz">
      <div id="question">
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
      </div>
      <ul id="answers">
        {QUESTIONS[activeQuestionIndex].answers.map((answer) => (
          <li
            className="answer"
            key={QUESTIONS[activeQuestionIndex].answers.indexOf(answer)}
          >
            <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

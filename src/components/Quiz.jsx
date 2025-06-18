import { useState, useCallback } from "react";
import QUESTIONS from "../questions.js";

import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
  const [userAnswer, setUserAnswer] = useState([]);

  // Here we getting and have control above index's withput a useState Hook
  const activeQuestionIndex = userAnswer.length;

  //Deriving condition, when all the auestins are out and our Quiz is coming to an end.
  const quisIsCompleted = activeQuestionIndex === QUESTIONS.length;

  // Handle select (answer) button (We're using useCallback to avoid re-render problem in a Timer (handleSkip-function))
  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setUserAnswer((prevUserAnswer) => [...prevUserAnswer, selectedAnswer]);
  },
  []);

  // Handle bug with re-render ours component in Timer-component
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  // Adding logic of the End of Quiz
  if (quisIsCompleted) {
    return <Summary />;
  }

  //Debugging check
  // console.log(shuffledAnswers);

  return (
    <div id="quiz">
      {/*Creating key-prop, to re-render our Question-component with a next question. */}
      <Question
        index={activeQuestionIndex}
        key={activeQuestionIndex}
        onSkip={handleSkipAnswer}
        onSelectAnswer={handleSelectAnswer}
      />
    </div>
  );
}

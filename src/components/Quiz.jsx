import { useState, useCallback } from "react";
import QUESTIONS from "../questions.js";
import QuizCompleteImg from "../assets/quiz-complete.png";
import Question from "./Question.jsx";

export default function Quiz() {
  const [userAnswer, setUserAnswer] = useState([]);
  // State for checking if answer was right and changing css-className
  const [answerState, setAnswerState] = useState("unanswered");

  // Here we getting and have control above index's withput a useState Hook
  const activeQuestionIndex =
    answerState === "unanswered" ? userAnswer.length : userAnswer.length - 1;

  //Deriving condition, when all the auestins are out and our Quiz is coming to an end.
  const quisIsCompleted = activeQuestionIndex === QUESTIONS.length;

  // Handle select (answer) button (We're using useCallback to avoid re-render problem in a Timer (handleSkip-function))
  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setAnswerState("answered");
      // Checking if answer was right.

      setUserAnswer((prevUserAnswer) => [...prevUserAnswer, selectedAnswer]);

      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }
      }, 1000);

      setTimeout(() => {
        setAnswerState("unanswered");
      }, 2000);
    },
    [activeQuestionIndex]
  );

  // Handle bug with re-render ours component in Timer-component
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  // Adding logic of the End of Quiz
  if (quisIsCompleted) {
    return (
      <div id="summary">
        <img src={QuizCompleteImg} alt="Trophy" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  //Debugging check
  // console.log(shuffledAnswers);

  return (
    <div id="quiz">
      {/*Creating key-prop, to re-render our Question-component with a next question. */}
      <Question
        key={activeQuestionIndex}
        onSkip={handleSkipAnswer}
        questionText={QUESTIONS[activeQuestionIndex].text}
        answers={QUESTIONS[activeQuestionIndex].answers}
        answerState={answerState}
        selectedAnswer={userAnswer[userAnswer.length - 1]}
        onSelectAnswer={handleSelectAnswer}
      />
    </div>
  );
}

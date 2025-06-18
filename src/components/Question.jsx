// Combining two components from Quiz in this one to make it possible,
// using one KEY prop in Quiz component to rerender Questions correctly

import Timer from "./Timer.jsx";
import Answers from "./Answers.jsx";

const TIMER = 15000;

export default function Question({
  onSkip,
  questionText,
  answers,
  answerState,
  selectedAnswer,
  onSelectAnswer,
}) {
  return (
    <div id="question">
      <Timer time={TIMER} onTimeOut={onSkip} />
      {/* Printing out our Question */}
      <h2>{questionText}</h2>
      <Answers
        answers={answers}
        selectedAnswer={selectedAnswer}
        answerState={answerState}
        onSelect={onSelectAnswer}
      />
    </div>
  );
}

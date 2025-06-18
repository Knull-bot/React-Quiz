import { useRef } from "react";
import QUESTIONS from "../questions.js";

export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) {
  // Added useRef to work with a shuffledAnsweres just to avoid every-cycle-shuffle-process
  const shuffledAnswers = useRef();
  //Shuffle our Array of Answers
  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }
  return (
    <>
      {/* Printing out our answers from Array with a map() function */}
      <ul id="answers">
        {shuffledAnswers.current.map((answer) => {
          {
            /* Changing CSS of the selected Answer if it was selected */
          }
          const isSelected = selectedAnswer === answer;

          let cssClass = "";

          if (answerState === "answered" && isSelected) {
            cssClass = " selected";
          }

          if (
            (answerState === "correct" || answerState === "wrong") &&
            isSelected
          ) {
            cssClass = answerState;
          }
          {
            /* Disable the button after selected Answer */
          }
          return (
            <li className="answer" key={answer}>
              <button
                className={cssClass}
                onClick={() => onSelect(answer)}
                disabled={selectedAnswer !== ""}
              >
                {answer}
              </button>
            </li>
          );
        })}
      </ul>
      ;
    </>
  );
}

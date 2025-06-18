import QuizCompleteImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";

export default function Summary({ userAnswers }) {
  // Calculating number of different Answers
  const skippedAnswers = userAnswers.filter((answer) => answer === null);
  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === QUESTIONS[index].answers[0]
  );
  const wrongAnswers =
    userAnswers.length - skippedAnswers.length - correctAnswers.length;
  return (
    <div id="summary">
      <img src={QuizCompleteImg} alt="Trophy" />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedAnswers.length * 10}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{correctAnswers.length * 10}%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">{wrongAnswers * 10}%</span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          let cssClass = "user-answer";
          if (answer === null) {
            cssClass += " skipped";
          } else if (answer === QUESTIONS[index].answers[0]) {
            cssClass += " correct";
          } else {
            cssClass += " wrong";
          }

          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={cssClass}>{answer ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

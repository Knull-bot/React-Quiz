import QuizCompleteImg from "../assets/quiz-complete.png";

export default function Summary() {
  return (
    <div id="summary">
      <img src={QuizCompleteImg} alt="Trophy" />
      <h2>Quiz Completed!</h2>
    </div>
  );
}

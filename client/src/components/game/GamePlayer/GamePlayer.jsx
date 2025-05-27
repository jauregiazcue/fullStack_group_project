import QuestionComponent from "../../questionComponent/QuestionComponent";

function GamePlayer({ question }) {
  question ? question = question : question = "#First Text# @incorrect part@ #last text#";
  return (
    <section className="gamePlayer">
      <h1>Game Player</h1>
      <QuestionComponent question={question} />
    </section>
  );
}

export default GamePlayer;
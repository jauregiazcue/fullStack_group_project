import QuestionComponent from "../../questionComponent/QuestionComponent";

function GamePlayer({ question }) {
  const displayQuestion = question || "#First Text# @incorrect part@ #last text#";

  return (
    <section className="gamePlayer">
      <h1>Game Player</h1>
      <QuestionComponent question={displayQuestion} />
    </section>
  );
}


export default GamePlayer;
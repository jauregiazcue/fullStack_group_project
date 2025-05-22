import { useState } from "react";

const MakeGameForm = () => {
  const mockQuestionaires = {
    questionaires: [
      { questionaireName: "test1", id: "blablabliblu" },
      { questionaireName: "test2", id: "qweqweqwe" },
      { questionaireName: "test3", id: "asdasd" }
    ]
  };

  const [formData, setFormData] = useState({
    questions: 5,
    players: 2,
    timePerQuestion: 30,
    questionaireId: mockQuestionaires.questionaires[0].id
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "questionaireId" ? value : parseInt(value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="questions">Number of Questions</label>
        <input
          type="number"
          id="questions"
          name="questions"
          value={formData.questions}
          onChange={handleChange}
          min="1"
          required
        />
      </div>
      <div>
        <label htmlFor="players">Number of Players</label>
        <input
          type="number"
          id="players"
          name="players"
          value={formData.players}
          onChange={handleChange}
          min="1"
          required
        />
      </div>
      <div>
        <label htmlFor="timePerQuestion">Time Between Questions (seconds)</label>
        <input
          type="number"
          id="timePerQuestion"
          name="timePerQuestion"
          value={formData.timePerQuestion}
          onChange={handleChange}
          min="1"
          required
        />
      </div>
      <div>
        <label htmlFor="questionaireId">Select Questionnaire</label>
        <select
          id="questionaireId"
          name="questionaireId"
          value={formData.questionaireId}
          onChange={handleChange}
        >
          {mockQuestionaires.questionaires.map((q) => (
            <option key={q.id} value={q.id}>
              {q.questionaireName}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Start Game</button>
    </form>
  );
};

export default MakeGameForm;

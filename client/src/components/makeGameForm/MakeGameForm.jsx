import { useState, useEffect } from "react";
import fetchData from "../../utils/fetchData";
import { AuthContext } from "../../components/authContext/AuthContext";
import { useContext } from "react";

const MakeGameForm = () => {
  const { token, nickname, email } = useContext(AuthContext);
  const [questionaires, setQuestionaires] = useState([]);
  useEffect(() => {
    const fetchQuestionaires = async () => {
      const response = await fetchData("/questionnaire");
      const data = await response;
      setQuestionaires(data);
    if (data.length > 0) {
      setFormData(prev => ({ ...prev, questionaireId: data[0].id }));
    }
    };
    fetchQuestionaires();
  }, [])

  const [formData, setFormData] = useState({
    questions: 5,
    players: 2,
    timePerQuestion: 30,
    questionaireId: null
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
    const makeGameQuery = {
      ...formData,
      host:nickname
    }
    const response = fetchData(`/game/${formData.questionaireId}`, "POST", makeGameQuery, token);
    console.log(response);
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
          {questionaires.map((q) => (
            <option key={q._id} value={q._id}>
              {q.title}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Start Game</button>
    </form>
  );
};

export default MakeGameForm;

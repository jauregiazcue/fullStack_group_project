import style from './DetailedMatchHistory.module.css';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);



    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: "Player Scores",
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Score",
                }
            },
            x: {
                title: {
                    display: true,
                    text: "Players",
                }
            }
        }
    };

const DetailedMatchHistory = ({ match }) => { // hideDetail, quitado
    console.log("DetailedMatchHistory:match:",match);
        const data = {
        labels: match.players.map((player) => player.name),
        datasets: [
            {
                label: "Scores",
                data: match.players.map((player) => player.score),
                backgroundColor: "#4A90E2",
                borderColor: "#357ABD",
                borderWidth: 1,
            }
        ]
    };

    return (
      <div className={style.detailContainer}> {/* onClick={hideDetail} */}
        <div
        //   onClick={(event) => event.stopPropagation()}
          class={style.historyWrapper}>
          <h3>This is the match Id: {match.gameId}</h3>
          <h3>This is the host Id: {match.hostId}</h3>
          <h3>
            This is the winner of the match:{" "}
            {
              match.players.reduce((max, player) => {
                return player.score > max.score ? player : max;
              }).name
            }
          </h3>
          <Bar data={data} options={options} />;
        </div>
      </div>
    );
}

export default DetailedMatchHistory
import style from './DetailedMatchHistory.module.css';

const DetailedMatchHistory = ({ match }) =>{
console.log("This is the match");
    console.log(match);
    return(
        <div className={style.detailContainer}>
            <p>This is the match Id {match.gameId}</p>
        </div>
    )
}

export default DetailedMatchHistory
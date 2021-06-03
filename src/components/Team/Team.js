import style from './Team.module.css';

const Team = (props) => (
    <div className={style.eachTeam}>
        <p>{props.team.name}</p>
        <p>{props.team.code}</p>
    </div>
)

export default Team;
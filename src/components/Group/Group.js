import style from './Group.module.css';

const Group = (props) => {
    return (
        <article className={style.groupCard}>
            <div className={style.groupName}>{props.groupLetter}</div>
            {
                props.group.map((team, idx) => (
                    <div className={style.eachTeam} key={idx}>
                        <p>{team.name}</p>
                        <p>{team.code}</p>
                    </div>
                ))
            }
        </article>
    )
}

export default Group;
import style from './Group.module.css';
import Team from '../../components/Team/Team';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';


const Group = (props) => {

    // const onlyTeams = [];
    // props.group.map(teams =>
    //     onlyTeams.push(teams.name)
    // )

    // console.log(onlyTeams);


    return (
        <article className={style.groupCard}>
            <div className={style.groupName}>{props.groupLetter}</div>
            {
                props.group.map((team, idx) => (
                    // <div className={style.eachTeam} key={idx}>
                    //     <p>{team.name}</p>
                    //     <p>{team.code}</p>
                    // </div>
                    <Team 
                    team={team} 
                    key={team}
                    />
                ))
            }
        </article>
    )
}

export default Group;
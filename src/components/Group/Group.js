import style from './Group.module.css';
import Team from '../../components/Team/Team';
import {useState} from 'react';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

const SortableTeamsContainer = sortableContainer(({ children }) => <div className='teams'>{children}</div>);
const SortableTeam = sortableElement(({ team }) => <Team key={team} team={team} />)
  
const Group = (props) => {
    const [teams, setTeams] = useState(props.group);
    const onSortEnd = ({oldIndex, newIndex}) => setTeams(arrayMove(teams, oldIndex, newIndex));

    return (
        <article className={style.groupCard}>   
            <div className={style.groupName}>{props.groupLetter}</div>
            <SortableTeamsContainer onSortEnd={onSortEnd}>
                {
                    teams.map((team, i) => (
                        <SortableTeam
                            index={i}
                            team={team}
                            key={team.code}
                        />
                    ))
                }
            </SortableTeamsContainer>
            <button onClick={(e) => {
                let teamsArr = [];
                teams.forEach(team => {
                    teamsArr.push(team.name);
                });
                props.saveGroupPick(teamsArr, e, props.groupLetter)}
            }>Save</button>
        </article>
    )
}

export default Group;
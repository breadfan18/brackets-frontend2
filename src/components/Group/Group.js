import style from './Group.module.css';
import Team from '../../components/Team/Team';
import {useState} from 'react';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

const SortableTeamsContainer = sortableContainer(({ children }) => <div className='teams'>{children}</div>);
const SortableTeam = sortableElement(({ team }) => <Team key={team} team={team} />)
  
const Group = (props) => {
    const [teams, setTeams] = useState(props.group);

    function handleUpdatedGroup() {
        props.setFinalPicks(...props.finalPicks, teams);
    }

    const onSortEnd = ({oldIndex, newIndex}) => {
        setTeams(arrayMove(teams, oldIndex, newIndex))

        handleUpdatedGroup()
    };

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
        </article>
    )
}

export default Group;
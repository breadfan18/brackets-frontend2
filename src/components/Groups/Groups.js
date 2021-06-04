import { useState } from 'react';
import Group from '../Group/Group';
import style from './Groups.module.css';

const Groups = (props) => {

    const [finalPicks, setFinalPicks] = useState([]);

    console.log(finalPicks);

    return (
        <>
            <div className={style.groupsContainer}>
                {
                    props.groups.map((group, idx) =>
                        <Group
                            group={group.teams}
                            key={group.name}
                            groupLetter={group.name}
                            finalPicks={finalPicks}
                            setFinalPicks={setFinalPicks}
                        />
                    )
                }
            </div>
            <button onClick={props.submitPicks}>Submit Picks</button>
        </>
    )
}

export default Groups;
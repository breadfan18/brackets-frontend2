import Group from '../Group/Group';
import style from './Groups.module.css';

const Groups = (props) => {

    const groupLetter = ["A", "B", "C", "D", "E", "F", "G", "H"]

    return (
        <>
            <div className={style.groupsContainer}>
                {
                    props.groups.map((group, idx) =>
                        <Group
                            group={group.teams}
                            key={group.name}
                            groupLetter={group.name}
                        />
                    )
                }
            </div>
            <button>Submit Picks</button>
        </>
    )
}

export default Groups;
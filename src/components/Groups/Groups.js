import Group from '../Group/Group';
import style from './Groups.module.css';

const Groups = (props) => {

    const groupLetter = ["A", "B", "C", "D", "E", "F"]

    return (
        <>
            <div className={style.groupsContainer}>
                {
                    props.groups.map((group, idx) =>
                        <Group
                            group={group}
                            key={groupLetter[idx]}
                            groupLetter={groupLetter[idx]}
                        />
                    )
                }
            </div>
            <button>Submit Picks</button>
        </>
    )
}

export default Groups;
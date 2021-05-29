import Group from '../Group/Group';

const Groups = (props) => {

    const groupLetter = ["A", "B", "C", "D", "E", "F"]

    return (
        <div>
            {
                props.groups.map(group =>
                    <Group
                        group={group}
                    />
                )
            }

        </div>
    )
}

export default Groups;
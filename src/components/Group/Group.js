import style from './Group.module.css';

const Group = (props) => {
    return (
        <article className={style.groupCard} variant='outlined'>
            <div className={style.groupName}>Group {props.groupLetter}</div>
            {
                props.teams.map((country, idx) => (
                    <div className={style.eachTeam} key={idx}>
                        <p name='country'>{country.country}</p>
                        <select name='level'>
                            <option value='-' selected disabled>-</option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                        </select>
                    </div>
                ))
            }
        </article>
    )
}

export default Group;
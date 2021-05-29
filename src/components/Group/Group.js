import style from './Group.module.css';

const Group = (props) => {


    return (
        <article className={style.groupCard}>
            {
                props.group.map((country, idx) => (
                        <p>{country.country}</p>

                ))
            }
        </article>
    )

}




export default Group;
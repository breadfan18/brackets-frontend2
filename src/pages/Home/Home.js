import style from './Home.module.css';

const Home = (props) => (
    <div className={style.homeContainer}>
        <article id={style.userCard}>
            <h5 className={style.welcomeName}>Welcome {props.username}</h5>
            <img
                style={{ height: '10rem', borderRadius: '20px' }}
                src={props.userImg}
                alt={props.username} 
            />
        </article>
    </div>
)

export default Home;
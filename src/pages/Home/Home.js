import style from './Home.module.css';

const Home = (props) => (
    <div className={style.homeContainer}>
        <article id={style.userCard}>
            <h5 className={style.welcomeName}>Welcome {props.username}</h5>
            <img
                style={{ height: '10rem', borderRadius: '20px', border: '5px solid gray' }}
                src={props.userImg}
                alt={props.username}
            />
            <form>
                <p className={style.pickStatusContainer}>
                    <label>
                        <input type="checkbox" class="filled-in" checked="checked" />
                        <span className={style.picksStatusLabel}>Group Stage Picks Made</span>
                    </label>
                </p>
                <p className={style.pickStatusContainer}>
                    <label>
                        <input type="checkbox" class="filled-in" checked="checked" />
                        <span className={style.picksStatusLabel}>Group Results Simulated</span>
                    </label>
                </p>
                <p className={style.pickStatusContainer}>
                    <label>
                        <input type="checkbox" class="filled-in" checked="checked" />
                        <span className={style.picksStatusLabel}>Group Stage Points Calculated</span>
                    </label>
                </p>
                <p className={style.pickStatusContainer}>
                    <label>
                        <input type="checkbox" class="filled-in" />
                        <span className={style.picksStatusLabel}>KnockOut Rounds Picks Made</span>
                    </label>
                </p>
                <p className={style.pickStatusContainer}>
                    <label>
                        <input type="checkbox" class="filled-in" />
                        <span className={style.picksStatusLabel}>Knockout Roudns Results Simulated</span>
                    </label>
                </p>
            </form>

        </article>
    </div>
)

export default Home;
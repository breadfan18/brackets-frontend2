import { login, logout } from '../../services/firebase';
import styles from './Header.module.css'
import { Route, Link } from 'react-router-dom';
import CurrentPicks from '../../pages/CurrentPicks/CurrentPicks';


const Header = (props) => {
    return (
        <header className={styles.header}>
            <h1>Soccer Brackets</h1>
            <nav>
                <ul>
                    {
                        props.user ?
                            <>
                                <li>
                                    <Link to="/home">Home</Link>
                                </li>
                                <li>
                                    <Link to="/groups">Groups</Link>
                                </li>
                                <li>
                                    <Link to="/currentPicks">Current Picks</Link>
                                </li>
                                <li>
                                    <Link to="/leaderboard">Leaderboard</Link>
                                </li>
                                <li>
                                    <Link to="/simulate">Simulate</Link>
                                </li>
                                <li>
                                    <img
                                        style={{height: '2.5rem', borderRadius: '50%'}}
                                        src={props.user.photoURL}
                                        alt={props.user.displayName} />
                                </li>
                                <li
                                    className={styles.navLink}
                                    onClick={logout}
                                >Logout</li>
                            </>
                            :
                            <li
                                className={styles.navLink}
                                onClick={login}
                            >Login</li>
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Header;
import { login, logout } from '../../services/firebase';
import styles from './Header.module.css'
import { Route } from 'react-router-dom';
import CurrentPicks from '../../components/CurrentPicks/CurrentPicks';

const Header = (props) => {
    return (
        <header className={styles.header}>
            <h1>Soccer Brackets</h1>
            <nav>
                <ul>
                    {
                        props.user ?
                            <>
                                <Route path='/test' component={CurrentPicks} />
                                <li>Leaderboard</li>
                                <li>Simulate</li>
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
import { login, logout } from '../../services/firebase';
import styles from './Header.module.css'
import { Link } from 'react-router-dom';

const Header = (props) => {
    return (
        <header className={styles.header}>
            <h1>Soccer Brackets</h1>
            <nav className={styles.mainNav}>
                <ul>
                    {
                        props.user ?
                            <>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/groups">Groups Stages</Link>
                                </li>
                                <li>
                                    <Link to="/knockouts">Knockout Stages</Link>
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
                                <li className='userInfo'>
                                    <li>
                                        <img
                                            style={{ height: '2.5rem', borderRadius: '50%' }}
                                            src={props.user.photoURL}
                                            alt={props.user.displayName} />
                                    </li>
                                    <li
                                        className={styles.navLink}
                                        onClick={logout}
                                    >Logout</li>
                                </li>
                            </>
                            :
                            // <li
                            //     className={styles.navLink}
                            //     onClick={login}
                            // >Login</li>
                            <li></li>
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Header;
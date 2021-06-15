import { logout } from '../../services/firebase';
import styles from './Header.module.css'
import { Link } from 'react-router-dom';

const Header = (props) => {
    return (
        <header className={styles.header}>
            {
                props.user ?
                    <ul className={styles.userInfo}>
                        <li>{props.user.displayName}</li>
                        <li>
                            <img
                                style={{ height: '2rem', borderRadius: '50%' }}
                                src={props.user.photoURL}
                                alt={props.user.displayName} />
                        </li>
                        <li><Link to='/' onClick={logout} id={styles.logout}>Log Out</Link></li>
                    </ul>
                    :
                    <ul className={styles.userInfo}></ul>
            }
            <div className={styles.headerContainer}>
                <img src="https://i.imgur.com/QtEi1f4.png" alt="" style={{height: '8rem', transform: 'scaleX(-1)'}} />
                <img src="https://i.imgur.com/09OYzB1.png" alt="" style={{height: '8rem', transform: 'scaleX(-1)', opacity: '1'}} />
                <h1>Soccer Brackets</h1>
                <img src="https://i.imgur.com/09OYzB1.png" alt="" style={{height: '8rem', opacity: '1'}} />
                <img src="https://i.imgur.com/QtEi1f4.png" alt="" style={{height: '8rem'}} />
            </div>
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

                            </>
                            :
                            <li></li>
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Header;
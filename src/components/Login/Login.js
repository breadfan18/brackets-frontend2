import { login } from '../../services/firebase';
import styles from './Login.module.css';

const Login = () => {

    return (
        <div className={styles.loginPage}>
            <article className={styles.loginCard}>
                <h4>Welcome Player</h4>
                <button className={`btn waves-effect waves-light ${styles.loginButton}`} onClick={login}> <span class="material-icons">
                    sports_soccer
                </span>Login with Google</button>
            </article>
        </div>
    )
}

export default Login;
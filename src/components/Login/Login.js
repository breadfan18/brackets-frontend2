import { login } from '../../services/firebase';
import styles from './Login.module.css';

const Login = () => {

    return (
        <div className={styles.loginPage}>
            <article className={styles.loginCard}>
                <h4 style={{textDecoration: 'none'}}>Welcome</h4>
                <h6>Please sign in to play Soccer Brackets</h6>
                <br />
                <br />
                <button className={`btn waves-effect waves-light ${styles.loginButton}`} onClick={login}> <span class="material-icons">
                    sports_soccer
                </span>Login with Google</button>
            </article>
        </div>
    )
}

export default Login;
import styles from './Simulate.module.css';
import {useEffect} from 'react';

const Simulate = (props) => {
    return (
        <div className={styles.simulateContainer}>
            <section>
                <h4>Group Stage</h4>
                <button className={styles.simButton}>Simulate</button>
            </section>
            <hr />
            <section>
                <h4>Round of 16</h4>
                <button className={styles.simButton}>Simulate</button>
            </section>
            <hr />
            <section>
                <h4>Quarter Finals</h4>
                <button className={styles.simButton}>Simulate</button>
            </section>
            <hr />
            <section>
                <h4>Semi Finals</h4>
                <button className={styles.simButton}>Simulate</button>
            </section>
            <hr />
            <section>
                <h4>Finals</h4>
                <button className={styles.simButton}>Simulate</button>
            </section>
            <hr />

        </div>

    )
}

export default Simulate;
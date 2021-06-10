import styles from './Simulate.module.css';
import { getGroupsResults } from '../../services/soccer-api';

const Simulate = (props) => {

    function groupStandings() {
        getGroupsResults()
        .then(results => {
            // props.setStandings(results.groups);

            results.groups.map(group => 
                console.log(group.standings)    
            )
            
        })
    }

    function handleSetResults(groupLetterKey, teams) {
           props.setStandings({
               [groupLetterKey]: teams
           })
    }

    return (
        <div className={styles.simulateContainer}>
            <section>
                <h4>Group Stage</h4>
                <button onClick={() => groupStandings()} className={styles.simButton}>Simulate</button>
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
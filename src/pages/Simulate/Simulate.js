import styles from './Simulate.module.css';
import { getGroupsResults } from '../../services/soccer-api';
import { createResults } from '../../services/results-service';
import {Link} from 'react-router-dom';

const Simulate = (props) => {

    function groupStandings() {
        getGroupsResults()
        .then(results => {
            results.groups.map(group => {
                let groupLetter = group.name;
                let teamsArr = [];

                group.standings.map(team => teamsArr.push(team.team.name))
                handleSetResults(groupLetter, teamsArr)
            })
        })
    }

    function handleSetResults(groupLetterKey, teams) {
           props.setStandings(prevState => (
               {
                ...prevState,
                [groupLetterKey]: teams
               }
           ))
    }

    return (
        <div className={styles.simulateContainer}>
            <section>
                <h4>Group Stage</h4>
                <button onClick={() => {groupStandings(); alert('Group Results Simulated')}} className={styles.simButton}>Simulate Results</button>
                <button onClick={async () => {await createResults(props.groupStandings); alert('Group Results Commited to Mongo DB')}} className={styles.simButton}>Commit Results</button>
                <Link to='/leaderboard' onClick={() => props.calcPoints()} className={styles.simButton}>Calculate Points</Link>

            </section>
            <hr />
            <section>
                <h4>Round of 16</h4>
                <button className={styles.simButton}>Simulate Results</button>
                <button className={styles.simButton}>Commit Results</button>
                <button className={styles.simButton}>Calculate Points</button>
            </section>
            <hr />
            <section>
                <h4>Quarter Finals</h4>
                <button className={styles.simButton}>Simulate Results</button>
                <button className={styles.simButton}>Commit Results</button>
                <button className={styles.simButton}>Calculate Points</button>
            </section>
            <hr />
            <section>
                <h4>Semi Finals</h4>
                <button className={styles.simButton}>Simulate Results</button>
                <button className={styles.simButton}>Commit Results</button>
                <button className={styles.simButton}>Calculate Points</button>
            </section>
            <hr />
            <section>
                <h4>Finals</h4>
                <button className={styles.simButton}>Simulate Results</button>
                <button className={styles.simButton}>Commit Results</button>
                <button className={styles.simButton}>Calculate Points</button>
            </section>
            <hr />
        </div>
    )
}

export default Simulate;
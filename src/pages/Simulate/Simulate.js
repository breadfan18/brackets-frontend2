import styles from './Simulate.module.css';
import { getGroupsResults } from '../../services/soccer-api';
import { createResults } from '../../services/results-service';

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

    // async function commitResults() {
    //     await createResults(props.groupStandings);
    // }



    return (
        <div className={styles.simulateContainer}>
            <section>
                <h4>Group Stage</h4>
                <button onClick={() => groupStandings()} className={styles.simButton}>Simulate</button>
                <button onClick={() => {createResults(props.groupStandings)}} className={styles.simButton}>Commit Results</button>
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
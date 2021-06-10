import styles from './Simulate.module.css';
import { getGroupsResults } from '../../services/soccer-api';

const Simulate = (props) => {

    function groupStandings() {
        getGroupsResults()
        .then(results => {


            //need to iterate here, and add an array of the 4 teams to the group letter key using the handleSetResults
            //function
            results.groups.map(group => {
                let groupLetter = group.name;
                let teamsArr = [];

                console.log(groupLetter);
                group.standings.map(team => teamsArr.push(team.team.name))

                console.log(teamsArr);

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
           )
           

           )
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
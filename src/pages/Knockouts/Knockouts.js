import styles from './Knockouts.module.css';

const Knockouts = (props) => {

    let grpResults = props.grpResults[0];
    let testArr = [];

    let winnersArr = [];
    let runnerUpsArr = [];

    let counter = 0;
    for (const arr in grpResults) {
      if (counter < 8) {
        // grpResults[arr].splice(2);
        // testArr.push(grpResults[arr]);


        let winners = grpResults[arr].slice(0,1);
        let runnerUps = grpResults[arr].slice(1,2);
        winnersArr.push(winners[0]);
        runnerUpsArr.push(runnerUps[0]);
        
      }
      counter++;
    }

    console.log('Winners', winnersArr);
    console.log('Runners', runnerUpsArr);

    let counter1 = 1;
    let newARr = [];
    // testArr.forEach((each,idx) => {
    //     console.log('Team 1', each[0]);
    //     console.log('Team 2', testArr[counter1]);
    //     counter1++;
    // });

    for (let i = 0; i < testArr.length; i++) {
        const each = testArr[i];
        const nextOne = testArr[i+1];
        // console.log(each[0]);
        // console.log(nextOne);
        
    }

    return (
        <div className={styles.knockoutsContainer}>
            <h4>Knockout Round Picks</h4>
            <section className={styles.round16Section}>
                {
                    winnersArr.map((each, idx) => 
                        <article className={styles.gameArticle}>
                        <h6 className={styles.gameNum}>Game {idx+1}</h6>
                        <div className={styles.koTeams}>{each}</div>
                        <div className={styles.vs}>VS</div>
                        <div className={styles.koTeams}>{
                            idx%2 === 0 ? runnerUpsArr[idx+1] : runnerUpsArr[idx-1]
                        }</div>
                    </article>
                    )
                }
            </section>
        </div>
    )
}

export default Knockouts;
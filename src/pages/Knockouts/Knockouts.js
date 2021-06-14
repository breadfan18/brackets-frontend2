import styles from './Knockouts.module.css';

const Knockouts = (props) => {

    let grpResults = props.grpResults[0];
    let testArr = [];

    console.log(grpResults);

    let counter = 0;
    for (const arr in grpResults) {
      if (counter < 8) {
        // grpResults[arr].forEach(team => {
        // //   testArr.push(team);
        // console.log(team);
        // });
        // console.log(grpResults[arr]);
        grpResults[arr].splice(2);
        // console.log(grpResults[arr]);
        testArr.push(grpResults[arr]);
        
      }
      counter++;
    }

    console.log(testArr);

    return (
        <div className={styles.knockoutsContainer}>
            <h4>Knockout Round Picks</h4>
            <section className={styles.round16Section}>
                {
                    testArr.map((eachArr, idx) => 
                        <article className={styles.gameArticle}>
                        <h6 className={styles.gameNum}>Game {idx+1}</h6>
                        <div className={styles.koTeams}>{eachArr[0]}</div>
                        <div className={styles.vs}>VS</div>
                        <div className={styles.koTeams}>{eachArr[1]}</div>
                    </article>
                    )
                }
            </section>
        </div>
    )
}

export default Knockouts;
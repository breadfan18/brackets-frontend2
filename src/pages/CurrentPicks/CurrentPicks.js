import styles from './CurrentPicks.module.css';
import {deletePicks} from '../../services/picks-service';

const CurrentPicks = (props) => {
    let userPicks = props.allPicks[0];

    console.log(userPicks._id);
    let groupsArray = [];
    let counter = 0;
    let groupLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    for (const group in userPicks) {
        if (Object.hasOwnProperty.call(userPicks, group) && counter < 8) {
            const teams = userPicks[group];
            groupsArray.push(teams)
            counter++;
        }
    }

    return (
        <div className={styles.currentPicks}>
            <section className={styles.groupStagePicks}>
                <h4 id={styles.groupStagePicksh4}>Group Stage Picks</h4>
                <table className='striped centered'>
                    <thead>
                      <tr>  <th>Group</th>
                        <th>First</th>
                        <th>Second</th>
                        <th>Third</th>
                        <th>Fourth</th></tr>
                    </thead>
                    <tbody>
                        {
                            groupsArray.map((groups, idx) => (
                                <>
                                    <tr style={{lineHeight: '8px'}}>
                                        <td  style={{fontWeight: 'bold'}}>Group {groupLetters[idx]}</td>
                                        {
                                            groups.map((team, teamIdx) =>
                                                <td>
                                                    {team}
                                                </td>
                                            )
                                        }
                                    </tr>
                                </>
                            ))
                        }
                    </tbody>
                </table>
                <div id={styles.editDeleteButtons}>
                    <button class="btn waves-effect waves-light" type="submit" name="action">Edit Picks
                    <i class="material-icons right">edit</i>
                    </button>
                    <button class="btn waves-effect waves-light" type="submit" name="action" onClick={() => props.delete(userPicks._id)}>Delete Picks
                    <i class="material-icons right">delete_forever</i>
                    </button>
                </div>
            </section>
            <hr />
            <section>
                <h4>Round of 16 Picks</h4>
                <table>
                    <thead>
                        <th>Game 1</th>
                        <th>Game 2</th>
                        <th>Game 3</th>
                        <th>Game 4</th>
                        <th>Game 5</th>
                        <th>Game 6</th>
                        <th>Game 7</th>
                        <th>Game 8</th>
                    </thead>
                    <tbody>
                        <td></td>
                    </tbody>
                </table>
            </section>
            <hr />
            <section>
                <h4>Quarter Finals Picks</h4>
                <table>
                    <thead>
                        <th>Game 1</th>
                        <th>Game 2</th>
                        <th>Game 3</th>
                        <th>Game 4</th>
                    </thead>
                    <tbody>
                        <td></td>
                    </tbody>
                </table>
            </section>
            <hr />
            <section>
                <h4>Semi Finals Picks</h4>
                <table>
                    <thead>
                        <th>Game 1</th>
                        <th>Game 2</th>
                    </thead>
                    <tbody>
                        <td></td>
                    </tbody>
                </table>
            </section>
            <hr />
            <section>
                <h4>Final Pick</h4>
            </section>

        </div>
    )

}

export default CurrentPicks;
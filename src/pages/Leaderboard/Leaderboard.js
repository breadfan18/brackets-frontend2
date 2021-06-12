import styles from './Leaderboard.module.css';
import { useState, useEffect } from "react";
import { fetchAllUserPicks } from '../../services/picks-service';
import testUtils from 'react-dom/test-utils';


const Leaderboard = (props) => {
    let round16Points = 20;
    let quartersPoints = 40;
    let semisPoints = 20;
    let finalsPoints = 15;

    const [allUserPicks, setAllUserPicks] = useState({
        allPicks: [],
        totalPoints: 0,
    })

    useEffect(() => {
        async function getAllUserData() {
            const allUsersData = await fetchAllUserPicks();

            setAllUserPicks({
                allPicks: allUsersData,
            })
        }
        getAllUserData();
    }, [])

    const allPicksArr = allUserPicks.allPicks;

    return (

        <div className={styles.leaderBoardRoot}>
            <h4>Leader Board</h4>
            <table className='striped centered'>
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Group Stages</th>
                        <th>Round of 16</th>
                        <th>Quarter Finals</th>
                        <th>Semi Finals</th>
                        <th>Final</th>
                        <th>TOTAL POINTS</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        allPicksArr.map(user => (
                            <tr>
                                <td>{user.uid}</td>
                                <td>{user.totalPoints}</td>
                                <td>{round16Points}</td>
                                <td>{quartersPoints}</td>
                                <td>{semisPoints}</td>
                                <td>{finalsPoints}</td>
                                <td id={styles.totalValues}>{user.totalPoints + round16Points + quartersPoints + semisPoints + finalsPoints}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Leaderboard;
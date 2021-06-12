import styles from './Leaderboard.module.css';
import { useState, useEffect } from "react";
import { fetchAllUserPicks } from '../../services/picks-service';
import testUtils from 'react-dom/test-utils';


const Leaderboard = (props) => {

    const [allUserPicks, setAllUserPicks] = useState({
        allPicks: [],
        totalPoints: 0,
      })

    useEffect(() => {

        async function getAllUserData() {
            const test = await fetchAllUserPicks();

            setAllUserPicks({
                allPicks: test,
            })
        }
        getAllUserData();
    }, [])

    const allPicksArr = allUserPicks.allPicks;
    console.log(allPicksArr);

   allPicksArr.map(user => console.log(user.uid));

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
                                <td>20</td>
                                <td>40</td>
                                <td>20</td>
                                <td>15</td>
                            </tr>
                        ))
                    }
                  
                </tbody>
            </table>
        </div>
    )
}

export default Leaderboard;
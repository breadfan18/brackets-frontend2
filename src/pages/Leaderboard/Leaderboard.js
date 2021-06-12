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
            console.log(test)

            setAllUserPicks({
                allPicks: test,
            })
    
        }

       

        getAllUserData();

      


    })

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
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </div>
    )
}

export default Leaderboard;
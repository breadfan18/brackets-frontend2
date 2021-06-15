import styles from './Leaderboard.module.css';
import { useState, useEffect } from "react";
import { fetchAllUserPicks } from '../../services/picks-service';
import { Chance } from 'chance';

const Leaderboard = () => {
    let round16Points = 0;
    let quartersPoints = 0;
    let semisPoints = 0;
    let finalsPoints = 0;
    const medalImgsArr= ['https://i.imgur.com/y4jufuC.png', 'https://i.imgur.com/qxkk69T.png', 'https://i.imgur.com/EMxQ5x8.png'];
    const potatoImg = 'https://i.imgur.com/xbHS3w6.png';

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

    const allPicksArr = allUserPicks.allPicks.sort((a, b) => (a.totalPoints > b.totalPoints) ? -1 : 1);

    return (

        <div className={styles.leaderBoardRoot}>
            <h4 className={styles.leaderboardh4}>Leader Board</h4>
            <table className='centered'>
                <thead>
                    <tr>
                        <th>Medal</th>
                        <th>Player</th>
                        <th>Group Stages</th>
                        <th>Round of 16</th>
                        <th>Quarter Finals</th>
                        <th>Semi Finals</th>
                        <th>Final</th>
                        <th>TOTAL POINTS</th>

                    </tr>
                </thead>
                <tbody id={styles.leaderTbody}>
                    {
                        allPicksArr.map((user, idx) => (
                            <tr>
                                <td>
                                    <img src={idx < 3 ? medalImgsArr[idx] : potatoImg} alt="gold"style={{ height: '3.5rem' }}/>
                                </td>
                                <td className={styles.userImg}>
                                    <img src={user.photo} alt="" 
                                    style={{height: '3.5rem', borderRadius: '50%'}}
                                
                                />{user.username}</td>
                                <td>{user.totalPoints}</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
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
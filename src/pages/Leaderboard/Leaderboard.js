import styles from './Leaderboard.module.css';

const Leaderboard = (props) => {

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
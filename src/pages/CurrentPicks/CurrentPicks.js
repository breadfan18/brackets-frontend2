const CurrentPicks = (props) => {
    let userPicks = props.allPicks[0][0];
    let groupsArray = [];
    let counter = 0;
    let groupLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

    for (const group in userPicks) {
        if (Object.hasOwnProperty.call(userPicks, group) && counter < 8) {
            const teams = userPicks[group];
            groupsArray.push(teams)
            counter++;
        }
    }


    return (
        <div>
            <section className='groupStagePicks'>
                <h3>Group Stage Picks</h3>
                <table className='responsive-table striped'>
                    <thead>
                        <th>Group</th>
                        <th>First</th>
                        <th>Second</th>
                        <th>Third</th>
                        <th>Fourth</th>
                    </thead>
                    <tbody>
                        {
                            groupsArray.map((groups, idx) => (
                                <>


                                    <tr>
                                        <td>Group {groupLetters[idx]}</td>
                                        {
                                            groups.map((team, teamIdx) =>
                                                <td>
                                                    {team.name}
                                                </td>
                                            )
                                        }

                                    </tr>
                                </>
                            ))
                        }
                    </tbody>
                </table>
                <button class="btn waves-effect waves-light" type="submit" name="action">Edit Picks
                <i class="material-icons right">edit</i>
                </button>
                <button class="btn waves-effect waves-light" type="submit" name="action">Delete Picks
                <i class="material-icons right">delete_forever</i>
                </button>
            </section>
            <section>
                <h3>Round of 16 Picks</h3>
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
            <section>
                <h3>Quarter Finals Picks</h3>
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
            <section>
                <h3>Semi Finals Picks</h3>
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
            <section>
                <h3>Final Pick</h3>
            </section>

        </div>
    )

}

export default CurrentPicks;
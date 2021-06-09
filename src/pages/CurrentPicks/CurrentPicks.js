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
            <table>
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
                                groups.map((team,teamIdx) => 
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
            
        </div>
    )

}

export default CurrentPicks;
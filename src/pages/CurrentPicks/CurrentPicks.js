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
            {
                groupsArray.map((groups, idx) => (
                    <>
                        <div>Group {groupLetters[idx]}</div>
                        <ul>
                            {
                                groups.map((team,teamIdx) => 
                                    <li>
                                        <p>{teamIdx+1}<span>    {team.name}</span></p>
                                    </li>
                                )
                            }

                        </ul>
                    </>


                ))
            }
        </div>
    )

}

export default CurrentPicks;
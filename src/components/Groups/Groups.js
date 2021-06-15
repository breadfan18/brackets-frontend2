import Group from '../Group/Group';
import style from './Groups.module.css';
import { Link } from 'react-router-dom';

const Groups = (props) => {

    return (
        <>
            <div className={style.groupsContainer}>
                {
                    props.groups.map((group, idx) =>
                        <Group
                            group={group.teams}
                            key={group.name}
                            groupLetter={group.name}
                            saveGroupPick={props.saveGroupPicks}
                        />
                    )
                }
            </div>
            <div className='submitBtnWrapper'>
                {/* <button className="btn waves-effect waves-light submitGrpPicks" type="submit" onClick={(e) => props.handleSubmit(e)}>Submit Picks</button> */}
                <Link to='/' onClick={(e) => props.handleSubmit(e)} className="btn waves-effect waves-light submitGrpPicks">Submit Picks</Link>
            </div>
        </>
    )
}

export default Groups;
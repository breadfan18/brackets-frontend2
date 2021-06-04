import { useState, useEffect } from "react";
import { auth } from './services/firebase';
import Header from './components/Header/Header';
import Groups from './components/Groups/Groups';
import { getGroups } from './services/soccer-api';
import { createPicks } from './services/picks-service';
import "./App.css";

export default function App() {

  const groupPicks = {
    groupStagePicks: {
      'A': {
        1: 'England',
        2: 'Spain',
        3: 'France',
        4: 'Portugal'
      },
      'B': {
        1: 'England',
        2: 'Spain',
        3: 'France',
        4: 'Portugal'
      },
      'C': {
        1: 'England',
        2: 'Spain',
        3: 'France',
        4: 'Portugal'
      },
      'D': {
        1: 'England',
        2: 'Spain',
        3: 'France',
        4: 'Portugal'
      },
      'E': {
        1: 'England',
        2: 'Spain',
        3: 'France',
        4: 'Portugal'
      },
      'F': {
        1: 'England',
        2: 'Spain',
        3: 'France',
        4: 'Portugal'
      }
    }
  }


  const [groups, setGroups] = useState([]);

  const [userPicks, setUserPicks] = useState({
    picks: [],
    newPick: {
      groupStagePicks: {},
      roundOf16Picks: {},
      quartersPicks: {},
      semisPicks: {},
      finalPick: String,
      totalPoints: Number,
      uid: String
    }
  })

  const [userState, setUserState] = useState({
    user: null
  });


  useEffect(() => {
    getGroups()
      .then(wc2018Groups => {
        setGroups(wc2018Groups.groups);
      })

    console.log(groups);

    // Set up authentication observer
    const unsubscribe = auth.onAuthStateChanged(user => setUserState({ user }));

    // clean up function
    return function () {
      // clean up subscriptions
      unsubscribe();
    }
  }, [userState.user]);

  async function handleSubmit(e) {
    if (!userState.user) return;

    e.preventDefault();


    try {
      const newUserPick = await createPicks(groupPicks, userState.user.uid);

      // setUserPicks({
      //   picks=[...userPicks.picks, newUserPick]
      // })
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <>
      <Header user={userState.user} />
      <div>
        {
          userState.user ?
            <article>{userState.user.displayName}</article>
            :
            <article>Not logged in</article>
        }
      </div>

      <Groups
        groups={groups}
      />

    </>
  );
}
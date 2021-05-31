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

  const [userState, setUserState] = useState({
    user: null
  });


  useEffect(() => {
    getGroups()
      .then(test => {
        setGroups(test.groups);

        // let sortedGroups = groups.sort((a, b) => {
        //   return (a.group_id > b.group_id) ? 1 : -1;
        // })

        // let finalGroups = [];

        // for (let i = 0; i < sortedGroups.length; i += 4) {
        //   const groupChunk = sortedGroups.slice(i, i + 4);
        //   finalGroups.push(groupChunk)
        // }

        console.log(groups);
        // setGroups(finalGroups);
      })



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
      await createPicks(groupPicks, userState.user.uid);
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
      <form onSubmit={handleSubmit}>
        <Groups groups={groups} />
      </form>

    </>
  );
}
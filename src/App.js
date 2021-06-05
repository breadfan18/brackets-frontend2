import { useState, useEffect } from "react";
import { auth } from './services/firebase';
import Header from './components/Header/Header';
import Groups from './components/Groups/Groups';
import { getGroups } from './services/soccer-api';
import { createPicks, updatePicks, fetchUserPicks } from './services/picks-service';
import "./App.css";

export default function App() {

  const [groups, setGroups] = useState([]);

  const [userPicks, setUserPicks] = useState({
    allPicks: [],
    picks: {
      'Group A': [],
      'Group B': [],
      'Group C': [],
      'Group D': [],
      'Group E': [],
      'Group F': [],
      'Group G': [],
      'Group H': [],
      roundOf16Picks: {},
      quartersPicks: {},
      semisPicks: {},
      finalPick: String,
      totalPoints: Number,
      uid: String
    },
    pickSaved: false
  })

  const [userState, setUserState] = useState({
    user: null
  });

  //UseEffect Hook
  useEffect(() => {
    getGroups()
      .then(wc2018Groups => {
        setGroups(wc2018Groups.groups);
      })
    
      async function getAppData() {
        if(!userState.user) return;
        const picks = await fetchUserPicks(userState.user.uid);
        console.log(picks);

        setUserPicks({
          allPicks: [...userPicks.allPicks, picks],
          picks: {...userPicks.picks}
        })
      }

      getAppData();

    // Set up authentication observer
    const unsubscribe = auth.onAuthStateChanged(user => setUserState({ user }));

    // clean up function
    return function () {
      // clean up subscriptions
      unsubscribe();
    }
  }, [userState.user]);


  //handleSubmit Function
  function handlePicksSave(teams, e, groupLetterKey) {
    if (!userState.user) return;

    setUserPicks({
      allPicks: userPicks.allPicks,
      picks: {
        ...userPicks.picks,
        [groupLetterKey]: teams
      }
    });
  }

  async function handleSubmit(e) {
    if (!userState.user) return;
    e.preventDefault();



    if (userPicks.pickSaved) {
      console.log('Pick already saved');
    } else {
      const pick = await createPicks(userPicks.picks, userState.user.uid);
      setUserPicks({
        allPicks: [...userPicks.allPicks, pick],
        pickSaved: true
      }
      )
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
        saveGroupPicks={handlePicksSave}
      />
      <button onClick={handleSubmit}>Submit Picks</button>

    </>
  );
}
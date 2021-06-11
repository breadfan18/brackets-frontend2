import { useState, useEffect } from "react";
import { auth } from './services/firebase';
import Header from './components/Header/Header';
import Groups from './components/Groups/Groups';
import { getGroups } from './services/soccer-api';
import { fetchResults } from './services/results-service';
import { createPicks, fetchUserPicks } from './services/picks-service';
import "./App.css";
import CurrentPicks from './pages/CurrentPicks/CurrentPicks';
import Simulate from './pages/Simulate/Simulate';

import { Route, Switch } from 'react-router-dom';

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

  const [results, setResults] = useState({
    'Group A': [],
    'Group B': [],
    'Group C': [],
    'Group D': [],
    'Group E': [],
    'Group F': [],
    'Group G': [],
    'Group H': [],
    roundOf16Results: {},
    quartersResults: {},
    semisResults: {},
    finalResult: String,
});

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
      if (!userState.user) return;
      const picks = await fetchUserPicks(userState.user.uid);

      setUserPicks({
        allPicks: picks,
      })
 
    }
    getAppData();

    fetchResults()
    .then(results => {
      setResults(results);
    })

    const unsubscribe = auth.onAuthStateChanged(user => setUserState({ user }));

    return function () {
      unsubscribe();
    }
  }, [userState.user]);


  //handleSubmit Function
  function handlePicksSave(teams, e, groupLetterKey) {
    if (!userState.user) return;
    e.preventDefault();

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

  function handlePointsCalc() {
    console.log(userPicks.allPicks);
    console.log(results);
  }


  return (
    <>
      <Header user={userState.user} />
      <div>
        {
          userState.user ?
            <>
              <Switch>
                <Route
                  exact path='/'
                  render={() =>
                    <>
                      <article>Welcome {userState.user.displayName}!!</article>
                      <div>HOME PAGE</div>
                    </>
                  }
                />
                <Route
                  exact path='/groups'
                  render={() =>
                    <div className='groupsCardsPage'>
                      <Groups
                        groups={groups}
                        saveGroupPicks={handlePicksSave}
                      />
                      <div id='submitGrpPicks'>
                        <button class="btn waves-effect waves-light" type="submit" onClick={handleSubmit}>Submit Picks</button>
                      </div>
                    </div>
                  }
                />
                <Route
                  exact path='/knockouts'
                  render={() =>
                    <>
                      <article>Welcome {userState.user.displayName}!!</article>
                      <div>HOME PAGE</div>
                    </>
                  }
                />
                <Route
                  exact path='/currentPicks'
                  render={() =>
                    <CurrentPicks
                      user={userState.user}
                      allPicks={userPicks.allPicks}
                    />
                  }
                />
                <Route
                  exact path='/leaderboard'
                  render={() =>
                    <div>LEADER BOARD</div>
                  }
                />

                <Route
                  exact path='/simulate'
                  render={() =>
                    <Simulate 
                      userPick={userPicks.allPicks}
                      setStandings={setResults}
                      groupStandings={results}
                    />
                  }
                />
              </Switch>
            </>
            :
            <>
              <article>Welcome to Soccer Brackets.</article>
              <article>Log in to Continue</article>
            </>
        }
      </div>
    </>
  );
}
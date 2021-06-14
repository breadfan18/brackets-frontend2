import "./App.css";
import { useState, useEffect } from "react";
import { getGroups } from './services/soccer-api';
import { fetchResults } from './services/results-service';
import { createPicks, fetchUserPicks, updatePicks, deletePicks } from './services/picks-service';
import { Route, Switch } from 'react-router-dom';
import { auth } from './services/firebase';
import Header from './components/Header/Header';
import Groups from './components/Groups/Groups';
import CurrentPicks from './pages/CurrentPicks/CurrentPicks';
import Simulate from './pages/Simulate/Simulate';
import Leaderboard from './pages/Leaderboard/Leaderboard';
import Knockouts from './pages/Knockouts/Knockouts';
import Login from './components/Login/Login';

export default function App() {
  const pointPerCorrectGroupPosition = 8;
  const [groups, setGroups] = useState([]);
  const [userPicks, setUserPicks] = useState({
    allPicks: [],
    totalPoints: 0,
    pickSaved: false
  })
  const [results, setResults] = useState({});
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

      const userPicks = await fetchUserPicks(userState.user.uid);

      if (userPicks.length > 0) {
        setUserPicks({
          allPicks: userPicks,
          totalPoints: userPicks[0].totalPoints,
          username: userPicks[0].username
        })
      }
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
      pickSaved: userPicks.pickSaved,
      totalPoints: 0,
      username: userState.user.displayName,
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
      const pick = await createPicks(userPicks.picks, userState.user.displayName, userPicks.totalPoints, userState.user.uid);
      setUserPicks({
        allPicks: [...userPicks.allPicks, pick],
        totalPoints: userPicks.totalPoints,
        username: userState.user.displayName,
        pickSaved: true
      }
      )
    }
  }

  async function handleDelete(id) {
    if(!userState.user) return;

    try {
      await deletePicks(id);
      setUserPicks(prevState => ({
        allPicks: [],
        totalPoints: 0
      }));
    } catch (error) {
      console.log(error)
    }
  }

  function handlePointsCalc() {
    const userPicksObj = userPicks.allPicks[0];
    const resultsObj = results[0];
    const userPicksArr = [];
    const resultsArr = [];

    let counter1 = 0;
    for (const arr in userPicksObj) {
      if (counter1 < 8) {
        userPicksObj[arr].forEach(team => {
          userPicksArr.push(team);
        });
      }
      counter1++;
    }

    let counter2 = 0;
    for (const arr in resultsObj) {
      if (counter2 < 8) {
        resultsObj[arr].forEach(team => {
          resultsArr.push(team);
        });
      }
      counter2++;
    }

    let totalPoints = handleGroupPointsCompare(userPicksArr, resultsArr);
    const pickToUpdate = userPicks.allPicks.find(pick => pick._id);

    updatePicks(pickToUpdate.totalPoints, userState.user.displayName, totalPoints, pickToUpdate._id);
  }

  function handleGroupPointsCompare(userPicks, resultsArr) {
    let correntCount = 0;
    let incorrectCount = 0;
    for (let i = 0; i < userPicks.length; i++) {
      if (userPicks[i] !== resultsArr[i]) {
        incorrectCount++
      } else {
        correntCount++;
      }
    }
    return correntCount * pointPerCorrectGroupPosition;
  }

  return (
    <>
      <Header user={userState.user} />
      <div className='mainBody'>
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
                        handleSubmit={handleSubmit}
                      />
                    </div>
                  }
                />
                <Route
                  exact path='/knockouts'
                  render={() =>
                    <Knockouts 
                      grpResults={results}
                    />
                  }
                />
                <Route
                  exact path='/currentPicks'
                  render={() =>
                    <CurrentPicks
                      user={userState.user}
                      allPicks={userPicks.allPicks}
                      delete={handleDelete}
                    />
                  }
                />
                <Route
                  exact path='/leaderboard'
                  render={() =>
                    <Leaderboard

                    />
                  }
                />

                <Route
                  exact path='/simulate'
                  render={() =>
                    <Simulate
                      userPick={userPicks.allPicks}
                      setStandings={setResults}
                      groupStandings={results}
                      calcPoints={handlePointsCalc}
                    />
                  }
                />
              </Switch>
            </>
            :
            <Login />
        }
      </div>
    </>
  );
}
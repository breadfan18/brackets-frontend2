import { useState, useEffect } from "react";
import { auth } from './services/firebase';
import Header from './components/Header/Header';
import Groups from './components/Groups/Groups';
import { getGroups } from './services/soccer-api';
import "./App.css";

export default function App() {


  const [groups, setGroups] = useState([]);

  const [userState, setUserState] = useState({
    user: null
  });


  useEffect(() => {
    getGroups()
      .then(groups => {
        let sortedGroups = groups.sort((a, b) => {
          return (a.group_id > b.group_id) ? 1 : -1;
        })

        let finalGroups = [];

        for (let i = 0; i < sortedGroups.length; i += 4) {
          const groupChunk = sortedGroups.slice(i, i + 4);
          finalGroups.push(groupChunk)
        }

        console.log(finalGroups);
        setGroups(finalGroups);
      })



    // Set up authentication observer
    const unsubscribe = auth.onAuthStateChanged(user => setUserState({ user }));

    // clean up function
    return function () {
      // clean up subscriptions
      unsubscribe();
    }
  }, [userState.user]);

  function handleSubmit(e) {
    if(!userState.user) return;

    e.preventDefault();

    console.log('submit clicked');
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
import { useState, useEffect } from "react";
import { auth } from './services/firebase';
import Header from './components/Header/Header';
import "./App.css";

export default function App() {
  
  const [ userState, setUserState ] = useState({
    user: null
  });

  useEffect(function() {
    
    // Set up authentication observer
    const unsubscribe = auth.onAuthStateChanged(user => setUserState({ user }));

    // clean up function
    return function() {
      // clean up subscriptions
      unsubscribe();
    }
  }, [userState.user]);

  
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
    </>
  );
}
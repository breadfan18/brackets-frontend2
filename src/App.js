import { useState, useEffect } from "react";
import {auth} from './services/firebase';
import "./App.css";
import Header from './components/Header/Header';


export default function App() {
  const [state, setState] = useState({
    skills: [{ skill: "JavaScript", level: 4 }],
    newSkill: {
      skill: '',
      level: '3'
    },
    editMode: false
  });

  const [userState, setUserState] = useState({
    user: null
  })

  useEffect(() => {
    async function getAppData() {
      const skills = await fetch('http://localhost:3001/api/skills')
        .then(res => res.json());

      setState(prevState => ({
        ...prevState,
        skills
      }));
    }
    getAppData();

    //Setup authentication observer
    const unsubscribe = auth.onAuthStateChanged(user => setUserState(user))

     //Clean up function
     return function () {
      unsubscribe();
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (state.editMode) {
      //update the existing skill
      try {
        const { skill, level, _id } = state.newSkill;
        const skills = await fetch(`http://localhost:3001/api/skills/${_id}`, {
          method: 'PUT',
          headers: {
            'Content-type': 'Application/json'
          },
          body: JSON.stringify({ skill, level })
        }).then(res => res.json());

        setState(prevState => ({
          ...prevState,
          skills,
          editMode: false,
          newSkill: {
            skill: '',
            level: '3'
          }
        }))

      } catch (error) {

      }
    } else {
      //create a new skill
      try {
        const skill = await fetch('http://localhost:3001/api/skills', {
          method: 'POST',
          headers: {
            'Content-type': 'Application/json'
          },
          body: JSON.stringify(state.newSkill)
        }).then(res => res.json())

        setState({
          skills: [...state.skills, skill],
          newSkill: {
            skill: '',
            level: '3'
          }
        })

      } catch (error) {
        console.log(error);
      }
    }
  }

  function handleChange(e) {
    setState(prevState => ({
      ...prevState,
      skills: prevState.skills,
      newSkill: {
        ...prevState.newSkill,
        [e.target.name]: e.target.value
      }
    }));
  }

  function handleEdit(id) {
    const skillToEdit = state.skills.find(skill => skill._id === id);

    //We set the skill and level properties of skillToEdit to state
    //so that those values will populate in the Skill and Level fields
    setState(prevState => ({
      ...prevState,
      newSkill: skillToEdit,
      editMode: true
    }))
  }

  async function handleDelete(id) {
    try {
      const skills = await fetch(`http://localhost:3001/api/skills/${id}`, {
        method: 'DELETE'
      }).then(res => res.json())

      setState(prevState => ({
        ...prevState,
        skills
      }))
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Header user={userState} />
      <section>
        <h2>DEV SKILLS</h2>
        <hr />
        {state.skills.map((s, i) => (
          <article key={i}>
            <div>{s.skill}</div>
            <div>{s.level}</div>
            <div
              className='controls'
              onClick={() => handleEdit(s._id)}
            >{'✏️'}</div>
            <div
              className='controls'
              onClick={() => handleDelete(s._id)}
            >{'🗑'}</div>
          </article>
        ))}
        <hr />
        <form onSubmit={handleSubmit}>
          <label>
            <span>SKILL</span>
            <input name="skill" value={state.newSkill.skill} onChange={handleChange} />
          </label>
          <label>
            <span>LEVEL</span>
            <select name="level" value={state.newSkill.level} onChange={handleChange}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </label>
          <button>{state.editMode ? 'EDIT SKILL' : 'ADD SKILL'}</button>
        </form>
      </section>
    </>
  );
}
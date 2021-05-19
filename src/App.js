import { useState, useEffect } from "react";
import "./App.css";


export default function App() {
  const [state, setState] = useState({
    skills: [{ skill: "JavaScript", level: 4 }],
    newSkill: {
      skill: '',
      level: '3'
    }
  });

  // useEffect(() => {
  //   function getAppData() {
  //     fetch('http://localhost:3001/api/skills')
  //     .then(response => response.json())
  //     .then(data => setState(prevState => ({
  //       ...prevState,
  //       skills: data
  //     })));
  //   }
  //   getAppData();
  // }, []);

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
  }, []);

  function addSkill(e) {
    e.preventDefault();
    setState({
      skills: [...state.skills, state.newSkill],
      newSkill: {
        skill: '',
        level: '3'
      }
    })
  }

  function handleChange(e) {
    setState(prevState => ({
      skills: prevState.skills,
      newSkill: {
        ...prevState.newSkill,
        [e.target.name]: e.target.value
      }
    }));
  }

  return (
    <section>
      <h2>DEV SKILLS</h2>
      <hr />
      {state.skills.map((s, i) => (
        <article key={i}>
          <div>{s.skill}</div> <div>{s.level}</div>
        </article>
      ))}
      <hr />
      <form onSubmit={addSkill}>
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
        <button>ADD SKILL</button>
      </form>
    </section>
  );
}
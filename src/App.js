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

  async function handleSubmit(e) {
    e.preventDefault();

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
        <button>ADD SKILL</button>
      </form>
    </section>
  );
}
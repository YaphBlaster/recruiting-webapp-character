import { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';
import { useDndContext } from './dnd-context.js';

const url = "https://recruiting.verylongdomaintotestwith.ca/api/{YaphBlaster}/character"

function App() {
  const { characters, alterAttribute, alterSkill } = useDndContext();
  const [minimumInfo, setMinimumInfo] = useState({ class: "", minimumAttributes: {} })

  const saveCharacters = async () => {
    try {
      await fetch(url, {
        body: JSON.stringify({ characters }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
      alert("Characters Saved")
    } catch (error) {
      alert(error.message)
    }
  }

  const fetchCharacters = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log("🚀 ~ fetchCharacters ~ json:", json)
      alert("Characters retrieved and printed to console")
    } catch (error) {
      alert(error.message)
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <div>
          <div style={{ gap: 10, display: "flex", justifyContent: "center" }}>
            <button onClick={saveCharacters}>Save all characters</button>
            <button onClick={fetchCharacters}>Fetch all characters</button>
          </div>
          {characters.map((character) => {
            return <div key={character.id}>
              <div>Character: {character.id}</div>
              <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
                <div>
                  <div>Attributes</div>
                  {ATTRIBUTE_LIST.map((attribute) => {
                    return <div style={{ display: "flex", gap: 5 }} key={attribute}>
                      <div>{attribute}: </div>
                      <div>{character.attributes[attribute].value}</div>
                      <button onClick={() => alterAttribute({ type: "increment", characterId: character.id, attribute })}>+</button>
                      <button onClick={() => alterAttribute({ type: "decrement", characterId: character.id, attribute })}>-</button>
                      <div>Mod: {character.attributes[attribute].modifier}</div>
                    </div>
                  })}
                </div>
                <div>
                  <div>Classes</div>

                  {Object.entries(CLASS_LIST).map(([className, minimumAttributes]) => {
                    const isMinimum = ATTRIBUTE_LIST.every((attributeName) => character.attributes[attributeName].value > CLASS_LIST[className][attributeName])
                    return <div key={className}
                      onClick={() => { setMinimumInfo({ class: className, minimumAttributes }) }}
                      style={{
                        cursor: "pointer",
                        color: isMinimum ? "green" : undefined
                      }}>{className} </div>
                  })}
                  {minimumInfo.class && <div style={{ border: "2px solid blue" }}>
                    <div>{minimumInfo.class} min reqs</div>
                    {Object.entries(minimumInfo.minimumAttributes).map(([title, value]) => {
                      return <div key={title}>{title} : {value} </div>
                    })}
                    <button onClick={() => setMinimumInfo({})}>close</button>
                  </div>
                  }
                </div>
                <div>
                  <div>Skills</div>
                  <div>Total skill points available: {10 + (4 * character.attributes["Intelligence"].modifier)} </div>
                  {SKILL_LIST.map((skillObject) => {
                    const modifierValue = character.attributes[skillObject.attributeModifier].modifier;
                    return <div style={{ display: "flex", gap: 5 }} key={skillObject.name}>
                      <div>{skillObject.name}: {character.skills[skillObject.name].value}</div>
                      <div>(Mod: {skillObject.attributeModifier}):  {modifierValue}</div>
                      <button onClick={() => alterSkill({ type: "increment", characterId: character.id, skill: skillObject.name, modifierValue })}>+</button>
                      <button onClick={() => alterSkill({ type: "decrement", characterId: character.id, skill: skillObject.name, modifierValue })}>-</button>
                      <div>Total: {character.skills[skillObject.name].total}</div>
                    </div>
                  })}
                </div>
              </div>
            </div>
          })}
        </div>
      </section>
    </div>
  );
}

export default App;

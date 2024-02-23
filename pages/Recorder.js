import { useState } from "react";

const bodyweight = 77;

const emptySet = [
  {
    reps: 0,
    weight: bodyweight,
    min: 0,
  },
];

export default function Recorder({
  updateQuery,
  exerName,
  appendExercise,
  updateQueryStatusToUnperformed,
}) {
  const [sets, setSets] = useState(emptySet);
  const [toggleButton, setToggleButton] = useState([false]);

  function handleChangeSet(e, index) {
    const currentSets = [...sets];
    currentSets[index][e.target.id] = e.target.value;
    setSets(currentSets);
  }

  function addSet() {
    const lastSet = sets.slice(-1)[0];
    setSets([
      ...sets,
      { reps: lastSet.reps, weight: lastSet.weight, min: lastSet.min },
    ]);
    const disabledButtonToggles = Array(toggleButton.length).fill(true);
    setToggleButton([...disabledButtonToggles, false]);
  }

  async function handleSubmitExercise() {
    const exercise = {
      name: exerName,
      time: new Date().toISOString(),
      sets: sets,
    };
    const requestOptions = {
      method: "POST",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify(exercise),
    };
    const uri = "api/exercisesdb";
    try {
      const res = await fetch(uri, requestOptions);
      console.log(res.status);
      if (res.status === 200) {
        setSets(emptySet);
        updateQuery("");
        appendExercise(exercise);
        updateQueryStatusToUnperformed();
      }
    } catch (err) {
      throw err;
    }
  }

  return (
    <>
      <p> {exerName} </p>
      {sets.map((set, index) => (
        <div key={index}>
          reps
          <input
            id={"reps"}
            value={set.reps}
            onChange={(e) => handleChangeSet(e, index)}
            type="number"
          />
          kg
          <input
            id={"weight"}
            value={set.weight}
            onChange={(e) => handleChangeSet(e, index)}
            type="number"
          />
          min
          <input
            id={"min"}
            value={set.min}
            onChange={(e) => handleChangeSet(e, index)}
            type="number"
          />
          <button onClick={addSet} disabled={toggleButton[index]}>
            add set
          </button>
        </div>
      ))}
      <div>
        <button onClick={handleSubmitExercise}> Submit </button>
      </div>
    </>
  );
}

import { Card, TextInput, Button } from "flowbite-react";
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
    <Card className="max-w-sm">
      <article className="format dark:format-invert mx-auto">
        <p> {exerName} </p>
        {sets.map((set, index) => (
          <div key={index}>
            reps
            <TextInput
              id={"reps"}
              value={set.reps}
              onChange={(e) => handleChangeSet(e, index)}
              type="number"
              className="max-w-sm"
            />
            kg
            <TextInput
              id={"weight"}
              value={set.weight}
              onChange={(e) => handleChangeSet(e, index)}
              type="number"
              className="max-w-sm"
            />
            min
            <TextInput
              id={"min"}
              value={set.min}
              onChange={(e) => handleChangeSet(e, index)}
              type="number"
            />
            <Button onClick={addSet} disabled={toggleButton[index]}>
              add set
            </Button>
          </div>
        ))}
        <div>
          <Button onClick={handleSubmitExercise}> Submit </Button>
        </div>
      </article>
    </Card>
  );
}

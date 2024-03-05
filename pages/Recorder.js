import { TextInput, Button } from "flowbite-react";
import { useState } from "react";

const bodyweight = 77;

const emptySet = [
  {
    reps: 10,
    weight: bodyweight,
    min: 0,
  },
];

export default function Recorder({
  updateQuery,
  exerName,
  appendExercise,
  updateQueryStatusToUnperformed,
  exer,
}) {
  const [sets, setSets] = useState(emptySet);
  const [toggleButton, setToggleButton] = useState([false]);

  console.log(exer);

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

  function deleteSet() {
    setSets(sets.slice(0, -1));
    setToggleButton([...toggleButton.slice(0, -2), false]);
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
    <div>
      <div className="">
        <p className="text-lg"> {exerName} </p>
      </div>
      <div className="flex max-w-sm flex-col gap-y-1">
        <div className="flex flex-row gap-x-1">
          <p className="basis-1/4"> reps </p>
          <p className="basis-1/4"> kg </p>
          <p className="basis-1/4"> min </p>
        </div>
        {sets.map((set, index) => (
          <div key={index} className="flex flex-row gap-x-1">
            <div className="basis-1/4">
              <TextInput
                id={"reps"}
                value={set.reps}
                onChange={(e) => handleChangeSet(e, index)}
                type="number"
              />
            </div>
            <div className="basis-1/4">
              <TextInput
                id={"weight"}
                value={set.weight}
                onChange={(e) => handleChangeSet(e, index)}
                type="number"
              />
            </div>
            <div className="basis-1/4">
              <TextInput
                id={"min"}
                value={set.min}
                onChange={(e) => handleChangeSet(e, index)}
                type="number"
              />
            </div>
            {!toggleButton[index] && (
              <Button onClick={addSet} className="basis-1/4">
                Add
              </Button>
            )}
            {toggleButton[index] && (
              <Button onClick={deleteSet} className="basis-1/4">
                Delete
              </Button>
            )}
          </div>
        ))}
        <Button onClick={handleSubmitExercise} className="max-h-6 ">
          <p className="italic"> Record! </p>{" "}
        </Button>
      </div>
    </div>
  );
}

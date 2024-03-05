import SearchExercise from "./SearchExercise";
import Exercise from "./components/Exercise";
import Recorder from "./Recorder";
import { useState } from "react";

const emptyExer = {
  _id: "",
  name: "",
  time: "",
  sets: [],
};

const QUERYSTATUS = {
  UNPERFORMED: "UNPERFORMED",
  DATAFOUND: "DATAFOUND",
  DATANOTFOUND: "DATANOTFOUND",
};

const DB_API_URI = "/api/exercisesdb";

export default function Home() {
  const [query, setQuery] = useState("");
  const updateQuery = (q) => setQuery(q);
  const [exer, setExer] = useState(emptyExer);

  const [exerciseStack, setExerciseStack] = useState([]);
  const appendExercise = (exercise) => {
    setExerciseStack([...exerciseStack, exercise]);
  };
  const [queryStatus, setQueryStatus] = useState(QUERYSTATUS.UNPERFORMED);
  const updateQueryStatusToUnperformed = () =>
    setQueryStatus(QUERYSTATUS.UNPERFORMED);

  async function handleSearch() {
    const uri = DB_API_URI + "?name=" + query;
    try {
      const response = await fetch(uri);
      if (response.status === 200) {
        const data = await response.json();
        setQueryStatus(QUERYSTATUS.DATAFOUND);
        setQuery("");
        setExer(data);
      } else if (response.status === 204) {
        setQueryStatus(QUERYSTATUS.DATANOTFOUND);
        console.log("204: no content");
      } else setQueryStatus(QUERYSTATUS.UNPERFORMED);
    } catch (err) {
      throw err;
    }
  }

  function CurrentExercise(props) {
    return (
      <div>
        <Recorder {...props} />
        <p className="mt-3"> last time: </p>
        <Exercise {...props.exer} />
      </div>
    );
  }

  function WorkOut({ exerciseStack }) {
    return exerciseStack.map((e, index) => <Exercise {...e} key={index} />);
  }

  return (
    <main className="p-6">
      <h1 className="text-xl font-medium dark:text-white">
        {" "}
        Progressive Overloading{" "}
      </h1>
      <SearchExercise
        query={query}
        updateQuery={updateQuery}
        handleSearch={handleSearch}
      />
      {queryStatus === "DATANOTFOUND" && (
        <Recorder
          updateQuery={updateQuery}
          exerName={query}
          appendExercise={appendExercise}
          updateQueryStatusToUnperformed={updateQueryStatusToUnperformed}
        />
      )}
      {queryStatus === "DATAFOUND" && (
        <CurrentExercise
          exer={exer}
          updateQuery={updateQuery}
          exerName={exer.name}
          appendExercise={appendExercise}
          updateQueryStatusToUnperformed={updateQueryStatusToUnperformed}
        />
      )}
      <div>
        {exerciseStack.length > 0 && (
          <>
            <h2> Workout </h2>
            <WorkOut exerciseStack={exerciseStack} />
          </>
        )}
      </div>
    </main>
  );
}

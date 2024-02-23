// import Exercise from "./components/Exercise";

export default function SearchExercise({
  query,
  updateQuery,
  // updateExer,
  handleSearch,
}) {
  return (
    <>
      <input
        id="search"
        value={query}
        onChange={(e) => updateQuery(e.target.value)}
      />
      <button onClick={(e) => handleSearch(e)}> search </button>
    </>
  );
}

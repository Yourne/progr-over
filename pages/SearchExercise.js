// import Exercise from "./components/Exercise";
import { TextInput, Button } from "flowbite-react";

export default function SearchExercise({
  query,
  updateQuery,
  // updateExer,
  handleSearch,
}) {
  return (
    <div className="flex flex-row">
      <TextInput
        id="search"
        value={query}
        onChange={(e) => updateQuery(e.target.value)}
        className="max-w-sm"
      />
      <Button onClick={(e) => handleSearch(e)}> search </Button>
    </div>
  );
}

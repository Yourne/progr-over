import { TextInput, Button } from "flowbite-react";

export default function SearchExercise({ query, updateQuery, handleSearch }) {
  return (
    <div className="flex flex-row">
      <TextInput
        id="search"
        value={query}
        onChange={(e) => updateQuery(e.target.value)}
        className="mr-3"
      />
      <Button onClick={(e) => handleSearch(e)}> search </Button>
    </div>
  );
}

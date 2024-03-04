import { Card } from "flowbite-react";

export default function Exercise({ name, time, sets }) {
  return (
    <Card className="max-w-sm">
      <article className="format dark:format-invert">
        <h3>{name}</h3>
        <p> {time} </p>
        <ol className="list-inside list-decimal">
          {sets.map((s, index) => (
            <li key={index}>
              reps {s.reps} kg {s.weight} {s.min} min
            </li>
          ))}
        </ol>
      </article>
    </Card>
  );
}

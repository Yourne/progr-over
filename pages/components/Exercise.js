export default function Exercise({ name, time, sets }) {
  return (
    <div>
      <h3>{name}</h3>
      <p> {time} </p>
      <ol className="list-inside list-decimal">
        {sets.map((s, index) => (
          <li key={index}>
            reps {s.reps} kg {s.weight} {s.min} min
          </li>
        ))}
      </ol>
    </div>
  );
}

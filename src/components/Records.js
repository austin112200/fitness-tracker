function Records({ workouts }) {
  const records = {};

  workouts.forEach(w => {
    const est1RM = Math.round(w.weight * (1 + w.reps / 30));
    if (!records[w.name] || est1RM > records[w.name].weight) {
      records[w.name] = {
        weight: est1RM,
        date: w.date
      };
    }
  });

  return (
    <div>
      <h2>📌 Personal Records (1RM)</h2>
      {Object.keys(records).length === 0 ? (
        <p>No data yet.</p>
      ) : (
        <table border="1" cellPadding="6">
          <thead>
            <tr>
              <th>Exercise</th>
              <th>Best 1RM</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(records).map(([name, rec]) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{rec.weight} kg</td>
                <td>{rec.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

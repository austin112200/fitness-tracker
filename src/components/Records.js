function Records({ workouts }) {
  const [records, setRecords] = React.useState({});

  React.useEffect(() => {
    const newRecords = {};
    workouts.forEach(w => {
      const est1RM = Math.round(w.weight * (1 + w.reps / 30));
      if (!newRecords[w.name] || est1RM > newRecords[w.name].weight) {
        newRecords[w.name] = {
          weight: est1RM,
          date: w.date
        };
      }
    });
    setRecords(newRecords);
  }, [workouts]);

  return (
    <div className="tab-panel tab-panel--active fade-in">
      <h2>📌 Personal Records (1RM)</h2>
      {Object.keys(records).length === 0 ? (
        <p>No data yet.</p>
      ) : (
        <div className="table-container">
          <table className="styled-table">
            <thead>
              <tr>
                <th>🏋️ Exercise</th>
                <th>🏆 Best 1RM</th>
                <th>📅 Date</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(records).map(([name, rec]) => (
                <tr key={name} className="record-row">
                  <td>{name}</td>
                  <td>{rec.weight} kg</td>
                  <td>{rec.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

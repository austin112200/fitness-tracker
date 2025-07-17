function Summary({ workouts }) {
  const [view, setView] = React.useState("week");

  const getKey = (dateStr) => {
    const d = new Date(dateStr);
    return view === "week"
      ? new Date(d.setDate(d.getDate() - d.getDay())).toISOString().split("T")[0]
      : `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  };

  const METS = {
    "Squat": 7, "Deadlift": 8, "Bench Press": 6, "Pull-ups": 8,
    "Overhead Press": 6, "Sit-ups": 4, "Lunges": 6
  };

  const userWeight = 70;
  const durationHrs = 5 / 60;

  const summary = {};

  workouts.forEach(w => {
    const key = getKey(w.date);
    const met = METS[w.name] || 5;
    const kcal = met * userWeight * durationHrs;
    const volume = w.sets * w.reps * w.weight;

    if (!summary[key]) summary[key] = { volume: 0, kcal: 0, sessions: 0, exercises: new Set() };
    summary[key].volume += volume;
    summary[key].kcal += kcal;
    summary[key].sessions++;
    summary[key].exercises.add(w.name);
  });

  const sorted = Object.entries(summary).sort();

  return (
    <div className="tab-panel tab-panel--active fade-in">
      <h2>📑 {view === "week" ? "Weekly" : "Monthly"} Summary</h2>
      <div className="summary-buttons">
        <button
          className={`tab-toggle ${view === "week" ? "active-tab" : ""}`}
          onClick={() => setView("week")}
        >
          Weekly
        </button>
        <button
          className={`tab-toggle ${view === "month" ? "active-tab" : ""}`}
          onClick={() => setView("month")}
        >
          Monthly
        </button>
      </div>

      {sorted.length === 0 ? (
        <p>No data yet.</p>
      ) : (
        <div className="table-container">
          <table className="styled-table">
            <thead>
              <tr>
                <th>{view === "week" ? "Week Starting" : "Month"}</th>
                <th>Total Volume (kg)</th>
                <th>Calories Burned</th>
                <th>Sessions</th>
                <th>Unique Exercises</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map(([key, val]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{val.volume}</td>
                  <td>{Math.round(val.kcal)} kcal</td>
                  <td>{val.sessions}</td>
                  <td>{val.exercises.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

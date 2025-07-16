function WorkoutList({ workouts, onDelete }) {
  const [showMore, setShowMore] = React.useState(false);

  const METS = {
    "Squat": 7, "Deadlift": 8, "Bench Press": 6,
    "Pull-ups": 8, "Overhead Press": 6, "Sit-ups": 4,
    "Lunges": 6, "Bicep Curl": 3.5, "Tricep Extension": 3.5,
  };

  const userWeightKg = 70;
  const durationMin = 5;

  const getFatigueScore = (volume) => {
    const recent = workouts.slice(-5).map(w => w.sets * w.reps * w.weight);
    const avg = recent.length ? recent.reduce((a, b) => a + b, 0) / recent.length : 1;
    return volume / avg;
  };

  return (
    <div>
      <h2>Workout Log</h2>
      <button onClick={() => setShowMore(!showMore)} style={{ marginBottom: "10px" }}>
        {showMore ? "🔽 Hide Metrics" : "🔼 Show More"}
      </button>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {workouts.map((w, i) => {
          const volume = w.sets * w.reps * w.weight;
          const est1RM = Math.round(w.weight * (1 + w.reps / 30));
          const met = METS[w.name] || 5;
          const kcal = Math.round(met * userWeightKg * (durationMin / 60));
          const density = Math.round(volume / durationMin);
          const fatigue = getFatigueScore(volume).toFixed(2);

          return (
            <li key={i} style={{
              marginBottom: "18px",
              background: "#fff",
              padding: "12px 16px",
              borderRadius: "10px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
            }}>
              <div>
                <strong>{w.name}</strong> — {w.sets}×{w.reps} @ {w.weight}kg on {w.date}
                <span style={{ marginLeft: "8px", opacity: 0.6 }}>({w.muscle})</span>
              </div>

              <div style={{ marginTop: "6px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <span title="🔥 Calories Burned">🔥 {kcal} kcal</span>
                <span title="🧠 Estimated 1RM">🧠 {est1RM} kg</span>

                {showMore && (
                  <>
                    <span title="📈 Training Load (Volume)">📈 {volume}</span>
                    <span title="🧩 Density (kg/min)">🧩 {density}</span>
                    <span title="📉 Fatigue Score">📉 {fatigue}</span>
                    <span title="🟦 MET Score">🟦 {met}</span>
                  </>
                )}
              </div>

              <button onClick={() => onDelete(i)} style={{
                background: "#f44336",
                color: "#fff",
                border: "none",
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: "pointer",
                marginTop: "8px"
              }}>
                🗑️ Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

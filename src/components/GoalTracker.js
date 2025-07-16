function GoalTracker({ workouts }) {
  const [goals, setGoals] = React.useState(() => {
    return JSON.parse(localStorage.getItem("goals") || "[]");
  });

  const [targetArea, setTargetArea] = React.useState("");
  const [exercise, setExercise] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [reps, setReps] = React.useState("");
  const [deadline, setDeadline] = React.useState("");

  const areas = {
    Chest: ["Bench Press", "Incline Press", "Chest Fly"],
    Back: ["Deadlift", "Pull-Up", "Bent Row"],
    Legs: ["Squat", "Leg Press", "Lunge"],
    Shoulders: ["Overhead Press", "Lateral Raise"],
    Arms: ["Bicep Curl", "Tricep Pushdown"],
    Core: ["Plank", "Crunch", "Leg Raise"],
    FullBody: ["Clean & Jerk", "Burpee", "Snatch"]
  };

  const handleAddGoal = () => {
    if (!targetArea || !exercise || !weight || !reps || !deadline) {
      alert("Please fill all goal fields.");
      return;
    }
    const newGoal = { targetArea, exercise, weight: +weight, reps: +reps, deadline };
    const updated = [...goals, newGoal];
    setGoals(updated);
    localStorage.setItem("goals", JSON.stringify(updated));

    setTargetArea("");
    setExercise("");
    setWeight("");
    setReps("");
    setDeadline("");
  };

  const handleDelete = (i) => {
    const updated = goals.filter((_, idx) => idx !== i);
    setGoals(updated);
    localStorage.setItem("goals", JSON.stringify(updated));
  };

  const computeProgress = (goal) => {
    const matching = workouts.filter(w => w.exercise === goal.exercise);
    let bestSet = { weight: 0, reps: 0 };

    matching.forEach(w => {
      if (w.weight >= bestSet.weight && w.reps >= bestSet.reps) {
        bestSet = { weight: w.weight, reps: w.reps };
      }
    });

    const weightRatio = Math.min(bestSet.weight / goal.weight, 1);
    const repsRatio = Math.min(bestSet.reps / goal.reps, 1);
    return Math.round(((weightRatio + repsRatio) / 2) * 100);
  };

  const isPastDeadline = (deadline) => {
    const today = new Date();
    const due = new Date(deadline);
    return due < today;
  };

  return (
    <div style={{ background: "#fff", padding: "16px", borderRadius: "10px" }}>
      <h2>🎯 Set Workout Goals</h2>

      <div>
        <label>Target Area:</label>
        <select value={targetArea} onChange={(e) => {
          setTargetArea(e.target.value);
          setExercise("");
        }}>
          <option value="">Select</option>
          {Object.keys(areas).map((area) => (
            <option key={area}>{area}</option>
          ))}
        </select>

        <label>Exercise:</label>
        <select value={exercise} onChange={(e) => setExercise(e.target.value)}>
          <option value="">Select</option>
          {(areas[targetArea] || []).map((ex) => (
            <option key={ex}>{ex}</option>
          ))}
        </select>

        <input type="number" placeholder="Target Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} />
        <input type="number" placeholder="Target Reps" value={reps} onChange={(e) => setReps(e.target.value)} />
        <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
        <button onClick={handleAddGoal}>➕ Add Goal</button>
      </div>

      <hr />

      <h3>📋 Your Goals</h3>
      {goals.length === 0 ? (
        <p>No goals set yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {goals.map((goal, i) => {
            const progress = computeProgress(goal);
            const overdue = isPastDeadline(goal.deadline);
            const barColor =
              progress >= 100 ? "green" :
              overdue ? "red" :
              progress >= 75 ? "orange" : "#999";

            return (
              <li key={i} style={{ marginBottom: "20px" }}>
                <div><strong>{goal.exercise}</strong> ({goal.targetArea})</div>
                <div>🎯 {goal.weight} kg × {goal.reps} reps by 📅 {goal.deadline}</div>

                <div style={{
                  background: "#eee",
                  height: "12px",
                  borderRadius: "6px",
                  overflow: "hidden",
                  marginTop: "6px",
                  width: "100%"
                }}>
                  <div style={{
                    width: `${progress}%`,
                    background: barColor,
                    height: "100%"
                  }}></div>
                </div>

                <div style={{ fontSize: "12px", marginTop: "4px" }}>
                  {progress >= 100
                    ? "✅ Goal achieved!"
                    : overdue
                      ? "⚠️ Deadline passed!"
                      : `📊 Progress: ${progress}%`}
                </div>

                <button style={{ marginTop: "6px" }} onClick={() => handleDelete(i)}>🗑 Delete</button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function WorkoutForm({ onAdd }) {
  const [targetArea, setTargetArea] = React.useState("");
  const [name, setName] = React.useState("");
  const [sets, setSets] = React.useState("");
  const [reps, setReps] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [date, setDate] = React.useState("");

  const exerciseMap = {
    "💪 Chest": ["Bench Press", "Incline Press", "Chest Fly", "Push-ups"],
    "🦵 Legs": ["Squat", "Lunges", "Leg Press", "Bulgarian Split Squat", "Step-ups"],
    "🏋️ Back": ["Pull-ups", "Deadlift", "Barbell Row", "Lat Pulldown", "T-Bar Row"],
    "🏹 Shoulders": ["Overhead Press", "Lateral Raise", "Front Raise", "Arnold Press"],
    "🦾 Arms": ["Bicep Curl", "Tricep Extension", "Hammer Curl", "Skull Crushers"],
    "🧘 Core": ["Sit-ups", "Plank", "Russian Twist", "Leg Raises", "Bicycle Crunches"],
    "🦿 Glutes": ["Hip Thrusts", "Glute Bridge", "Cable Kickbacks", "Sumo Deadlift"],
    "🦴 Lower Back": ["Back Extensions", "Good Mornings", "Romanian Deadlift"],
    "🦶 Calves": ["Standing Calf Raise", "Seated Calf Raise", "Donkey Calf Raise"],
    "🫀 Cardio": ["Running", "Cycling", "Jump Rope", "Rowing Machine", "Burpees"],
    "🧠 Full Body": ["Clean and Press", "Snatch", "Thrusters", "Kettlebell Swings"]
  };

  const volume = sets && reps && weight ? sets * reps * weight : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !sets || !reps || !weight || !date || !targetArea) {
      alert("Fill all fields");
      return;
    }
    onAdd({
      name,
      sets: +sets,
      reps: +reps,
      weight: +weight,
      date,
      muscle: targetArea
    });
    setName(""); setSets(""); setReps(""); setWeight(""); setDate(""); setTargetArea("");
  };

  return (
    <form onSubmit={handleSubmit} style={{
      background: "#fff",
      padding: "16px",
      marginBottom: "24px",
      borderRadius: "12px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    }}>
      <fieldset style={{ border: "1px solid #ccc", padding: "12px", borderRadius: "8px" }}>
        <legend><strong>🏋️ Exercise Info</strong></legend>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "10px" }}>
          <div>
            <label>Target Area</label><br />
            <select value={targetArea} onChange={(e) => {
              setTargetArea(e.target.value);
              setName(""); // Reset exercise
            }}>
              <option value="">-- Select Area --</option>
              {Object.keys(exerciseMap).map((area) => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Exercise</label><br />
            <select value={name} onChange={(e) => setName(e.target.value)} disabled={!targetArea}>
              <option value="">-- Select Exercise --</option>
              {targetArea && exerciseMap[targetArea].map((ex) => (
                <option key={ex} value={ex}>{ex}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Sets</label><br />
            <input type="number" value={sets} onChange={(e) => setSets(e.target.value)} placeholder="e.g., 3" />
          </div>

          <div>
            <label>Reps</label><br />
            <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} placeholder="e.g., 10" />
          </div>

          <div>
            <label>Weight (kg)</label><br />
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g., 50" />
          </div>

          <div>
            <label>Date</label><br />
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
        </div>

        <div style={{ marginTop: "12px" }}>
          <button type="submit" style={{
            padding: "8px 16px",
            backgroundColor: "#4caf50",
            color: "white",
            border: "none",
            borderRadius: "6px"
          }}>✅ Add Workout</button>
        </div>
      </fieldset>

      {/* Live Volume Preview */}
      <div style={{
        marginTop: "16px",
        fontWeight: "bold",
        color: volume >= 1000 ? "green" : volume >= 500 ? "orange" : "red",
        background: "#f9f9f9",
        padding: "8px 12px",
        borderRadius: "8px"
      }}>
        🔢 Estimated Volume: {volume ? volume + " kg" : "Enter sets, reps & weight"}
      </div>
    </form>
  );
}

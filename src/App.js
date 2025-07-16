function App() {
  const { user, login, logout } = React.useContext(UserContext);
  const [tab, setTab] = React.useState("log");
  const [workouts, setWorkouts] = React.useState([]);

  // Load workouts for logged-in user
  React.useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(`workouts_${user}`);
      if (stored) {
        setWorkouts(JSON.parse(stored));
      }
    }
  }, [user]);

  // Save workouts to localStorage per user
  const saveWorkouts = (updated) => {
    setWorkouts(updated);
    localStorage.setItem(`workouts_${user}`, JSON.stringify(updated));
  };

  const addWorkout = (w) => saveWorkouts([...workouts, w]);
  const deleteWorkout = (i) => saveWorkouts(workouts.filter((_, idx) => idx !== i));

  if (!user) return <Login />;

  return (
    <div style={{ padding: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>🏋️ Fitness Tracker</h1>
        <div>
          <span style={{ marginRight: "12px" }}>👋 Welcome, <strong>{user}</strong></span>
          <button onClick={logout} style={{
            backgroundColor: "#f44336",
            color: "#fff",
            border: "none",
            padding: "6px 12px",
            borderRadius: "6px",
            cursor: "pointer"
          }}>🚪 Logout</button>
        </div>
      </div>

      <div style={{ marginTop: "10px", marginBottom: "20px" }}>
        <button onClick={() => setTab("log")}>🏠 Log</button>
        <button onClick={() => setTab("chart")}>📈 Chart</button>
        <button onClick={() => setTab("goals")}>🎯 Goals</button>
        <button onClick={() => setTab("1rm")}>📊 1RM Progress</button>
        <button onClick={() => setTab("records")}>📌 Records</button>
        <button onClick={() => setTab("summary")}>📑 Summary</button>
        <button onClick={() => setTab("settings")}>⚙️ Settings</button>
      </div>

      {tab === "log" && (
        <>
          <WorkoutForm onAdd={addWorkout} />
          <WorkoutList workouts={workouts} onDelete={deleteWorkout} />
        </>
      )}
      {tab === "chart" && <ProgressChart workouts={workouts} />}
      {tab === "goals" && <GoalTracker workouts={workouts} />}
      {tab === "1rm" && <OneRMChart workouts={workouts} />}
      {tab === "records" && <Records workouts={workouts} />}
      {tab === "summary" && <Summary workouts={workouts} />}
      {tab === "settings" && <Settings onClear={() => saveWorkouts([])} />}
    </div>
  );
}

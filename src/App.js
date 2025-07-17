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

  // Define tab list
  const tabs = [
    { id: "log", label: "🏠 Log" },
    { id: "chart", label: "📈 Chart" },
    { id: "goals", label: "🎯 Goals" },
    { id: "1rm", label: "📊 1RM Progress" },
    { id: "records", label: "📌 Records" },
    { id: "summary", label: "📑 Summary" },
    { id: "settings", label: "⚙️ Settings" },
  ];

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

      {/* Tabs */}
      <div className="tabs" role="tablist" aria-label="Fitness Tracker Tabs">
        {tabs.map((t) => (
          <button
            key={t.id}
            id={`tab-${t.id}`}
            role="tab"
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            className={`tab ${tab === t.id ? "tab--active" : ""}`}
            tabIndex={tab === t.id ? 0 : -1}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div
        id="panel-log"
        role="tabpanel"
        aria-labelledby="tab-log"
        hidden={tab !== "log"}
        className={`tab-panel ${tab === "log" ? "tab-panel--active" : ""}`}
      >
        <WorkoutForm onAdd={addWorkout} />
        <WorkoutList workouts={workouts} onDelete={deleteWorkout} />
      </div>

      <div
        id="panel-chart"
        role="tabpanel"
        aria-labelledby="tab-chart"
        hidden={tab !== "chart"}
        className={`tab-panel ${tab === "chart" ? "tab-panel--active" : ""}`}
      >
        <ProgressChart workouts={workouts} />
      </div>

      <div
        id="panel-goals"
        role="tabpanel"
        aria-labelledby="tab-goals"
        hidden={tab !== "goals"}
        className={`tab-panel ${tab === "goals" ? "tab-panel--active" : ""}`}
      >
        <GoalTracker workouts={workouts} />
      </div>

      <div
        id="panel-1rm"
        role="tabpanel"
        aria-labelledby="tab-1rm"
        hidden={tab !== "1rm"}
        className={`tab-panel ${tab === "1rm" ? "tab-panel--active" : ""}`}
      >
        <OneRMChart workouts={workouts} />
      </div>

      <div
        id="panel-records"
        role="tabpanel"
        aria-labelledby="tab-records"
        hidden={tab !== "records"}
        className={`tab-panel ${tab === "records" ? "tab-panel--active" : ""}`}
      >
        <Records workouts={workouts} />
      </div>

      <div
        id="panel-summary"
        role="tabpanel"
        aria-labelledby="tab-summary"
        hidden={tab !== "summary"}
        className={`tab-panel ${tab === "summary" ? "tab-panel--active" : ""}`}
      >
        <Summary workouts={workouts} />
      </div>

      <div
        id="panel-settings"
        role="tabpanel"
        aria-labelledby="tab-settings"
        hidden={tab !== "settings"}
        className={`tab-panel ${tab === "settings" ? "tab-panel--active" : ""}`}
      >
        <Settings onClear={() => saveWorkouts([])} />
      </div>
    </div>
  );
}

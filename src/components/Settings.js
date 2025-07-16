function Settings({ onClear }) {
  const [unit, setUnit] = React.useState("kg");

  const toggleUnit = () => {
    const newUnit = unit === "kg" ? "lbs" : "kg";
    setUnit(newUnit);
    alert(`Unit changed to ${newUnit} (⚠️ visual only, data unchanged)`);
  };

  const confirmClear = () => {
    if (window.confirm("Clear all workout data?")) {
      onClear();
      alert("All data cleared!");
    }
  };

  return (
    <div>
      <h2>⚙️ Settings</h2>
      <div>
        <button onClick={toggleUnit}>Toggle Unit (Now: {unit})</button>
      </div>
      <br />
      <div>
        <button onClick={confirmClear} style={{ backgroundColor: "crimson", color: "white" }}>
          Clear All Data
        </button>
      </div>
    </div>
  );
}

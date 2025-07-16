function ProgressChart({ workouts }) {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");

    const byDate = {};
    workouts.forEach(w => {
      if (!byDate[w.date]) byDate[w.date] = 0;
      byDate[w.date] += w.sets * w.reps * w.weight;
    });

    const labels = Object.keys(byDate).sort();
    const data = labels.map(d => byDate[d]);

    if (ProgressChart.chart) ProgressChart.chart.destroy();

    ProgressChart.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Volume (kg)',
          data,
          backgroundColor: '#4caf50'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: 'Workout Volume by Date' }
        }
      }
    });
  }, [workouts]);

  return (
    <div>
      <h2>Progress Chart</h2>
      <canvas ref={canvasRef} height="300"></canvas>
    </div>
  );
}

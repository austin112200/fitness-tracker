function OneRMChart({ workouts }) {
  const chartRef = React.useRef(null);

  React.useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");

    // Destroy old chart if exists
    if (OneRMChart.chart) {
      OneRMChart.chart.destroy();
    }

    // Organize 1RM data per exercise per date
    const records = {};
    workouts.forEach(w => {
      const est1RM = Math.round(w.weight * (1 + w.reps / 30));
      const date = w.date;
      const ex = w.name;

      if (!records[ex]) records[ex] = {};
      if (!records[ex][date] || est1RM > records[ex][date]) {
        records[ex][date] = est1RM;
      }
    });

    const allDates = [...new Set(workouts.map(w => w.date))].sort();
    const exercises = Object.keys(records);

    const datasets = exercises.map(name => ({
      label: name,
      data: allDates.map(d => records[name]?.[d] || null),
      borderColor: getColor(name),
      tension: 0.3,
      fill: false,
      spanGaps: true
    }));

    OneRMChart.chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: allDates,
        datasets
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "📊 Estimated 1RM Over Time"
          },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.dataset.label}: ${ctx.formattedValue} kg`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: "Estimated 1RM (kg)" }
          },
          x: {
            title: { display: true, text: "Date" }
          }
        }
      }
    });
  }, [workouts]);

  const getColor = (key) => {
    const hash = [...key].reduce((a, c) => a + c.charCodeAt(0), 0);
    return `hsl(${hash % 360}, 70%, 50%)`;
  };

  return (
    <div>
      <h2>📈 One-Rep Max Progress</h2>
      <canvas ref={chartRef} height="300"></canvas>
    </div>
  );
}

import { CChart } from "@coreui/react-chartjs";

export default function BarChart() {
  return (
    <div className="chart">
      <CChart
        type="bar"
        data={{
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
          ],
          datasets: [
            {
              label: "Ventas",
              backgroundColor: "#277D9C",
              data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
            },
          ],
        }}
        labels="months"
        options={{
          plugins: {
            legend: {
              labels: {
                color: "black",
              },
            },
          },
          scales: {
            x: {
              grid: {
                color: "black",
              },
              ticks: {
                color: "#277D9C",
              },
            },
            y: {
              grid: {
                color: "black",
              },
              ticks: {
                color: "#277D9C",
              },
            },
          },
        }}
      />
    </div>
  );
}

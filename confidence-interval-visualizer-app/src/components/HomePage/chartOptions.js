export const options = {
  maintainAspectRatio: false,
  legend: {
    position: "bottom",
    labels: {
      fontColor: "rgb(220, 207, 236)",
      fontSize: 14,
    },
  },
  scales: {
    yAxes: [
      {
        ticks: {
          display: false,
          beginAtZero: true,
        },
        gridLines: {
          display: false,
        },
      },
    ],
    xAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          display: true,
          fontColor: "rgb(220, 207, 236)",
          beginAtZero: false,
        },
      },
    ],
  },
};

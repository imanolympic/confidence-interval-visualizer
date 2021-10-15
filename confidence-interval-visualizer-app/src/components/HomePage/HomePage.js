import React, { useState } from "react";
import { Scatter } from "react-chartjs";
import IntervalTypeToggleButton from "./IntervalTypeToggleButton/IntervalTypeToggleButton";
import HomePageStyle from "./HomePage.module.scss";

const HomePage = () => {
  const [sampleSize, setSampleSize] = useState(10);
  const [confidenceLevel, setConfidenceLevel] = useState(0.95);
  const [sampleParameter, setSampleParameter] = useState(0.0);
  const [intervalType, setIntervalType] = useState("proportions");
  const [datasets, setDatasets] = useState([]);

  const randColor = () => {
    const r = Math.floor(Math.random() * (255 + 1));
    const g = Math.floor(Math.random() * (255 + 1));
    const b = Math.floor(Math.random() * (255 + 1));

    return `${r}, ${g}, ${b}`;
  };

  const qnorm = (p) => {
    p = parseFloat(p);
    var split = 0.42;

    var a0 = 2.50662823884;
    var a1 = -18.61500062529;
    var a2 = 41.39119773534;
    var a3 = -25.44106049637;
    var b1 = -8.4735109309;
    var b2 = 23.08336743743;
    var b3 = -21.06224101826;
    var b4 = 3.13082909833;
    var c0 = -2.78718931138;
    var c1 = -2.29796479134;
    var c2 = 4.85014127135;
    var c3 = 2.32121276858;
    var d1 = 3.54388924762;
    var d2 = 1.63706781897;

    var q = p - 0.5;

    var r, ppnd;

    if (Math.abs(q) <= split) {
      r = q * q;
      ppnd =
        (q * (((a3 * r + a2) * r + a1) * r + a0)) /
        ((((b4 * r + b3) * r + b2) * r + b1) * r + 1);
    } else {
      r = p;
      if (q > 0) r = 1 - p;
      if (r > 0) {
        r = Math.sqrt(-Math.log(r));
        ppnd = (((c3 * r + c2) * r + c1) * r + c0) / ((d2 * r + d1) * r + 1);
        if (q < 0) ppnd = -ppnd;
      } else {
        ppnd = 0;
      }
    }

    return ppnd;
  };

  const getStandardError = (sampleParameter, sampleSize) => {
    var stdError;

    if (intervalType === "proportions") {
      stdError = Math.sqrt(
        (sampleParameter * (1 - sampleParameter)) / sampleSize
      );
    } else {
      stdError = 0;
    }

    return stdError;
  };

  const getConfidenceScore = (confidenceLevel) => {
    const alpha = 1 - confidenceLevel;

    return qnorm(1 - alpha / 2);
  };

  const getNewDataset = (sampleParameter, confidenceScore, stdError) => {
    const letfBound = sampleParameter - confidenceScore * stdError;
    const rightBound = sampleParameter + confidenceScore * stdError;

    return {
      label: "Graph",
      data: [
        { x: sampleParameter, y: 0 },
        { x: rightBound, y: 0 },
        { x: letfBound, y: 0 },
      ],
      backgroundColor: `rgb(${randColor()})`,
      pointStyle: "triangle",
      radius: 10,
    };
  };

  const options = {
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

  const data = {
    datasets: datasets,
  };

  return (
    <div class={HomePageStyle.container}>
      <h1 class={HomePageStyle.title}> Confidence Interval Visualizer </h1>
      <form class={HomePageStyle.form}>
        <IntervalTypeToggleButton
          type={intervalType}
          setType={setIntervalType}
        />
        <div class={HomePageStyle.form_sampleSize}>
          <h1 class={HomePageStyle.form_sampleSize_heading}>Sample Size (n)</h1>
          <input
            class={HomePageStyle.form_sampleSize_input}
            type="number"
            step="1"
            placeholder={sampleSize}
            onChange={(e) => {
              setSampleSize(e.target.value);
            }}
          ></input>
        </div>
        <div class={HomePageStyle.form_confidenceLevel}>
          <h1 class={HomePageStyle.form_confidenceLevel_heading}>
            Confidence Level
          </h1>
          <input
            class={HomePageStyle.form_confidenceLevel_input}
            type="number"
            step="0.01"
            placeholder={confidenceLevel}
            onChange={(e) => {
              setConfidenceLevel(e.target.value);
            }}
          ></input>
        </div>
        <div class={HomePageStyle.form_sampleParameter}>
          <h1 class={HomePageStyle.form_sampleParameter_heading}>
            Sample Parameter
          </h1>
          <input
            class={HomePageStyle.form_sampleParameter_input}
            type="number"
            step="0.01"
            min="0"
            oninput="this.value = Math.abs(this.value)"
            placeholder={sampleParameter}
            onChange={(e) => {
              setSampleParameter(e.target.value);
            }}
          ></input>
        </div>
        <button
          class={HomePageStyle.form_submitButton}
          onClick={(e) => {
            e.preventDefault();

            const stdError = getStandardError(sampleParameter, sampleSize);
            const confidenceScore = getConfidenceScore(confidenceLevel);

            setDatasets([
              ...datasets,
              getNewDataset(
                parseFloat(sampleParameter),
                confidenceScore,
                stdError
              ),
            ]);
          }}
        >
          Create Interval
        </button>
      </form>

      <div class={HomePageStyle.chart}>
        <Scatter
          class={HomePageStyle.chart_scatter}
          data={data}
          options={options}
        />
      </div>
    </div>
  );
};

export default HomePage;

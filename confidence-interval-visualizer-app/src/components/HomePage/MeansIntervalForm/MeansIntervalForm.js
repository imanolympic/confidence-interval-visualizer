import React, { useState } from "react";
import MeansIntervalFormStyle from "./MeansIntervalForm.module.scss";

const MeansIntervalForm = ({ datasets, setDatasets }) => {
  const [sampleMean, setSampleMean] = useState(0.0);
  const [sampleStandardDeviation, setSampleStandardDeviation] = useState(0.0);
  const [sampleSize, setSampleSize] = useState(10);
  const [confidenceLevel, setConfidenceLevel] = useState(0.95);

  const libR = require("lib-r-math.js");
  const { StudentT } = libR;
  const { qt } = StudentT();

  const getStandardError = (sampleStandardDeviation, sampleSize) => {
    return sampleStandardDeviation / Math.sqrt(sampleSize);
  };

  const getConfidenceScore = (confidenceLevel, sampleSize) => {
    const alpha = 1 - confidenceLevel;
    const p = alpha / 2;
    const df = sampleSize - 1;
    return qt(1 - p, df);
  };

  const randColor = () => {
    const r = Math.floor(Math.random() * (255 + 1));
    const g = Math.floor(Math.random() * (255 + 1));
    const b = Math.floor(Math.random() * (255 + 1));

    return `${r}, ${g}, ${b}`;
  };

  const getNewDataset = (sampleMean, confidenceScore, stdError) => {
    const letfBound = sampleMean - confidenceScore * stdError;
    const rightBound = sampleMean + confidenceScore * stdError;

    console.log(rightBound);

    return {
      label: "Graph",
      data: [
        { x: sampleMean, y: 0 },
        { x: rightBound, y: 0 },
        { x: letfBound, y: 0 },
      ],
      backgroundColor: `rgb(${randColor()})`,
      pointStyle: "triangle",
      radius: 10,
    };
  };

  return (
    <>
      <form class={MeansIntervalFormStyle.form}>
        <div class={MeansIntervalFormStyle.form_sampleSize}>
          <div class={MeansIntervalFormStyle.form_sampleParameter}>
            <h1 class={MeansIntervalFormStyle.form_sampleParameter_heading}>
              Sample Parameter
            </h1>
            <input
              class={MeansIntervalFormStyle.form_sampleParameter_input}
              type="number"
              step="0.01"
              min="0"
              placeholder={sampleMean}
              onChange={(e) => {
                e.target.value = Math.abs(e.target.value);
                setSampleMean(e.target.value);
              }}
            ></input>
          </div>
          <div class={MeansIntervalFormStyle.form_sampleStandardDeviation}>
            <h1
              class={
                MeansIntervalFormStyle.form_sampleStandardDeviation_heading
              }
            >
              Sample Standard Deviation
            </h1>
            <input
              class={MeansIntervalFormStyle.form_sampleStandardDeviation_input}
              type="number"
              step="0.01"
              min="0"
              placeholder={sampleStandardDeviation}
              onChange={(e) => {
                e.target.value =
                  e.target.value < 0
                    ? Math.abs(e.target.value)
                    : e.target.value;
                setSampleStandardDeviation(e.target.value);
              }}
            ></input>
          </div>
          <h1 class={MeansIntervalFormStyle.form_sampleSize_heading}>
            Sample Size (n)
          </h1>
          <input
            class={MeansIntervalFormStyle.form_sampleSize_input}
            type="number"
            step="1"
            placeholder={sampleSize}
            onChange={(e) => {
              setSampleSize(e.target.value);
            }}
          ></input>
        </div>
        <div class={MeansIntervalFormStyle.form_confidenceLevel}>
          <h1 class={MeansIntervalFormStyle.form_confidenceLevel_heading}>
            Confidence Level
          </h1>
          <input
            class={MeansIntervalFormStyle.form_confidenceLevel_input}
            type="number"
            step="0.01"
            placeholder={confidenceLevel}
            onChange={(e) => {
              e.target.value = Math.abs(e.target.value);
              setConfidenceLevel(e.target.value);
            }}
          ></input>
        </div>
        <button
          class={MeansIntervalFormStyle.form_submitButton}
          onClick={(e) => {
            e.preventDefault();

            const stdError = getStandardError(
              sampleStandardDeviation,
              sampleSize
            );
            console.log(stdError);

            const confidenceScore = getConfidenceScore(
              confidenceLevel,
              sampleSize
            );

            const newDataset = getNewDataset(
              parseFloat(sampleMean),
              parseFloat(confidenceScore),
              parseFloat(stdError)
            );
            console.log(confidenceScore);

            setDatasets([...datasets, newDataset]);
          }}
        >
          Create Interval
        </button>
      </form>
    </>
  );
};

export default MeansIntervalForm;

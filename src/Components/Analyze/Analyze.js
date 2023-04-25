import React, { useState } from "react";
import axios from "axios";

function SentimentAnalysis() {
  const [inputText, setInputText] = useState("");
  const [analysis, setAnalysis] = useState(null);

  const analyzeText = () => {
    axios
      .post("http://localhost:5000/predict", { text: inputText })
      .then((response) => {
        // console.log(response);
        setAnalysis(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          analyzeText();
        }}
      >
        <label>
          Enter some text to analyze:
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </label>
        <button type="submit">Analyze</button>
      </form>

      {analysis && (
        <div>
          <p>Sentiment category: {analysis.sentiment}</p>
          <p>Confidence score: {analysis.score}</p>
        </div>
      )}
    </div>
  );
}

export default SentimentAnalysis;

import { useState, useCallback } from "react";
import { Layout } from "./components/Layout";
import { ExpressionInput } from "./components/ExpressionInput";
import { Results } from "./components/Results";
import Calculation from "./logic/calculation";

export const App = () => {
  const [result, setResult] = useState("");
  const [stateHistory, setStateHistory] = useState([]);

  const deleteHistory = () => {
    setStateHistory([]);
  }

  const calculateResult = useCallback(
    (input) => {
      setResult((prevResult) => {
        // update stateHistory to save prevResult (only if input was valid)
        setStateHistory((prevStateHistory => {
          if(prevResult === "Wrong input!") return prevStateHistory;
          return [prevResult, ...prevStateHistory];
        }));
        // return calculation of current input
        let calculation = new Calculation(input);
        let currentResult = calculation.calculate();
        return currentResult ?  calculation.parseInput() + " = " + currentResult : "Wrong input!";
      });
    },
    [setResult]
  );

  return (
    <Layout>
      <ExpressionInput handleSubmit={calculateResult} />
      <Results result={result} history={stateHistory} deleteHistory={deleteHistory} />
    </Layout>
  );
};

import React from "react";
import Risk from "./Mains/Risks";
import MainIndex from "./Mains/Main";
import RiskInfo from "./Mains/Risks_info";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainIndex />} />
          <Route path="/risk" element={<Risk />} />
          <Route path="/riskinfo" element={<RiskInfo />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

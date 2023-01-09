import "./App.css";
import { useState } from "react";
import CSVReader from "react-csv-reader";
import Pairs from "./components/Pairs";
import PairsHeader from "./components/PairsHeader";

function App() {

  const [allPairsSorted, setAllPairsSorted] = useState([]);

  const tableHead = [
    "Employee ID #1",
    "Employee ID #2",
    "Project ID",
    "Days worked"
  ];

  const handleUploadedData = data => {
    const fileData = data.filter(el => el.length > 1);
    getAllPairs(fileData)
  }

  function getAllPairs(fileData) {
    let allPairs = [];
    if (fileData)
      fileData.forEach((el1) => {
        fileData.slice(fileData.indexOf(el1) + 1, fileData.length).forEach((el2) => {
          if (el1[0] !== el2[0]) {
            const startDate1 = new Date(el1[2]);
            const endDate1 = el1[3] === "NULL" ? new Date() : new Date(el1[3]);
            const startDate2 = new Date(el2[2]);
            const endDate2 = el2[3] === "NULL" ? new Date() : new Date(el2[3]);

            if (el1[1] === el2[1]) {
              if (startDate1 <= endDate2 && startDate2 <= endDate1) {
                const startPeriodTogether = startDate1 <= startDate2 ? startDate2 : startDate1;
                const endPeriodTogether = endDate1 <= endDate2 ? endDate1 : endDate2;
                if (endPeriodTogether >= startDate2) {
                  const timeDifference = Math.abs(endPeriodTogether - startPeriodTogether);
                  const daysTogether = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) + 1;
                  allPairs = [...allPairs, { id1: el1[0], id2: el2[0], projectId: el1[1], days: daysTogether }];
                  allPairs.sort((a, b) => b.days - a.days);
                }
              }
            }
          }
        });
      });
    setAllPairsSorted(allPairs);
  }

  return (
    <div className="container">
      <CSVReader
        keys={tableHead}
        onFileLoaded={handleUploadedData}
        label="Upload CSV File"
        class="csv-reader"
      />
      <table class="table">
        <PairsHeader dataHeader={tableHead} />
        <Pairs props={allPairsSorted} />
      </table>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import SearchField from "./components/SearchField/SearchField";
import GraphView from "./components/GraphView/GraphView";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";

function App() {
  const [kanjiInput, setKanjiInput] = useState<string>("");
  const [kanji, setKanji] = useState<undefined | KanjiInfo>();
  const [graph, setGraph] = useState<undefined | GraphMatrix>();

  // console.log(kanji);
  // console.log(graph);

  return (
    <>
      <CssBaseline />
      <div className="App">
        <Typography variant="h4" component="h1">
          Kanji Visualizer
        </Typography>
        <SearchField
          kanjiInput={kanjiInput}
          setKanjiInput={setKanjiInput}
          setKanji={setKanji}
          setGraph={setGraph}
        ></SearchField>
        <GraphView graphData={graph} setKanjiInput={setKanjiInput} />
      </div>
    </>
  );
}

export default App;

import React, { useState } from "react";
import Header from "./components/Header/Header";
import SearchField from "./components/SearchField/SearchField";
import GraphView from "./components/GraphView/GraphView";
import InfoView from "./components/InfoView/InfoView";
import { contentsWidth } from "./utils/variables";
import "./App.scss";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

function App() {
  const [kanjiInput, setKanjiInput] = useState<string>("");
  const [kanji, setKanji] = useState<undefined | KanjiInfo>();
  const [graph, setGraph] = useState<undefined | GraphMatrix>();
  const [loading, setLoading] = useState<boolean>(false);

  //console.log("Inputed kanji is:", kanjiInput);
  //console.log("Kanji inforamtion is:", kanji);
  //console.log("Kanji graph is:", graph);

  return (
    <>
      <CssBaseline />
      <div className="App">
        <Header />
        <Box
          sx={{
            display: "flex",
            width: `${contentsWidth * 100}%`,
            mb: "1rem",
          }}
        >
          <SearchField
            kanjiInput={kanjiInput}
            setLoading={setLoading}
            setKanjiInput={setKanjiInput}
            setKanji={setKanji}
            setGraph={setGraph}
          ></SearchField>
          <InfoView loading={loading} infoData={kanji} setKanji={setKanji} />
        </Box>
        <GraphView
          loading={loading}
          graphData={graph}
          setKanjiInput={setKanjiInput}
        />
      </div>
    </>
  );
}

export default App;

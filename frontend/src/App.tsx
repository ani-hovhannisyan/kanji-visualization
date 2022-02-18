import React, { useState } from "react";
import SearchField from "./components/SearchField/SearchField";
import GraphView from "./components/GraphView/GraphView";
import InfoView from "./components/InfoView/InfoView";

function App() {
  const [kanjiInput, setKanjiInput] = useState<string>("");
  const [kanji, setKanji] = useState<undefined | KanjiInfo>();
  const [graph, setGraph] = useState<undefined | GraphMatrix>();

   console.log("Inputed kanji is:", kanjiInput);
   console.log("Kanji inforamtion is:", kanji);
   console.log("Kanji graph is:", graph);

  return (
    <div className="App">
      <h1>Kanji Visualizer</h1>
      <SearchField
        kanjiInput={kanjiInput}
        setKanjiInput={setKanjiInput}
        setKanji={setKanji}
        setGraph={setGraph}
      ></SearchField>
      <GraphView graphData={graph} setKanjiInput={setKanjiInput} />
      <InfoView infoData={kanji} setKanji={setKanji} />
    </div>
  );
}

export default App;

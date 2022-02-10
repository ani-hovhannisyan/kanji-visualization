import React, { useState } from "react";
import SearchField from "./SearchField/SearchField";
import GraphView from "./GraphView/GraphView";

function App() {
  const [kanji, setKanji] = useState<undefined | KanjiInfo>();
  const [graph, setGraph] = useState<undefined | GraphMatrix>();

  console.log(kanji);
  console.log(graph);

  return (
    <div className="App">
      <h1>Kanji Visualizer</h1>
      <SearchField setKanji={setKanji} setGraph={setGraph}></SearchField>
      <GraphView graphData={graph} />
    </div>
  );
}

export default App;

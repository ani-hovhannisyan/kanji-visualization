import React, { useEffect, useState } from "react";
import SearchField from "./SearchField/SearchField";

export type kanjiInfo = {
  onyomi: string;
  kunyomi: string;
};

export type graphInfo = {
  graph: any;
};

function App() {
  const [kanji, setKanji] = useState<kanjiInfo>();
  const [graph, setGraph] = useState<graphInfo>();

  return (
    <div className="App">
      <h1>Kanji Visualizer</h1>
      <SearchField setKanji={setKanji} setGraph={setGraph}></SearchField>
    </div>
  );
}

export default App;

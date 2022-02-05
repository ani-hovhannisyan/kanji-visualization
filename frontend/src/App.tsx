import React, { useState } from "react";
import SearchField from "./SearchField/SearchField";

export type KanjiType = {
  onyomi: string;
  kunyomi: string;
};

//TODO: change correctly
export type GraphType = {
  mainNode: string;
  subNodes: string[];
};

function App() {
  const [kanji, setKanji] = useState<undefined | KanjiType>();
  const [graph, setGraph] = useState<undefined | GraphType>();
  console.log(kanji);
  console.log(graph);
  return (
    <div className="App">
      <h1>Kanji Visualizer</h1>
      <SearchField setKanji={setKanji} setGraph={setGraph}></SearchField>
    </div>
  );
}

export default App;

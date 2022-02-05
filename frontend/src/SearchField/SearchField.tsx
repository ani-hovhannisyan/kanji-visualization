import React, { useState } from "react";
import axios from "axios";
import { GraphType, KanjiType } from "../App";

type Props = {
  setKanji: React.Dispatch<React.SetStateAction<KanjiType | undefined>>;
  setGraph: React.Dispatch<React.SetStateAction<GraphType | undefined>>;
};

const regexp =
  /([\u{3005}\u{3007}\u{303b}\u{3400}-\u{9FFF}\u{F900}-\u{FAFF}\u{20000}-\u{2FFFF}][\u{E0100}-\u{E01EF}\u{FE00}-\u{FE02}]?)/mu;
const SearchField = (props: Props) => {
  const [kanjiInput, setKanjiInput] = useState<string>("");
  const [error, setError] = useState<string>("Fill form");

  const handleKanjiChange = (event: { target: { value: string } }) => {
    const input = event.target.value;
    if (typeof input != "string") {
      setError("Invalid Input");
    } else if (input.length !== 1) {
      setError("Only one character is allowed");
    } else if (!regexp.test(input)) {
      setError("Input Only Kanji");
    } else {
      setError("");
    }
    setKanjiInput(input);
  };

  const handleSubmit = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/kanji-visualize?kanji=${kanjiInput}`
      )
      .then((res) => {
        const { data, status } = res;
        console.log(status);
        props.setKanji(data.kanjiInfo);
        props.setGraph(data.graphMatrix);
      })
      .catch((error) => {
        console.log(error.response);
        setError(error.response.data.detail);
      });
  };

  return (
    <div>
      <h2>Input Kanji</h2>
      <div style={{ display: "flex" }}>
        <input type="text" value={kanjiInput} onChange={handleKanjiChange} />
        <button type="submit" onClick={handleSubmit} disabled={!!error}>
          提出{" "}
        </button>
      </div>
      <div>{error}</div>
    </div>
  );
};

export default SearchField;

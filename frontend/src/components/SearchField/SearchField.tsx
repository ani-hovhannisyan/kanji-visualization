import React, { useEffect, useState } from "react";
import axios from "axios";
import { isKanji } from "../../utils/functions";

type Props = {
  kanjiInput: string;
  setKanjiInput: React.Dispatch<React.SetStateAction<string>>;
  setKanji: React.Dispatch<React.SetStateAction<KanjiInfo | undefined>>;
  setGraph: React.Dispatch<React.SetStateAction<GraphMatrix | undefined>>;
};

const SearchField: React.VFC<Props> = (props) => {
  const [error, setError] = useState<string>("Fill form");

  const handleKanjiChange = (event: { target: { value: string } }) => {
    const input = event.target.value;

    props.setKanjiInput(input);
  };

  useEffect(() => {
    const input = props.kanjiInput;

    if (input.length === 0) {
      setError("Fill form");
    } else if (input.length !== 1) {
      setError("Only one character is allowed");
    } else if (typeof input != "string") {
      setError("Invalid Input");
    } else if (!isKanji(input)) {
      setError("Input Only Kanji");
    } else {
      setError("");
      getSearchResult();
    }

    function getSearchResult() {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/kanji-visualize?kanji=${props.kanjiInput}`
        )
        .then((res) => {
          const { data, status }: { data: ResponseData; status: number } = res;
          console.log(data, status);
          props.setKanji(data.info);
          if (data.nodes && data.links) {
            props.setGraph({ nodes: data.nodes, links: data.links });
          } else {
            setError("No graph data");
          }
        })
        .catch((error) => {
          console.log(error.response);
          setError(error.response.data.detail);
        });
    }
  }, [setError, props.kanjiInput, props.setKanji, props.setGraph]);

  return (
    <div>
      <h2>Input Kanji</h2>
      <div style={{ display: "flex" }}>
        <input
          type="text"
          value={props.kanjiInput}
          onChange={handleKanjiChange}
        />
      </div>
      <div>{error}</div>
    </div>
  );
};

export default SearchField;

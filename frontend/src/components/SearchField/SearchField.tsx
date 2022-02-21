import React, { useEffect, useState } from "react";
import axios from "axios";
import { isKanji } from "../../utils/functions";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

type Props = {
  kanjiInput: string;
  setKanjiInput: React.Dispatch<React.SetStateAction<string>>;
  setKanji: React.Dispatch<React.SetStateAction<KanjiInfo | undefined>>;
  setGraph: React.Dispatch<React.SetStateAction<GraphMatrix | undefined>>;
};

const SearchField: React.VFC<Props> = (props) => {
  const [error, setError] = useState<string>("");

  const handleKanjiChange = (event: { target: { value: string } }) => {
    const input = event.target.value;

    props.setKanjiInput(input);
  };

  useEffect(() => {
    const input = props.kanjiInput;

    if (input.length === 0) {
      setError("");
    } else if (input.length !== 1) {
      setError("Too long input. Please enter only one character.");
    } else if (typeof input != "string") {
      setError("Invalid input type. Please enter a kanji.");
    } else if (!isKanji(input)) {
      setError("Invalid input type. Please enter a kanji.");
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
    <Paper elevation={0} sx={{ width: "fit-content", padding: "1rem" }}>
      <div style={{ display: "flex" }}>
        <TextField
          type="text"
          error={!!error}
          placeholder="Search"
          helperText={
            !error && props.kanjiInput.length === 0
              ? "Please enter one kanji"
              : error
          }
          value={props.kanjiInput}
          variant="outlined"
          onChange={handleKanjiChange}
        />
      </div>
    </Paper>
  );
};

export default SearchField;

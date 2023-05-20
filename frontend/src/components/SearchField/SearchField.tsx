import React, { useEffect, useState } from "react";
import axios from "axios";
import { isKanji } from "../../utils/functions";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

type Props = {
  kanjiInput: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
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
      props.setLoading(true);

      axios
        .get(
          `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/kanji-visualize?kanji=${props.kanjiInput}`
        )
        .then((res) => {
          props.setLoading(false);

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
          props.setLoading(false);

          console.log(error.response);
          setError(error.response.data.detail);
        });
    }
  }, [setError, props.kanjiInput, props.setKanji, props.setGraph]);

  return (
    <Paper
      elevation={0}
      sx={{
        m: "1rem 2rem 0 0",
      }}
    >
      <TextField
        type="text"
        error={!!error}
        placeholder="Search"
        autoFocus
        helperText={
          !error && props.kanjiInput.length === 0
            ? "Please enter one kanji"
            : error
        }
        value={props.kanjiInput}
        variant="outlined"
        onChange={handleKanjiChange}
        InputProps={{
          startAdornment: <SearchIcon sx={{ marginRight: "14px" }} />,
        }}
      />
    </Paper>

//    <div className="kanji-search">
//      <h2>Input Kanji</h2>
//      <input
//        type="text"
//        value={props.kanjiInput}
//        onChange={handleKanjiChange}
//      />
//      <div className="error">{error}</div>
//    </div>

  );
};

export default SearchField;

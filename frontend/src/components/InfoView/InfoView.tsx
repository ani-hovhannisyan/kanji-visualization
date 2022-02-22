import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

interface Props {
  loading: boolean;
  infoData?: KanjiInfo;
  setKanji: React.Dispatch<React.SetStateAction<KanjiInfo | undefined>>;
}

const InfoView: React.VFC<Props> = (props) => {
  //console.log("In InfoView, received kanji info is:", info);

  const info = props.infoData;
  const lang = "English"; // Use this when other languages become supported

  const joinToStr = (arr: string[]) => arr.join().replace(",", ", ");

  const createData = (name: string, value: string) => {
    return { name, value };
  };

  const rows = [
    createData("Onyomi", info ? joinToStr(info.onyomi) : ""),
    createData("Kunyomi", info ? joinToStr(info?.kunyomi) : ""),
    createData(`Meaning in ${lang}`, info ? joinToStr(info?.meaning) : ""),
  ];

  const table = (
    <Table>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            hover
            key={row.name}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell align="right">{row.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <Paper
      className="kanji-info"
      elevation={2}
      sx={{ flexGrow: 1, padding: "1rem" }}
    >
      <Typography variant="h5" component="h2">
        The {info?.id} kanji Information
      </Typography>
      {table}
    </Paper>
  );
};

export default InfoView;

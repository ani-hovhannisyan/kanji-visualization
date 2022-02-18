import React from "react";

interface Props {
  infoData?: KanjiInfo;
  setKanji: React.Dispatch<React.SetStateAction<KanjiInfo | undefined>>;
}

const InfoView: React.VFC<Props> = (props) => {
  const info = props.infoData;
  console.log("In InfoView, received kanji info is:", info);

  if (info !== undefined) {
    return (
      <div className="info" style={{ backgroundColor: "#eee" }}>
        <h2>Info View</h2>
        <p> {info.id} </p>
        <p> {info.onyomi.join()} </p>
        <p> {info.kunyomi.join()} </p>
        <p> {info.meaning.join()} </p>
      </div>
    );
  } else {
    return (
      <div className="info">
        <h2>Kanji information</h2>
      </div>
    );
  }
};

export default InfoView;

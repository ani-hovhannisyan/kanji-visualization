import React from "react";

interface Props {
  infoData?: KanjiInfo;
  setKanji: React.Dispatch<React.SetStateAction<KanjiInfo | undefined>>;
}

const InfoView: React.VFC<Props> = (props) => {
  //console.log("In InfoView, received kanji info is:", info);

  const info = props.infoData;
  const lang = "English"; // Use this when other languages become supported
  // <h2>The {this.info ? info.id : 0} kanji Information</h2>
  return (
    <div className="kanji-info">
      <h2>The {info !== undefined ? info.id : ", "} kanji Information</h2>
      <h3>Onyomi</h3>
      <p> {info !== undefined ? info.onyomi.join(", ") : ""} </p>
      <h3>Kunyomi</h3>
      <p> {info !== undefined ? info.kunyomi.join(", ") : ""} </p>
      <h3>Meaning in {lang}</h3>
      <p> {info !== undefined ? info.meaning.join(", ") : ""} </p>
    </div>
  );
};

export default InfoView;

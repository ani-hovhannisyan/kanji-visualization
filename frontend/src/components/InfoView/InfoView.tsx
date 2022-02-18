import React from "react";

interface Props {
  infoData?: KanjiInfo;
  setKanji: React.Dispatch<React.SetStateAction<KanjiInfo | undefined>>;
}

const InfoView: React.VFC<Props> = (props) => {

  return (
    <div className="info">
      <h2>Kanji information</h2>
      <p className="info" style={{backgroundColor: "#ccc" }}>
        {props.infoData}
      </p>
    </div>
  );


};

export default InfoView;

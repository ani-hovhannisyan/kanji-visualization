import React from "react";
import ForceGraph3D from "react-force-graph-3d";

const GraphView: React.VFC = (props) => {
  return (
    <ForceGraph3D
      height={500}
      // graphData={data}
      showNavInfo={false}
      enableNodeDrag={false}
    />
  );
};

export default GraphView;

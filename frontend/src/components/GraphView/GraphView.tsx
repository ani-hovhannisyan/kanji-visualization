import React from "react";
import ForceGraph2D, { NodeObject } from "react-force-graph-2d";

interface Props {
  graphData?: GraphMatrix;
  setKanjiInput: React.Dispatch<React.SetStateAction<string>>;
}

const GraphView: React.VFC<Props> = (props) => {
  const handleNodeClick = (node: NodeObject) => {
    const value = node.id?.toString();

    // Validate the input and draw a new result in the graph
    props.setKanjiInput(value || "");
  };

  return (
    <ForceGraph2D
      height={window.innerHeight * 0.6}
      graphData={props.graphData}
      onNodeClick={handleNodeClick}
      linkDirectionalArrowLength={8}
      linkDirectionalArrowRelPos={0.8}
      nodeCanvasObject={(node: ExtendedNodeObject, ctx, globalScale) => {
        if (!node.id) {
          return;
        }

        if (node.isMain === "true") {
          node.x = 0;
          node.y = 0;
        }

        const size = 20 / globalScale;
        const mag = 1;
        const width = size * node.id.toString().length * mag;
        const height = size * mag;
        const x = node.x || 0;
        const y = node.y || 0;

        ctx.fillStyle = node.isMain ? "#2196f3" : "#3d5afe";
        ctx.beginPath();
        ctx.ellipse(x, y, width, height, 0, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();

        const label = node.id as string;
        const fontSize = size;

        ctx.font = `${fontSize}px Sans-Serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        ctx.fillText(label, x, y);
      }}
    />
  );
};

export default GraphView;

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
      height={400}
      ref={ref}
      graphData={props.graphData}
      onNodeClick={handleNodeClick}
      linkDirectionalArrowLength={8}
      linkDirectionalArrowRelPos={0.8}
      nodeCanvasObject={(node: ExtendedNodeObject, ctx, globalScale) => {
        if (node.isMain === "true") {
          node.x = 0;
          node.y = 0;
        }

        const size = 20 / globalScale;

        ctx.fillStyle = node.isMain ? "#2196f3" : "#3d5afe";
        ctx.beginPath();
        ctx.arc(node.x || 0, node.y || 0, size, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();

        const label = node.id as string;
        const fontSize = size;

        ctx.font = `${fontSize}px Sans-Serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        ctx.fillText(label, node.x || 0, node.y || 0);
      }}
    />
  );
};

export default GraphView;

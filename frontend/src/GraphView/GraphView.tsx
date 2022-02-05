import React, { useRef } from "react";
import ForceGraph2D, { NodeObject } from "react-force-graph-2d";

interface Props {
  graphData: any;
}

const GraphView: React.VFC<Props> = (props) => {
  const ref = useRef();

  const handleNodeClick = (node: NodeObject) => {
    console.log("Node clicked: ", node.id);
  };

  return (
    <ForceGraph2D
      height={400}
      ref={ref}
      graphData={props.graphData}
      onNodeClick={handleNodeClick}
      linkDirectionalArrowLength={8}
      linkDirectionalArrowRelPos={0.8}
      nodeCanvasObject={(node: any, ctx, globalScale) => {
        if (node.isMain) {
          node.x = 0;
          node.y = 0;
        }

        const size = 20 / globalScale;

        ctx.fillStyle = node.isMain ? "#2196f3" : "#3d5afe";
        ctx.beginPath();
        ctx.arc(node.x, node.y, size, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();

        const label = node.id;
        const fontSize = size;

        ctx.font = `${fontSize}px Sans-Serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        ctx.fillText(label, node.x, node.y);
      }}
    />
  );
};

export default GraphView;

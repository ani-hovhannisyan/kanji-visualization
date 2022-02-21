import React, { useState, useEffect } from "react";
import ForceGraph2D, { NodeObject } from "react-force-graph-2d";
import { useWindowSize } from "react-use";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

interface Props {
  graphData?: GraphMatrix;
  setKanjiInput: React.Dispatch<React.SetStateAction<string>>;
}

const GraphView: React.VFC<Props> = (props) => {
  const { width, height } = useWindowSize();
  const [graphSize, setGraphSize] = useState<{ width: number; height: number }>(
    { width, height }
  );

  useEffect(() => {
    console.log(graphSize);

    const graphViewTop =
      document.querySelector("#graph-view")?.getBoundingClientRect().top || 0;

    const graphViewH2Top =
      document.querySelector("#graph-view-h2")?.getBoundingClientRect().top ||
      0;

    const top =
      graphViewH2Top +
      (graphViewH2Top - graphViewTop) * 2 +
      (document.querySelector("#graph-view-h2")?.clientHeight || 0);
    setGraphSize({ width: width * 0.8, height: window.innerHeight - top });
  }, [width, height]);

  const handleNodeClick = (node: NodeObject) => {
    const value = node.id?.toString();

    // Validate the input and draw a new result in the graph
    props.setKanjiInput(value || "");
  };

  return (
    <Paper
      id="graph-view"
      elevation={2}
      sx={{ width: "fit-content", padding: "1rem" }}
    >
      <Typography id="graph-view-h2" variant="h5" component="h2">
        Graph
      </Typography>
      <ForceGraph2D
        width={graphSize.width}
        height={graphSize.height}
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
    </Paper>
  );
};

export default GraphView;

import React, { useState, useEffect, useRef } from "react";
import ForceGraph2D, { NodeObject } from "react-force-graph-2d";
import { useWindowSize } from "react-use";
import { contentsWidth } from "../../utils/variables";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

interface Props {
  loading: boolean;
  graphData?: GraphMatrix;
  setKanjiInput: React.Dispatch<React.SetStateAction<string>>;
}

const GraphView: React.VFC<Props> = (props) => {
  const ref = useRef();
  const { width, height } = useWindowSize();
  const [graphSize, setGraphSize] = useState<{ width: number; height: number }>(
    { width, height }
  );

  const padding = 8;

  useEffect(() => {
    const graphViewTop =
      document.querySelector("#graph-view")?.getBoundingClientRect().top || 0;

    const graphViewH2Top =
      document.querySelector("#graph-view-title")?.getBoundingClientRect()
        .top || 0;

    const top =
      graphViewH2Top +
      (graphViewH2Top - graphViewTop) * 2 +
      (document.querySelector("#graph-view-title")?.clientHeight || 0);
    setGraphSize({
      width: width * contentsWidth - padding * 2,
      height: window.innerHeight - top,
    });
  }, [width, height, props.graphData]);

  useEffect(() => {
    if (ref.current) (ref.current as any).zoomToFit(400);
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
      sx={{ width: `${contentsWidth * 100}%`, padding: `${padding}px` }}
    >
      <Typography id="graph-view-title" variant="h5" component="h2">
        Graph
      </Typography>
      {props.loading ? (
        <Box
          width={graphSize.width}
          height={graphSize.height}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <ForceGraph2D
          ref={ref}
          width={graphSize.width}
          height={graphSize.height}
          graphData={props.graphData}
          onNodeClick={handleNodeClick}
          linkDirectionalArrowLength={8}
          linkDirectionalArrowRelPos={0.8}
          cooldownTicks={100}
          onEngineStop={() => (ref.current as any).zoomToFit(400)}
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
      )}
    </Paper>
  );
};

export default GraphView;

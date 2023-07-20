import express from "express";
import ffmpeg from "fluent-ffmpeg";

const app = express();
app.use(express.json());

app.post("/process-video", (req, res) => {
  // Get the path of input video from the request body
  const inputFilePath = req.body.inputFilePath;
  const outputFilePath = req.body.outputFilePath;

  if (!inputFilePath || !outputFilePath) {
    res.status(400).send("Bad request: Missing File Path");
  }

  ffmpeg(inputFilePath) // async
    .outputOptions("-vf", "scale= -1:360") // conver the video to 360P
    .on("end", () => {
      res.status(200).send("Video processing started.");
    })
    .on("error", (err) => {
      console.log("An error occur");
      res.status(500).send(`Internal Serval Error: ${err.message}`);
    })
    .save(outputFilePath);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

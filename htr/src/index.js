import "./styles.css";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import personOffice from "./toby-office.jpg";

const run = async () => {
  try {
    const image = document.getElementById("image");
    image.crossOrigin = "anonymous";
    image.src = personOffice;

    const model = await cocoSsd.load({ base: "mobilenet_v2" });

    const predictions = await model.detect(image);

    console.log(predictions);

    const c = document.getElementById("canvas");
    c.width = image.width;
    c.height = image.height;
    const context = c.getContext("2d");
    context.drawImage(image, 0, 0);
    context.font = "16px Arial";

    console.log("number of detections: ", predictions.length);
    for (let i = 0; i < predictions.length; i++) {
      context.beginPath();
      context.rect(...predictions[i].bbox);
      context.lineWidth = 6;
      context.strokeStyle = "white";
      context.fillStyle = "white";
      context.stroke();
      context.fillText(
        predictions[i].score.toFixed(3) + " " + predictions[i].class,
        predictions[i].bbox[0],
        predictions[i].bbox[1] > 10 ? predictions[i].bbox[1] - 5 : 10
      );
    }
  } catch (e) {
    console.log(e.message);
  }
};

if (document.readyState !== "loading") {
  run();
} else {
  document.addEventListener("DOMContentLoaded", run);
}

import {
  LightCommandMessageInterface,
  sendLightControlCommand,
} from "../lightControl";

const base_uri = "http://127.0.0.1:5001/";
const lightcluster_uri = base_uri + "api/predict-light";

export function optimiseLight(lightLevel: number) {
  const outputIntensity = fetch(`${lightcluster_uri}?light=${lightLevel}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((cluster_label) => {
      cluster_label = cluster_label.replace(/"/g, "").trim();
      console.log("Cluster Label: " + cluster_label);

      const message: LightCommandMessageInterface = {
        command: "intensity",
        intensity: 0.5,
      };
      let output = 0.5;

      if (cluster_label === "1") {
        message.intensity = 1.0;
        output = 1.0;
      }
      if (cluster_label === "2") {
        message.intensity = 0.2;
        output = 2.0;
      }
      sendLightControlCommand(message);
      return output;
    })
    .catch((error) => {
      console.error("Error:", error);
      return 0.5;
    });

  return outputIntensity;
}

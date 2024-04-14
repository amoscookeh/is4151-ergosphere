import React, { useRef, useEffect, useState } from "react";
import { Camera } from "@mediapipe/camera_utils";
import { Pose, POSE_CONNECTIONS, POSE_LANDMARKS } from "@mediapipe/pose";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { Box, Text, useColorModeValue, Flex, Icon } from "@chakra-ui/react";
import { MdThumbUp, MdThumbDown } from "react-icons/md";

function calculateAngle(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number
) {
  const angle1 = Math.atan2(y1 - y2, x1 - x2);
  const angle2 = Math.atan2(y3 - y2, x3 - x2);
  return Math.abs((angle1 - angle2) * (180 / Math.PI));
}

const Posture = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGoodPosture, setIsGoodPosture] = useState(true);

  useEffect(() => {
    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement?.getContext("2d");

    const pose = new Pose({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
      },
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      smoothSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    pose.onResults((results) => {
      if (canvasCtx && canvasElement) {
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.drawImage(
          results.image,
          0,
          0,
          canvasElement.width,
          canvasElement.height
        );

        if (results.poseLandmarks) {
          const lm = results.poseLandmarks;
          const lmPose = POSE_LANDMARKS;

          // Extract landmark positions
          const l_shldr = lm[lmPose.LEFT_SHOULDER];
          const l_ear = lm[lmPose.LEFT_EAR];
          const l_hip = lm[lmPose.LEFT_HIP];

          // Calculate angles
          const neckAngle = calculateAngle(
            l_shldr.x * canvasElement.width,
            l_shldr.y * canvasElement.height,
            l_ear.x * canvasElement.width,
            l_ear.y * canvasElement.height,
            l_shldr.x * canvasElement.width,
            l_shldr.y * canvasElement.height - 100
          );

          const torsoAngle = calculateAngle(
            l_hip.x * canvasElement.width,
            l_hip.y * canvasElement.height,
            l_shldr.x * canvasElement.width,
            l_shldr.y * canvasElement.height,
            l_hip.x * canvasElement.width,
            l_hip.y * canvasElement.height - 100
          );

          const isGoodPosture = neckAngle < 40 && torsoAngle < 10;
          setIsGoodPosture(isGoodPosture);

          // Visual feedback
          drawConnectors(canvasCtx, lm, POSE_CONNECTIONS, {
            color: isGoodPosture ? "green" : "red",
            lineWidth: 4,
          });
          drawLandmarks(canvasCtx, lm, { color: "white", radius: 2 });
        }
        canvasCtx.restore();
      }
    });

    if (videoElement) {
      const camera = new Camera(videoElement, {
        onFrame: async () => {
          await pose.send({ image: videoElement });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }, []);

  return (
    <Flex direction="column" align="center" gap="4">
      <Box position="relative" width="640px" height="480px">
        <video ref={videoRef} style={{ display: "none" }} playsInline />
        <canvas ref={canvasRef} width="640" height="480" />
      </Box>
      <Flex align="center" justify="center" p={4}>
        <Icon
          as={isGoodPosture ? MdThumbUp : MdThumbDown}
          w={8}
          h={8}
          color={isGoodPosture ? "green.500" : "red.500"}
        />
        <Text
          fontSize="xl"
          ml={2}
          color={useColorModeValue("gray.800", "white")}
        >
          {isGoodPosture ? "Good Posture" : "Please Adjust Posture"}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Posture;

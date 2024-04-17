/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from "react";
import { Pose, POSE_CONNECTIONS, POSE_LANDMARKS } from "@mediapipe/pose";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import {
  Box,
  Text,
  useColorModeValue,
  Flex,
  Icon,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { MdThumbUp, MdThumbDown } from "react-icons/md";
import { useAuth } from "../context/authContext";
import { insertPostureData } from "../services/api/postureData";

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
  const videoRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGoodPosture, setIsGoodPosture] = useState(true);
  const { deviceId } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const wsUrl = `ws://localhost:3001/videofeed?device_id=${deviceId}`;
  console.log("Connecting to: " + wsUrl);

  useEffect(() => {
    const ws = new WebSocket(wsUrl);
    const pose = new Pose({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement?.getContext("2d");

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      smoothSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    ws.onmessage = async (event) => {
      if (event.data instanceof Blob) {
        const text = await event.data.text();
        try {
          const data = JSON.parse(text);
          if (data.frame) {
            const byteArray = new Uint8Array(
              data.frame.match(/[\da-f]{2}/gi).map((h: any) => parseInt(h, 16))
            );
            const blob = new Blob([byteArray.buffer], { type: "image/jpeg" });
            const url = URL.createObjectURL(blob);
            if (videoRef.current) {
              videoRef.current.onload = () => {
                if (videoRef.current) {
                  pose
                    .send({ image: videoRef.current })
                    .then(() => {
                      URL.revokeObjectURL(url);
                    })
                    .catch(console.error);
                }
              };
              videoRef.current.src = url;
            }
          }
        } catch (err) {
          console.error("Error parsing JSON or handling frame data:", err);
        }
      }
    };

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

          if (isGoodPosture) {
            insertPostureData({
              device_id: deviceId,
              time: new Date().toISOString(),
              postureScore: 10,
            });
          } else {
            insertPostureData({
              device_id: deviceId,
              time: new Date().toISOString(),
              postureScore: 0,
            });
          }

          // Visual feedback
          drawConnectors(canvasCtx, lm, POSE_CONNECTIONS, {
            color: isGoodPosture ? "green" : "red",
            lineWidth: 4,
          });
          drawLandmarks(canvasCtx, lm, { color: "white", radius: 2 });
          setIsLoading(false);
        }
        canvasCtx.restore();
      }
    });
  }, []);

  return (
    <Flex direction="column" align="center" gap="4">
      <Box display={isLoading ? "none" : "block"}>
        <Box position="relative" width="640px" height="480px">
          <img src={""} ref={videoRef} style={{ display: "none" }} />
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
      </Box>
      {isLoading && (
        <Center flexDirection="column" height="480px">
          <Spinner size="xl" />
          <Text mt={3}>Loading camera feed, please wait...</Text>
        </Center>
      )}
    </Flex>
  );
};

export default Posture;

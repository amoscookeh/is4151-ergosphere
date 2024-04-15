/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdWbSunny, MdEmojiEmotions, MdLocalDrink } from "react-icons/md";
import { FaTemperatureHigh, FaTint } from "react-icons/fa";
import { useAuth } from "../context/authContext";

const Dashboard = () => {
  const [hydrated, setHydrated] = useState(true);
  const videoRef = useRef(null);
  const { deviceId } = useAuth();
  const wsUrl = `ws://localhost:3001/videofeed?device_id=${deviceId}`;
  console.log("wsUrl", wsUrl);

  useEffect(() => {
    const ws = new WebSocket(wsUrl);

    ws.onmessage = async (event) => {
      if (event.data instanceof Blob) {
        const text = await event.data.text();
        try {
          const data = JSON.parse(text);
          if (data.frame) {
            const byteArray = new Uint8Array(
              data.frame.match(/[\da-f]{2}/gi).map(function (h: any) {
                return parseInt(h, 16);
              })
            );
            const blob = new Blob([byteArray.buffer], { type: "image/jpeg" });
            const url = URL.createObjectURL(blob);
            if (
              videoRef.current &&
              (videoRef.current as HTMLImageElement).src
            ) {
              (videoRef.current as HTMLImageElement).src = url;
            }
          }
        } catch (err) {
          console.error("Error parsing JSON or handling frame data:", err);
        }
      }
    };

    return () => {
      if (videoRef.current && (videoRef.current as HTMLImageElement).src) {
        URL.revokeObjectURL((videoRef.current as HTMLImageElement).src);
      }
    };
  }, []);

  return (
    <Flex direction="column" align="center" m={4}>
      <Heading mb={6}>Dashboard</Heading>
      <Box
        p={4}
        bg={useColorModeValue("gray.200", "gray.700")}
        rounded="md"
        boxShadow="md"
      >
        <img
          ref={videoRef}
          src={"default"}
          alt="Video Stream"
          width="400"
          height="300"
        />
      </Box>
      <Stack spacing={6} mt={6} align="center">
        <Text fontSize="2xl">
          <Icon as={FaTemperatureHigh} color="orange.400" /> Temperature: 72°F
        </Text>
        <Text fontSize="2xl">
          <Icon as={FaTint} color="blue.400" /> Humidity: 45%
        </Text>
        <Text fontSize="2xl">
          <Icon as={MdWbSunny} color="yellow.400" /> Light Intensity: 300 Lux
        </Text>
      </Stack>
      <Box
        mt={6}
        p={4}
        bg={hydrated ? "green.200" : "red.200"}
        rounded="md"
        textAlign="center"
      >
        {hydrated ? (
          <>
            <Icon as={MdEmojiEmotions} w={8} h={8} color="green.500" />
            <Text>You are well hydrated!</Text>
          </>
        ) : (
          <>
            <Icon as={MdLocalDrink} w={8} h={8} color="red.500" />
            <Text>Please drink some water!</Text>
            <Button mt="4" colorScheme="red" onClick={() => setHydrated(true)}>
              I Drank Water
            </Button>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default Dashboard;

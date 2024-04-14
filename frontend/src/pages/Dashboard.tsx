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

const Dashboard: React.FC = () => {
  const [hydrated, setHydrated] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((error) => {
          console.error("Error accessing the camera: ", error);
        });
    }
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
        <video ref={videoRef} autoPlay playsInline width="400" height="300" />
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

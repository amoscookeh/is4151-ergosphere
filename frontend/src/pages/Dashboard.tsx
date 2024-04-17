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
import Posture from "../components/Posture";
import { fetchSensorData } from "../services/api/sensorData";
import { fetchHydrationStatus as apiFetchHydrationStatus } from "../services/api/hydrationSignal";
import { useAuth } from "../context/authContext";

const Dashboard: React.FC = () => {
  const [hydrated, setHydrated] = useState<boolean>(true);
  const [temp, setTemp] = useState(32);
  const [humidity, setHumidity] = useState(45);
  const [lux, setLux] = useState(655);
  const { userId } = useAuth();

  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await fetchSensorData(userId);
      console.log(data);
      setTemp(data.temperature);
      setHumidity(data.humidity);
      setLux(data.lightLevel);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchHydrationStatus = async () => {
      try {
        const response = await apiFetchHydrationStatus();
        setHydrated(!response);
      } catch (error) {
        console.error('Error fetching hydration status:', error);
      }
    };

    const interval = setInterval(fetchHydrationStatus, 3600000); // Check every 1 hour

    return () => clearInterval(interval);
  }, []);

  return (
    <Flex direction="column" align="center" m={4}>
      <Heading mb={6}>Dashboard</Heading>
      <Flex w="full" direction="row" align="center" m={4}>
        <Box
          w="50%"
          p={4}
          bg={useColorModeValue("gray.200", "gray.700")}
          rounded="md"
          boxShadow="md"
        >
          <Posture />
        </Box>
        <Flex w="50%" direction="column" align="center" ml={6}>
          <Stack spacing={6} mt={6} align="center">
            <Text fontSize="2xl">
              <Icon as={FaTemperatureHigh} color="orange.400" /> Temperature:{" "}
              {temp}°C
            </Text>
            <Text fontSize="2xl">
              <Icon as={FaTint} color="blue.400" /> Humidity:{" "}
              {Math.floor(humidity)}%
            </Text>
            <Text fontSize="2xl">
              <Icon as={MdWbSunny} color="yellow.400" /> Light Intensity: {lux}{" "}
              Lux
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
                <Button
                  mt="4"
                  colorScheme="red"
                  onClick={() => setHydrated(true)}
                >
                  I Drank Water
                </Button>
              </>
            )}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Dashboard;

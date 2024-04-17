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
  useToast,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  ButtonGroup,
} from "@chakra-ui/react";
import { MdWbSunny, MdEmojiEmotions, MdLocalDrink, MdWaterDrop } from "react-icons/md";
import { FaTemperatureHigh, FaTint } from "react-icons/fa";
import Posture from "../components/Posture";
import {
  fetchLightLevelOptimized,
  fetchSensorData,
} from "../services/api/sensorData";
import { fetchHydrationStatus as apiFetchHydrationStatus } from "../services/api/hydrationSignal";
import { useAuth } from "../context/authContext";
import { adjustBrightness, changeColor } from "../services/api/command";

const Dashboard: React.FC = () => {
  const [timeToHydrate, setTimeToHydrate] = useState(0);
  const [hydrated, setHydrated] = useState<boolean>(true);
  const [temp, setTemp] = useState(32);
  const [humidity, setHumidity] = useState(45);
  const [lux, setLux] = useState(655);
  const { userId } = useAuth();
  const toast = useToast();

  const adjustLight = (intensity: number) => {
    console.log("Adjusting light intensity:", intensity);
    adjustBrightness(intensity);
  };

  const adjustLightColor = (color: string) => {
    console.log("Adjusting light color:", color);
    changeColor(color);
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await fetchSensorData(userId);
      setTemp(data.temperature);
      setHumidity(data.humidity);
      setLux(data.lightLevel);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchHydrationStatus = async () => {
      try {
        const response = await apiFetchHydrationStatus(userId);
        console.log(response)
        setTimeToHydrate(Math.round(response * 60));
      } catch (error) {
        console.error("Error fetching hydration status:", error);
      }
    };
  
    fetchHydrationStatus();
    const interval = setInterval(fetchHydrationStatus, 30 * 60 * 1000);
    return () => {
      clearInterval(interval)
    }
  }, []);
  

  useEffect(() => {
    const optimizeLightLevels = async () => {
      const data = await fetchSensorData(userId);
      const lightLevel = data.lightLevel;
      const lightLevelClassification = (
        await fetchLightLevelOptimized(lightLevel)
      ).lightLevelClassification;

      switch (lightLevelClassification) {
        case 0.5:
          toast({
            title: "Your light levels are Optimal",
            description: "Keep At It!",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          break;
        case 1.0:
          toast({
            title: "Your surroundings are too dark",
            description: "Brightening your surroundings",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          break;
        case 2.0:
          toast({
            title: "Your surroundings are too bright",
            description: "Dimming your lights",
            status: "warning",
            duration: 5000,
            isClosable: true,
          });
          break;
        default:
          console.log("Error in light level classification");
      }
    };

    const interval = setInterval(optimizeLightLevels, 30000); // Check every 30 seconds

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
            <Text fontSize="2xl">
              <Icon as={MdWaterDrop} color="yellow.400" /> Time to hydrate: {timeToHydrate}{" "}
              mins
            </Text>
            <Slider
              defaultValue={1}
              min={0}
              max={1}
              step={0.1}
              onChange={adjustLight}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <ButtonGroup variant="solid" spacing={4}>
              <Button colorScheme="red" onClick={() => adjustLightColor("red")}>
                Red
              </Button>
              <Button
                colorScheme="yellow"
                onClick={() => adjustLightColor("yellow")}
              >
                Yellow
              </Button>
              <Button
                colorScheme="green"
                onClick={() => adjustLightColor("green")}
              >
                Green
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => adjustLightColor("blue")}
              >
                Blue
              </Button>
              <Button
                colorScheme="gray"
                onClick={() => adjustLightColor("white")}
              >
                White
              </Button>
              <Button
                colorScheme="orange"
                onClick={() => adjustLightColor("orange")}
              >
                Orange
              </Button>
            </ButtonGroup>

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

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

const Dashboard: React.FC = () => {
  const [hydrated, setHydrated] = useState(false);

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
              <Icon as={FaTemperatureHigh} color="orange.400" /> Temperature:
              72°F
            </Text>
            <Text fontSize="2xl">
              <Icon as={FaTint} color="blue.400" /> Humidity: 45%
            </Text>
            <Text fontSize="2xl">
              <Icon as={MdWbSunny} color="yellow.400" /> Light Intensity: 300
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

import React from "react";
import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  createIcon,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const nav = useNavigate();

  return (
    <Container maxW={"7xl"}>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          >
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: "30%",
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: useColorModeValue("red.400", "red.600"),
                zIndex: -1,
              }}
            >
              Elevate Workplace Wellbeing,
            </Text>
            <br />
            <Text as={"span"} color={useColorModeValue("red.400", "red.600")}>
              Ensure a Healthy Team!
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            ErgoSphere helps organizations foster a healthy work environment
            with tools for monitoring and promoting employee wellbeing. Engage
            and support your team effectively.
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}
          >
            <Button
              rounded={"full"}
              size={"lg"}
              fontWeight={"normal"}
              px={6}
              colorScheme={"red"}
              bg={useColorModeValue("red.400", "red.600")}
              _hover={{ bg: useColorModeValue("red.500", "red.700") }}
              onClick={() => {
                nav("/login");
              }}
            >
              Login
            </Button>
            <Button
              rounded={"full"}
              size={"lg"}
              fontWeight={"normal"}
              px={6}
              leftIcon={<PlayIcon h={4} w={4} color={"gray.300"} />}
              onClick={() => {
                nav("/register");
              }}
            >
              Register
            </Button>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={"center"}
          align={"center"}
          position={"relative"}
          w={"full"}
        >
          <Box
            position={"relative"}
            height={"300px"}
            rounded={"2xl"}
            boxShadow={"2xl"}
            width={"full"}
            overflow={"hidden"}
          >
            <Image
              alt={"Hero Image"}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={"100%"}
              src={
                "http://glowingstart.com/wp-content/uploads/2019/07/Screen-Shot-2019-07-04-at-8.50.30-AM.png"
              }
            />
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
}

const PlayIcon = createIcon({
  displayName: "PlayIcon",
  viewBox: "0 0 58 58",
  d: "M29 0C13 0 0 13 0 29s13 29 29 29 29-13 29-29S45 0 29 0zm10 30l-15 10V20l15 10z",
});

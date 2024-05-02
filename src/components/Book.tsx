import {
  Box,
  VStack,
  Image,
  Button,
  Grid,
  Text,
  HStack,
} from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa";

export default function Book() {
  return (
    <VStack alignItems={"flex-start"}>
      <Box>
        <Box overflow={"hidden"} position="relative" mb={3} rounded={"3xl"}>
          <Image
            h="300"
            src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzEyMTVfMjUz%2FMDAxNzAyNjMwMTM1NDQx.PXKNJk1PEIJ_7oPF8-JvFvAQ_AYQYXdYGDFUjmOk7ogg.B4tPoyvh4fdajqLNy0JkrIv8UqClOC-_r8nb-3SIQUgg.PNG.gf8013%2Fimage.png&type=sc960_832"
          />
          <Button
            variant={"unstyled"}
            position={"absolute"}
            top={0}
            right={0}
            color={"white"}
          >
            <FaRegHeart size="20px" />
          </Button>
        </Box>
        <Box>
          <Grid gap={2} templateColumns={"6fr 1fr"}>
            <Text display={"block"} as="b" noOfLines={1} fontSize="md">
              重慶森林: Chungking Express
            </Text>
            <HStack
              _hover={{
                color: "red.100",
              }}
              spacing={1}
              alignItems={"center"}
            >
              <FaStar size={15} />
              <Text>5.0</Text>
            </HStack>
          </Grid>
          <Text fontSize={"sm"} color="gray.600">
            왕가위
          </Text>
        </Box>
        <Text fontSize={"sm"} color="gray.600" as="b">
          review by 지수
        </Text>
      </Box>
    </VStack>
  );
}

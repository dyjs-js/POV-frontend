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
import { Link } from "react-router-dom";

interface BookProps {
  imageUrl: string;
  title: string;
  author: string;
  pk: number;
}

export default function Book({ pk, imageUrl, title, author }: BookProps) {
  return (
    <Link to={`/books/${pk}`}>
      {" "}
      <VStack alignItems={"flex-start"}>
        <Box>
          <Box overflow={"hidden"} position="relative" mb={3} rounded={"3xl"}>
            <Image h="300" src={imageUrl} />
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
                {title}
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
              {author}
            </Text>
          </Box>
          <Text fontSize={"sm"} color="gray.600" as="b">
            review by
          </Text>
        </Box>
      </VStack>
    </Link>
  );
}

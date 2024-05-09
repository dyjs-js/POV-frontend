import {
  Box,
  VStack,
  Image,
  Button,
  Grid,
  Text,
  HStack,
} from "@chakra-ui/react";
import { FaCamera, FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
interface BookProps {
  imageUrl: string;
  title: string;
  author: string;
  pk: number;
  is_liked_count: number;
  is_liked: boolean;
  is_public: boolean;
  is_owner: boolean;
}

export default function Book({
  pk,
  imageUrl,
  title,
  author,
  is_liked,
  is_owner,
}: BookProps) {
  const navigate = useNavigate();
  const onCameraClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(`/books/${pk}/photos`);
  };

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
              right={10}
              onClick={onCameraClick}
              color={"white"}
            >
              {is_owner ? <FaCamera size="20px" /> : null}
            </Button>
            <Button
              variant={"unstyled"}
              position={"absolute"}
              top={0}
              right={0}
              color={"white"}
            >
              {is_liked ? <FaHeart size="20px" /> : <FaRegHeart size="20px" />}
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
            published by
          </Text>
        </Box>
      </VStack>
    </Link>
  );
}

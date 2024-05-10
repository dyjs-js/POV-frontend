import {
  Avatar,
  Box,
  Card,
  Heading,
  Text,
  Image,
  CardBody,
  CardFooter,
  Button,
  CardHeader,
  Flex,
  Divider,
} from "@chakra-ui/react";
import ProtectedPage from "../components/ProtectedPage";
import { FaRegHeart } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { IBookList } from "../types";
import { getBooks } from "../api";
import { useParams } from "react-router-dom";
import MainSkeleton from "../components/MainSkeleton";

export default function MyPage() {
  const { isLoading, data } = useQuery<IBookList[]>({
    queryKey: ["books"],
    queryFn: getBooks,
  });
  return (
    <ProtectedPage>
      <Box
        mt={10}
        mb={150}
        px={{
          base: 10,
          lg: 40,
        }}
        py={10}
      >
        <Heading mb={10}>My Page</Heading>
        <Card maxW="md" mb={100}>
          <CardHeader>
            <Flex>
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar name="yjs" size={"md"} />

                <Box>
                  <Heading size="md">nm21622@naver.com</Heading>
                  <Text>지수</Text>
                </Box>
              </Flex>
            </Flex>
          </CardHeader>
          <CardBody>
            <Text>나의 책 리뷰 : 2개</Text>
            <Text>나의 영화 리뷰 : 2개</Text>
          </CardBody>
          <Image
            objectFit="cover"
            src="https://i.pinimg.com/564x/29/f8/e0/29f8e0398171290d487617bf043e89bd.jpg"
            alt="Chakra UI"
          />

          <CardFooter
            justify="space-between"
            flexWrap="wrap"
            sx={{
              "& > button": {
                minW: "136px",
              },
            }}
          >
            <Button flex="1" variant="ghost" leftIcon={<FaRegHeart />}>
              Like
            </Button>
            <Button flex="1" variant="ghost" leftIcon={<FaRegHeart />}>
              Edit
            </Button>
            <Button flex="1" variant="ghost" leftIcon={<FaRegHeart />}>
              Share
            </Button>
          </CardFooter>
        </Card>
        <Divider />

        <Box mt={10} mb={100}>
          <Heading mb={5}>My book reviews</Heading>
          <Box w="300px" h="300px">
            <MainSkeleton />
          </Box>
        </Box>

        <Divider />
        <Box mt={10} mb={100}>
          <Heading mb={5}>My Movie reviews</Heading>
          <Box w="300px" h="300px">
            <MainSkeleton />
          </Box>
        </Box>
      </Box>
    </ProtectedPage>
  );
}

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
  Grid,
} from "@chakra-ui/react";
import ProtectedPage from "../components/ProtectedPage";
import { FaRegHeart } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { IBookList } from "../types";
import { getBooks } from "../api";
import MainSkeleton from "../components/MainSkeleton";
import Book from "../components/Book";
import useUser from "../lib/useUser";

function getReviewCount(reviews: IBookList[] | undefined): number {
  if (!reviews) return 0;
  return reviews.filter((review) => review.is_owner).length;
}

export default function MyPage() {
  const { user } = useUser();

  const { isLoading, data } = useQuery<IBookList[]>({
    queryKey: ["books"],
    queryFn: getBooks,
  });

  const bookReivewCount = getReviewCount(data);
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
                <Avatar name={user.name} src={user.avatar} size={"md"} />
                <Box>
                  <Heading size="md">{user.username}</Heading>
                  <Text mt={1}>{user.email}</Text>
                </Box>
              </Flex>
            </Flex>
          </CardHeader>
          <CardBody>
            <Text mb={2}>
              마지막 로그인 :{" "}
              {new Date(user.last_login).toLocaleDateString("ko-KR")}
            </Text>
            <Text>{`나의 책 리뷰 : ${bookReivewCount}개`}</Text>

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
        <Box mt={10} mb={5}>
          <Heading>My book reviews</Heading>
        </Box>
        <Grid
          mt={10}
          mb={20}
          columnGap={4}
          rowGap={8}
          templateColumns={{
            sm: "1fr",
            md: "1fr 1fr",
            lg: "repeat(2, 1fr)",
            xl: "repeat(3, 1fr)",
            "2xl": "repeat(4, 1fr)",
          }}
        >
          {isLoading ? (
            <>
              <MainSkeleton />
              <MainSkeleton />
              <MainSkeleton />
              <MainSkeleton />
            </>
          ) : (
            <>
              {data &&
                Array.isArray(data) &&
                data
                  .filter((book) => book.is_owner)
                  .map((book) => (
                    <Book
                      key={book.pk}
                      pk={book.pk}
                      is_owner={book.is_owner}
                      imageUrl={book.photos[0]?.file}
                      title={book.title}
                      author={book.author}
                      review_title={book.review_title}
                      is_liked_count={book.is_liked_count}
                      is_liked={book.is_liked}
                      is_public={book.is_public}
                      rating={book.rating}
                    />
                  ))}
            </>
          )}
        </Grid>
        <Divider />
        <Box mt={10} mb={5}>
          <Heading>My Movie reviews</Heading>
        </Box>
        <Grid
          mt={10}
          mb={20}
          columnGap={4}
          rowGap={8}
          templateColumns={{
            sm: "1fr",
            md: "1fr 1fr",
            lg: "repeat(2, 1fr)",
            xl: "repeat(3, 1fr)",
            "2xl": "repeat(4, 1fr)",
          }}
        >
          <Box>
            <Box w="300px" h="300px">
              <MainSkeleton />
            </Box>
          </Box>
        </Grid>
      </Box>
    </ProtectedPage>
  );
}

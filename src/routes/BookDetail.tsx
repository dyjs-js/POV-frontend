import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBook, likeBook } from "../api";
import { IBookDetail } from "../types";
import {
  Box,
  Grid,
  Heading,
  Skeleton,
  Image,
  GridItem,
  VStack,
  HStack,
  Text,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from "@chakra-ui/react";
import { FaRegHeart } from "react-icons/fa";

export default function BookDetail() {
  const { bookPk } = useParams();
  const { isLoading, data } = useQuery<IBookDetail>({
    queryKey: [`books`, bookPk],
    queryFn: getBook,
  });

  const toast = useToast();
  const queryClient = useQueryClient();

  const handleLike = async () => {
    try {
      if (!data) return;

      if (data.is_liked) {
        // 이미 좋아요한 경우, 좋아요 취소 요청 보내기
        await likeBook(data.id);
      } else {
        // 좋아요하지 않은 경우, 좋아요 요청 보내기
        await likeBook(data.id);
      }

      // 새로운 데이터를 가져오기 위해 쿼리 재요청
      queryClient.invalidateQueries({
        queryKey: [`books`, bookPk],
      });

      // 성공 메시지 표시
      toast({
        title: "Success",
        description: data.is_liked ? "Unliked the book." : "Liked the book.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      // 오류 처리
      console.error("Error toggling like:", error);
      toast({
        title: "Error",
        description: "Failed to toggle like.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Box
      mt={10}
      mb={150}
      px={{
        base: 10,
        lg: 40,
      }}
      py={10}
    >
      <HStack justifyContent="space-between">
        <Skeleton
          rounded={"lg"}
          height={"45px"}
          width="25%"
          isLoaded={!isLoading}
        >
          <Heading>{data?.title}</Heading>
        </Skeleton>

        <HStack>
          <Box px={5}>
            <Button
              onClick={handleLike}
              leftIcon={<FaRegHeart />}
              colorScheme={data?.is_liked ? "red" : "gray"}
              variant="outline"
            >
              {data?.is_liked ? data?.is_liked_count : data?.is_liked_count}
            </Button>
          </Box>
          {data?.is_owner ? (
            <Menu>
              <MenuButton>
                <Button>edit</Button>
              </MenuButton>
              <MenuList>
                <MenuItem>delete</MenuItem>
                <MenuItem>edit</MenuItem>
              </MenuList>
            </Menu>
          ) : null}
        </HStack>
      </HStack>
      <Skeleton
        rounded={"lg"}
        height={"20px"}
        width="20%"
        isLoaded={!isLoading}
      >
        <HStack justifyContent={"flex-start"} width={"100%"}>
          <Text>{data?.author}</Text>
          <Text>·</Text>
          <Text>{data?.publisher}</Text>
        </HStack>
      </Skeleton>
      <Grid
        mt={8}
        rounded="xl"
        overflow={"hidden"}
        gap={2}
        height="60vh"
        templateRows={"1fr"}
        templateColumns={"repeat(2, 1fr)"}
      >
        {[0, 1].map((index) => (
          <GridItem colSpan={1} rowSpan={1} overflow={"hidden"} key={index}>
            <Skeleton isLoaded={!isLoading} h="100%" w="100%">
              {data?.photos && data.photos.length > 0 ? (
                <Image
                  objectFit={"cover"}
                  w="100%"
                  h="100%"
                  src={data?.photos[index].file}
                />
              ) : null}
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
      <HStack mt={10} justifyContent={"space-between"}>
        <VStack>
          <Skeleton
            rounded={"lg"}
            isLoaded={!isLoading}
            h="30px"
            width={"100%"}
          >
            <Heading fontSize={"large"}>{data?.review_title}</Heading>
          </Skeleton>
          <Box>
            <Text>published by {data?.user.name}</Text>
          </Box>
        </VStack>
        <Avatar name={data?.user.name} size={"xl"} src={data?.user.avatar} />
      </HStack>
      <VStack>
        <Box>
          <Text>{data?.created_at}</Text>
          {data?.content}
        </Box>
      </VStack>
      <Box mt={10} mb={10}>
        <Text>
          #{data?.author} #{data?.title}{" "}
          {data?.publisher && `#${data.publisher}`} #한국소설 #우울
        </Text>
      </Box>
    </Box>
  );
}

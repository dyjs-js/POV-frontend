import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBook } from "../api";
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
  IconButton,
  Button,
} from "@chakra-ui/react";
import { FaRegHeart } from "react-icons/fa";

export default function BookDetail() {
  const { bookPk } = useParams();
  const { isLoading, data } = useQuery<IBookDetail>({
    queryKey: [`books`, bookPk],
    queryFn: getBook,
  });
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
      <HStack justifyContent={"space-between"}>
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
            <FaRegHeart size="30px" />
            <Box>
              <Text>{data?.is_liked_count} likes</Text>
            </Box>
          </Box>
          <Button>Edit</Button>
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
        templateRows={"1fr 1fr"}
        templateColumns={"repeat(4, 1fr)"}
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <GridItem
            colSpan={index === 0 ? 2 : 1}
            rowSpan={index === 0 ? 2 : 1}
            overflow={"hidden"}
            key={index}
          >
            <Image
              objectFit={"cover"}
              w="100%"
              h="100%"
              src={data?.photos[index].file}
            />
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
        <Text>#구병모 #파과 #위즈덤하우스 #한국소설 #우울</Text>
      </Box>
    </Box>
  );
}

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

  const handleLike = async () => {};

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
            <FaRegHeart size="30px" />
            <Box>
              <Text>{data?.is_liked_count} likes</Text>
            </Box>
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

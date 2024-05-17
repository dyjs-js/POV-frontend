import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createGptPhoto,
  createGptURL,
  deleteBook,
  getBook,
  getUploadGptURL,
  likeBook,
  uploadGptImage,
} from "../api";
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { FaPaintBrush, FaRegHeart } from "react-icons/fa";

interface IUploadGptURLResponse {
  id: string;
  uploadURL: string;
}

export default function BookDetail() {
  const { bookPk } = useParams();
  const { isLoading, data } = useQuery<IBookDetail>({
    queryKey: [`books`, bookPk],
    queryFn: getBook,
  });

  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  //cloudflare에 저장된 이미지 서버로 다시 전달
  const createGptPhotoMutation = useMutation({
    mutationFn: createGptPhoto,
    onSuccess: (data: any) => {
      toast({
        status: "success",
        title: "AI Image Created!",
      });
    },
  });
  //cloudflare에 이미지 저장
  const uploadGptImageMutation = useMutation({
    mutationFn: uploadGptImage,
    onMutate: () => {
      console.log("upload Gpt Image Muatation starting");
    },
    onSuccess: ({ result }: any) => {
      if (bookPk) {
        createGptPhotoMutation.mutate({
          description: "ai image",
          file: `https://imagedelivery.net/SZx-PvOZyRIpZEuxyLbRUQ/${result.id}/public`,
          bookPk,
        });
      }
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });
  //cloudflare 저장을 위해 url가져오기
  const UploadGptURLMutation = useMutation({
    mutationFn: getUploadGptURL,
    onMutate: () => {
      console.log("Upload Gpt URL Mutation starting");
    },
    onSuccess: (data: IUploadGptURLResponse, imageurl: string) => {
      console.log(imageurl);
      uploadGptImageMutation.mutate({
        uploadURL: data.uploadURL,
        file: imageurl,
      });
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  const createGptURLMutation = useMutation({
    mutationFn: createGptURL,
    onSuccess: (data: any) => {
      console.log(data);
      const imageurl = data.file;

      UploadGptURLMutation.mutate(imageurl); //여기에 발생한 file url전송
    },
    onError: (error) => {
      toast({
        title: "create Gpt URL Mutation faild",
        status: "error",
      });
    },
  });

  const deleteReviewMutation = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      toast({
        status: "success",
        title: "Delete Success",
      });
      navigate(`/`);
    },
  });

  const onCreateClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (bookPk) {
      createGptURLMutation.mutate(bookPk);
    }
  };
  const onDeleteClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (bookPk) {
      deleteReviewMutation.mutate(bookPk);
    }
  };

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
      queryClient.invalidateQueries({
        queryKey: [`books`, bookPk],
      });
      toast({
        title: "Success",
        description: data.is_liked ? "Unliked the book." : "Liked the book.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
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
          <Box>
            <Button
              onClick={onCreateClick}
              leftIcon={<FaPaintBrush />}
              colorScheme={"gray"}
              variant="outline"
              isLoading={createGptURLMutation.isPending}
            >
              AI image
            </Button>
          </Box>
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
            <>
              <Link to={`/books/${bookPk}/edit`}>
                <Button>EDIT</Button>
              </Link>
              <Button onClick={onOpen}>DELETE</Button>
              <Modal
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Delete Confirmation</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <Text>Are you sure you want to delete this review?</Text>
                  </ModalBody>

                  <ModalFooter>
                    <Button onClick={onDeleteClick} mr={3}>
                      Delete
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>
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
          <GridItem key={index}>
            {/* 첫 번째 이미지 */}
            {index === 0 && (
              <Image objectFit="cover" w="100%" src={data?.photos[0].file} />
            )}
            {/* 두 번째 이미지 */}
            {index === 1 && (
              <Image
                objectFit="cover"
                w="100%"
                src={
                  data?.gptphotos && data.gptphotos.length > 0
                    ? data?.photos[data.photos.length - 1].file
                    : data?.photos[1]?.file
                }
              />
            )}
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
          <Box width="100%" justifyContent="flex-start">
            <Text>published by {data?.user.name}</Text>
          </Box>
        </VStack>
        <Avatar name={data?.user.name} size={"xl"} src={data?.user.avatar} />
      </HStack>
      <VStack>
        <Box>
          <Text>{data?.created_at}</Text>
          <Text whiteSpace="pre-line">{data?.content}</Text>
        </Box>
      </VStack>
      <Box mt={10} mb={10}>
        <Text>
          #{data?.author} #{data?.title}{" "}
          {data?.publisher && `#${data.publisher}`}
        </Text>
      </Box>
    </Box>
  );
}

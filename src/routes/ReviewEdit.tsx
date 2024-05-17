import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Text,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import ProtectedPage from "../components/ProtectedPage";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IEditBookVariables, deleteBook, editBook, getBook } from "../api";
import { IBookDetail } from "../types";
import { useForm } from "react-hook-form";

export default function ReviewEdit() {
  const { bookPk } = useParams();
  const { data } = useQuery<IBookDetail>({
    queryKey: [`books`, bookPk],
    queryFn: getBook,
  });
  const { register, handleSubmit } = useForm<IEditBookVariables>();
  const toast = useToast();
  const navigate = useNavigate();
  const editBookMutation = useMutation({
    mutationFn: editBook,
    onSuccess: (data: IBookDetail) => {
      toast({
        status: "success",
        title: "Edit Success",
      });
      navigate(`/books/${data.id}`);
    },
  });

  const deleteBookMutation = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      toast({
        status: "success",
        title: "Delete Success",
      });
      navigate(`/`);
    },
  });
  const onSubmit = (data: IEditBookVariables) => {
    if (bookPk) {
      editBookMutation.mutate({ ...data, bookPk });
    }
  };
  return (
    <ProtectedPage>
      <Box
        pb={40}
        mt={10}
        px={{
          base: 10,
          lg: 40,
        }}
      >
        <Container>
          <Heading textAlign={"center"}>Edit Reviews</Heading>
          <VStack
            spacing={10}
            as="form"
            mt={5}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormControl>
              <FormLabel>Review Title</FormLabel>
              <Input
                {...register("review_title")}
                defaultValue={data?.review_title}
                type="text"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                {...register("title")}
                defaultValue={data?.title}
                type="text"
              />
            </FormControl>
            <FormControl>
              <FormLabel>작가</FormLabel>
              <Input
                {...register("author")}
                defaultValue={data?.author}
                type="text"
              />
            </FormControl>
            <FormControl>
              <FormLabel>출판사</FormLabel>
              <Input
                {...register("publisher")}
                defaultValue={data?.publisher}
                type="text"
              />
            </FormControl>
            <FormControl>
              <FormLabel>내용</FormLabel>
              <Textarea {...register("content")} defaultValue={data?.content} />
            </FormControl>
            {/* <FormControl>
              <FormLabel>요약된 내용</FormLabel>
              <Textarea {...register("summary")} defaultValue={data?.summary} />
            </FormControl> */}
            <FormControl>
              <FormLabel>별점</FormLabel>
              <NumberInput defaultValue={data?.rating} min={1} max={5}>
                <NumberInputField
                  {...register("rating")}
                  value={data?.rating}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl>
              <Checkbox defaultChecked={true} {...register("is_public")}>
                Is public?
              </Checkbox>
            </FormControl>
            {editBookMutation.isError ? (
              <>
                <Text>something went wrong</Text>
              </>
            ) : null}
            <Button
              type="submit"
              isLoading={editBookMutation.isPending}
              colorScheme={"red"}
              size="lg"
              w="100%"
            >
              Edit Review
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}

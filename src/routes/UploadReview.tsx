import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import ProtectedPage from "../components/ProtectedPage";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IUploadBookVariables, uploadBook } from "../api";
import { useMutation } from "@tanstack/react-query";
import { IBookDetail } from "../types";
import { useNavigate } from "react-router-dom";

export default function UploadReview() {
  //나중에 gpt해쉬태그는 21.2 참고
  const { register, handleSubmit } = useForm<IUploadBookVariables>();
  const [reviewType, setReviewType] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: uploadBook,
    onSuccess: (data: IBookDetail) => {
      toast({
        status: "success",
        title: "Book review created",
        position: "bottom-right",
      });
      navigate(`/books/${data.id}`);
    },
  });
  const handleReviewTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setReviewType(event.target.value);
  };
  const onSubmit = (data: IUploadBookVariables) => {
    mutation.mutate(data);
  };
  // console.log(watch());
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
          <Heading textAlign={"center"}>Upload Reviews</Heading>
          <VStack
            spacing={10}
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            mt={5}
          >
            <FormControl>
              <FormLabel>Review Type</FormLabel>
              <Select
                placeholder="Select review type"
                onChange={handleReviewTypeChange}
                value={reviewType}
              >
                <option>Book</option>
                <option>Movie</option>
              </Select>
            </FormControl>
            {reviewType === "Book" && (
              <>
                <FormControl>
                  <FormLabel>Review Title</FormLabel>
                  <Input
                    {...register("review_title", { required: true })}
                    required
                    type="text"
                  />
                  <FormHelperText>
                    Write the title of your review.
                  </FormHelperText>
                </FormControl>
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input
                    {...register("title", { required: true })}
                    required
                    type="text"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Author</FormLabel>
                  <Input
                    {...register("author", { required: true })}
                    required
                    type="text"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Publisher</FormLabel>
                  <Input {...register("publisher")} type="text" />
                  <FormHelperText>Not required</FormHelperText>
                </FormControl>
              </>
            )}
            {reviewType === "Movie" && (
              <>
                <FormControl>
                  <FormLabel>Review Title</FormLabel>
                  <Input required type="text" />
                  <FormHelperText>
                    Write the title of your review.
                  </FormHelperText>
                </FormControl>
                <FormControl>
                  <FormLabel>Movie</FormLabel>
                  <Input required type="text" />
                </FormControl>
                <FormControl>
                  <FormLabel>영화 감독</FormLabel>
                  <Input required type="text" />
                </FormControl>
                <FormControl>
                  <FormLabel>캐스팅</FormLabel>
                  <Input type="text" />
                  <FormHelperText>필수 항목이 아닙니다.</FormHelperText>
                </FormControl>
              </>
            )}
            <FormControl>
              <FormLabel>Content</FormLabel>
              <Textarea {...register("content", { required: true })} />
            </FormControl>
            {/* <FormControl>
              <FormLabel>삭제예정</FormLabel>
              <Textarea {...register("summary", { required: true })} />
            </FormControl> */}
            <FormControl>
              <FormLabel>Rating</FormLabel>
              <NumberInput min={1} max={5}>
                <NumberInputField {...register("rating", { required: true })} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl>
              <Checkbox
                defaultChecked
                {...register("is_public", { required: true })}
              >
                Is public?
              </Checkbox>
            </FormControl>
            {mutation.isError ? (
              <>
                <Text>something went wrong</Text>
              </>
            ) : null}
            <Button
              type="submit"
              isLoading={mutation.isPending}
              colorScheme={"red"}
              size="lg"
              w="100%"
            >
              Upload Review
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}

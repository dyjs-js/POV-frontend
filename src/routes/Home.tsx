import { Grid } from "@chakra-ui/react";
import Book from "../components/Book";
import MainSkeleton from "../components/MainSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../api";
import { IBookList } from "../types";

export default function Home() {
  const { isLoading, data } = useQuery<IBookList[]>({
    queryKey: ["books"],
    queryFn: getBooks,
  });

  return (
    <Grid
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
      py={10}
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
          <MainSkeleton />
          <MainSkeleton />
          <MainSkeleton />
          <MainSkeleton />
          <MainSkeleton />
          <MainSkeleton />
        </>
      ) : null}
      {data &&
        Array.isArray(data) &&
        data.map((book) => (
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
    </Grid>
  );
}

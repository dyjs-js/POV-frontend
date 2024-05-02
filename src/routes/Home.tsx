import { Box, Grid, Skeleton, SkeletonText } from "@chakra-ui/react";
import Book from "../components/Book";
export default function Home() {
  return (
    <Grid
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
      <Box>
        <Skeleton height={300} mb={5} rounded={"3xl"} />
        <SkeletonText w="50%" noOfLines={2} mb={4} />
        <SkeletonText w="50%" noOfLines={1} />
      </Box>
      <Book />
      <Box>
        <Skeleton height={300} mb={3} rounded={"3xl"} />
        <SkeletonText w="50%" noOfLines={3} />
      </Box>
      <Box>
        <Skeleton height={300} mb={3} rounded={"3xl"} />
        <SkeletonText w="50%" noOfLines={3} />
      </Box>
      <Box>
        <Skeleton height={300} mb={3} rounded={"3xl"} />
        <SkeletonText w="50%" noOfLines={3} />
      </Box>
    </Grid>
  );
}

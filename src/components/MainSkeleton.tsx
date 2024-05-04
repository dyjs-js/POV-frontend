import { Box, HStack, Skeleton, SkeletonText } from "@chakra-ui/react";

export default function MainSkeleton() {
  return (
    <Box>
      <Skeleton height={300} mb={5} rounded={"3xl"} />
      <HStack justifyContent={"space-between"}>
        <Skeleton rounded="lg" width="60%" height={5} mb={1} />
        <Skeleton rounded="lg" width="15%" height={5} />
      </HStack>
      <Skeleton rounded="lg" width="40%" height={3} mb={3} />
      <Skeleton rounded="lg" width="40%" height={3} mb={10} />
    </Box>
  );
}

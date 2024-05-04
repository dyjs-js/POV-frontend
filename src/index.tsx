import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./api/queryClient";
import SuperApp from "./SuperApp";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SuperApp />
    </QueryClientProvider>
  );
};

export default App;

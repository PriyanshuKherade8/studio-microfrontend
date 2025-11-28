import { useMutation, useQuery } from "@tanstack/react-query";
import httpClient from "../api/httpClient";
export const useGetAllSets = (id) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["allSets"],
    queryFn: () => httpClient.get(`studio/set/get/${id}`),
    enabled: !!id,
  });

  return { data, error, isLoading };
};

import { useState, useEffect, useCallback } from "react";

export const useFetch = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await apiFunction();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message || "An error occurred");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [...dependencies, apiFunction]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
};

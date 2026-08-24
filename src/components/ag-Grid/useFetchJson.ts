import { useEffect, useState } from "react";

export const useFetchJson = <T>(url: string, limit?: number) => {
  const [data, setData] = useState<T[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(url);
      const json = await response.json();
      const fetchedData = limit ? json.slice(0, limit) : json;
      setData(fetchedData);
      setLoading(false);
    };

    fetchData();
  }, [url, limit]);

  return { data, loading };
};

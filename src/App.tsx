import "./App.css";
import { useState, useEffect } from "react";

export default function App() {
  const [data, setData] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://catfact.ninja/fact");
        const result = await response.json();
        setData(result);
      } catch (e) {
        console.log(e);
      } finally {
        setLoader(false);
      }
    };

    fetchData();
  }, []); // Empty array means this runs only on mount

  return <div>{loader ? "Loading..." : JSON.stringify(data)}</div>;
}

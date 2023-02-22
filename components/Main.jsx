import React, { useEffect, useState } from "react";
import request from "../src/Request";

const Main = () => {
  const [movies, setMovies] = useState([]);

  const movieHandler = async () => {
    try {
      const response = await fetch(request.requestPopular);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    movieHandler();
  }, []);

  console.log(movies);

  return <div>main</div>;
};

export default Main;

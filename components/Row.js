import React, { useState, useEffect } from "react";
import request from "@/src/Request";

const req = [
  { title: "Popular", url: request.requestPopular },
  { title: "Top Rated", url: request.requestTopRated },
  { title: "Up Coming", url: request.requestUpComing },
  { title: "Latest", url: request.requestLatest },
  { title: "Now Playing", url: request.requestNowPlaying },
];

const Row = () => {
  const [movies, setMovies] = useState([]);

  const moviehandler = async () => {
    try {
      const response = await fetch(req.url);
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {}, []);

  return <div>Row</div>;
};

export default Row;

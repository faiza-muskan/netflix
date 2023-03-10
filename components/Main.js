import React, { useEffect, useState } from "react";
import request from "../src/Request";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

const Main = () => {
  const [movies, setMovies] = useState([]);
  const [open, setOpen] = useState(0);

  const openHandler = (num) => {
    setOpen(open === num ? 0 : num);
  };

  const customAnimation = {
    mount: { scale: 1 },
    unmount: { scale: 0.9 },
  };

  const movie = movies[Math.floor(Math.random() * movies.length)];

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

  console.log(movie);

  return (
    <div className=" w-full h-[550px] text-white">
      <div className=" w-full h-full">
        <div className=" absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
        <img
          className=" w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
        />
        <div className=" absolute w-full top-[20%] p-4 md:p-8">
          <h1 className=" text-3xl md:text-5xl font-bold">{movie?.title}</h1>
          <div className="my-4">
            <button className=" border bg-gray-300 text-black border-gray-300 py-2 px-5 ml-4">
              Play
            </button>
            <button className=" border text-white border-gray-300 py-2 px-5 ml-4">
              Watch Later
            </button>
          </div>
          <p className=" text-gray-400 text-sm">
            Released:{movie?.release_date}
          </p>
          <Accordion open={open === 1} animate={customAnimation}>
            <AccordionHeader onClick={() => openHandler(1)}>
              Read more
            </AccordionHeader>
            <AccordionBody className=" w-full md:max-w-[70%] lg:ma-w-[50%] xl:max-w-[35%] text-gray-200">
              {movie?.overview}
            </AccordionBody>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Main;

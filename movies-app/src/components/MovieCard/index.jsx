import React from "react";

const MovieCard = ({movie}) => {
  return (
    <div className="w-52 h-[320px] rounded-lg flex flex-col shadow-md">
      <img
        src={movie?.poster_path ? `http://image.tmdb.org/t/p/original${movie?.poster_path}` : "https://media.vintagestock.com/media/cache/77/c3/77c307f810a2d86169428188ced3e141.jpg"}
        alt="Movie poster"
        className="w-full h-60 rounded-t-lg"
      />
      <div className="flex items-center justify-between px-1 gap-4 mb-1.5 mt-1">
        <p className="font-medium text-xs text-ellipsis whitespace-nowrap overflow-hidden text-gray">
          {movie?.title}
        </p>
        <p className="text-xs text-lightGray">{movie?.vote_average}/10</p>
      </div>
      <p className="text-xs text-left px-1 line-clamp-2 text-gray">
        {movie?.overview}
      </p>
    </div>
  );
};

export default MovieCard;

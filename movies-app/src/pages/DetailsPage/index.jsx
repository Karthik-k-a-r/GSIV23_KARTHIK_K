import React, { useEffect, useState } from "react";
import { Home } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const DetailsPage = () => {
  const [movieDetail, setMovieDetail] = useState();
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovieDetails = async () => {
    setIsLoading(true);
    const URL = `https://api.themoviedb.org/3/movie/${movieId}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwODg2YTkyZTk4ZjExNTE3ZDI1Y2NjZWMyYmExNDA4ZiIsInN1YiI6IjY0ZTA2MDMzYTNiNWU2MDFkNTllNDUxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.O_EpDFrRgRX8vPmn03ROiLIdsPSXsfAfcSo2Eg4QzC8",
      },
    };
    try {
      const response = await fetch(URL, options);
      const data = await response.json();
      setMovieDetail(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex h-20 items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div>
          <nav className="py-3 px-5 flex items-center justify-between shadow-md">
            <h2 className="text-gray text-xl font-medium">Movie Details</h2>
            <Link to="/list">
              <Home />
            </Link>
          </nav>
          {movieDetail && (
            <div className="p-4 flex items-start gap-4">
              <img
                src={`http://image.tmdb.org/t/p/original${movieDetail?.poster_path}`}
                alt="Movie poster"
                className="w-44"
              />
              <div>
                <div className="flex gap-2 mb-3">
                  <p className="font-medium text-gray text-2xl">
                    {movieDetail?.title}
                  </p>
                  <p className="text-lightGray text-2xl">
                    ({movieDetail?.vote_average}/10)
                  </p>
                </div>

                <p className="text-gray text-xl mb-3">
                  {new Date(movieDetail.release_date).getFullYear()} |{" "}
                  {movieDetail.runtime} mins
                </p>

                <p className="text-gray text-xl">
                  Description: {movieDetail?.overview}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default DetailsPage;

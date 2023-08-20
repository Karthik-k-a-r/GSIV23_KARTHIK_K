import { Home, Search } from "@mui/icons-material";
import { TextField, InputAdornment, CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import MovieCard from "../../components/MovieCard";
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";

const ListPage = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [searchString, setSearchString] = useState();
  const [page, setPage] = useState(1);

  const upcomingMovieDetails = async () => {
    const URL = `https://api.themoviedb.org/3/movie/upcoming?page=${page}`;
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
      const results = data?.results;
      setMoviesList((prevData) => [...prevData, ...results]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.log(error.message);
    }
  };

  //   useEffect(() => {
  //     upcomingMovieDetails();
  //   }, []);

  const searchByMovieName = async () => {
    const URL = `https://api.themoviedb.org/3/search/movie?query=${searchString}`;
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
      setMoviesList(data?.results);
    } catch (error) {
      console.log(error.message);
    }
  };

  const debounceSearch = debounce((value) => {
    setSearchString(value);
  }, 500);

  useEffect(() => {
    if (searchString) {
      searchByMovieName();
    } else {
      upcomingMovieDetails();
    }
  }, [searchString]);

  const handleSearchChange = (e) => {
    debounceSearch(e.target.value);
  };

  return (
    <div className="bg-white">
      <nav className="py-3 px-5 flex items-center justify-between shadow-md">
        <TextField
          placeholder="Search"
          size="small"
          className="w-1/2 rounded-lg bg-lightGray"
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Link to="/list">
          <Home />
        </Link>
      </nav>
      <InfiniteScroll
        dataLength={moviesList?.length}
        next={upcomingMovieDetails}
        hasMore={searchString ? false : true}
        loader={
          <div className="flex h-20 items-center justify-center">
            <CircularProgress />
          </div>
        }
      >
        <div className="flex item-start flex-wrap text-center py-4 px-8 justify-center gap-4">
          {moviesList?.map((movie) => (
            <Link key={movie.id} to={`/movie/${movie.id}`}>
              <MovieCard movie={movie} />
            </Link>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default ListPage;

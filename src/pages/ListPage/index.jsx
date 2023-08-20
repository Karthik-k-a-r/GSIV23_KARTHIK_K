import { Home, Search } from "@mui/icons-material";
import { TextField, InputAdornment, CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from "../../components/MovieCard";

const ListPage = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [searchString, setSearchString] = useState();
  const [page, setPage] = useState(1);
  const [searcResults, setSearchResults] = useState([]);

  const upcomingMovieDetails = async () => {
    const URL = `${process.env.REACT_APP_BASE_URL}/movie/upcoming?page=${page}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: process.env.REACT_APP_API_TOKEN,
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

  const searchByMovieName = async () => {
    const URL = `${process.env.REACT_APP_BASE_URL}/search/movie?query=${searchString}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: process.env.REACT_APP_API_TOKEN,
      },
    };
    try {
      const response = await fetch(URL, options);
      const data = await response.json();
      setSearchResults(data?.results);
    } catch (error) {
      console.log(error.message);
    }
  };

  const debounceSearch = debounce((value) => {
    setSearchString(value);
  }, 500);

  useEffect(() => {
    setPage(1);
    setMoviesList([]);
    setSearchResults([]);
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
      {moviesList?.length > 0 && (
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
      )}
      {searcResults.length > 0 && (
        <div className="flex item-start flex-wrap text-center py-4 px-8 justify-center gap-4">
          {searcResults?.map((movie) => (
            <Link key={movie.id} to={`/movie/${movie.id}`}>
              <MovieCard movie={movie} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListPage;

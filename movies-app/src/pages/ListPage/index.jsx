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
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [searchPage, setSearchPage] = useState(1);

  const upcomingMovieDetails = async () => {
    // setIsLoading(true);
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
      setTotalPage(data?.total_pages);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.log(error.message);
    } finally {
      //   setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("main");
    upcomingMovieDetails();
  }, []);

  const searchByMovieName = () => {
    // setIsLoading(true);
    const URL = `https://api.themoviedb.org/3/search/movie?query=${searchString}&page=${searchPage}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwODg2YTkyZTk4ZjExNTE3ZDI1Y2NjZWMyYmExNDA4ZiIsInN1YiI6IjY0ZTA2MDMzYTNiNWU2MDFkNTllNDUxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.O_EpDFrRgRX8vPmn03ROiLIdsPSXsfAfcSo2Eg4QzC8",
      },
    };
    fetch(URL, options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("2"+searchPage);
        setMoviesList(data?.results);
        setTotalPage(data?.total_pages);
        setSearchPage((prevPage) => prevPage + 1);
        console.log("3"+searchPage);
        // setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        // setIsLoading(false);
      });
  };

  const debounceSearch = debounce((value) => {
    setSearchString(value);
  }, 500);

  useEffect(() => {
    if (searchString) {
      setSearchPage(1);
      console.log("1"+searchPage);
      searchByMovieName();
    }
  }, [searchString]);

  const handleSearchChange = (e) => {
    debounceSearch(e.target.value);
  };

  console.log(searchPage+"searchpage");

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
      {/* {searchResult ? (
        <InfiniteScroll
          dataLength={searchResult?.length}
          next={searchByMovieName}
          hasMore={true} // Replace with a condition based on your data source
          loader={
            <div className="flex h-20 items-center justify-center">
              <CircularProgress />
            </div>
          }
          endMessage={<p>No more data to load.</p>}
        >
          <div className="flex item-start flex-wrap text-center py-4 px-8 justify-center gap-4">
            {searchResult?.map((movie) => (
              <Link key={movie.id} to={`/movie/${movie.id}`}>
                <MovieCard movie={movie} />
              </Link>
            ))}
          </div>
        </InfiniteScroll> */}

      <InfiniteScroll
        dataLength={moviesList?.length}
        next={searchByMovieName}
        hasMore={true} // Replace with a condition based on your data source
        loader={
          <div className="flex h-20 items-center justify-center">
            <CircularProgress />
          </div>
        }
        endMessage={<p>No more data to load.</p>}
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

import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import UpdateMovie from './Components/UpdateMovie'
import AddMovie from "./Components/AddMovie";
const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <Link to={`/add-movie`}>
        <button>Add Movie</button>
      </Link>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route 
      path="/movies/:id"
      render={props => <Movie {...props} setMovieList={setMovieList} addToSavedList={addToSavedList} />}
      />
        
      <Route 
        path="/update-movie/:id" 
        render={props => <UpdateMovie {...props} setMovieList={setMovieList} />}
      />
      <Route
        path="/add-movie"
        render={props => <AddMovie {...props} setMovieList={setMovieList} />}
      />

      </>
  );
};

export default App;

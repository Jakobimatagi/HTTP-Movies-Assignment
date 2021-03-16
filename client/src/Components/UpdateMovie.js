import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
  title: "",
  director: "",
  metascore: "",
  stars: "",
};

const UpdateMovie = (props) => {
  const [movie, setMovie] = useState(initialMovie);
  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        console.log("Get movie detail request response", res);
        setMovie(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);
  const changeHandler = (e) => {
    e.persist();
    let value = e.target.value;

    setMovie({
      ...movie,
      [e.target.name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then((res) => {
        console.log(res);

        props.setMovie(res.data);
        push(`/api/movies/${id}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Update Movie</h2>
      <form >
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeHolder="Title"
          value={movie.title}
        />
        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeHolder="Director"
          value={movie.director}
        />
        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeHolder={0}
          value={movie.metascore}
        />
        <input
          type="text"
          name="stars"
          onChange={changeHandler}
          placeHolder="Title"
          value={movie.stars}
        />
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default UpdateMovie;

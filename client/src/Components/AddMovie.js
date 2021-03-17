import React, {useState} from 'react';
import axios from 'axios';


const initialMovie = {
    title: "",
    director: "",
    metascore: "",
    stars: "",
  };


const AddMovie = props => {
    const [movie, setMovie] = useState(initialMovie);

    const changeHandler = e => {
        e.persist();
        const value = e.target.value;
        
        setMovie({
            ...movie,
            [e.target.name]: value
        });
    };
    const handleSubmit = e => {
        e.preventDefault();

        console.log("sending request to add to movie", movie);
        axios.post("http://localhost.5000/api/movies")
        .then(res => {
            console.log(res);
            props.setMovie(res.data)
        })
        .catch(err => console.log(err))
    };

    return(
        <div>
            <h2>Add Movie</h2>
            <form onSubmit={handleSubmit}>
                <input 
                type="text"
                name="title"
                onChange={changeHandler}
                placeholder="Title"
                value={movie.title}
                />
                <input 
                type="text"
                name="director"
                onChange={changeHandler}
                placeholder="Director"
                value={movie.director}
                />
                <input 
                type="text"
                name="metascore"
                onChange={changeHandler}
                placeholder="metascore"
                value={movie.metascore}
                />
                <input 
                type="text"
                name="stars"
                onChange={changeHandler}
                placeholder="Stars"
                value={movie.stars}
                />
            </form>
            <button>Add New Movie</button>
        </div>
    )
}

export default AddMovie;
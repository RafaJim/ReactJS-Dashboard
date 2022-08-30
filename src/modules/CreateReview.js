import Axios from 'axios';
import '../styles/App.css';
import { useState } from 'react';
import Navbar from './Navbar';

const CreateReview = () => {

    const [movieName, setMovieName] = useState('');
    const [review, setReview] = useState('');

    const date = new Date();
    const _date = date.getFullYear() + ":" + (date.getMonth() + 1) + ":" + date.getDate();
    const time = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    const today = _date + " " + time;

    const submitReview = () => {
        Axios.post('http://192.168.1.241:3001/movies', {
        movieName: movieName,
        movieReview: review,
        createdAt: today
        })

        // setMovieReviewList([...movieReviewList, 
        // { movieName: movieName, movieReview: review }
        // ]);
    };

    return (
        <div>
            <Navbar />

            <div className='form'>
                <label>Movie name</label>
                <input type="text" name="movieName" onChange={(e) => {
                setMovieName(e.target.value)
                }}/>

                <label>Movie review</label>
                <input type="text" name="review" onChange={(e) => {
                setReview(e.target.value)
                }}/>

                <button onClick={ submitReview }>Submit</button>
            </div>
        </div>
        
    );
}

export default CreateReview;
import '../styles/showReviews.css';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import format from 'date-fns/format';
import { utils, writeFile } from 'xlsx';
import Navbar from './Navbar.js';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';

const ShowReviews = () => {
    let data = [];

    const [movieReviewList, setMovieReviewList] = useState(data);
    const [filterableMovieReviewList, setFilterableMovieReviewList] = useState(data);
    // const [newReview, setNewReview] = useState('');

    const getData = async () => {
        const token = localStorage.getItem('token');
        await Axios.get('http://192.168.1.241:3001/movies', { headers: { "authorization": `Bearer ${token}` } }).then((response) => {
            data = response.data.map(_data => {
                const formattedDate = format(new Date(_data.createdAt), "dd/MM/yyyy");
                return { id: _data.id, movieName: _data.movieName, movieReview: _data.movieReview, createdAt: formattedDate }
            })
            setMovieReviewList(data);
            setFilterableMovieReviewList(data.filter(movie => movie.createdAt === format(new Date(), "dd/MM/yyyy")))
        });
    }

    const getFilteredData = date => {
        const dt = new Date(date);
        const dtDateOnly = new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000);
        const formattedDate = format(new Date(dtDateOnly), "dd/MM/yyyy");
        let arr = movieReviewList.filter(_data => _data.createdAt === formattedDate);
        setFilterableMovieReviewList(arr);
    }

    const handleExport = () => {
        const date = format(new Date(), "dd-MM-yyyy");
        const wb = utils.book_new()
        const ws = utils.json_to_sheet(filterableMovieReviewList);
        utils.book_append_sheet(wb, ws, date);
        writeFile(wb, "Frijoles_" + date + ".xlsx");
    }

    // const deleteReview = (id) =>{
    //     Axios.delete(`http://localhost:3001/movies/${id}`);
    //     setMovieReviewList(prev => prev.filter(movies => movies.id !== id ));
    // };

    // const updateReview = (id) => {
    //     Axios.put('http://localhost:3001/movies', {
    //     id: id,
    //     movieReview: newReview
    //     });

    //     setMovieReviewList(prev => prev.map(review => review.id !== id ? review : {...review, movieReview: newReview}));
    // };

    useEffect(() => {
        getData();
        // setTimeout(() => {window.location.reload(true)}, 11000);
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 80 },
        { field: 'movieName', headerName: 'Movie', width: 140 },
        { field: 'movieReview', headerName: 'Review', width: 140 },
        { field: 'createdAt', headerName: 'fecha creacion', width: 200 }
    ];

    return (
        <div className="App">
            <Navbar />

            <div className="box">
                <div className="title">
                    <h3>Tabla de ventas</h3>
                </div>
                <div className="body" style={{ height: 550, width: '100%' }}>
                    <Button className='export' variant='contained' onClick={handleExport} >Exportar</Button>

                    <TextField className='filter' variant="standard" type='date' defaultValue={format(new Date(), "yyyy-MM-dd")} onChange={ e => getFilteredData(e.target.value) } />

                    <DataGrid
                        rows={filterableMovieReviewList}
                        columns={columns}
                        pageSize={7}
                        rowsPerPageOptions={[7]}
                        //components={{ Toolbar: GridToolbar }}
                        // checkboxSelection
                    />
                </div>
            </div>
        </div>
    );
}

export default ShowReviews;
import '../styles/App.css';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import format from 'date-fns/format';
import { utils, writeFile } from 'xlsx';
import Navbar from './Navbar.js';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';

const ShowAllReviews = () => {
    let data = [];
    let data2 = [];
    const [date, setDate] = useState();
    const [movieReviewList, setMovieReviewList] = useState(data);
    // const [newReview, setNewReview] = useState('');

    const getData = async () => {
        const token = localStorage.getItem('token');
        await Axios.get('http://localhost:3001/movies', { headers: {"authorization" : `Bearer ${token}` } }).then((response) => {
            data = response.data

            data.map(_data => {
                const _date = format(new Date(_data.createdAt), "dd/MM/yyy");
                data2.push({ id: _data.id, movieName: _data.movieName, movieReview: _data.movieReview, createdAt: _date });
                return 0;
            });
            setMovieReviewList(data2);
        });
        data2.map(data => console.log(typeof(data.createdAt)))
    }

    // const getFilteredData = () => {
        
    // }

    const handleExport = () => {
        const date = format(new Date(), "dd-MM-yyyy");
        const wb = utils.book_new(),
            ws = utils.json_to_sheet(movieReviewList);
        utils.book_append_sheet(wb, ws, date);
        writeFile(wb, "Frijoles_"+date+".xlsx");
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
        { field: 'movieName', headerName: 'Movie', width:140 },
        { field: 'movieReview', headerName: 'Review', width:140 },
        { field: 'createdAt', headerName: 'fecha creacion', width:200 }
    ];
    
    return (
        <div className="App">
            <Navbar />
            
            <div className="box" style={{ height: 400, width: '100%' }}>
                <Button className='submit' variant='contained' onClick={ handleExport } >Exportar</Button>
                <TextField className='filter' variant="standard" type='date' onChange={ e => movieReviewList.filter( _data => _data.createdAt == e.target.value ? setMovieReviewList(_data):null) } />
                <DataGrid 
                    rows={movieReviewList}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    //components={{ Toolbar: GridToolbar }}
                    checkboxSelection
                />
            </div>
        

        </div>
    );
}

export default ShowAllReviews;
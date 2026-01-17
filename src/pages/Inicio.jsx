import React from 'react'
import Carrusel from '../components/Carrusel'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API ='https://api.themoviedb.org/3/trending/movie/day?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-VE'; 

const Inicio = () => {
    const [datos, setDatos] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);

    const getDatos = async () => {
        try {
            const response = await fetch(API);
            if (!response.ok) {
                throw new Error("HTTP error! status: " + response.status);
            }
            const data = await response.json();
            setDatos(data.results);
            // console.log(data)
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };
    useEffect(() => {
        getDatos();
    }, []);

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">cargando...</span>
                </div>
                <p>Cargando Peliculas...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div className="text-center py-5 text-danger">
                <h4>Error al cargar las Peliculas</h4>
                <p>{error}</p>
            </div>
        );
    }

    const ruta = "https://image.tmdb.org/t/p/w500";
  return (
    <div className='text-center py-4'>
        <Carrusel/>
        <h4 className='text-center py-4'>Tendencias en el Cine</h4>
        <div className='container'>
            <div className='row'>
            {datos.map((item) => (
                <div className='col-md-2 mb-3 col-6 col-lg-3'>
                    <div className='card'>
                        <div className='card-header p-0'>
                            <img src={ruta + item.poster_path} className="img-fluid" alt="..." />
                        </div>
                        <div className='card-body'>
                            <p>{item.title || item.name}</p>
                            <p><span class="badge text-bg-danger">{item.popularity}</span></p>
                        </div>
                        <div className='card-footer text-center'>
                        <Link to={`/detalle/${item.id}/${item.title}`} className='btn btn-info me-3'>
                            Detalle
                        </Link>
                        <button className='btn btn-success' data-bs-toggle="modal" data-bs-target={`#${item.id}`}>
                            Modal
                        </button>
                
                        </div>
                    </div>
                    
        <div>
        <div className="modal fade" id={item.id} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
            <div className="modal-content">
                <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">{item.title}</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                    <div className='row'>
                        <div className='col-md-4 col-6'>
                            <img src={ruta + item.poster_path} className="img-fluid" alt="..." />
                        </div>
                        <div className='col-md-6 text-center'>
                            <h4>{item.title}</h4>
                            {item.overview}
                            <p>{item.popularity}</p>
                            
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>            
                </div>
            </div>
            </div>
        </div>
        </div>

                </div>
                
                ))}
            </div>
            
        </div>
    </div>
  )
}

export default Inicio
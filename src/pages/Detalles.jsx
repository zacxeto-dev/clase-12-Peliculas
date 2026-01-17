import React from 'react'
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import YouTube from "react-youtube";



const Detalles = () => {
const [datos, setDatos] = useState([]); 
const [loading, setLoading] = useState(true); 
const [error, setError] = useState(null);  
const [datavideo, setDatavideo]= useState({})
const [playtrailer, setPlaytrailer] = useState(false) 
const [datareparto, setDatareparto] = useState({});
const fecha = new Date(datos.release_date); // Reemplaza 'datos.release_date' con la variable que contiene la fecha
const dia = fecha.getDate();
const mes = fecha.getMonth() + 1; // Los meses en JavaScript son indexados desde 0, por lo que se suma 1 al mes
const año = fecha.getFullYear();
const fechaFormateada = `${dia}/${mes}/${año}`;
const params = useParams()
let id = params.id
let titulo = params.titulo

    const getDatos = async () => {
        try {
            const API=`https://api.themoviedb.org/3/movie/${id}?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-ES`;
            const response = await fetch(API);
            if (!response.ok) {
                throw new Error("HTTP error! status: " + response.status);
            }
            const data = await response.json();
            setDatos(data);
            // console.log(data)
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };
    const getVideo = async () => {  
        try {
            const APIVideos =`https://api.themoviedb.org/3/movie/${id}/videos?api_key=ecbcdcf9044928d12b179d9153f5a269&language=en-US`
            const response = await fetch(APIVideos);
            const data = await response.json();
            //console.log(data);
            setDatavideo(data.results); // Actualizar el estado con los datos obtenidos
           
        } catch (error) {
            console.error(error);
        }
    }
    const getReparto = async () => {  
        try {
            const APICredits=`https://api.themoviedb.org/3/movie/${id}/credits?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-ES&sort_by=popularity.desc`;
            const response = await fetch(APICredits);
            const data = await response.json();
            //console.log(data)
            setDatareparto(data.cast); 
            setdProduccion(data.crew); 
        } catch (error) {
            console.error(error);
        }
    };
    
    

    let trailerkey;
    let ind;
    {Array.isArray(datavideo) &&  datavideo[0].key!=="" ? ind = datavideo.length-1  : null}
    {Array.isArray(datavideo) &&  datavideo[ind].key!=="" ? trailerkey = datavideo[ind].key  : null}

    
    useEffect(() => {
        getDatos();
        getVideo();
        getReparto();
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


    const ruta = "https://image.tmdb.org/t/p/original/";

    const renderTrailer=()=>{
       
        
        return(
            <YouTube videoId={trailerkey}
                className={"youtube-container"}
                opts={{
                    width:"100%",
                    height:"100%"
                }}
            /> 
        )
        
    }

  return (
    <div className="banner" style={{backgroundImage:"url(" + ruta + datos.backdrop_path + ")"}}>
        <div className="sombra">
                <h1 className="pt-5 display-1 banner_titulo">{datos.title || datos.name}</h1>
                <h5 className="pt-5 display-4 banner_titulo">{datos.tagline}</h5>
                
                {datos.genres && datos.genres.length > 0 && (
                    <h5 className="display-5 banner_titulo">Genero: {datos.genres[0].name}</h5>
                )}
             
                <h5 className="display-5">Titulo Original: {datos.original_title} </h5>
                <h5 className="display-5">Lenguaje Original: {datos.original_language} </h5>
                {datos.production_countries && (
                    <h5 className="display-5">Producida en: {datos.production_countries[0].name} </h5>
                )}
                {datos.vote_average && datos.vote_average > 0 && (
                    <h2 className="my-4">Average: <span className=" badge lg-ba bg-warning p-2">{datos.vote_average.toFixed(1)}%</span></h2> 
                )}

                <p className="banner_descripcion">{datos.overview}</p>

                <div className="my-3">
                    
                    <Link to="/inicio" href="#"  className="btn btn-success ">Regresar</Link>
                </div> 
                {datos.release_date && (
                    <h5 className="py-3">Fecha de Lanzamiento: {fechaFormateada} </h5>
                )}
            </div>
    </div>
  )
}

export default Detalles
// Next
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import { GetStaticPaths, GetStaticProps } from 'next'

import{useContext} from 'react'
import axios from 'axios'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { ContextoFavorito } from '../../app/context-personajes/contexto-personaje'
import { RickAndMortyCharactersInfo } from '../../app/types-ts/rick-and-morty-characters-info'
import { API_URL } from '@/index'

interface PersonajeProps {
    personaje: RickAndMortyCharactersInfo
}

export default function Personaje({ personaje }: PersonajeProps) {
    //contexto de favoritos
    const { agregarPersonajeFavorito, removerPersonajeFavorito, verificarexistenciaPersonaje } = 
    useContext(ContextoFavorito);
    //funcion para manejar el agregar y remover personajes
    const manejarAgregarRemoverPersonaje = (personaje: RickAndMortyCharactersInfo) => {
        if (verificarexistenciaPersonaje(personaje.id) >= 0) {
            removerPersonajeFavorito(personaje.id);
        } else {
            agregarPersonajeFavorito(personaje);
        }
    }

    return (
        <>
        <Head>
            <title> Rick y Morty</title>
        </Head>
        <div>
            <div>
                <Link href="/" passHref>
                    <MdOutlineArrowBackIosNew/> Back
                </Link>
                <button
                onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    manejarAgregarRemoverPersonaje(personaje);

                }}
                >
                    {verificarexistenciaPersonaje(personaje.id) >= 0 ? (<AiFillStar />) :( <AiOutlineStar />)}

                </button>
            </div>
            <Image
            loader={() => personaje.image}
            src={personaje.image}
            unoptimized
            width={300}
            height={300}
            alt={personaje.name}
            />
            <h1>{personaje.name}</h1>
            {personaje.type && (
          <div>
            <strong>Tipo</strong>
            <span>{personaje.type}</span>
          </div>
        )}
        {personaje.origin.name && (
          <div>
            <strong>Nombre</strong>
            <span>{personaje.origin.name}</span>
          </div>
        )}
        {personaje.gender && (
          <div>
            <strong>genero</strong>
            <span>{personaje.gender}</span>
          </div>
        )}
        {personaje.status && (
          <div>
            <strong>status</strong>
            <span>{personaje.type}</span>
          </div>
        )}
        {personaje.species && (
          <div>
            <strong>Especie</strong>
            <span>{personaje.species}</span>
          </div>
        )}

        </div>    
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return{
        paths:[{params:{id:'1'}}],
        fallback: true
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const personajeId = params?.id;
    const personaje = await axios.get<RickAndMortyCharactersInfo>(`${API_URL}/${personajeId}`)
    .then(({data})=> {return data})
    .catch(()=>{
        return null
    })
    if(!personaje){
        return{
            redirect:{
                destination:'/',
                permanent:false
        },
    }   
}
return{
    props:{
        personaje
    },
    revalidate: 60 * 60 * 2,//cada 2 horas
}
}



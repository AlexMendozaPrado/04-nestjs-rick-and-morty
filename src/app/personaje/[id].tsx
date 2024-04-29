// Next
import Image from 'next/image'
import Head from 'next/head'
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
            
        </Head>
        
        
        </>
    )


}

//componentes




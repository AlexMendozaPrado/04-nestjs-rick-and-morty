import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { ContextoFavorito } from "../context-personajes/contexto-personaje";
import { RickAndMortyCharactersInfo } from "../types-ts/rick-and-morty-characters-info";
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

interface personajesChardProps {
    personaje: RickAndMortyCharactersInfo;
}

export function PersonajeCard({ personaje }: personajesChardProps) {
    // Contexto de favoritos
    const { agregarPersonajeFavorito, removerPersonajeFavorito, verificarexistenciaPersonaje } = useContext(ContextoFavorito);

    // Función para manejar el agregar y remover personajes
    const manejarAgregarRemoverPersonaje = (personaje: RickAndMortyCharactersInfo) => {
        if (verificarexistenciaPersonaje(personaje.id) >= 0) {
            removerPersonajeFavorito(personaje.id);
        } else {
            agregarPersonajeFavorito(personaje);
        }
    }

    return (
        <Link href={`/personajes/${personaje.id}`} passHref>
            <div className="max-w-sm cursor-pointer overflow-hidden shadow-lg">
                <div className="relative w-full h-72">
                    <Image
                        loader={() => personaje.image}
                        src={personaje.image}
                        unoptimized
                        width={300}
                        height={300}
                        alt={personaje.name}
                    />
                </div>
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{personaje.name}</div>
                </div>
                <div className="px-6 pt-4 pb-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        manejarAgregarRemoverPersonaje(personaje);
                    }}>
                        {verificarexistenciaPersonaje(personaje.id) >= 0 ? <AiFillStar /> : <AiOutlineStar />}
                    </button>
                </div>
            </div>
        </Link>
    );
}

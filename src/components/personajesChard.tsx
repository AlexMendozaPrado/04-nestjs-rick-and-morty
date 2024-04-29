import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { ContextoFavorito } from "../context-personajes/contexto-personaje";
import { RickAndMortyCharactersInfo } from "../types-ts/rick-and-morty-characters-info";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

interface personajesChardProps {
  personaje: RickAndMortyCharactersInfo;
}

export function PersonajeCard({ personaje }: personajesChardProps) {
  // Contexto de favoritos
  const {
    agregarPersonajeFavorito,
    removerPersonajeFavorito,
    verificarexistenciaPersonaje,
  } = useContext(ContextoFavorito);

  // Función para manejar el agregar y remover personajes
  const manejarAgregarRemoverPersonaje = (
    personaje: RickAndMortyCharactersInfo,
  ) => {
    if (verificarexistenciaPersonaje(personaje.id) >= 0) {
      removerPersonajeFavorito(personaje.id);
    } else {
      agregarPersonajeFavorito(personaje);
    }
  };

  return (
    
    <Link href={`/character/${personaje.id}`} passHref>
      <div className="cursor-pointer overflow-hidden rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl bg-white">
    <div className="relative w-full h-full">
      <Image
        loader={() => personaje.image}
        src={personaje.image}
        unoptimized
        layout="responsive"
        width={30}
        height={300}
        alt={personaje.name}
        className="rounded-t-lg"
      />
    </div>
    <div className="px-6 py-4 bg-gray-800 rounded-b-lg">
      <div className="font-bold text-xl mb-2 text-white">{personaje.name}</div>
    </div>
    <div className="px-6 pt-4 pb-2 bg-gray-900 rounded-b-lg">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          manejarAgregarRemoverPersonaje(personaje);
        }}
      >
        {verificarexistenciaPersonaje(personaje.id) >= 0 ? (
          <AiFillStar className="text-yellow-400" />
        ) : (
          <AiOutlineStar className="text-gray-400" />
        )}
      </button>
    </div>
  </div>
</Link>

  );
}

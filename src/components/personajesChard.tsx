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
    <Link
      href={`/character/${personaje.id}`}
      passHref
      className="border-2 border-green-500 rounded-lg overflow-hidden no-underline text-gray-200 bg-gray-800 relative hover:-translate-y-1 transition-all duration-200 mb-0"
      prefetch={false}
    >
      <Image
        loader={() => personaje.image}
        src={personaje.image}
        unoptimized
        width={300}
        height={300}
        alt={personaje.name}
      />
      <span className="block p-4 text-center text-lg">{personaje.name}</span>
      <div>
        <button
          className="flex items-center absolute top-5 right-5 bg-gray-800 text-orange-400 rounded-md border-none p-2.5 cursor-pointer"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            manejarAgregarRemoverPersonaje(personaje);
          }}
        >
          {verificarexistenciaPersonaje(personaje.id) >= 0 ? (
            <AiFillStar />
          ) : (
            <AiOutlineStar />
          )}
        </button>
      </div>
    </Link>
  );
}

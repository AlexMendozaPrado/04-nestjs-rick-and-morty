import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { useContext } from "react";
import { ContextoFavorito } from "@/context-personajes/contexto-personaje";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

export default function Favoritos() {
  const { personajesFavoritos, removerPersonajeFavorito } =
    useContext(ContextoFavorito);
  const cantidadFavoritos = personajesFavoritos.length;

  return (
    <>
      <Head>
        <title>Rick y Morty - Favoritos</title>
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen py-8">
        <div className="flex items-center justify-between w-full max-w-2xl p-6">
          <Link href="/" passHref>
            <MdOutlineArrowBackIosNew /> Atrás
          </Link>
          <h2 className="text-lg text-gray-100">Tus personajes favoritos</h2>
        </div>
        <section className="w-full max-w-2xl p-6 bg-gray-900 flex flex-col items-center">
          {cantidadFavoritos > 0 ? (
            personajesFavoritos.map((personaje) => (
              <Link
                href={`/character/${personaje.id}`}
                key={personaje.id}
                className="flex items-center w-full border-2 border-blue-500 rounded overflow-hidden bg-gray-800 my-2 hover:-translate-y-1 transition"
              >
                <Image
                  loader={() => personaje.image}
                  src={personaje.image}
                  unoptimized
                  width={85}
                  height={85}
                  alt={personaje.name}
                  className="rounded"
                />
                <div className="flex flex-col justify-between p-4">
                  <p className="text-white">{personaje.name}</p>
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      removerPersonajeFavorito(personaje.id);
                    }}
                    className="text-orange-400 bg-transparent mt-2 cursor-pointer"
                  >
                    Remover de favoritos
                  </button>
                </div>
              </Link>
            ))
          ) : (
            <div className="flex items-center justify-center p-6 h-full w-full">
              <p className="text-white">Lista de favoritos vacía.</p>
            </div>
          )}
        </section>
      </div>
    </>
  );
}

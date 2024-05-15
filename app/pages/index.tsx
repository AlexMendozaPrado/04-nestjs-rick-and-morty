import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IoSearch, IoCloseSharp } from "react-icons/io5";

import Head from "next/head";
import { PersonajeCard } from "../components/personajesChard";
import {
  RickAndMortyCharactersInfo,
  restApiResponseData,
} from "../types-ts/rick-and-morty-characters-info";

interface PropsApi {
  response: restApiResponseData;
}

interface InfoActual {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
  current: string;
}

interface infoBusqueda {
  consulta: string;
}

export const API_URL = "https://rickandmortyapi.com/api/character";

export default function Home(props: PropsApi) {
  const { info, results = [] } = props.response;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<infoBusqueda>();
  const [filtrado, setFiltrado] = useState<string>("");
  const [personajes, setPersonajes] =
    useState<RickAndMortyCharactersInfo[]>(results);
  const [infoActual, setInfoActual] = useState<InfoActual>({
    ...info,
    current: API_URL,
  });

  const { current } = infoActual;
  const deshabilitarAnterior = infoActual.prev === null;
  const deshabilitarSiguiente = infoActual.next === null;
  const numeroPaginaActual = current.includes("page=")
    ? Number(new URL(current).searchParams.get("page"))
    : 1;

  useEffect(() => {
    if (current === API_URL) return;

    async function cambioPagina() {
      const response = await axios
        .get<restApiResponseData>(current)
        .then(({ data }) => data)
        .catch(() => {
          toast.error("Error al obtener los datos");
          return null;
        });
      if (response) {
        setInfoActual({
          ...response.info,
          current,
        });
        setPersonajes([...response.results]);
      }
    }
    cambioPagina();
  }, [current]);

  return (
    <>
      <Head>
        <title>Rick y Morty</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto py-36 px-8" >
        <form className="flex items-center justify-between w-full mt-6 mb-4">
          <div className="flex-1">
            <input
              type="text"
              {...register("consulta", { required: true })}
              placeholder="Buscar personaje por nombre"
              className="w-full p-2 border border-green-100 rounded-lg"
            />
            {errors.consulta && (
              <span className="text-sm text-orange-500 block mt-2">
                Este campo es requerido
              </span>
            )}
          </div>
          <button
            type="submit"
            className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:opacity-80"
          >
            <IoSearch />
          </button>
        </form>
        {filtrado && (
          <div className="text-center my-4">
            <span>Filtrado por: </span>
            <span className="bg-gray-800 text-white rounded-full py-2 px-4 inline-flex items-center">
              {filtrado}
              <button
                className="ml-2 text-red-500"
                onClick={() => setFiltrado("")}
              >
                <IoCloseSharp />
              </button>
            </span>
          </div>
        )}
<div className="grid lg:grid-cols-3  gap-8 p-8">
          {personajes.map((personaje) => (
            <PersonajeCard key={personaje.id} personaje={personaje} />
          ))}
        </div>
        <div className="flex items-center justify-center gap-4 my-8">
          <button className="rounded-lg px-6 py-2 text-base font-medium bg-black text-yellow-400 cursor-pointer hover:bg-opacity-80 disabled:bg-gray-500 disabled:cursor-not-allowed"
            onClick={() =>
              setInfoActual((prev) => ({
                ...prev,
                current: prev.prev ?? prev.current,
              }))
            }
            disabled={deshabilitarAnterior}
          >
            Previo
          </button>
          <div className="flex items-center justify-center bg-black rounded-lg">
          <input
            type="text"
            disabled
            value={`${numeroPaginaActual} / ${infoActual.pages}`}
            className="text-center text-yellow-400 bg-transparent w-20 py-2"
            />
          </div>
          <button className="rounded px-4 py-2 text-sm bg-yellow-500 text-gray-900 cursor-pointer hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() =>
              setInfoActual((prev) => ({
                ...prev,
                current: prev.next ?? prev.current,
              }))
            }
            disabled={deshabilitarSiguiente}
          >
            Siguiente
          </button>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const response = await axios
    .get<restApiResponseData>(API_URL)
    .then(({ data }) => data);
  return {
    props: {
      response,
    },
    revalidate: 60 * 60 * 2, // every 2 hours
  };
}
// Archivo: BotonFavorito.tsx
import { useContext } from "react";
import { ContextoFavorito } from "../context-personajes/contexto-personaje";
import { AiFillStar } from "react-icons/ai";
import Link from "next/link";

export function BotonFavorito(){
    // Contexto de favoritos
    const { personajesFavoritos } = useContext(ContextoFavorito);
    // Cantidad de favoritos
    const cantidadFavoritos = personajesFavoritos.length;

    return (
        <Link href='/favoritos' className="flex items-center relative rounded-full border-none bg-blue-500 text-gray-900 text-md p-3 cursor-pointer transition-opacity duration-200 hover:opacity-80">
            <AiFillStar />
            {cantidadFavoritos > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-sm font-bold w-5 h-5 flex items-center justify-center">
                    {cantidadFavoritos}
                </span>
            )}
        </Link>
    );
}

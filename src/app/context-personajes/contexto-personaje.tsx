import { useState,useEffect,createContext,ReactNode } from "react";

//Type  de personaje
import { RickAndMortyCharactersInfo } from "../types-ts/rick-and-morty-characters-info"; 

interface ContextoinfoFavoritos{
    tema:boolean
    personajesFavoritos: RickAndMortyCharactersInfo[];
    agregarPersonajeFavorito: (personaje: RickAndMortyCharactersInfo) => void;
    verificarexistenciaPersonaje: (personaje: number) => boolean;
    removerPersonajeFavorito: (personajeId: number) => void;
    cambiarTema: () => void;

}
interface ContextoinfoFavoritosProviderProps{  
    hijo: ReactNode;
}
export const ContextoFavorito= createContext({} as ContextoinfoFavoritos);

export function ContextoFavoritosProvider({hijo}:ContextoinfoFavoritosProviderProps){
    const [personajesFavoritos,setpersonajesFavoritos]=useState<RickAndMortyCharactersInfo[]>([]);
    const [tema,setTema]=useState<boolean>(true);
    
    function cambiarTema(){
        setTema(!tema);
    }
    

}


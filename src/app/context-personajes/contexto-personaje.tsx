import { useState,useEffect,createContext,ReactNode } from "react";

//Type  de personaje
import { RickAndMortyCharactersInfo } from "../types-ts/rick-and-morty-characters-info"; 

//Contexto de favoritos
interface ContextoinfoFavoritos{
    tema:boolean
    personajesFavoritos: RickAndMortyCharactersInfo[];
    agregarPersonajeFavorito: (personaje: RickAndMortyCharactersInfo) => void;
    verificarexistenciaPersonaje: (personaje: number) => number;
    removerPersonajeFavorito: (personajeId: number) => void;
    cambiarTema: () => void;

}
//Props de favoritos
interface ContextoinfoFavoritosProviderProps{  
    children: ReactNode;
}
//Contexto de favoritos
export const ContextoFavorito= createContext({} as ContextoinfoFavoritos);
//Provider de favoritos
export function ContextoFavoritosProvider({children,}:ContextoinfoFavoritosProviderProps){
    const [personajesFavoritos,setpersonajesFavoritos]=useState<RickAndMortyCharactersInfo[]>([]);
    const [tema,setTema]=useState<boolean>(true);
    
    function cambiarTema(){
        setTema(!tema);
    }
    function agregarPersonajeFavorito(personaje: RickAndMortyCharactersInfo){
        const verificarExistencia=verificarexistenciaPersonaje(personaje.id);
        if (verificarExistencia<0){
            setpersonajesFavoritos((state)=>[...state,personaje])
            localStorage.setItem('favoritos',JSON.stringify([...personajesFavoritos,personaje]))


        }
    }
    function removerPersonajeFavorito(personajeId: number){
        const nuevoListado=personajesFavoritos.filter((personaje)=>personaje.id!==personajeId);
        localStorage.setItem('favoritos',JSON.stringify(nuevoListado))
        return nuevoListado;
    }
    function verificarexistenciaPersonaje(personajeId: number){
        return personajesFavoritos.findIndex((personaje)=>personaje.id===personajeId);
    }
    //useEffect para guardar en localstorage
useEffect(()=>{
const personajesFavoritosGuardados=localStorage.getItem('favoritos');
if(!personajesFavoritosGuardados){
return
}
setpersonajesFavoritos(JSON.parse(personajesFavoritosGuardados));
},[])

    return(
        <ContextoFavorito.Provider value={{
            tema,
            personajesFavoritos,
            agregarPersonajeFavorito,
            verificarexistenciaPersonaje,
            removerPersonajeFavorito,
            cambiarTema
        }}>
            {children}
        </ContextoFavorito.Provider>
    )

}



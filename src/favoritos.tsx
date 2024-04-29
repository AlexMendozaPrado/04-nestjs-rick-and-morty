import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import {useContext} from 'react'
import {ContextoFavorito} from '@/app/context-personajes/contexto-personaje'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'

export default function Favoritos() {
const {personajesFavoritos,removerPersonajeFavorito} = useContext(ContextoFavorito)
const cantidadFavoritos = personajesFavoritos.length
return(
    <>
    <Head>
        <title> Rick y Morty</title>
    </Head>
    <div>
        <div>
            <Link href="/" passHref >
                <MdOutlineArrowBackIosNew/> atras
            </Link>
            <h2> Tus persoanjes favoritos</h2>
        </div>
        <section>
            {cantidadFavoritos > 0 ? (<div>
                <p>  Lista de favoritos vacia </p>
            </div>):(
                <>
                {
                    personajesFavoritos.map((personaje)=>(
                        <Link href={`/character/${personaje.id}`} key={personaje.id}>
                            <Image
                            loader={() => personaje.image}
                            src={personaje.image}
                            unoptimized
                            width={85}
                            height={85}
                            alt={personaje.name}
                            />
                            <div>
                            <p>{personaje.name}</p>
                            <button onClick={(event) =>{
                                event.preventDefault()
                                event.stopPropagation()
                                 removerPersonajeFavorito(personaje.id)

                            }}>
                                Remover de favoritos
                                </button>
                                </div>

                        </Link>
                    )) }
                </>
            )}
        </section>

    </div>
    </>
)
}

import Image from "next/image";
import { BotonFavorito } from "./BotonFavorito";

interface Headerprops {
  esOscuroTemas: boolean;
  setIsOscuroTemas: (valor: boolean) => void;
}

export default function Header({
  esOscuroTemas,
  setIsOscuroTemas,
}: Headerprops) {
  const manejarCambioTema = () => {
    setIsOscuroTemas(!esOscuroTemas);
  };
  return (
    <div className="flex justify-center items-center py-1.5 px-6 bg-gray-800">
      <div className="flex justify-between items-center w-full max-w-4xl px-2 gap-2">
        <Image
          src="/rick_and_morty_logo2.jpg"
          alt="Rick and Morty"
          width={180}
          height={90}
        />

        <div className="flex justify-between max-w-[130px] w-full items-center gap-2">
          <BotonFavorito />
          <label className="relative inline-block w-16 h-8 cursor-pointer">
            <input
              type="checkbox"
              className="opacity-0 w-0 h-0"
              onClick={manejarCambioTema}
            />
            <span
              className={`slider block absolute inset-0 bg-blue-500 rounded-full transition-all duration-300 ${esOscuroTemas ? "bg-blue-600" : "bg-blue-500"}`}
            >
              <span
                className={`absolute left-1 bottom-1 bg-gray-100 w-7 h-7 rounded-full transform transition-all duration-300 ${esOscuroTemas ? "translate-x-7" : ""}`}
              ></span>
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

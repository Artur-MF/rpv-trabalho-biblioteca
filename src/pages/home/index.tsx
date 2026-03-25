import Link from "next/link";
// Verifique se o caminho do seu componente Card está correto em relação a esta página
import { Card } from "../../components/card";
import MenuNavegacao from "../../components/menu";


// Adicionamos a palavra 'default' aqui!
export default function Home() {
    return (
        <>
            <MenuNavegacao />


            <div className="bg-slate-800 min-h-screen text-white flex flex-col justify-center items-center gap-6 p-8">

                <div className="text-center flex flex-col gap-4 max-w-3xl mt-8">
                    <h1 className="text-5xl md:text-6xl font-bold">
                        Sistema de Biblioteca
                    </h1>
                    <p className="text-slate-300 text-lg md:text-xl">
                        Gerencie usuários, cadastre livros e controle empréstimos e devoluções de forma simples em um único lugar.
                    </p>
                </div>


            </div>
        </>
    );
}
import { useState } from "react";
import MenuNavegacao from "../../components/menu";

export default function CadastroLivros() {

    const [titulo, setTitulo] = useState("");
    const [genero, setGenero] = useState("");
    const [autor, setAutor] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [mensagem, setMensagem] = useState("");

    const handleCadastro = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const tituloLimpo = titulo.trim().replace(/\s+/g, " ").toLowerCase();
            const generoLimpo = genero.trim().replace(/\s+/g, " ").toLowerCase();
            const autorLimpo = autor.trim().replace(/\s+/g, " ").toLowerCase();

            const dadoslivro = {
                titulo: tituloLimpo,
                autor: autorLimpo,
                genero: generoLimpo,
                quantidade: Number(quantidade)
            };

            const response = await fetch('/api/create/livros', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadoslivro)
            });

            const data = await response.json();

            if (!response.ok) {
                setMensagem(`Erro: ${data.mensagem}`);
            } else {
                setMensagem('Livro registado com sucesso!');
                setTitulo("");
                setGenero("");
                setAutor("");
                setQuantidade("");
            }
        } catch (error) {
            setMensagem("Erro ao ligar ao servidor.");
        }
    };

    return (
        <>
            <MenuNavegacao />

            <div>
                <div className="w-full min-h-screen flex justify-center items-center flex-col gap-[8px] bg-gray-900 text-white">
                    <h1 className="text-5xl text-center mb-8">Cadastro de Livros</h1>

                    <form onSubmit={handleCadastro} className="flex flex-col justify-center items-center gap-[8px] bg-gray-700 text-white p-12 rounded-xl">

                        <div className="flex flex-col gap-[8px]">
                            <label htmlFor="">Título</label>
                            <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required className="bg-gray-200 text-black placeholder:text-gray-400 rounded-xl py-2 w-96 px-4 outline-none" />
                        </div>

                        <div className="flex flex-col gap-[8px]">
                            <label htmlFor="">Género</label>
                            <input type="text" value={genero} onChange={(e) => setGenero(e.target.value)} required className="bg-gray-200 text-black placeholder:text-gray-400 rounded-xl py-2 w-96 px-4 outline-none" />
                        </div>

                        <div className="flex flex-col gap-[8px]">
                            <label htmlFor="">Autor</label>
                            <input type="text" value={autor} onChange={(e) => setAutor(e.target.value)} required className="bg-gray-200 text-black placeholder:text-gray-400 rounded-xl py-2 w-96 px-4 outline-none" />
                        </div>

                        <div className="flex flex-col gap-[8px]">
                            <label htmlFor="">Quantidade</label>
                            <input type="number" min="1" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} required className="bg-gray-200 text-black placeholder:text-gray-400 rounded-xl py-2 w-96 px-4 outline-none"
                            />
                        </div>

                        <button type="submit" className="mt-8 w-full bg-green-600 hover:bg-green-500 py-2 rounded-xl cursor-pointer font-bold transition-colors">
                            Cadastrar
                        </button>

                        {mensagem && (
                            <div className={`mt-4 p-2 rounded text-center w-full font-semibold ${mensagem.includes('Erro') ? 'text-red-500' : 'text-green-500'}`}>
                                {mensagem}
                            </div>
                        )}

                    </form>
                </div>
            </div>
        </>
    );
}
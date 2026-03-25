import { useState, useEffect } from "react";
import MenuNavegacao from "../../components/menu";

export default function Devolucao() {
    const [listaUsuarios, setListaUsuarios] = useState<any[]>([]);
    const [listaLivros, setListaLivros] = useState<any[]>([]);
    const [listaEmprestimos, setListaEmprestimos] = useState<any[]>([]);

    const [emailUsuario, setEmailUsuario] = useState("");
    const [livroIdSelecionado, setLivroIdSelecionado] = useState("");
    const [mensagem, setMensagem] = useState("");

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const resUsr = await fetch('/api/list/usuarios');
                const dataUsr = await resUsr.json();
                setListaUsuarios(dataUsr.usuarios || []);

                const resLiv = await fetch('/api/list/livros');
                const dataLiv = await resLiv.json();
                setListaLivros(dataLiv.livros || []);

                const resEmp = await fetch('/api/list/emprestimos');
                const dataEmp = await resEmp.json();
                setListaEmprestimos(dataEmp.emprestimos || []);
            } catch (error) {
                console.error("Erro ao carregar dados", error);
            }
        };
        carregarDados();
    }, []);


    const usuarioEncontrado = listaUsuarios.find(
        u => u.email.trim().toLowerCase() === emailUsuario.trim().toLowerCase()
    );

    const emprestimosAtivosDoUsuario = usuarioEncontrado
        ? listaEmprestimos.filter(emp => emp.usuarioId === usuarioEncontrado.id && emp.status === 'ativo')
        : [];

    const livrosIdsEmprestados = emprestimosAtivosDoUsuario.flatMap(emp => emp.livrosIds);

    const livrosParaDevolver = listaLivros.filter(livro => livrosIdsEmprestados.includes(livro.id));


    const handleDevolucao = async (e: React.FormEvent) => {
        e.preventDefault();
        setMensagem("A processar...");

        if (!usuarioEncontrado || !livroIdSelecionado) {
            setMensagem("Erro: Por favor, preencha os dados corretamente.");
            return;
        }

        const emprestimoAlvo = emprestimosAtivosDoUsuario.find(emp => emp.livrosIds.includes(livroIdSelecionado));

        if (!emprestimoAlvo) return;

        try {
            const response = {
                emprestimoId: emprestimoAlvo.id,
                livrosIds: [livroIdSelecionado]
            };

            const res = await fetch('/api/devolver', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(response)
            });

            const data = await res.json();

            if (!res.ok) {
                setMensagem(`Erro: ${data.mensagem}`);
            } else {
                setMensagem("Devolução realizada com sucesso!");
                setLivroIdSelecionado(""); 

                const resEmp = await fetch('/api/list/emprestimos');
                const dataEmp = await resEmp.json();
                setListaEmprestimos(dataEmp.emprestimos || []);
            }
        } catch (error) {
            setMensagem("Erro ao conectar com o servidor.");
        }
    };

    return (
        <>
            <MenuNavegacao />

            <div>
                <div className="w-full min-h-screen flex justify-center items-center flex-col gap-[8px] bg-gray-900 text-white">
                    <h1 className="text-5xl text-center mb-8">Devolução de Livros</h1>

                    <form onSubmit={handleDevolucao} className="flex flex-col justify-center items-center gap-[8px] bg-gray-700 text-white p-12 rounded-xl w-[500px] max-w-full">

                        <div className="flex flex-col gap-[8px] w-full">
                            <label htmlFor="emailUsuario">E-mail do Utilizador</label>
                            <input id="emailUsuario" type="email" value={emailUsuario} onChange={(e) => setEmailUsuario(e.target.value)}  placeholder="exemplo@email.com" required className="bg-gray-200 text-black placeholder:text-gray-500 rounded-xl py-3 px-4 outline-none w-full" />
                        </div>

                        <div className="flex flex-col gap-[8px] w-full mt-4">
                            <label htmlFor="livroId">Livro a Devolver</label>
                            <select id="livroId" value={livroIdSelecionado}  onChange={(e) => setLivroIdSelecionado(e.target.value)} required disabled={livrosParaDevolver.length === 0}  className="bg-gray-200 text-black rounded-xl py-3 px-4 outline-none w-full disabled:opacity-50" >
                                <option value="" disabled>
                                    {emailUsuario && livrosParaDevolver.length === 0
                                        ? "-- Nenhum livro pendente para este utilizador --"
                                        : "-- Escolha o livro --"}
                                </option>

                                {livrosParaDevolver.map((livro) => (
                                    <option key={livro.id} value={livro.id}>
                                        {livro.titulo} - {livro.autor}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button type="submit" disabled={livrosParaDevolver.length === 0} className="mt-8 w-full bg-green-600 hover:bg-green-500 disabled:bg-gray-500 py-3 rounded-xl cursor-pointer font-bold transition-colors" >
                            Confirmar Devolução
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
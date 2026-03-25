import MenuNavegacao from "../../components/menu";
import { useState, useEffect } from "react";

export default function CadastroEmprestimo() {
    // 1. Estados para guardar as listas vindas do banco
    const [listaUsuarios, setListaUsuarios] = useState<any[]>([]);
    const [listaLivros, setListaLivros] = useState<any[]>([]);

    // 2. Estados para capturar os dados da tela
    const [emailUsuario, setEmailUsuario] = useState(""); // Agora pedimos o e-mail
    const [livroId, setLivroId] = useState("");
    const [mensagem, setMensagem] = useState("");

    // 3. Carrega os dados ao abrir a página
    useEffect(() => {
        const carregarDados = async () => {
            try {
                const resUsr = await fetch('/api/list/usuarios');
                const dataUsr = await resUsr.json();
                setListaUsuarios(dataUsr.usuarios || []);

                const resLiv = await fetch('/api/list/livros');
                const dataLiv = await resLiv.json();
                const livrosDisponiveis = dataLiv.livros.filter((l: any) => l.quantidade > l.qtdEmprestados);
                setListaLivros(livrosDisponiveis || []);
            } catch (error) {
                console.error("Erro ao carregar dados", error);
            }
        };
        carregarDados();
    }, []);

    // 4. Função que processa o empréstimo
    const handleEmprestimo = async (e: React.FormEvent) => {
        e.preventDefault();
        setMensagem("Processando...");

        // A MÁGICA ACONTECE AQUI: Traduzimos o e-mail para ID antes de enviar!
        const usuarioEncontrado = listaUsuarios.find(
            (u) => u.email.trim().toLowerCase() === emailUsuario.trim().toLowerCase()
        );

        // Se o e-mail digitado não existir no banco, barramos aqui mesmo
        if (!usuarioEncontrado) {
            setMensagem("Erro: Usuário com este e-mail não encontrado.");
            return;
        }

        try {
            // Montando o Payload exatamente como os Requisitos pedem
            const payload = {
                usuarioId: usuarioEncontrado.id, // Usa o ID que o front-end encontrou
                livrosIds: [livroId],
                dataEmprestimo: new Date().toISOString()
            };

            const res = await fetch('/api/emprestar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (!res.ok) {
                setMensagem(`Erro: ${data.mensagem}`);
            } else {
                setMensagem("Empréstimo realizado com sucesso!");
                setEmailUsuario(""); // Limpa o campo de e-mail
                setLivroId("");      // Limpa a seleção do livro
            }
        } catch (error) {
            setMensagem("Erro ao conectar com o servidor.");
        }
    }
    return (
        <>
            <MenuNavegacao />

            <div>
                <div className="w-[100v] h-[100vh] flex justify-center items-center flex-col gap-[8px] bg-gray-900 ">
                    <h1 className="text-5xl text-center mb-8">Emprestimo de Livros</h1>
                    <form onSubmit={handleEmprestimo} action="" className="flex flex-col justify-center items-center gap-[8px] bg-gray-700 text-white p-12 rounded-xl">

                        <div className="flex flex-col gap-[8px]">
                            <label htmlFor="">Email</label>
                            <input value={emailUsuario} onChange={(e) => setEmailUsuario(e.target.value)} type="email" className="bg-gray-200 text-black placeholder:text-gray-400 rounded-xl py-2 w-108 px-4" />
                        </div>

                        <div className="flex flex-col gap-[8px]">
                            <label htmlFor="">Livro</label>
                            <select id="livroId" value={livroId} onChange={(e) => setLivroId(e.target.value)} required className="bg-gray-200 text-black placeholder:text-gray-400 rounded-xl py-4 w-108 px-2" >
                                <option value="" >-- Escolha um livro --</option>
                                {listaLivros.map((livro) => (
                                    <option key={livro.id} value={livro.id}>
                                        {livro.titulo} - {livro.autor} (Disponível: {livro.quantidade - livro.qtdEmprestados})
                                    </option>
                                ))}
                            </select>
                        </div>


                        <button type="submit" className="mt-8 w-full bg-green-600 hover:bg-green-500 py-2 rounded-xl cursor-pointer">Cadastrar</button>

                        {mensagem && (
                            <div className={`mt-4 p-3 rounded text-center w-full font-semibold ${mensagem.includes('Erro') ? 'text-red-500' : 'text-green-500'}`}>
                                {mensagem}
                            </div>
                        )}


                    </form>
                </div>
            </div>
        </>
    );
}
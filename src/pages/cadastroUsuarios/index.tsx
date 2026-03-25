import MenuNavegacao from "../../components/menu";
import { useState } from "react";


export default function CadastroUsuarios() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [autor, setAutor] = useState("");
    const [telefone, setTelefone] = useState("");
    const [mensagem, setMensagem] = useState("");


    const handleCadastro = async (e: React.FormEvent) => {
        e.preventDefault(); 

        try {
            const nomeLimpo = nome.trim().replace(/\s+/g, " ").toLowerCase();
            const emailLimpo = email.trim().replace(/\s+/g, " ").toLowerCase();
            const telefoneLimpo = telefone.trim().replace(/\s+/g, " ").toLowerCase();

            const dadosUsuario = {
                nome: nomeLimpo,
                email: emailLimpo,
                telefone: telefoneLimpo
            };

            const response = await fetch('/api/create/usuarios', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosUsuario)
            });

            const data = await response.json();

            if (!response.ok) {
                setMensagem(`Erro: ${data.mensagem}`);
            } else {
                setMensagem('Usuário registrado com sucesso!');
                setNome("");
                setEmail("");
                setTelefone("");
            }
        } catch (error) {
            setMensagem("Erro ao ligar ao servidor.");
        }
    };



    return (

        <>
            <MenuNavegacao />

            <div>
                <div className="w-[100v] h-[100vh] flex justify-center items-center flex-col gap-[8px] bg-gray-900 ">
                    <h1 className="text-5xl text-center mb-8">Cadastro de usuários</h1>
                    <form onSubmit={handleCadastro} action="" className="flex flex-col justify-center items-center gap-[8px] bg-gray-700 text-white p-12 rounded-xl">

                        <div className="flex flex-col gap-[8px]">
                            <label htmlFor="">Nome</label>
                            <input type="text" className="bg-gray-200 text-black placeholder:text-gray-400  rounded-xl py-2 w-96 px-4" value={nome} onChange={(e) => setNome(e.target.value)} required />
                        </div>

                        <div className="flex flex-col gap-[8px]">
                            <label htmlFor="">Email</label>
                            <input type="email" className="bg-gray-200 text-black placeholder:text-gray-400 rounded-xl py-2 w-96 px-4" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>

                        <div className="flex flex-col gap-[8px]">
                            <label htmlFor="">Telefone</label>
                            <input type="text" className="bg-gray-200 text-black placeholder:text-gray-400 rounded-xl py-2 w-96 px-4" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
                        </div>



                        <button type="submit" className="mt-8 w-full bg-green-600 hover:bg-green-500 py-2 rounded-xl cursor-pointer">Cadastrar</button>
                        
                        {mensagem && (
                            <div className={`mt-4 p-2 rounded text-center w-full font-semibold ${mensagem.includes('Erro') ? 'text-red-500' : 'text-green-500'}`}>
                                {mensagem}
                            </div>
                        )}

                    </form>
                </div>
            </div>
        </>
    )
}
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
                        Centralize a gestão do seu acervo. Adicione novos leitores, catalogue obras e controle o fluxo de empréstimos e devoluções em um só lugar.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-8 m-[32px] w-full max-w-7xl">

                    {/* Trocamos o NavLink pelo Link do next/link */}
                    <Link href={'/cadastro-usuarios'}>
                        <Card 
                            image="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=600&auto=format&fit=crop" 
                            descricao="Clique no botão abaixo para registrar e gerenciar os dados dos leitores." 
                            textoBotao="Cadastro de Usuários" 
                        />
                    </Link>

                    <Link href={'/cadastro-livros'}>
                        <Card 
                            image="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=600&auto=format&fit=crop" 
                            descricao="Clique no botão abaixo para catalogar novas obras, autores e edições." 
                            textoBotao="Cadastro de Livros" 
                        />
                    </Link>

                    <Link href={'/emprestimo'}>
                        <Card 
                            image="https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&auto=format&fit=crop" 
                            descricao="Clique no botão abaixo para liberar títulos para os usuários do sistema." 
                            textoBotao="Realizar Empréstimo" 
                        />
                    </Link>

                    <Link href={'/devolucao'}>
                        <Card 
                            image="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=600&auto=format&fit=crop" 
                            descricao="Clique no botão abaixo para registrar o retorno e atualizar o acervo." 
                            textoBotao="Realizar Devolução" 
                        />
                    </Link>

                </div>
            </div>
        </>
    );
}
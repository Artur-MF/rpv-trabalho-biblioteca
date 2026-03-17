import Link from "next/link";

export default function MenuNavegacao() {
    return (
        <nav className="bg-slate-900 text-white p-4 shadow-lg w-full border-b border-slate-700">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

                {/* Logo / Link para a Home */}
                <Link
                    href="/home"
                    className="text-2xl font-bold text-green-500 hover:text-green-400 transition-colors duration-300"
                >
                    📚 Biblioteca
                </Link>

                {/* Links das Páginas */}
                <ul className="flex flex-wrap justify-center gap-4 md:gap-8 font-medium">
                    <li>
                        <Link
                            href="/cadastroUsuarios"
                            className="text-slate-300 hover:text-green-400 hover:underline underline-offset-4 transition-all duration-300"
                        >
                            Usuários
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/cadastroLivros"
                            className="text-slate-300 hover:text-green-400 hover:underline underline-offset-4 transition-all duration-300"
                        >
                            Livros
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/Emprestimo"
                            className="text-slate-300 hover:text-green-400 hover:underline underline-offset-4 transition-all duration-300"
                        >
                            Emprestar
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/Devolucao"
                            className="text-slate-300 hover:text-green-400 hover:underline underline-offset-4 transition-all duration-300"
                        >
                            Devolver
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const filePath = path.join(process.cwd(), 'src', 'pages', 'api', 'bd.json');

export default function handler(req, res) {
    type Livro = {
        id: string
        titulo: string;
        autor: string;
        quantidade: number;
        qtdEmprestados: number;
    };

    type Usuario = {
        id: string;
        nome: string;
    };

    type Emprestimo = {
        id: string;
        usuarioId: string;
        livrosIds: string[];
        dataEmprestimo: string;
        status: string;
    }

    type Database = {
        livros?: Livro[];
        usuarios?: Usuario[];
        emprestimos?: Emprestimo[];
    };

    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(jsonData) as Database;

    const livros = parsed.livros ?? [];
    const usuarios = parsed.usuarios ?? [];
    const emprestimos = parsed.emprestimos ?? [];

    // console.log("Livros:", livros);
    // console.log("Usuários:", usuarios);
    // console.log("Empréstimos:", emprestimos);

    const { usuarioId, livrosIds, dataEmprestimo } = req.body;

    if (!usuarioId || !livrosIds || !dataEmprestimo) {
        return res.status(400).json({ mensagem: 'Os campos usuarioId, livrosIds e dataEmprestimo são obrigatórios.' });
    }

    if (!Array.isArray(livrosIds) || livrosIds.length === 0) {
        return res.status(400).json({
            mensagem: 'O campo livrosIds deve ser um array contendo pelo menos um ID.'
        });
    }

    const usuarioExiste = usuarios.some((u: Usuario) => u.id === usuarioId);
    if (!usuarioExiste) {
        return res.status(400).json({ mensagem: 'Usuário não encontrado.' });
    }

    const livrosParaEmprestar: Livro[] = [];


    for (const livroId of livrosIds) {
        const livroEncontrado = livros.find((l: Livro) => l.id === livroId);

        if (!livroEncontrado) {
            return res.status(400).json({
                mensagem: `Livro com ID '${livroId}' não foi encontrado.`
            });
        }

        if (livroEncontrado.quantidade <= livroEncontrado.qtdEmprestados) {
            return res.status(400).json({
                mensagem: `O livro '${livroEncontrado.titulo}' não possui cópias disponíveis no momento.`
            });
        }

        livrosParaEmprestar.push(livroEncontrado);

    }



    // console.log("Regras de negócio aprovadas!", livrosParaEmprestar)

    for (const livro of livrosParaEmprestar) {
        livro.qtdEmprestados += 1;
    }

    const novoEmprestimo: Emprestimo = {
        id: uuidv4(),
        usuarioId: usuarioId,
        livrosIds: livrosIds,
        dataEmprestimo: dataEmprestimo,
        status: "ativo"
    };

    emprestimos.push(novoEmprestimo);

    const dadosAtualizados: Database = {
        ...parsed,
        livros,
        emprestimos
    };

    fs.writeFileSync(filePath, JSON.stringify(dadosAtualizados, null, 2), 'utf-8');


    return res.status(200).json({
        mensagem: 'Empréstimo realizado com sucesso!',
        emprestimo: novoEmprestimo
    });







    // return res.status(200).json({ mensagem: 'Leitura do banco feita com sucesso!' });
}


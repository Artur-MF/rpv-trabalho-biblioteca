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
        dataDevolucao?: string;
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

    const { emprestimoId, livrosIds } = req.body;

    if (!emprestimoId || !livrosIds) {
        return res.status(400).json({ mensagem: 'Os campos email e devolução são obrigatórios.' });
    }


    if (!Array.isArray(livrosIds) || livrosIds.length === 0) {
        return res.status(400).json({
            mensagem: 'O campo livrosIds deve ser um array contendo pelo menos um ID.'
        });
    }

    const emprestimo = emprestimos.find((e: Emprestimo) => e.id === emprestimoId);

    if (!emprestimo) {
        return res.status(404).json({ mensagem: 'Empréstimo não encontrado.' });
    }


    if (emprestimo.status !== 'ativo') {
        return res.status(400).json({ mensagem: 'Este empréstimo já se encontra concluído ou inativo.' })
    }

    const livrosParaDevolver: Livro[] = [];

    for (const livroId of livrosIds) {

        if (!emprestimo.livrosIds.includes(livroId)) {
            return res.status(400).json({
                mensagem: `O livro com ID '${livroId}' não pertence a este empréstimo.`
            });
        }

        const livroEncontrado = livros.find((l: Livro) => l.id === livroId);

        if (!livroEncontrado) {
            return res.status(404).json({
                mensagem: `Erro de integridade: Livro com ID '${livroId}' não encontrado no banco de dados.`
            });

        }
        livrosParaDevolver.push(livroEncontrado);

    }

    for (const livro of livrosParaDevolver) {

        if (livro.qtdEmprestados > 0) {
            livro.qtdEmprestados -= 1;
        }
    }

    const todosDevolvidos = emprestimo.livrosIds.every((id: string) => livrosIds.includes(id));

    if (todosDevolvidos) {
        emprestimo.status = 'concluído';
        emprestimo.dataDevolucao = new Date().toISOString();
    } else {

        emprestimo.livrosIds = emprestimo.livrosIds.filter((id: string) => !livrosIds.includes(id));
    }

    const dadosAtualizados: Database = {
        ...parsed,
        livros,
        emprestimos
    };

    fs.writeFileSync(filePath, JSON.stringify(dadosAtualizados, null, 2), 'utf-8');

    return res.status(200).json({
        mensagem: todosDevolvidos
            ? 'Devolução total realizada com sucesso! Empréstimo concluído.'
            : 'Devolução parcial realizada com sucesso! Empréstimo continua ativo.',
        emprestimo: emprestimo
    });

}

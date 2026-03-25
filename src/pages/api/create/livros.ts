import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Caminho absoluto para o arquivo de dados
const filePath = path.join(process.cwd(), 'src', 'pages', 'api', 'bd.json');

export default function handler(req, res) {
    type Livro = {
        titulo: string;
        autor: string;
        genero: string;
        quantidade: number;
        qtdEmprestados: number;
        [key: string]: unknown;
    };

    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(jsonData) as { livros?: Livro[] };
    const livros = parsed.livros ?? [];

    const { titulo, autor, genero, quantidade } = req.body;

    const tituloLimpo = titulo?.trim();
    const autorLimpo = autor?.trim();
    const generoLimpo = genero?.trim();
    const quantidadeNumero = Number(quantidade);

    if (!tituloLimpo || !autorLimpo || !generoLimpo || quantidade === undefined || quantidade === null) {
        return res.status(400).json({
            mensagem: 'Todos os campos (titulo, autor, genero, quantidade) são obrigatórios.'
        });
    }

    if (!Number.isInteger(quantidadeNumero) || quantidadeNumero <= 0) {
        return res.status(400).json({
            mensagem: 'A quantidade deve ser um número inteiro positivo.'
        });
    }
    const jaExiste = livros.some(
        (livro: Livro) =>
            livro.titulo.trim().toLowerCase() === tituloLimpo.toLowerCase() &&
            livro.autor.trim().toLowerCase() === autorLimpo.toLowerCase()
    );

    if (jaExiste) {
        return res.status(400).json({ mensagem: 'Livro já cadastrado!' });
    }

    const novoLivro = {
        id: uuidv4(),
        titulo: tituloLimpo,
        autor: autorLimpo,
        genero: generoLimpo,
        quantidade: quantidadeNumero,
        qtdEmprestados: 0
    };

    livros.push(novoLivro);
    fs.writeFileSync(filePath, JSON.stringify({ ...parsed, livros }, null, 2));

    res.status(200).json({ mensagem: 'Livro cadastrado com sucesso!', livro: novoLivro });
}
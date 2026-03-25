import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Caminho absoluto para o arquivo de dados
const filePath = path.join(process.cwd(), 'src', 'pages', 'api', 'bd.json');

export default function handler(req, res) {
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(jsonData);
    const usuarios = parsed.usuarios || [];

    const { nome, email, telefone } = req.body

    if (!nome.trim().toLowerCase() || !email.trim().toLowerCase() || !telefone.trim()) {
        return res.status(400).json({ mensagem: 'Nome, email e telefone são obrigatórios.' });
    }

    // verificar se o email já existe

    const emailExiste = usuarios.some((user) =>
        user.email.trim().toLowerCase() === email.trim().toLowerCase()
    );

    if (emailExiste) {
        return res.status(400).json({
            mensagem: 'Usuário já cadastrado com este e-mail!'
        });
    }


    const novoUsuario = {
        id: uuidv4(),
        nome: nome.toLowerCase().trim(),
        email: email.toLowerCase().trim(),
        telefone: telefone.trim(),
    };

    usuarios.push(novoUsuario);
    fs.writeFileSync(filePath, JSON.stringify({ ...parsed, usuarios }, null, 2));

    res.status(200).json({ mensagem: 'Usuário cadastrado com sucesso!', usuario: novoUsuario });
}
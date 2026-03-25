import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'pages', 'api', 'bd.json');

export default function handler(req: any, res: any) {
    if (req.method !== 'GET') {
        return res.status(405).json({ mensagem: 'Método não permitido.' });
    }
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(jsonData);
    res.status(200).json({ emprestimos: data.emprestimos || [] });
}
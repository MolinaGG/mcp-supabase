import express from 'express';
import dotenv from 'dotenv';
import { getConjuntura } from './tools/getConjuntura.js';

dotenv.config();

const app = express();
app.use(express.json());

app.post('/mcp', async (req, res) => {
  try {
    const { tool, args } = req.body;

    if (tool === 'get_conjuntura') {
      const result = await getConjuntura(args || {});
      return res.json({ result });
    }

    return res.status(400).json({ error: 'Tool não encontrada' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ MCP Server rodando na porta ${port}`);
});

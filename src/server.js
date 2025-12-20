import express from 'express';
import dotenv from 'dotenv';
import { getConjuntura } from './tools/getconjuntura.js';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('MCP Server online');
});

app.post('/mcp', async (req, res) => {
  try {
    const { tool, args } = req.body;

    if (tool !== 'get_conjuntura') {
      return res.status(400).json({
        content: [{ type: 'text', text: 'Tool não encontrada' }]
      });
    }

    const result = await getConjuntura(args || {});

    if (!result) {
      return res.json({
        content: [{
          type: 'text',
          text: 'Base de conhecimento não retornou dados suficientes.'
        }]
      });
    }

    return res.json({
      content: [{
        type: 'text',
        text: result.texto
      }]
    });
  } catch (err) {
    console.error('MCP ERROR:', err);
    return res.status(500).json({
      content: [{ type: 'text', text: err.message }]
    });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`✅ MCP Server rodando na porta ${port}`);
});

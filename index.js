import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());


const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GOOGLE_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: message }] }]
            })
        });

        const data = await response.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sem resposta da IA.";

        res.json({ reply });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Proxy rodando na porta ${port}`));

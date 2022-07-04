const express = require('express');
const app = express();

const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

app.use(express.json())

app.get("/", (req, res) => {
    return res.send("Hello World")
});

app.post("/formulario", async (req, res) => {
    const { nome, email, senha } = req.body

    await prisma.usuario.create({
        data: {
            nome,
            email,
            senha
        }
    })
    return res.status(201).send("Usuário criado com sucesso");
});

app.get("/usuarios", async (req, res) => {
    const usuarios = await prisma.usuario.findMany()

    return res.status(200).send(usuarios)
});

app.listen(3030, ()=> {
    console.log('Servidor funcionando')
});

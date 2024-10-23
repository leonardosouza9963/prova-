const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const con = mysql.createConnection({
    user: 'root', 
    host: 'localhost',
    database: 'hotel'
});

// Conectar ao banco de dados
con.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados.');
});

// Rota de teste
const teste = (req, res) => {
    res.send("Back-end respondendo");
}

// CRUD - Create
const create = (req, res) => {
    const { cliente_id, nome, cpf, email, endereco, data_nascimento, data_cadastro } = req.body; 
    
    const query = 'INSERT INTO clientes (cliente_id, nome, cpf, email, endereco, data_nascimento, data_cadastro) VALUES (?, ?, ?, ?, ?, ?)';
    con.query(query, [cliente_id, nome, cpf, email, endereco, data_nascimento, data_cadastro], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'Cliente criado com sucesso', result });
        }
    });
}

// CRUD - Read
const read = (req, res) => {
    con.query("SELECT * FROM clientes", (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(result);
        }
    });
}

// CRUD - Update
const update = (req, res) => {
    const { cliente_id, nome, cpf, email, endereco, data_nascimento, data_cadastro } = req.body;

    const query = 'UPDATE clientes SET nome = ?, cpf = ?, email = ?, Endereco = ?, data_nascimento = ?, data_cadastro = ? WHERE cliente_id = ?';
    con.query(query, [cliente_id, nome, cpf, email, endereco, data_nascimento, data_cadastro], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Cliente atualizado com sucesso', result });
        }
    });
}

// CRUD - Delete
const deleteClient = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM clientes WHERE cliente_id = ?';
    con.query(query, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Cliente removido com sucesso', result });
        }
    });
}

// Configurações de saída - FrontEnd
const app = express();
app.use(express.json());
app.use(cors());

// Rotas de Saída - FrontEnd
app.get("/", teste);
app.post("/clientes", create); 
app.get("/clientes", read);


// Teste e porta no console
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});

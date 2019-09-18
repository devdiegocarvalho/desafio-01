const express = require("express");

const app = express();

const projects = [];

// Leitura de JSON no request body.
app.use(express.json());

// Rota para registrar novo projeto.
app.post("/projects", (req, res) => {
  const { id, title } = req.body;

  const newProject = {
    id,
    title,
    task: []
  };

  projects.push(newProject);
  res.json(projects);
});

// Rota que lista todos os projetos armazenados.
app.get("/projects", (req, res) => {
  return res.json(projects);
});

// Rota que permite a edição do título do projeto, refenciando pelo ID.
app.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const newProject = projects.find(p => p.id == id);

  newProject.title = title;
  return res.json(newProject);
});

// Deleta o projeto referenciando pelo ID.
app.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  const projectPos = projects.find(p => p.id == id);
  projects.splice(projectPos, 1);

  return res.send();
});

// Porta de escuta do Sever.
app.listen(3333);

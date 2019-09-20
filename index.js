const express = require("express");

const app = express();

const projects = [
  {
    id: "1",
    title: "MyProject",
    task: []
  }
];
let numberReq = 0;

// Leitura de JSON no request body.
app.use(express.json());

// Middleware global contagem de requisições.
app.use((req, res, next) => {
  numberReq++;
  console.log(`Número de requisições: ${numberReq}`);

  return next();
});

//Middleware verifica se o projeto existe.
function checkProjectExists(req, res, next) {
  const projectId = req.params.id;
  const checkIdProject = projects.find(p => p.id == projectId);

  if (!checkIdProject) {
    res.status(400).json({ message: "project do not exists" });
  }

  return next();
}

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

// Rota para listar todos os projetos armazenados.
app.get("/projects", (req, res) => {
  return res.json(projects);
});

// Rota para editar título do projeto, refenciando pelo ID.
app.put("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const newProject = projects.find(p => p.id == id);

  newProject.title = title;
  return res.json(newProject);
});

// Rota para deletar o projeto referenciando pelo ID.
app.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  const projectPos = projects.find(p => p.id == id);
  projects.splice(projectPos, 1);

  return res.send();
});

// Porta de escuta do Sever.
app.listen(3333);

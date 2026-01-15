const express = require('express');
const app = express();

app.use(express.json());

app.use('/alunos', require('./routes/alunosRoutes'));
app.use('/professores', require('./routes/professoresRoutes'));
app.use('/cursos', require('./routes/cursosRoutes'));
app.use('/disciplinas', require('./routes/disciplinasRoutes'));
app.use('/turmas', require('./routes/turmasRoutes'));
app.use('/matriculas', require('./routes/matriculasRoutes'));

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});


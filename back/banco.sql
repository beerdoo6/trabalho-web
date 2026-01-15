-- Criar banco de dados
CREATE DATABASE sistema_academico;
USE sistema_academico;

-- Tabela de Cursos
CREATE TABLE cursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    duracao_meses INT,
    status ENUM('ativo', 'inativo') DEFAULT 'ativo',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Disciplinas
CREATE TABLE disciplinas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    carga_horaria INT,
    curso_id INT,
    FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE SET NULL
);

-- Tabela de Professores
CREATE TABLE professores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    especialidade VARCHAR(100),
    data_contratacao DATE,
    status ENUM('ativo', 'inativo') DEFAULT 'ativo'
);

-- Tabela de Alunos
CREATE TABLE alunos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    data_nascimento DATE,
    endereco TEXT,
    curso_id INT,
    data_matricula DATE DEFAULT (CURRENT_DATE),
    status ENUM('ativo', 'inativo') DEFAULT 'ativo',
    FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE SET NULL
);

-- Tabela de Turmas
CREATE TABLE turmas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    disciplina_id INT,
    professor_id INT,
    horario VARCHAR(50),
    sala VARCHAR(20),
    capacidade_maxima INT,
    periodo VARCHAR(20),
    FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id) ON DELETE CASCADE,
    FOREIGN KEY (professor_id) REFERENCES professores(id) ON DELETE SET NULL
);

-- Tabela de Matrículas
CREATE TABLE matriculas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aluno_id INT NOT NULL,
    turma_id INT NOT NULL,
    data_matricula DATE DEFAULT (CURRENT_DATE),
    status ENUM('ativa', 'cancelada', 'concluida') DEFAULT 'ativa',
    nota_final DECIMAL(4,2),
    frequencia DECIMAL(5,2),
    UNIQUE KEY unique_matricula (aluno_id, turma_id),
    FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE,
    FOREIGN KEY (turma_id) REFERENCES turmas(id) ON DELETE CASCADE
);

-- Tabela de Usuários para autenticação
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    tipo ENUM('admin', 'professor', 'aluno') NOT NULL,
    referencia_id INT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir dados iniciais
INSERT INTO cursos (nome, descricao, duracao_meses) VALUES
('Ciência da Computação', 'Curso de graduação em Ciência da Computação', 48),
('Engenharia de Software', 'Curso de graduação em Engenharia de Software', 48),
('Administração', 'Curso de graduação em Administração', 36);

INSERT INTO disciplinas (nome, codigo, carga_horaria, curso_id) VALUES
('Algoritmos e Estruturas de Dados', 'CC001', 80, 1),
('Banco de Dados', 'CC002', 60, 1),
('Programação Web', 'CC003', 80, 1),
('Gestão de Projetos', 'ADM001', 60, 3);

INSERT INTO professores (nome, cpf, email, telefone, especialidade, data_contratacao) VALUES
('João Silva', '123.456.789-01', 'joao.silva@email.com', '(11) 99999-8888', 'Ciência da Computação', '2020-03-15'),
('Maria Santos', '987.654.321-09', 'maria.santos@email.com', '(11) 97777-6666', 'Banco de Dados', '2019-08-20');

INSERT INTO alunos (nome, cpf, email, telefone, data_nascimento, curso_id) VALUES
('Carlos Oliveira', '111.222.333-44', 'carlos@email.com', '(11) 95555-4444', '2000-05-10', 1),
('Ana Pereira', '555.666.777-88', 'ana@email.com', '(11) 93333-2222', '2001-08-22', 1),
('Pedro Costa', '999.888.777-66', 'pedro@email.com', '(11) 91111-0000', '1999-12-05', 3);

INSERT INTO turmas (nome, codigo, disciplina_id, professor_id, horario, sala, capacidade_maxima, periodo) VALUES
('Turma A', 'TURMA001', 1, 1, 'Segunda 14:00-16:00', 'Sala 101', 30, '2023.1'),
('Turma B', 'TURMA002', 2, 2, 'Terça 10:00-12:00', 'Sala 102', 25, '2023.1');

INSERT INTO matriculas (aluno_id, turma_id) VALUES
(1, 1),
(1, 2),
(2, 1);

-- Criar usuário admin inicial
INSERT INTO usuarios (email, senha_hash, tipo, referencia_id) VALUES
('admin@academico.com', '$2b$10$YourHashedPasswordHere', 'admin', 0);
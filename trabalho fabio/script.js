// Carrega dados salvos ou inicia com array vazio
let presencas = JSON.parse(localStorage.getItem("presencas")) || [];

const form = document.getElementById("form-presenca");
const tabela = document.getElementById("tabela-presencas");

// Atualiza a tabela com os dados
function atualizarTabela() {
  tabela.innerHTML = "";
  presencas.forEach((aluno, index) => {
    const linha = document.createElement("tr");

    linha.innerHTML = `
      <td>${aluno.nome}</td>
      <td>${aluno.matricula}</td>
      <td>${aluno.turma}</td>
      <td>${aluno.presencas.length}</td>
      <td>${aluno.presencas.join(", ")}</td>
      <td><button class="excluir" onclick="excluirAluno(${index})">Excluir</button></td>
    `;

    tabela.appendChild(linha);
  });
}

// Exclui um aluno
function excluirAluno(index) {
  if (confirm("Tem certeza que deseja excluir este aluno?")) {
    presencas.splice(index, 1);
    localStorage.setItem("presencas", JSON.stringify(presencas));
    atualizarTabela();
  }
}

// Evento de envio do formulário
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const matricula = document.getElementById("matricula").value.trim();
  const turma = document.getElementById("turma").value.trim();
  const data = document.getElementById("data").value;

  if (!nome || !matricula || !turma || !data) return;

  // Verifica se aluno já existe
  const alunoExistente = presencas.find(aluno =>
    aluno.matricula === matricula && aluno.turma === turma
  );

  if (alunoExistente) {
    // Verifica se a data já foi registrada
    if (!alunoExistente.presencas.includes(data)) {
      alunoExistente.presencas.push(data);
    } else {
      alert("Presença para essa data já registrada.");
    }
  } else {
    // Cria novo aluno
    presencas.push({
      nome,
      matricula,
      turma,
      presencas: [data]
    });
  }

  localStorage.setItem("presencas", JSON.stringify(presencas));
  form.reset();
  atualizarTabela();
});

// Atualiza a tabela ao carregar
atualizarTabela();

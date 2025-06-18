// Array que armazena as tarefas
let tarefas = [];

// Carrega as tarefas salvas no localStorage ao iniciar
window.onload = () => {
  const dadosSalvos = localStorage.getItem("tarefas");
  if (dadosSalvos) {
    tarefas = JSON.parse(dadosSalvos);
    atualizarLista();
  }
};

// Função para adicionar uma nova tarefa
function adicionarTarefa() {
  const input = document.getElementById("novaTarefa");
  const texto = input.value.trim();

  if (texto !== "") {
    tarefas.push({ descricao: texto, concluida: false }); // adiciona nova tarefa
    input.value = ""; // limpa o campo
    salvarTarefas();  // salva no localStorage
    atualizarLista(); // atualiza a exibição
  }
}

// Atualiza a lista de tarefas na tela
function atualizarLista() {
  const lista = document.getElementById("listaTarefas");
  lista.innerHTML = ""; // limpa a lista atual

  tarefas.forEach((tarefa, index) => {
    const item = document.createElement("li");

    // Cria o texto da tarefa
    const texto = document.createElement("span");
    texto.textContent = tarefa.descricao;
    texto.style.textDecoration = tarefa.concluida ? "line-through" : "none";
    texto.style.cursor = "pointer";

    // Alterna o status de concluída ao clicar no texto
    texto.onclick = () => {
      tarefas[index].concluida = !tarefas[index].concluida;
      salvarTarefas();
      atualizarLista();
    };

    // Cria o botão de exclusão ❌
    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "🗑️";
    botaoExcluir.style.marginLeft = "10px";
    botaoExcluir.onclick = () => {
      tarefas.splice(index, 1); // remove a tarefa do array
      salvarTarefas();          // atualiza o localStorage
      atualizarLista();         // atualiza a exibição
    };

    // Adiciona o texto e o botão ao item da lista
    item.appendChild(texto);
    item.appendChild(botaoExcluir);
    lista.appendChild(item);
  });
}

// Salva o array de tarefas no localStorage
function salvarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}
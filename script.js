// Simulação de dados de disciplinas do Inatel
const disciplinas = [
  {
    id: "S05",
    nome: "Interface Homem-Máquina",
    horario: "Qua · 19:00-20:40",
    creditos: 4,
    selecionada: true,
  },
  {
    id: "E01",
    nome: "Circuitos Elétricos",
    horario: "Ter · 17:10-18:50",
    creditos: 5,
    selecionada: false,
  },
  {
    id: "M02",
    nome: "Álgebra e Geometria",
    horario: "Sex · 19:00-20:40",
    creditos: 4,
    selecionada: true,
  },
  {
    id: "C12",
    nome: "Engenharia de Software",
    horario: "Seg · 20:50-22:30",
    creditos: 4,
    selecionada: false,
  },
];

// Função para exibir as disciplinas
function renderizarDisciplinas() {
  const container = document.getElementById("lista-disciplinas");

  container.innerHTML = "";

  let selecionadasCount = 0;
  let totalCreditos = 0;

  disciplinas.forEach((disc, index) => {
    if (disc.selecionada) {
      selecionadasCount++;
      totalCreditos += disc.creditos;
    }

    const item = document.createElement("div");

    item.className = `disciplina-item ${disc.selecionada ? "selected" : ""}`;

    item.innerHTML = `
      <div class="disciplina-info">

        <input
          type="checkbox"
          class="disciplina-checkbox"
          ${disc.selecionada ? "checked" : ""}
        >

        <div class="disciplina-codigo">
          ${disc.id}
        </div>

        <div class="disciplina-detalhes">
          <strong>${disc.nome}</strong>

          <p>
            <i class="fa-regular fa-clock"></i>
            ${disc.horario}
          </p>
        </div>

      </div>

      <span class="disciplina-creditos">
        ${disc.creditos} CR
      </span>
    `;

    // Evento para selecionar ou desmarcar disciplina
    item.addEventListener("click", () => {
      disciplinas[index].selecionada = !disciplinas[index].selecionada;

      renderizarDisciplinas();
    });

    container.appendChild(item);
  });

  // Atualizar contador de disciplinas
  document.getElementById("contador-badge").innerText =
    `${selecionadasCount} selecionadas`;

  // Atualizar resumo da grade
  document.getElementById("total-disciplinas").innerText = selecionadasCount;

  document.getElementById("total-creditos").innerText = totalCreditos;

  // Atualizar barra de confirmação
  document.getElementById("resumo-quantidade").innerText =
    `${selecionadasCount} disciplinas`;

  document.getElementById("resumo-creditos").innerText =
    `${totalCreditos} créditos`;
}

// Botão de confirmação
document.getElementById("confirmar-btn").addEventListener("click", () => {
  const selecionadas = disciplinas.filter((disc) => disc.selecionada);

  if (selecionadas.length === 0) {
    alert("Selecione pelo menos uma disciplina!");
    return;
  }

  alert("Sua grade foi confirmada com sucesso!");
});

// Inicializar a lista ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  renderizarDisciplinas();
});

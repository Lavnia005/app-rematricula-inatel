// Simulação de dados de disciplinas do Inatel
const disciplinas = [
  {
    id: "AT04",
    nome: "Atividade Complementar IV",
    horario: "Qua · 19:00-20:40",
    creditos: 1,
    selecionada: true,
  },
  {
    id: "E08",
    nome: "Eletrônica Digital Aplicada a Contadores e Sequenciadores",
    horario: "Ter · 17:10-18:50",
    creditos: 3,
    selecionada: false,
  },
  {
    id: "F03",
    nome: "Física Aplicada na Eletricidade e Eletromagnetismo",
    horario: "Sex · 19:00-20:40",
    creditos: 3,
    selecionada: true,
  },
  {
    id: "G04",
    nome: "Fundamentos de Gestão de Projetos",
    horario: "Seg · 20:50-22:30",
    creditos: 1,
    selecionada: false,
  },
  {
    id: "M05",
    nome: "Cálculo Aplicado à Séries e Equações Diferenciais",
    horario: "Seg · 20:50-22:30",
    creditos: 4,
    selecionada: false,
  },
  {
    id: "S01",
    nome: "Paradigmas da Programação",
    horario: "Seg · 20:50-22:30",
    creditos: 4,
    selecionada: false,
  },
  {
    id: "S05",
    nome: "Interação Homem Máquina",
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

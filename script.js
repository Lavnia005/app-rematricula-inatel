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

function renderizarDisciplinas() {
  const container = document.getElementById("lista-disciplinas");
  const badge = document.getElementById("contador-badge");
  container.innerHTML = "";

  let selecionadasCount = 0;

  disciplinas.forEach((disc, index) => {
    if (disc.selecionada) selecionadasCount++;

    const item = document.createElement("div");
    item.className = `disciplina-item ${disc.selecionada ? "selected" : ""}`;
    item.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <input type="checkbox" ${disc.selecionada ? "checked" : ""} style="width: 18px; height: 18px; accent-color: #0056b3;">
                <div>
                    <strong style="font-size: 0.9rem; color: #111;">${disc.nome}</strong>
                    <p style="font-size: 0.75rem; color: #666; margin-top: 2px;"><i class="fa-regular fa-clock"></i> ${disc.horario}</p>
                </div>
            </div>
            <span style="font-size: 0.75rem; background: #e5e7eb; padding: 4px 8px; border-radius: 6px; font-weight: 600;">${disc.creditos} CR</span>
        `;

    // Evento de clique para alternar seleção
    item.addEventListener("click", () => {
      disciplinas[index].selecionada = !disciplinas[index].selecionada;
      renderizarDisciplinas();
    });

    container.appendChild(item);
  });

  badge.innerText = `${selecionadasCount} selecionadas`;
}

// Inicializar a lista ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  renderizarDisciplinas();
});

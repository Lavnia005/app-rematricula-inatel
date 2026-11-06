// DISCIPLINAS E OPÇÕES DE HORÁRIOS

const disciplinas = [
  {
    id: "AT04",
    nome: "Atividade Complementar IV",
    creditos: 1,
    selecionada: true,
    horarios: [
      { dia: "Quarta-feira", inicio: "19:00", fim: "20:40" },
      { dia: "Quinta-feira", inicio: "17:10", fim: "18:50" },
    ],
  },
  {
    id: "E08",
    nome: "Eletrônica Digital Aplicada a Contadores e Sequenciadores",
    creditos: 3,
    selecionada: false,
    horarios: [
      { dia: "Terça-feira", inicio: "17:10", fim: "18:50" },
      { dia: "Quinta-feira", inicio: "19:00", fim: "20:40" },
    ],
  },
  {
    id: "F03",
    nome: "Física Aplicada na Eletricidade e Eletromagnetismo",
    creditos: 3,
    selecionada: true,
    horarios: [
      { dia: "Sexta-feira", inicio: "19:00", fim: "20:40" },
      { dia: "Quarta-feira", inicio: "17:10", fim: "18:50" },
    ],
  },
  {
    id: "G04",
    nome: "Fundamentos de Gestão de Projetos",
    creditos: 1,
    selecionada: false,
    horarios: [
      { dia: "Segunda-feira", inicio: "20:50", fim: "22:30" },
      { dia: "Quarta-feira", inicio: "17:10", fim: "18:50" },
    ],
  },
  {
    id: "M05",
    nome: "Cálculo Aplicado à Séries e Equações Diferenciais",
    creditos: 4,
    selecionada: false,
    horarios: [
      { dia: "Terça-feira", inicio: "19:00", fim: "20:40" },
      { dia: "Quinta-feira", inicio: "20:50", fim: "22:30" },
    ],
  },
  {
    id: "S01",
    nome: "Paradigmas da Programação",
    creditos: 4,
    selecionada: false,
    horarios: [
      { dia: "Segunda-feira", inicio: "17:10", fim: "18:50" },
      { dia: "Sexta-feira", inicio: "20:50", fim: "22:30" },
    ],
  },
  {
    id: "S05",
    nome: "Interação Homem Máquina",
    creditos: 4,
    selecionada: false,
    horarios: [
      { dia: "Quarta-feira", inicio: "20:50", fim: "22:30" },
      { dia: "Terça-feira", inicio: "19:00", fim: "20:40" },
    ],
  },
];

// HORÁRIOS ESCOLHIDOS

const horariosSelecionados = {};

// ELEMENTOS DAS TELAS

const telaPrincipal = document.querySelector(".content");
const telaHorarios = document.getElementById("tela-horarios");
const barraConfirmacao = document.querySelector(".confirm-bar");
const navegacao = document.querySelector(".bottom-nav");

// DIAS DA SEMANA

const dias = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
];

// HORÁRIOS DA GRADE

const faixasHorarios = ["17:10", "19:00", "20:50"];

// EXIBIR DISCIPLINAS

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
          <p>${disc.creditos} créditos</p>
        </div>

      </div>

      <span class="disciplina-creditos">
        ${disc.creditos} CR
      </span>
    `;

    item.addEventListener("click", () => {
      disciplinas[index].selecionada = !disciplinas[index].selecionada;

      delete horariosSelecionados[disc.id];

      renderizarDisciplinas();
    });

    container.appendChild(item);
  });

  document.getElementById("contador-badge").innerText =
    `${selecionadasCount} selecionadas`;

  document.getElementById("total-disciplinas").innerText = selecionadasCount;

  document.getElementById("total-creditos").innerText = totalCreditos;

  document.getElementById("resumo-quantidade").innerText =
    `${selecionadasCount} disciplinas`;

  document.getElementById("resumo-creditos").innerText =
    `${totalCreditos} créditos`;
}

// ABRIR SEGUNDA TELA

document.getElementById("confirmar-btn").addEventListener("click", () => {
  const selecionadas = disciplinas.filter((disc) => disc.selecionada);

  if (selecionadas.length === 0) {
    alert("Selecione pelo menos uma disciplina!");
    return;
  }

  telaPrincipal.hidden = true;
  barraConfirmacao.hidden = true;
  navegacao.hidden = true;

  telaHorarios.hidden = false;

  renderizarOpcoesHorarios();
});

// EXIBIR OPÇÕES DE HORÁRIOS

function renderizarOpcoesHorarios() {
  const container = document.getElementById("opcoes-horarios");

  container.innerHTML = "";

  const selecionadas = disciplinas.filter((disc) => disc.selecionada);

  selecionadas.forEach((disc) => {
    const card = document.createElement("div");

    card.className = "horario-card";

    card.innerHTML = `
      <span class="codigo">${disc.id}</span>

      <h3>${disc.nome}</h3>

      <p style="font-size: 0.7rem; color: #8191a1; margin-top: 5px;">
        Escolha uma opção de horário:
      </p>
    `;

    disc.horarios.forEach((horario, index) => {
      const opcao = document.createElement("label");

      const selecionado = horariosSelecionados[disc.id] === index;

      opcao.className = `horario-option ${selecionado ? "selected" : ""}`;

      opcao.innerHTML = `
        <input
          type="radio"
          name="horario-${disc.id}"
          ${selecionado ? "checked" : ""}
        >

        <div>

          <strong>Opção ${index + 1}</strong>

          <span>
            ${horario.dia} · ${horario.inicio} às ${horario.fim}
          </span>

        </div>
      `;

      opcao.addEventListener("click", () => {
        horariosSelecionados[disc.id] = index;

        renderizarOpcoesHorarios();
      });

      card.appendChild(opcao);
    });

    container.appendChild(card);
  });

  renderizarGrade();
}

// VERIFICAR CONFLITOS

function horariosConflitam(horarioA, horarioB) {
  if (horarioA.dia !== horarioB.dia) {
    return false;
  }

  return horarioA.inicio < horarioB.fim && horarioB.inicio < horarioA.fim;
}

// MONTAR GRADE SEMANAL

function renderizarGrade() {
  const grade = document.getElementById("grade-semanal");

  grade.innerHTML = "";

  const selecionadas = disciplinas.filter(
    (disc) => disc.selecionada && horariosSelecionados[disc.id] !== undefined,
  );

  faixasHorarios.forEach((hora) => {
    const linha = document.createElement("tr");

    const colunaHorario = document.createElement("td");

    colunaHorario.innerText = hora;

    linha.appendChild(colunaHorario);

    dias.forEach((dia) => {
      const coluna = document.createElement("td");

      const aulas = selecionadas.filter((disc) => {
        const horario = disc.horarios[horariosSelecionados[disc.id]];

        return horario.dia === dia && horario.inicio === hora;
      });

      if (aulas.length > 0) {
        coluna.className = "aula";

        aulas.forEach((aula) => {
          const horario = aula.horarios[horariosSelecionados[aula.id]];

          const codigo = document.createElement("strong");

          codigo.innerText = aula.id;

          const nome = document.createElement("span");

          nome.innerText = aula.nome;

          const intervalo = document.createElement("span");

          intervalo.innerText = `${horario.inicio} - ${horario.fim}`;

          coluna.appendChild(codigo);
          coluna.appendChild(nome);
          coluna.appendChild(intervalo);
        });

        if (aulas.length > 1) {
          coluna.classList.add("conflito");
        }
      } else {
        coluna.className = "vazio";

        coluna.innerText = "—";
      }

      linha.appendChild(coluna);
    });

    grade.appendChild(linha);
  });

  verificarSelecao();
}

// VERIFICAR SE TODOS OS HORÁRIOS FORAM ESCOLHIDOS

function verificarSelecao() {
  const selecionadas = disciplinas.filter((disc) => disc.selecionada);

  const todasEscolhidas = selecionadas.every(
    (disc) => horariosSelecionados[disc.id] !== undefined,
  );

  let existeConflito = false;

  for (let i = 0; i < selecionadas.length; i++) {
    for (let j = i + 1; j < selecionadas.length; j++) {
      const horarioA =
        selecionadas[i].horarios[horariosSelecionados[selecionadas[i].id]];

      const horarioB =
        selecionadas[j].horarios[horariosSelecionados[selecionadas[j].id]];

      if (horarioA && horarioB && horariosConflitam(horarioA, horarioB)) {
        existeConflito = true;
      }
    }
  }

  const botaoFinalizar = document.getElementById("finalizar-btn");

  botaoFinalizar.disabled = !todasEscolhidas || existeConflito;
}

// VOLTAR PARA PRIMEIRA TELA

document.getElementById("voltar-btn").addEventListener("click", () => {
  telaHorarios.hidden = true;

  telaPrincipal.hidden = false;
  barraConfirmacao.hidden = false;
  navegacao.hidden = false;
});

// FINALIZAR REMATRÍCULA

document.getElementById("finalizar-btn").addEventListener("click", () => {
  const selecionadas = disciplinas.filter((disc) => disc.selecionada);

  const existeConflito = selecionadas.some((disc, index) => {
    return selecionadas.slice(index + 1).some((outraDisc) => {
      const horarioA = disc.horarios[horariosSelecionados[disc.id]];

      const horarioB = outraDisc.horarios[horariosSelecionados[outraDisc.id]];

      return horariosConflitam(horarioA, horarioB);
    });
  });

  if (existeConflito) {
    alert("Existem conflitos de horários na sua grade!");
    return;
  }

  alert("Sua rematrícula foi finalizada com sucesso!");

  telaHorarios.hidden = true;

  telaPrincipal.hidden = false;
  barraConfirmacao.hidden = false;
  navegacao.hidden = false;
});

// INICIALIZAR PÁGINA

document.addEventListener("DOMContentLoaded", () => {
  renderizarDisciplinas();
});

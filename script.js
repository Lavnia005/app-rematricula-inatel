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

// ELEMENTOS DO POPUP

const modal = document.getElementById("modal-feedback");
const modalIcon = document.getElementById("modal-icon");
const modalTitulo = document.getElementById("modal-titulo");
const modalMensagem = document.getElementById("modal-mensagem");
const modalConfirmar = document.getElementById("modal-confirmar");
const modalCancelar = document.getElementById("modal-cancelar");

let acaoModal = null;
let ultimoElementoFocado = null;

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

// ABRIR POPUP PERSONALIZADO

function abrirModal(
  tipo,
  titulo,
  mensagem,
  acao = null,
  confirmar = "Entendi",
) {
  ultimoElementoFocado = document.activeElement;

  modalIcon.className = "modal-icon";

  if (tipo === "erro") {
    modalIcon.classList.add("erro");
    modalIcon.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
  } else if (tipo === "aviso") {
    modalIcon.classList.add("aviso");
    modalIcon.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>';
  } else {
    modalIcon.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
  }

  modalTitulo.textContent = titulo;
  modalMensagem.textContent = mensagem;
  modalConfirmar.textContent = confirmar;

  acaoModal = acao;

  modalCancelar.hidden = !acao;

  modal.hidden = false;

  modalConfirmar.focus();
}

// FECHAR POPUP

function fecharModal() {
  modal.hidden = true;
  acaoModal = null;

  if (ultimoElementoFocado && ultimoElementoFocado.focus) {
    ultimoElementoFocado.focus();
  }
}

modalConfirmar.addEventListener("click", () => {
  const acao = acaoModal;

  fecharModal();

  if (acao) {
    acao();
  }
});

modalCancelar.addEventListener("click", fecharModal);

// FECHAR CLICANDO FORA DO POPUP

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    fecharModal();
  }
});

// FECHAR COM A TECLA ESC

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) {
    fecharModal();
  }
});

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
          id="disc-${disc.id}"
          ${disc.selecionada ? "checked" : ""}
          aria-label="Selecionar ${disc.nome}"
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

    item.addEventListener("click", (event) => {
      if (event.target.type === "checkbox") {
        return;
      }

      alternarDisciplina(index);
    });

    const checkbox = item.querySelector("input");

    checkbox.addEventListener("change", () => {
      alternarDisciplina(index);
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

// ALTERAR SELEÇÃO DA DISCIPLINA

function alternarDisciplina(index) {
  disciplinas[index].selecionada = !disciplinas[index].selecionada;

  delete horariosSelecionados[disciplinas[index].id];

  renderizarDisciplinas();
}

// ABRIR SEGUNDA TELA

document.getElementById("confirmar-btn").addEventListener("click", () => {
  const selecionadas = disciplinas.filter((disc) => disc.selecionada);

  if (selecionadas.length === 0) {
    abrirModal(
      "aviso",
      "Nenhuma disciplina selecionada",
      "Selecione pelo menos uma disciplina antes de continuar.",
    );

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
          value="${index}"
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

// IDENTIFICAR PROBLEMAS NA GRADE

function obterEstadoGrade() {
  const selecionadas = disciplinas.filter((disc) => disc.selecionada);

  const pendentes = selecionadas.filter(
    (disc) => horariosSelecionados[disc.id] === undefined,
  );

  const conflitos = [];

  for (let i = 0; i < selecionadas.length; i++) {
    for (let j = i + 1; j < selecionadas.length; j++) {
      const discA = selecionadas[i];
      const discB = selecionadas[j];

      const opcaoA = horariosSelecionados[discA.id];
      const opcaoB = horariosSelecionados[discB.id];

      if (opcaoA === undefined || opcaoB === undefined) {
        continue;
      }

      const horarioA = discA.horarios[opcaoA];
      const horarioB = discB.horarios[opcaoB];

      if (horariosConflitam(horarioA, horarioB)) {
        conflitos.push({
          disciplinaA: discA.id,
          disciplinaB: discB.id,
          dia: horarioA.dia,
          horario: `${horarioA.inicio} às ${horarioA.fim}`,
        });
      }
    }
  }

  return {
    selecionadas,
    pendentes,
    conflitos,
  };
}

// ATUALIZAR MENSAGEM DE FEEDBACK

function atualizarFeedbackGrade(estado) {
  const feedback = document.getElementById("feedback-grade");

  feedback.className = "grade-feedback";

  const icone = feedback.querySelector("i");
  const mensagem = feedback.querySelector("span");

  if (estado.pendentes.length > 0) {
    feedback.classList.add("aviso");

    icone.className = "fa-solid fa-circle-info";

    mensagem.textContent =
      `Falta escolher o horário de ${estado.pendentes.length} disciplina(s). ` +
      "Selecione uma das opções para continuar.";
  } else if (estado.conflitos.length > 0) {
    feedback.classList.add("erro");

    icone.className = "fa-solid fa-triangle-exclamation";

    const conflito = estado.conflitos[0];

    mensagem.textContent =
      `Conflito entre ${conflito.disciplinaA} e ${conflito.disciplinaB}: ` +
      `${conflito.dia}, das ${conflito.horario}. Escolha outro horário.`;

    if (estado.conflitos.length > 1) {
      mensagem.textContent += ` Existem ${estado.conflitos.length} conflitos na grade.`;
    }
  } else {
    feedback.classList.add("sucesso");

    icone.className = "fa-solid fa-circle-check";

    mensagem.textContent =
      "Tudo certo! Todos os horários foram selecionados e não existem conflitos.";
  }
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
  const estado = obterEstadoGrade();

  const todasEscolhidas = estado.pendentes.length === 0;

  const existeConflito = estado.conflitos.length > 0;

  const botaoFinalizar = document.getElementById("finalizar-btn");

  botaoFinalizar.disabled = !todasEscolhidas || existeConflito;

  atualizarFeedbackGrade(estado);
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
  const estado = obterEstadoGrade();

  if (estado.pendentes.length > 0 || estado.conflitos.length > 0) {
    abrirModal(
      "aviso",
      "Grade incompleta",
      "Verifique os horários selecionados antes de finalizar.",
    );

    return;
  }

  abrirModal(
    "aviso",
    "Confirmar rematrícula?",
    "Confira sua grade semanal. Deseja realmente confirmar as disciplinas e os horários escolhidos?",
    processarFinalizacao,
    "Confirmar",
  );
});

// PROCESSAR FINALIZAÇÃO

function processarFinalizacao() {
  const botao = document.getElementById("finalizar-btn");

  botao.disabled = true;
  botao.classList.add("processando");

  botao.innerHTML = `
    <i class="fa-solid fa-spinner fa-spin"></i>
    Processando...
  `;

  // Simulação do processamento no protótipo

  setTimeout(() => {
    botao.classList.remove("processando");

    botao.innerHTML = `
      Finalizar rematrícula
      <i class="fa-solid fa-check"></i>
    `;

    telaHorarios.hidden = true;

    telaPrincipal.hidden = false;
    barraConfirmacao.hidden = false;
    navegacao.hidden = false;

    document.querySelector(".status-info h4").textContent = "Grade confirmada";

    document.querySelector(".status-info p").textContent =
      "Sua grade foi confirmada neste protótipo.";

    abrirModal(
      "sucesso",
      "Grade confirmada!",
      "Sua grade semanal foi confirmada com sucesso no protótipo. Todas as disciplinas e os horários foram registrados na visualização.",
      null,
      "Concluir",
    );
  }, 1000);
}

// INICIALIZAR PÁGINA

document.addEventListener("DOMContentLoaded", () => {
  renderizarDisciplinas();
});

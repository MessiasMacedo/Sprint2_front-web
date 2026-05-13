
// ==========================================
// PONTUAÇÃO DAS PERSONAS
// ==========================================

let personas = {
  "Criador de Conteúdo": 0,
  "Estudante": 0,
  "Entusiasta / Avançado": 0,
  "Cinematográfico / Storyteller": 0
};

// ==========================================
// DESCRIÇÃO DAS PERSONAS
// ==========================================

const descricaoPersonas = {

  "Criador de Conteúdo": {
    perfil: "Usa Instagram, TikTok e redes sociais.",
    gosta: ["Vídeos rápidos", "Filtros", "Selfies", "Compartilhar facilmente"],
    modos: ["📸 Foto", "📸 Foto PRO", "🎥 Vídeo", "🎥 Vídeo PRO"]
  },

  "Estudante": {
    perfil: "Usa a câmera para estudos e organização.",
    gosta: ["Fotos nítidas de textos", "Organização", "Facilidade para revisar conteúdos"],
    modos: ["📸 Foto", "🎥 Vídeo", "📚 Modo Estudante", "🌙 Noturno"]
  },

  "Entusiasta / Avançado": {
    perfil: "Curte fotografia profissional e controle manual.",
    gosta: ["Ajustar ISO", "Controle de foco", "Qualidade máxima"],
    modos: ["📸 Foto", "🎥 Vídeo", "⚙️ Modo PRO", "🎬 Vídeo PRO", "🔍 Controle manual"]
  },

  "Cinematográfico / Storyteller": {
    perfil: "Busca vídeos com aparência cinematográfica.",
    gosta: ["Vídeos bonitos", "Storytelling", "Efeitos cinematográficos"],
    modos: ["🎬 Modo Cinema", "🎥 Vídeo", "🎞️ Vídeo PRO", "🐢 Slow Motion", "⚡ Time-lapse"]
  }

};

// ==========================================
// PERGUNTAS (4 perguntas como no Python)
// ==========================================

const perguntas = [

  {
    pergunta: "O que você mais gosta de registrar?",
    respostas: [
      { texto: "👤 Momentos do dia a dia",              persona: "Criador de Conteúdo",          pontos: 2 },
      { texto: "📚 Estudos e documentos",               persona: "Estudante",                    pontos: 2 },
      { texto: "📷 Fotos com qualidade profissional",   persona: "Entusiasta / Avançado",        pontos: 2 },
      { texto: "🎬 Vídeos com estilo e criatividade",   persona: "Cinematográfico / Storyteller", pontos: 2 }
    ]
  },

  {
    pergunta: "Como você prefere usar a câmera?",
    respostas: [
      { texto: "⚡ Rápido e prático",          persona: "Criador de Conteúdo",          pontos: 1 },
      { texto: "📖 Funcional para tarefas",    persona: "Estudante",                    pontos: 1 },
      { texto: "⚙️ Com controle manual",       persona: "Entusiasta / Avançado",        pontos: 1 },
      { texto: "🎥 Com foco em vídeos e efeitos", persona: "Cinematográfico / Storyteller", pontos: 1 }
    ]
  },

  {
    pergunta: "Qual dessas opções mais combina com você?",
    respostas: [
      { texto: "🤳 Gosto de postar e compartilhar",     persona: "Criador de Conteúdo",          pontos: 2 },
      { texto: "📝 Uso para ajudar nos estudos",        persona: "Estudante",                    pontos: 2 },
      { texto: "🔧 Gosto de ajustar configurações",     persona: "Entusiasta / Avançado",        pontos: 2 },
      { texto: "🎞️ Quero criar vídeos mais elaborados", persona: "Cinematográfico / Storyteller", pontos: 2 }
    ]
  },

  {
    pergunta: "O que é mais importante pra você na câmera?",
    respostas: [
      { texto: "✨ Beleza e praticidade",     persona: "Criador de Conteúdo",          pontos: 3 },
      { texto: "📄 Clareza e leitura",        persona: "Estudante",                    pontos: 3 },
      { texto: "🎯 Qualidade e controle",     persona: "Entusiasta / Avançado",        pontos: 3 },
      { texto: "🎬 Estética e impacto visual",persona: "Cinematográfico / Storyteller", pontos: 3 }
    ]
  }

];

// ==========================================
// ESTADO
// ==========================================

let perguntaAtual = 0;

// ==========================================
// REFERÊNCIAS DOM
// ==========================================

const perguntaLabel = document.getElementById('perguntaLabel');
const perguntaEl    = document.getElementById('pergunta');
const respostasEl   = document.getElementById('respostas');
const resultadoEl   = document.getElementById('resultado');
const perguntaBox   = document.getElementById('perguntaBox');
const progressFill  = document.getElementById('progressFill');

// ==========================================
// MOSTRAR PERGUNTA
// ==========================================

function mostrarPergunta() {

  const p = perguntas[perguntaAtual];

  perguntaLabel.textContent = `Pergunta ${perguntaAtual + 1}:`;
  perguntaEl.textContent    = p.pergunta;

  // atualiza barra de progresso
  progressFill.style.width = ((perguntaAtual / perguntas.length) * 100) + '%';

  respostasEl.innerHTML = '';

  p.respostas.forEach(resposta => {

    const btn = document.createElement('button');
    btn.classList.add('resposta');
    btn.textContent = resposta.texto;

    btn.addEventListener('click', () => {

      // marca selecionado visualmente
      document.querySelectorAll('.resposta').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');

      // pontua
      personas[resposta.persona] += resposta.pontos;

      perguntaAtual++;

      setTimeout(() => {
        if (perguntaAtual < perguntas.length) {
          mostrarPergunta();
        } else {
          mostrarResultado();
        }
      }, 250);

    });

    respostasEl.appendChild(btn);

  });

}

// ==========================================
// RESULTADO FINAL
// ==========================================

function mostrarResultado() {

  progressFill.style.width = '100%';

  const personaFinal = Object.keys(personas).reduce((a, b) =>
    personas[a] > personas[b] ? a : b
  );

  const dados = descricaoPersonas[personaFinal];

  const maxPontos = Math.max(...Object.values(personas));

  // monta HTML do resultado
  resultadoEl.innerHTML = `
    <span class="resultado-tag">✅ Persona identificada</span>

    <h2>${personaFinal}</h2>

    <p class="perfil-txt">${dados.perfil}</p>

    <h3>📱 Modos ideais da câmera:</h3>
    <div class="modos-grid">
      ${dados.modos.map(m => `<span class="modo-chip">${m}</span>`).join('')}
    </div>

    <div class="pontuacao">
      <h3>📊 Pontuação final</h3>
      ${Object.entries(personas).map(([nome, pts]) => `
        <div class="barra-item">
          <div class="barra-label">
            <span>${nome}</span>
            <span>${pts} pts</span>
          </div>
          <div class="barra-track">
            <div class="barra-fill" style="width:${maxPontos > 0 ? (pts / maxPontos * 100) : 0}%"></div>
          </div>
        </div>
      `).join('')}
    </div>

    <button class="btn-refazer" onclick="reiniciar()">🔄 Refazer formulário</button>
  `;

  perguntaBox.style.display = 'none';
  resultadoEl.classList.add('show');

}

// ==========================================
// SAIR / REINICIAR
// ==========================================

function sair() {
  if (confirm('Deseja sair do formulário?')) {
    reiniciar();
  }
}

function reiniciar() {

  // reseta pontuações
  for (const key in personas) personas[key] = 0;

  perguntaAtual = 0;
  progressFill.style.width = '0%';

  resultadoEl.classList.remove('show');
  resultadoEl.innerHTML = '';

  perguntaBox.style.display = 'block';

  mostrarPergunta();

}

// ==========================================
// INICIAR
// ==========================================

mostrarPergunta();

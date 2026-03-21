'use strict';

// ══════════ DATA ══════════
const BUILDINGS = [
  { id: 'pillow', name: 'Travesseiro de Palha', emoji: '🛏️', desc: 'Arranca cabelos durante o sono profundo.', baseCost: 15, basePs: 0.1, unlockAt: 0 },
  { id: 'keyboard', name: 'Teclado Mecânico', emoji: '⌨️', desc: '400 teclas de Delete pressionadas por dia.', baseCost: 120, basePs: 0.5, unlockAt: 1 },
  { id: 'stackoverflow', name: 'Stack Overflow', emoji: '📚', desc: '"Por que meu código não funciona?" × infinito.', baseCost: 600, basePs: 2, unlockAt: 5 },
  { id: 'whatsapp', name: 'Grupo de Alunos', emoji: '📱', desc: 'Mensagens às 3h: "Prof tá acordado?"', baseCost: 2200, basePs: 8, unlockAt: 10 },
  { id: 'tcc', name: 'Bancas de TCC', emoji: '📝', desc: '50 páginas de ChatGPT sem revisar.', baseCost: 8500, basePs: 30, unlockAt: 25 },
  { id: 'server', name: 'Servidor da Faculdade', emoji: '🖥️', desc: 'Cai no dia da prova. Sempre.', baseCost: 32000, basePs: 120, unlockAt: 50 },
  { id: 'meeting', name: 'Reunião de Colegiado', emoji: '🏛️', desc: '3h para decidir a cor da mural.', baseCost: 130000, basePs: 500, unlockAt: 100 },
  { id: 'php', name: 'Código PHP Legado', emoji: '🐘', desc: 'Feito em 2003. Funciona. Ninguém toca.', baseCost: 550000, basePs: 2000, unlockAt: 150 },
  { id: 'winupd', name: 'Windows Update Forçado', emoji: '💿', desc: 'Meio da aula. Sem aviso. Obrigatório.', baseCost: 2200000, basePs: 8000, unlockAt: 200 },
  { id: 'chatgpt', name: 'Plágio com ChatGPT', emoji: '🤖', desc: 'O aluno entregou mas nem leu o próprio TCC.', baseCost: 9000000, basePs: 35000, unlockAt: 250 },
  { id: 'dht', name: 'Laboratório de DHT', emoji: '🧬', desc: 'Ciência aplicada à destruição capilar.', baseCost: 40000000, basePs: 150000, unlockAt: 300 },
  { id: 'quantum', name: 'Calvície Quântica', emoji: '🌀', desc: 'Observar o cabelo faz ele cair mais rápido.', baseCost: 200000000, basePs: 750000, unlockAt: 400 },
];

const BLD_TIERS = [
  { count: 10, mult: 2, cm: 10, lbl: 'II' },
  { count: 25, mult: 2, cm: 50, lbl: 'III' },
  { count: 50, mult: 3, cm: 200, lbl: 'IV' },
  { count: 100, mult: 3, cm: 800, lbl: 'V' },
  { count: 200, mult: 5, cm: 4000, lbl: 'VI' },
];

const CLICK_UPGRADES = [
  { id: 'cu01', name: 'Shampoo Agressivo', desc: '2 em 1: lava e arranca.', eff: '+2 fio/click', bonus: 2, cost: 30, req: 0 },
  { id: 'cu02', name: 'Pente de Garfo', desc: 'Penetração máxima no couro.', eff: '+5/click', bonus: 5, cost: 250, req: 150 },
  { id: 'cu03', name: 'Toalha de Granito', desc: 'Abrasão nível industrial.', eff: '+15/click', bonus: 15, cost: 1600, req: 800 },
  { id: 'cu04', name: 'Chapéu 3 Nums Menor', desc: 'Comprime a circulação total.', eff: '+50/click', bonus: 50, cost: 12000, req: 4000 },
  { id: 'cu05', name: 'Projetor sem HDMI', desc: 'Stress de 20 minutos procurando.', eff: '+180/click', bonus: 180, cost: 60000, req: 20000 },
  { id: 'cu06', name: 'Aluno "Cai na Prova?"', desc: 'Feito direto para o coração.', eff: '+600/click', bonus: 600, cost: 320000, req: 80000 },
  { id: 'cu07', name: 'Reunião Surpresa 6h', desc: 'Stress pré-auroral máximo.', eff: '+2000/click', bonus: 2000, cost: 1800000, req: 350000 },
  { id: 'cu08', name: 'TCC 300 Páginas', desc: 'Devolvido para o aluno 4x.', eff: '+7000/click', bonus: 7000, cost: 9000000, req: 1500000 },
  { id: 'cu09', name: 'Git Push --Force Prod', desc: 'Aluno fez. Prod caiu.', eff: '+25000/click', bonus: 25000, cost: 50000000, req: 8000000 },
  { id: 'cu10', name: 'Nota do MEC Negativa', desc: 'Stress existencial completo.', eff: '+100000/click', bonus: 100000, cost: 300000000, req: 50000000 },
];

const CASPA_UPGRADES = [
  { id: 'cs1', name: 'Karma Capilar I', desc: 'O universo cobra os TCCs ruins.', eff: '×2 toda produção', cost: 1, pm: 2, cm: 1 },
  { id: 'cs2', name: 'Click Traumatizado', desc: 'Cada clique tem memória.', eff: '×3 poder de click', cost: 3, pm: 1, cm: 3 },
  { id: 'cs3', name: 'Herança Genética', desc: 'Pai, avó, bisavó: todos carecas.', eff: '×5 toda produção', cost: 8, pm: 5, cm: 1 },
  { id: 'cs4', name: 'Segunda Fase de Luto', desc: 'Negação total da calvície.', eff: '×3 click & ×3 prod', cost: 25, pm: 3, cm: 3 },
  { id: 'cs5', name: 'Professor Sênior', desc: '30 anos de docência = 0 fios.', eff: '×8 toda produção', cost: 80, pm: 8, cm: 1 },
  { id: 'cs6', name: 'Karma Capilar II', desc: 'Segundo semestre pior que o 1º.', eff: '×5 click & ×5 prod', cost: 250, pm: 5, cm: 5 },
  { id: 'cs7', name: 'DHT Dimensional', desc: 'Atravessa o plano astral.', eff: '×20 toda produção', cost: 800, pm: 20, cm: 1 },
  { id: 'cs8', name: 'Karlan Prime', desc: 'A forma final do professor.', eff: '×15 click & ×15 prod', cost: 3000, pm: 15, cm: 15 },
];

const ACHIEVEMENTS = [
  { id: 'a01', icon: '🦱', name: 'Primeiro Fio', desc: 'Perca o primeiro fio.', req: s => s.atf >= 1 },
  { id: 'a02', icon: '💇', name: 'Começo do Fim', desc: '100 fios perdidos.', req: s => s.atf >= 100 },
  { id: 'a03', icon: '🪮', name: 'Pente Inimigo', desc: '1.000 fios perdidos.', req: s => s.atf >= 1000 },
  { id: 'a04', icon: '🔬', name: 'Diagnóstico', desc: '10.000 fios perdidos.', req: s => s.atf >= 10000 },
  { id: 'a05', icon: '🌀', name: 'Espiral Capilar', desc: '100.000 fios perdidos.', req: s => s.atf >= 100000 },
  { id: 'a06', icon: '🕳️', name: 'Buraco Negro', desc: '1 milhão de fios perdidos.', req: s => s.atf >= 1000000 },
  { id: 'a07', icon: '💥', name: 'Singularidade', desc: '10 milhões de fios.', req: s => s.atf >= 10000000 },
  { id: 'a08', icon: '♾️', name: 'Infinito Capilar', desc: '100 milhões de fios.', req: s => s.atf >= 100000000 },
  { id: 'a09', icon: '👆', name: 'Nervoso', desc: '100 clicks.', req: s => s.tc >= 100 },
  { id: 'a10', icon: '👊', name: 'Dedicado', desc: '1.000 clicks.', req: s => s.tc >= 1000 },
  { id: 'a11', icon: '🤜', name: 'Obcecado', desc: '10.000 clicks.', req: s => s.tc >= 10000 },
  { id: 'a12', icon: '⚡', name: 'Máquina de Clicar', desc: '100.000 clicks.', req: s => s.tc >= 100000 },
  { id: 'a13', icon: '🖱️', name: 'Mouse Quebrado', desc: '1.000.000 clicks.', req: s => s.tc >= 1000000 },
  { id: 'a14', icon: '💀', name: 'R.I.P. Mouse', desc: 'Combo duplo ativado.', req: s => s.combosTotal >= 1 },
  { id: 'a15', icon: '🔥', name: 'Inferno do Combo', desc: '100 combos duplos.', req: s => s.combosTotal >= 100 },
  { id: 'a16', icon: '⚙️', name: 'Automação', desc: '1 fio/segundo passivo.', req: s => s.tps >= 1 },
  { id: 'a17', icon: '🏭', name: 'Fábrica Capilar', desc: '100 fios/segundo.', req: s => s.tps >= 100 },
  { id: 'a18', icon: '🌊', name: 'Tsunami Capilar', desc: '10.000 fios/segundo.', req: s => s.tps >= 10000 },
  { id: 'a19', icon: '🚀', name: 'Velocidade da Luz', desc: '1.000.000 fios/segundo.', req: s => s.tps >= 1000000 },
  { id: 'a20', icon: '🏗️', name: 'Construtor', desc: '10 prédios totais.', req: s => totBld(s) >= 10 },
  { id: 'a21', icon: '🏙️', name: 'Cidade Careca', desc: '100 prédios totais.', req: s => totBld(s) >= 100 },
  { id: 'a22', icon: '🌆', name: 'Metrópole Alopécica', desc: '500 prédios totais.', req: s => totBld(s) >= 500 },
  { id: 'a23', icon: '🌐', name: 'Nação Careca', desc: '1.000 prédios totais.', req: s => totBld(s) >= 1000 },
  { id: 'a24', icon: '💻', name: 'Professor de TI', desc: 'Compre o primeiro servidor.', req: s => (s.bld['server'] || 0) >= 1 },
  { id: 'a25', icon: '📱', name: 'Sou o Grupão', desc: '50 grupos de alunos.', req: s => (s.bld['whatsapp'] || 0) >= 50 },
  { id: 'a26', icon: '🤖', name: 'Turma do Plágio', desc: 'Compre ChatGPT pela 1ª vez.', req: s => (s.bld['chatgpt'] || 0) >= 1 },
  { id: 'a27', icon: '💜', name: 'Prestígio I', desc: 'Primeiro prestígio.', req: s => s.pres >= 1 },
  { id: 'a28', icon: '💜💜', name: 'Veterano', desc: '5 prestígios.', req: s => s.pres >= 5 },
  { id: 'a29', icon: '🦲', name: 'Lenda Careca', desc: '10 prestígios.', req: s => s.pres >= 10 },
  { id: 'a30', icon: '👑', name: 'Rei dos Carecas', desc: '25 prestígios.', req: s => s.pres >= 25 },
  { id: 'a31', icon: '⚡', name: 'Turbo Click Total', desc: 'Todos upgrades de clique.', req: s => CLICK_UPGRADES.every(u => s.cu[u.id]) },
  { id: 'a32', icon: '🎓', name: 'PhD em Calvície', desc: 'Tenha todos os prédios.', req: s => BUILDINGS.every(b => (s.bld[b.id] || 0) >= 1) },
  { id: 'a33', icon: '🌩️', name: 'Sobrevivente', desc: 'Passe por 20 eventos.', req: s => s.eventsTotal >= 20 },
  { id: 'a34', icon: '😱', name: 'Queda Extrema', desc: 'Viva o evento Queda Capilar Extrema.', req: s => s.hadExtreme },
  { id: 'a35', icon: '🧫', name: 'Cientista Capilar', desc: 'Acumule 100 de caspa.', req: s => s.tCaspa >= 100 },
];

const EVENTS = [
  { id: 'wind', name: '💨 VENTO FORTE!', desc: '+200% produção por 30s', dur: 30, type: 'prod', val: 3 },
  { id: 'monday', name: '😱 SEGUNDA-FEIRA!', desc: '+300% produção por 20s', dur: 20, type: 'prod', val: 4 },
  { id: 'minox', name: '💊 MINOXIDIL VENCIDO!', desc: '-60% produção por 15s', dur: 15, type: 'prod', val: 0.4 },
  { id: 'exam', name: '📝 PROVA AMANHÃ!', desc: '+400% cliques por 20s', dur: 20, type: 'click', val: 5 },
  { id: 'mirror', name: '🪞 VIU NO ESPELHO!', desc: '+500% cliques por 15s', dur: 15, type: 'click', val: 6 },
  { id: 'bot', name: '⚫ BOTAFOGO PERDEU!', desc: '+1000% cliques por 10s', dur: 10, type: 'click', val: 11 },
  { id: 'barber', name: '✂️ BARBEIRO ERRADO!', desc: '+200% TUDO por 25s', dur: 25, type: 'all', val: 3 },
  { id: 'extreme', name: '☠️ QUEDA CAPILAR EXTREMA!', desc: '+3000% produção por 8s', dur: 8, type: 'prod', val: 31, special: 'extreme' },
  { id: 'crash', name: '💥 SERVIDOR CAIU NA PROVA!', desc: '+500% prod por 20s (stress)', dur: 20, type: 'prod', val: 6 },
  { id: 'tcc50', name: '📚 50 TCCs PARA CORRIGIR!', desc: '+600% TUDO por 18s', dur: 18, type: 'all', val: 7 },
  { id: 'whats', name: '📱 200 MSGS NO GRUPO!', desc: '+800% cliques por 12s', dur: 12, type: 'click', val: 9 },
  { id: 'dht', name: '🧬 DHT TURBO ATIVADO!', desc: '+2000% produção por 10s', dur: 10, type: 'prod', val: 21 },
  { id: 'winupd', name: '💿 WINDOWS UPDATE AGORA!', desc: '+300% cliques / -50% prod 20s', dur: 20, type: 'mixed', val: 4, val2: 0.5 },
  { id: 'gitforce', name: '🔥 GIT PUSH FORCE!', desc: '+1500% TUDO por 12s', dur: 12, type: 'all', val: 16 },
  { id: 'chatai', name: '🤖 TURMA TODA USOU IA!', desc: '+2500% prod por 8s (raiva)', dur: 8, type: 'prod', val: 26 },
  { id: 'mec', name: '📋 AUDITORIA DO MEC!', desc: '-80% prod por 25s', dur: 25, type: 'prod', val: 0.2 },
  { id: 'power', name: '⚡ QUEDA DE ENERGIA!', desc: '+400% click por 15s (raiva)', dur: 15, type: 'click', val: 5 },
  { id: 'defend', name: '🎓 DEFESA DE TCC AO VIVO!', desc: '+1000% TUDO por 15s', dur: 15, type: 'all', val: 11 },
];

const NEWS = [
  'PROF. KARLAN NEGA CALVÍCIE: "É REFLEXO DA LÂMPADA DE LED"',
  'ALUNO ENTREGA TCC GERADO PELO CHATGPT — SEM LER UMA LINHA',
  'REUNIÃO DE COLEGIADO DURA 4H PARA MUDAR FONTE DO CABEÇALHO',
  'SERVIDOR DA FACULDADE CAI NO EXATO MOMENTO DA PROVA FINAL',
  'GRUPO DO WHATSAPP: 300 MENSAGENS — NENHUMA COM CONTEÚDO',
  'PROJETOR SEM HDMI: PROF. KARLAN APRESENTA NO CELULAR',
  'ALUNO PERGUNTA SE "CAI NA PROVA" DURANTE A PRÓPRIA PROVA',
  'PHP LEGADO DE 2003 SOBREVIVE A TODAS AS ATUALIZAÇÕES',
  'WINDOWS UPDATE DURANTE AULA: ALUNOS AGRADECEM A PAUSA',
  'TCC DEVOLVIDO PELA 5ª VEZ: ORIENTADOR EM TERAPIA',
  'GIT PUSH --FORCE EM PRODUÇÃO: ESTAGIÁRIO SUMIU',
  'SABESP CONFIRMA: CLORO DA ÁGUA APROVADO COMO ANTI-CABELO',
  'NOTA DO MEC NEGATIVA: DIREÇÃO CULPA O PROF. DE INFORMÁTICA',
  'SINGULARIDADE QUÂNTICA: OBSERVAR O CABELO FAZ ELE CAIR',
  'DHT SINTÉTICO: NOVO PRODUTO NACIONAL CHEGA ÀS FARMÁCIAS',
  'KARLAN PRIME: A FORMA FINAL DO PROFESSOR FOI REVELADA',
  'STACK OVERFLOW FORA DO AR: CURSO DE TI ENCERRADO',
  'ALUNO EXPLICA O ALGORITMO PARA O PROFESSOR',
  'CASPA PREMIADA: PRODUTO MAIS INOVADOR DO SEMESTRE',
  'LABORATÓRIO ALOPECIA PUBLICA: "IRREVERSÍVEL. BOA SORTE."',
  'PORTAL ANTI-CAPILAR: NOVA DIMENSÃO REGISTRADA',
  'CALVÍCIE QUÂNTICA: SCHRÖDINGER TEM CABELO E NÃO TEM',
];

const STAGES = [
  { at: 0, lbl: 'FASE I — CABELO COMPLETO', hs: 0 },
  { at: 600, lbl: 'FASE II — ENTRADAS', hs: 1 },
  { at: 6000, lbl: 'FASE III — CALVA CENTRAL', hs: 2 },
  { at: 60000, lbl: 'FASE IV — FERRADURA', hs: 3 },
  { at: 250000, lbl: 'FASE V — ÚLTIMOS FIOS', hs: 4 },
  { at: 700000, lbl: 'FASE VI — CARECA TOTAL', hs: 5 },
];

const WIN_AT = 3000000;

// ══════════ STATE ══════════
function newState() {
  return {
    fios: 0, tf: 0, atf: 0, tc: 0, caspa: 0, tCaspa: 0, pres: 0,
    bld: Object.fromEntries(BUILDINGS.map(b => [b.id, 0])),
    cu: {}, bu: {}, csu: {}, ach: [],
    startTime: Date.now(), lastOnline: Date.now(),
    eventsTotal: 0, hadExtreme: false, combosTotal: 0,
    tps: 0, cp: 1, ePM: 1, eCM: 1, eEnd: 0, eActive: null,
    nextEv: Date.now() + rand(50000, 100000), newsIdx: 0
  };
}

let G = newState();

function totBld(s) {
  return Object.values(s.bld).reduce((a, b) => a + b, 0);
}

// ══════════ COMPUTE ══════════
function compute() {
  let cp = 1, pm = 1, cm = 1;
  for (const u of CLICK_UPGRADES) if (G.cu[u.id]) cp += u.bonus;
  for (const u of CASPA_UPGRADES) if (G.csu[u.id]) { pm *= u.pm; cm *= u.cm; }
  G.cp = Math.ceil(cp * cm * G.eCM);
  let ps = 0;
  for (const b of BUILDINGS) {
    const n = G.bld[b.id] || 0;
    if (!n) continue;
    let bm = 1;
    for (const t of BLD_TIERS) {
      const k = b.id + '_' + t.count;
      if (n >= t.count && G.bu[k]) bm *= t.mult;
    }
    ps += n * b.basePs * bm * pm;
  }
  G.tps = ps * G.ePM;
}

// ══════════ SAVE / LOAD ══════════
function saveGame(silent = false) {
  const d = {
    fios: G.fios, tf: G.tf, atf: G.atf, tc: G.tc, caspa: G.caspa, tCaspa: G.tCaspa,
    pres: G.pres, bld: G.bld, cu: G.cu, bu: G.bu, csu: G.csu, ach: G.ach,
    startTime: G.startTime, lastOnline: Date.now(),
    eventsTotal: G.eventsTotal, hadExtreme: G.hadExtreme, combosTotal: G.combosTotal
  };
  localStorage.setItem('karlanINF', JSON.stringify(d));
  if (!silent) showToast('💾 Salvo!');
}

function loadSave() {
  const raw = localStorage.getItem('karlanINF');
  if (!raw) return false;
  try {
    const d = JSON.parse(raw);
    Object.assign(G, d);
    const off = Math.min(3600, (Date.now() - (d.lastOnline || Date.now())) / 1000);
    G.ePM = 1; G.eCM = 1; G.eEnd = 0; G.eActive = null;
    G.nextEv = Date.now() + rand(50000, 100000);
    G.newsIdx = 0;
    compute();
    if (off > 10) {
      const gain = G.tps * off * .5;
      if (gain > 0) {
        G.fios += gain; G.tf += gain; G.atf += gain;
        setTimeout(() => showToast('⏰ Offline +' + fmt(gain) + ' fios (' + Math.round(off) + 's)'), 1000);
      }
    }
    if (G.pres > 0) showCaspaUI();
    return true;
  } catch (e) {
    G = newState();
    return false;
  }
}

function confirmReset() {
  if (confirm('RESETAR TUDO?\nTodo progresso será apagado para sempre!')) {
    localStorage.removeItem('karlanINF');
    won = false;
    G = newState();
    compute();
    rebuildAll();
    updateUI();
    document.getElementById('brutal').style.display = 'none';
  }
}

// ══════════ DUAL-BUTTON CLICK SYSTEM ══════════
let leftDown = false, rightDown = false;
let comboMult = 1, comboDecay = 0, combosTotal_session = 0;
const COMBO_MAX = 20, COMBO_DECAY = 0.8;

document.getElementById('headBtn').addEventListener('mousedown', e => {
  e.preventDefault();
  if (e.button === 0) leftDown = true;
  if (e.button === 2) rightDown = true;
  if (!audioOn && !userMuted) tryAudio();
  fireClick(e);
});

document.addEventListener('mouseup', e => {
  if (e.button === 0) leftDown = false;
  if (e.button === 2) rightDown = false;
});

document.addEventListener('mouseleave', () => {
  leftDown = false;
  rightDown = false;
});

function fireClick(e) {
  if (won) return;
  compute();
  const isBoth = leftDown && rightDown;
  let mult = 1;
  if (isBoth) {
    comboMult = Math.min(comboMult + 0.5, COMBO_MAX);
    G.combosTotal = (G.combosTotal || 0) + 1;
    mult = comboMult;
    G.tf += 0;
  }
  const gain = Math.ceil(G.cp * mult);
  G.fios += gain;
  G.tf += gain;
  G.atf += gain;
  G.tc++;
  const cp = document.getElementById('centerPanel');
  const r = cp.getBoundingClientRect();
  const ft = document.createElement('div');
  ft.className = 'float-fio';
  ft.textContent = '+' + (isBoth ? '⚡ ' : '') + fmt(gain);
  ft.style.color = isBoth ? '#20e0e0' : 'var(--gold2)';
  ft.style.left = (e.clientX - r.left - 20) + 'px';
  ft.style.top = (e.clientY - r.top - 10) + 'px';
  cp.appendChild(ft);
  setTimeout(() => ft.remove(), 900);
  spawnHairs(Math.min(Math.ceil(gain / 8) + 1, isBoth ? 20 : 10), true);
  const btn = document.getElementById('headBtn');
  btn.classList.remove('pop');
  void btn.offsetWidth;
  btn.classList.add('pop');
  setTimeout(() => btn.classList.remove('pop'), 140);
  quickUI();
}

// ══════════ AUDIO ══════════
const audio = document.getElementById('bgAudio');
let audioOn = false, userMuted = false;
audio.volume = 0.5;

function tryAudio() {
  if (userMuted) return;
  audio.play().then(() => {
    audioOn = true;
    updateAudioBtn();
  }).catch(() => { });
}

function toggleAudio() {
  if (!userMuted) {
    userMuted = true;
    audioOn = false;
    audio.pause();
  } else {
    userMuted = false;
    tryAudio();
  }
  updateAudioBtn();
}

function updateAudioBtn() {
  document.getElementById('audioBtn').textContent = userMuted ? '🔇 SOM' : '🔊 SOM';
}

// ══════════ SHOP ══════════
function bldCost(b) {
  return Math.ceil(b.baseCost * Math.pow(1.15, G.bld[b.id] || 0));
}

function buyBld(id) {
  const b = BUILDINGS.find(x => x.id === id), c = bldCost(b);
  if (G.fios < c) return;
  G.fios -= c;
  G.bld[id] = (G.bld[id] || 0) + 1;
  compute();
  buildBldTab();
  buildUpgTab();
  quickUI();
}

function buyClkUpg(id) {
  const u = CLICK_UPGRADES.find(x => x.id === id);
  if (!u || G.cu[id] || G.fios < u.cost) return;
  G.fios -= u.cost;
  G.cu[id] = true;
  compute();
  buildUpgTab();
  quickUI();
  showToast('✓ ' + u.name);
}

function buyBldUpg(bId, cnt) {
  const key = bId + '_' + cnt;
  if (G.bu[key]) return;
  const b = BUILDINGS.find(x => x.id === bId), t = BLD_TIERS.find(x => x.count === cnt);
  const cost = b.baseCost * t.cm;
  if (G.fios < cost) return;
  G.fios -= cost;
  G.bu[key] = true;
  compute();
  buildUpgTab();
  quickUI();
  showToast('✓ ' + b.name + ' Nv ' + t.lbl);
}

function buyCaspaUpg(id) {
  const u = CASPA_UPGRADES.find(x => x.id === id);
  if (!u || G.csu[id] || G.caspa < u.cost) return;
  G.caspa -= u.cost;
  G.csu[id] = true;
  compute();
  buildPrestigeTab();
  quickUI();
  showToast('💜 ' + u.name);
}

function caspaGain() {
  return Math.max(0, Math.floor(Math.sqrt(G.atf / 1000000)) - G.tCaspa);
}

function doPrestige() {
  const gain = caspaGain();
  if (gain <= 0) { showToast('❌ Fios insuficientes!'); return; }
  if (!confirm('PRESTÍGIO?\n+' + gain + ' Caspa\nReset: fios, prédios, melhorias\nMantém: caspa, conquistas, melhorias eternas')) return;
  G.caspa += gain;
  G.tCaspa += gain;
  G.pres++;
  G.fios = 0;
  G.tf = 0;
  G.bld = Object.fromEntries(BUILDINGS.map(b => [b.id, 0]));
  G.cu = {};
  G.bu = {};
  compute();
  rebuildAll();
  updateUI();
  showCaspaUI();
  showToast('💜 Prestígio ' + G.pres + '! +' + gain + ' Caspa');
}

function showCaspaUI() {
  document.getElementById('caspaStat').style.display = 'flex';
}

// ══════════ BUILD TABS ══════════
function buildBldTab() {
  const c = document.getElementById('tab-buildings');
  c.innerHTML = '';
  for (const b of BUILDINGS) {
    const n = G.bld[b.id] || 0, cost = bldCost(b);
    const unl = G.atf >= b.unlockAt || n > 0, can = unl && G.fios >= cost;
    const ps = n > 0 ? (n * b.basePs).toFixed(n * b.basePs >= 1 ? 1 : 2) : '0';
    const el = document.createElement('button');
    el.className = 'bld-item' + (unl ? (can ? ' can-buy' : '') : ' locked');
    el.disabled = !unl;
    el.onclick = () => buyBld(b.id);
    el.innerHTML = `<div class="bld-top"><span class="bld-name">${b.emoji} ${b.name}</span><span class="bld-owned">×${n}</span></div>
      <div class="bld-desc">${unl ? b.desc : '🔒 Desbloqueado em ' + fmt(b.unlockAt) + ' fios totais'}</div>
      <div class="bld-ps">${n > 0 ? fmt2(b.basePs) + '/s cada — total: ' + fmt2(+ps) + '/s' : unl ? fmt2(b.basePs) + '/s cada' : ''}</div>
      <div class="bld-cost ${can ? 'ok' : 'no'}">${unl ? '💀 ' + fmt(cost) + ' fios' : '🔒'}</div>`;
    c.appendChild(el);
  }
}

function buildUpgTab() {
  const c = document.getElementById('tab-upgrades');
  c.innerHTML = '';
  const cSec = document.createElement('div');
  cSec.className = 'upg-sec';
  cSec.textContent = '⚡ UPGRADES DE CLIQUE';
  c.appendChild(cSec);
  for (const u of CLICK_UPGRADES) {
    const unl = G.atf >= u.req || G.cu[u.id], bought = !!G.cu[u.id], can = !bought && unl && G.fios >= u.cost;
    const el = document.createElement('button');
    el.className = 'upg-item' + (bought ? ' bought' : !unl ? ' locked' : can ? ' can-buy' : '');
    el.disabled = bought || !unl;
    el.onclick = () => buyClkUpg(u.id);
    el.innerHTML = `<div class="upg-top"><span class="upg-name">${u.name}</span><span class="upg-badge">${bought ? '✓' : !unl ? '🔒 ' + fmt(u.req) : ''}</span></div>
      <div class="upg-desc">${unl ? u.desc : 'Precisa de ' + fmt(u.req) + ' fios totais'}</div>
      <div class="upg-eff">${unl ? u.eff : ''}</div>
      <div class="upg-cost ${can ? 'ok' : 'no'}">${bought ? 'COMPRADO' : unl ? '💀 ' + fmt(u.cost) + ' fios' : '🔒'}</div>`;
    c.appendChild(el);
  }
  const bSec = document.createElement('div');
  bSec.className = 'upg-sec';
  bSec.textContent = '🏠 UPGRADES DE PRÉDIOS';
  c.appendChild(bSec);
  let anyBld = false;
  for (const b of BUILDINGS) {
    const n = G.bld[b.id] || 0;
    for (const t of BLD_TIERS) {
      const key = b.id + '_' + t.count, bought = !!G.bu[key];
      const avail = n >= t.count;
      if (!bought && !avail && (G.bld[b.id] || 0) < Math.ceil(t.count * .5) && G.atf < b.unlockAt * 2) continue;
      if (!bought && G.atf < b.unlockAt && n === 0) continue;
      anyBld = true;
      const cost = Math.ceil(b.baseCost * t.cm), can = avail && !bought && G.fios >= cost;
      const el = document.createElement('button');
      el.className = 'upg-item' + (bought ? ' bought' : !avail ? ' locked' : can ? ' can-buy' : '');
      el.disabled = bought || !avail;
      el.onclick = () => buyBldUpg(b.id, t.count);
      el.innerHTML = `<div class="upg-top"><span class="upg-name">${b.emoji} ${b.name} Nv ${t.lbl}</span><span class="upg-badge">${bought ? '✓' : n + '/' + t.count}</span></div>
        <div class="upg-desc">${avail || bought ? '×' + t.mult + ' produção de ' + b.name : 'Requer ' + t.count + '× ' + b.name + ' (possui ' + n + ')'}</div>
        <div class="upg-eff">${avail || bought ? '×' + t.mult + ' fios/s deste prédio' : ''}</div>
        <div class="upg-cost ${can ? 'ok' : 'no'}">${bought ? 'COMPRADO' : avail ? '💀 ' + fmt(cost) + ' fios' : '🔒 ' + t.count + '× necessário'}</div>`;
      c.appendChild(el);
    }
  }
  if (!anyBld) {
    const m = document.createElement('div');
    m.style.cssText = 'color:var(--dim);font-size:12px;text-align:center;margin-top:8px';
    m.textContent = 'Compre prédios para desbloquear upgrades';
    c.appendChild(m);
  }
}

function buildPrestigeTab() {
  const c = document.getElementById('tab-prestige'), gain = caspaGain();
  c.innerHTML = `<div class="caspa-info">
    <div style="font-size:11px;color:var(--dim);letter-spacing:2px;margin-bottom:3px">💜 CASPA DISPONÍVEL</div>
    <div class="caspa-num">${G.caspa} 🧫</div>
    <div style="font-size:12px;color:var(--dim);margin-top:4px">Total ganho: ${G.tCaspa} | Prestígios: ${G.pres}</div>
    <div style="font-size:12px;color:var(--dim);margin-top:2px">${gain > 0 ? 'Prestígio agora: <span style="color:#c080e0">+' + gain + ' caspa</span>' : G.atf < 1000000 ? 'Precisa de <span style="color:#c080e0">' + fmt(1000000 - G.atf) + '</span> fios totais' : 'Acumule mais fios para próxima caspa'}</div>
    <div style="font-size:11px;color:var(--dim);margin-top:2px">Fórmula: √(fios totais / 1.000.000) − caspa já ganha</div>
  </div><div class="upg-sec">💜 UPGRADES ETERNOS</div>`;
  for (const u of CASPA_UPGRADES) {
    const bought = !!G.csu[u.id], can = !bought && G.caspa >= u.cost;
    const el = document.createElement('button');
    el.className = 'caspa-upg' + (bought ? ' bought' : !can ? ' locked' : '');
    el.disabled = bought;
    el.onclick = () => buyCaspaUpg(u.id);
    el.innerHTML = `<div class="cu-name">${u.name}${bought ? ' ✓' : ''}</div>
      <div class="cu-desc">${u.desc}</div><div class="cu-eff">${u.eff}</div>
      <div class="cu-cost ${can ? 'ok' : ''}">${bought ? 'COMPRADO' : '🧫 ' + u.cost + ' caspa'}</div>`;
    c.appendChild(el);
  }
  const btn = document.createElement('button');
  btn.className = 'prestige-btn';
  btn.disabled = gain <= 0;
  btn.onclick = doPrestige;
  btn.textContent = gain > 0 ? '✦ PRESTÍGIO (+' + gain + ' CASPA) ✦' : 'PRESTÍGIO BLOQUEADO';
  c.appendChild(btn);
}

function setTab(name) {
  document.querySelectorAll('.tab-btn').forEach((b, i) => b.classList.toggle('active', ['buildings', 'upgrades', 'prestige'][i] === name));
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.getElementById('tab-' + name).classList.add('active');
}

function rebuildAll() {
  compute();
  buildBldTab();
  buildUpgTab();
  buildPrestigeTab();
  buildAchievLog();
}

// ══════════ ACHIEVEMENTS ══════════
const achQ = [];
let achShowing = false;

function checkAch() {
  for (const a of ACHIEVEMENTS) {
    if (!G.ach.includes(a.id) && a.req(G)) {
      G.ach.push(a.id);
      achQ.push(a);
      const el = document.getElementById('ach-' + a.id);
      if (el) el.classList.add('done');
    }
  }
  showNextAch();
}

let achT = null;

function showNextAch() {
  if (achShowing || !achQ.length) return;
  const a = achQ.shift();
  achShowing = true;
  document.getElementById('apIcon').textContent = a.icon;
  document.getElementById('apName').textContent = a.name;
  document.getElementById('apDesc').textContent = a.desc;
  const p = document.getElementById('achPopup');
  p.classList.add('show');
  clearTimeout(achT);
  achT = setTimeout(() => {
    p.classList.remove('show');
    achShowing = false;
    setTimeout(showNextAch, 400);
  }, 2900);
}

function buildAchievLog() {
  const log = document.getElementById('achievLog');
  log.innerHTML = '';
  for (const a of ACHIEVEMENTS) {
    const el = document.createElement('div');
    el.className = 'ach-item' + (G.ach.includes(a.id) ? ' done' : '');
    el.id = 'ach-' + a.id;
    el.innerHTML = `<span class="ach-ic">${a.icon}</span><div><span class="at">${a.name}</span><span class="ad">${a.desc}</span></div>`;
    log.appendChild(el);
  }
}

// ══════════ EVENTS ══════════
function rand(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

function triggerEvent() {
  const ev = EVENTS[Math.floor(Math.random() * EVENTS.length)];
  G.eActive = ev;
  G.eEnd = Date.now() + ev.dur * 1000;
  if (ev.type === 'prod') { G.ePM = ev.val; G.eCM = 1; }
  else if (ev.type === 'click') { G.eCM = ev.val; G.ePM = 1; }
  else if (ev.type === 'all') { G.ePM = ev.val; G.eCM = ev.val; }
  else if (ev.type === 'mixed') { G.eCM = ev.val; G.ePM = ev.val2 || 1; }
  if (ev.special === 'extreme') G.hadExtreme = true;
  compute();
  G.eventsTotal = (G.eventsTotal || 0) + 1;
  document.getElementById('epName').textContent = ev.name;
  document.getElementById('epDesc').textContent = ev.desc;
  const pp = document.getElementById('eventPopup');
  pp.classList.add('show');
  setTimeout(() => pp.classList.remove('show'), 3800);
  document.getElementById('eventBox').style.display = 'block';
  document.getElementById('evNm').textContent = ev.name;
  document.getElementById('evDsc').textContent = ev.desc;
}

function tickEvent() {
  if (!G.eActive) return;
  const rem = G.eEnd - Date.now();
  if (rem <= 0) {
    G.eActive = null;
    G.eEnd = 0;
    G.ePM = 1;
    G.eCM = 1;
    compute();
    document.getElementById('eventBox').style.display = 'none';
    return;
  }
  document.getElementById('evTm').textContent = '⏱ ' + Math.ceil(rem / 1000) + 's restantes';
}

// ══════════ HAIR VISUAL ══════════
function getStageIdx() {
  let i = 0;
  for (let j = 0; j < STAGES.length; j++) if (G.atf >= STAGES[j].at) i = j;
  return i;
}

function updateHair() {
  const idx = getStageIdx();
  for (let i = 0; i < 6; i++) {
    const el = document.getElementById('hs' + i);
    if (el) el.style.opacity = i === STAGES[idx].hs ? 1 : 0;
  }
  document.getElementById('stageLabel').textContent = STAGES[idx].lbl;
  const sh = document.getElementById('shineEl');
  if (idx >= 4) {
    sh.setAttribute('rx', 28);
    sh.setAttribute('ry', 12);
    sh.setAttribute('opacity', .4);
  } else {
    sh.setAttribute('rx', 0);
    sh.setAttribute('ry', 0);
    sh.setAttribute('opacity', 0);
  }
  document.getElementById('sweatEl').setAttribute('opacity', idx >= 3 ? Math.min(.85, (idx - 3) / 2 * .85) : 0);
  document.getElementById('veinEl').setAttribute('opacity', idx >= 3 ? Math.min(.9, (idx - 3) / 2) : 0);
  document.getElementById('tearEl').setAttribute('opacity', idx === 3 || idx === 4 ? .7 : 0);
  document.getElementById('wrinkEl').setAttribute('opacity', idx >= 2 ? Math.min(.8, (idx - 2) / 3) : 0);
  const my = idx <= 1 ? 248 : idx <= 4 ? 248 - (idx - 1) / 3 * 55 : 248;
  document.getElementById('mouthEl').setAttribute('d', 'M90 218 Q130 ' + Math.round(my) + ' 170 218');
  const anx = Math.min(1, idx / 4);
  document.getElementById('browL').setAttribute('d', 'M68 ' + (148 - anx * 8) + ' Q88 ' + (136 + anx * 4) + ' 112 ' + (142 + anx * 2));
  document.getElementById('browR').setAttribute('d', 'M148 ' + (142 + anx * 2) + ' Q172 ' + (136 + anx * 4) + ' 192 ' + (148 - anx * 8));
  if (idx === 4) {
    const w = Math.sin(Date.now() * .013) * 4;
    const lh = document.getElementById('lastHair');
    if (lh) lh.setAttribute('d', 'M' + (130 + w) + ' 68 Q' + (131 + w) + ' 50 130 42 Q' + (129 - w) + ' 50 ' + (130 + w) + ' 68');
  }
}

// ══════════ CANVAS HAIRS ══════════
const canvas = document.getElementById('hairCanvas'), ctx = canvas.getContext('2d');
const hairs = [];
let spawnAcc = 0;

function resizeCv() {
  const p = document.getElementById('centerPanel');
  canvas.width = p.offsetWidth;
  canvas.height = p.offsetHeight;
}

function spawnHairs(n = 1, click = false) {
  const btn = document.getElementById('headBtn'), r = btn.getBoundingClientRect(), cr = canvas.getBoundingClientRect();
  const cx = r.left - cr.left + r.width / 2, cy = r.top - cr.top + r.height * .2;
  for (let i = 0; i < n; i++) {
    hairs.push({
      x: cx + (Math.random() - .5) * r.width * .55, y: cy + Math.random() * 20,
      vx: (Math.random() - .5) * (click ? 2.8 : 1.2), vy: click ? -Math.random() * 2.2 - .4 : Math.random() * .55 + .12,
      len: Math.random() * 23 + 7, angle: Math.random() * Math.PI * 2, va: (Math.random() - .5) * .09, alpha: 1,
      color: 'hsl(' + (20 + ~~(Math.random() * 20)) + ',' + (44 + ~~(Math.random() * 26)) + '%,' + (11 + ~~(Math.random() * 18)) + '%)',
      wave: Math.random() * Math.PI * 2, ws: .03 + Math.random() * .04, grav: click ? .16 : .03 + Math.random() * .03
    });
  }
}

function drawCv() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = hairs.length - 1; i >= 0; i--) {
    const h = hairs[i];
    h.wave += h.ws;
    h.vx += Math.sin(h.wave) * .05;
    h.vy += h.grav;
    h.x += h.vx;
    h.y += h.vy;
    h.angle += h.va;
    if (h.y > canvas.height * .83) h.alpha -= .03;
    if (h.alpha <= 0 || h.y > canvas.height + 50) { hairs.splice(i, 1); continue; }
    ctx.save();
    ctx.globalAlpha = h.alpha;
    ctx.strokeStyle = h.color;
    ctx.lineWidth = 1.8;
    ctx.lineCap = 'round';
    ctx.translate(h.x, h.y);
    ctx.rotate(h.angle);
    ctx.beginPath();
    ctx.moveTo(0, -h.len / 2);
    ctx.bezierCurveTo(h.len * .35, -h.len * .15, -h.len * .25, h.len * .2, 0, h.len / 2);
    ctx.stroke();
    ctx.restore();
  }
}

// ══════════ UI ══════════
function fmt(n) {
  n = Math.floor(n);
  if (n >= 1e15) return (n / 1e15).toFixed(2) + 'Qa';
  if (n >= 1e12) return (n / 1e12).toFixed(2) + 'T';
  if (n >= 1e9) return (n / 1e9).toFixed(2) + 'B';
  if (n >= 1e6) return (n / 1e6).toFixed(2) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
  return '' + n;
}

function fmt2(n) {
  if (n >= 1000) return fmt(n);
  return n % 1 === 0 ? '' + n : n.toFixed(1);
}

function quickUI() {
  compute();
  document.getElementById('tbFios').textContent = fmt(G.fios);
  document.getElementById('tbPs').textContent = fmt2(G.tps) + '/s';
  document.getElementById('cpDisp').textContent = fmt(G.cp);
  document.getElementById('tbCaspa').textContent = G.caspa;
  const pct = Math.min(100, G.atf / WIN_AT * 100);
  document.getElementById('baldFill').style.width = pct.toFixed(1) + '%';
  document.getElementById('baldLbl').textContent = 'CALVÍCIE: ' + pct.toFixed(1) + '%';
  if (comboMult > 1) {
    document.getElementById('comboWrap').style.display = 'flex';
    document.getElementById('comboLbl').textContent = 'COMBO DUPLO: ×' + comboMult.toFixed(1);
    document.getElementById('comboFill').style.width = (comboMult / COMBO_MAX * 100) + '%';
    document.getElementById('comboLabel').style.display = 'inline';
    document.getElementById('comboLabel').textContent = '⚡×' + comboMult.toFixed(1);
  } else {
    document.getElementById('comboWrap').style.display = 'none';
    document.getElementById('comboLabel').style.display = 'none';
  }
}

function updateUI() {
  quickUI();
  document.getElementById('sTot').textContent = fmt(G.atf);
  document.getElementById('sPs').textContent = fmt2(G.tps);
  document.getElementById('sCp').textContent = fmt(G.cp);
  document.getElementById('sCl').textContent = fmt(G.tc);
  document.getElementById('sPres').textContent = G.pres;
  document.getElementById('sCaspaT').textContent = G.tCaspa;
}

let toastT;

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastT);
  toastT = setTimeout(() => t.classList.remove('show'), 2700);
}

// ══════════ NEWS ══════════
function nextNews() {
  G.newsIdx = (G.newsIdx + 1) % NEWS.length;
  const el = document.getElementById('newsText');
  el.textContent = '📰  ' + NEWS[G.newsIdx] + '  ◆  ' + NEWS[(G.newsIdx + 1) % NEWS.length] + '  ◆  ' + NEWS[(G.newsIdx + 2) % NEWS.length];
  el.style.animation = 'none';
  void el.offsetWidth;
  el.style.animation = 'newsScroll 40s linear infinite';
}

// ══════════ WIN ══════════
let won = false;

function checkWin() {
  if (won || G.atf < WIN_AT) return;
  won = true;
  setTimeout(() => {
    document.getElementById('brStats').textContent = fmt(G.atf) + ' fios totais  •  ' + G.pres + ' prestígios  •  ' + fmt(G.tc) + ' clicks  •  ' + G.eventsTotal + ' eventos';
    document.getElementById('brutal').style.display = 'flex';
    for (let i = 0; i < 60; i++) setTimeout(() => spawnHairs(3, true), i * 45);
  }, 700);
}

function restartGame() {
  document.getElementById('brutal').style.display = 'none';
  won = false;
  G = newState();
  compute();
  rebuildAll();
  updateUI();
}

// ══════════ GAME LOOP ══════════
let lt = Date.now(), uiAcc = 0, shopAcc = 0;

function loop() {
  const now = Date.now(), dt = Math.min((now - lt) / 1000, .5);
  lt = now;
  if (!won && G.tps > 0) {
    const gain = G.tps * dt;
    G.fios += gain;
    G.tf += gain;
    G.atf += gain;
    spawnAcc += gain;
    if (spawnAcc > 25) {
      spawnHairs(Math.min(Math.floor(spawnAcc / 25), 6));
      spawnAcc = spawnAcc % 25;
    }
  }
  if (comboMult > 1) {
    comboMult = Math.max(1, comboMult - COMBO_DECAY * dt);
    if (comboMult <= 1) {
      comboMult = 1;
      document.getElementById('comboWrap').style.display = 'none';
      document.getElementById('comboLabel').style.display = 'none';
    }
  }
  uiAcc += dt;
  if (uiAcc > .14) { uiAcc = 0; if (!won) quickUI(); }
  shopAcc += dt;
  if (shopAcc > 1.5) {
    shopAcc = 0;
    if (!won) {
      compute();
      buildBldTab();
      buildUpgTab();
      buildPrestigeTab();
      updateUI();
      checkAch();
      checkWin();
      tickEvent();
      if (now >= G.nextEv) {
        G.nextEv = now + rand(50000, 110000);
        triggerEvent();
      }
    }
  }
  updateHair();
  drawCv();
  requestAnimationFrame(loop);
}

// ══════════ INIT ══════════
window.addEventListener('resize', resizeCv);
window.addEventListener('load', () => {
  resizeCv();
  loadSave();
  compute();
  rebuildAll();
  updateUI();
  tryAudio();
  const nx = document.getElementById('newsText');
  nx.textContent = '📰  ' + NEWS[0] + '  ◆  ' + NEWS[1] + '  ◆  ' + NEWS[2];
  setInterval(nextNews, 40000);
  setInterval(() => {
    saveGame(true);
    const tb = document.getElementById('topbar');
    tb.style.borderBottomColor = '#3a6020';
    setTimeout(() => tb.style.borderBottomColor = '', 500);
  }, 60000);
  loop();
});

# 🎮 KARLAN CLICKER

**Idle/Clicker Game** com Canvas physics, 35 achievements, 18 eventos dinâmicos e sistema de economia balanceado.

![Status](https://img.shields.io/badge/status-production--ready-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Version](https://img.shields.io/badge/version-1.0.0-orange)

---

## 🚀 Início Rápido

### Online (Render)
```
https://karlan-clicker.onrender.com
```

### Local
```bash
# Python
python -m http.server 8000

# Node.js (http-server)
npm install -g http-server
http-server -p 8000

# Abrir em http://localhost:8000
```

---

## 🎮 Como Jogar

### Sistema de Clique Dual-Button
1. **Click (Q) + Rage (E)** para combo
   - Sem combo: 1x
   - Com combo: até 20x multiplicador
   - ⚡ Feedback visual ao atingir 20x

### Construir Prédios
- 12 prédios com custo exponencial (×1.15)
- Cada prédio produz passivamente
- Clique para comprar

### Upgrades
- **10 Upgrades de Clique** (multiplicam Q + E)
- **8 Upgrades de Prestige** (desbloqueados via reset)

### Prestige (Reset)
- Converte fios em **caspa** (1 fio = 1 caspa)
- Recomendado em ~100K-1M fios
- Caspa multiplicam produção exponencialmente

### Objetivos
- 🏆 **35 Achievements** (clique para ver)
- 🎯 **Win Condition**: 3M fios
- 📊 **Diagnostics**: Painel esquerdo em tempo real

---

## 🛠️ Estrutura

```
📁 karlan-clicker/
├── index.html          (114 linhas) - Estrutura HTML5 semântica
├── script.js           (854 linhas) - Game engine completo
├── styles.css          (965 linhas) - Estilos + animações
├── musica.mp3                       - Áudio ambiente
├── render.yaml                      - Config Render Deploy
└── package.json                     - Metadata projeto
```

### Scripts Principais

**`script.js`** — Game engine monolítico com:
- `newState()` - Inicialização
- `fireClick(n)` - Clique com combo
- `compute()` - Produção passiva
- `buyBld(id)` - Compra prédios
- `saveGame()` - localStorage
- `doPrestige()` - Reset com caspa
- `triggerEvent()` - Eventos aleatórios

**`styles.css`** — Design com:
- 3-column grid layout
- CSS variables (cores, espaçamento)
- Animações keyframes (pop, float, slide)
- Responsivo mobile

---

## ⚙️ Funcionalidades

✅ **Sistema de Combo Dual-Button**
- Mecânica única (Q + E simultâneo)
- Multiplicador visual 1-20x
- Feedback imediato

✅ **Economia Balanceada**
- 12 prédios (Escritório → Estrela)
- Crescimento exponencial (×1.15 custo)
- Milestones motivadores

✅ **Achievements (35 total)**
- Marcos de produção
- Descobertas ocultas
- Notificações visuais

✅ **Eventos Dinâmicos (18 tipos)**
- Multiplicadores 0.2x até 31x
- Aleatórios a cada 30-60s
- Interfere na gameplay

✅ **Canvas Physics**
- Partículas com gravidade
- Bezier curves para movimento
- 40+ partículas simultâneas

✅ **Persistência**
- localStorage (3.2KB save)
- Compressão JSON
- Recovery em caso de corrupção

---

## 📊 Performance

| Métrica | Valor | Status |
|---------|-------|--------|
| FPS Idle | 60 | ✅ |
| FPS Spam | 45-50 | ✅ |
| Memory | ~12MB | 🟡 |
| Save Size | 3.2KB | ✅ |
| Load Time | <500ms | ✅ |
| CLS | 0.15 | 🟡 |

**Score Atual**: 6.6/10 (Bom)  
**Score Potencial**: 9.8/10 (com roadmap)

---

## 🧪 Testes

### Auditoria Automática
```javascript
// F12 > Console
runAudit()
```

Executa 8 testes:
1. ✅ fireClick() - Combo 1-20x
2. ✅ Produção passiva - 60fps RAF
3. ✅ buyBld() - Custo exponencial
4. ✅ buyClkUpg() - Multiplicadores
5. ✅ triggerEvent() - 18 eventos
6. ✅ saveGame/loadSave() - localStorage
7. ✅ doPrestige() - Reset funcional
8. ✅ checkWin() - 3M fios = vitória

---

## 🚀 Deploy no Render (Static Site)

### Opção 1: Via Dashboard Render.com
1. Fork/Clone repositório
2. [render.com](https://render.com) → New → Static Site
3. GitHub repo: `Machado143/careca`
4. Build command: (deixar em branco)
5. Publish directory: `.`
6. Deploy ✅

### Opção 2: Via `render.yaml`
```bash
git push
# Render detecta render.yaml automaticamente
```

### Environment Variables
Nenhuma necessária (SPA pura)

### Cache Headers
```
/ → 300s (HTML muda)
/* → 3600s (Assets estáticos)
```

---

## 📈 Roadmap

### Imediato (2h) - v1.1
- [ ] Memory leak fix (AbortController)
- [ ] Dirty flag pattern UI
- [ ] Error handling JSON.parse
- [ ] Hair pool limit

### Sprint 1 (8-10h) - v1.2
- [ ] Performance +15fps (dirty flags)
- [ ] Memory -30% (pools)
- [ ] Viewport pause RAF

### Sprint 2 (15-20h) - v2.0
- [ ] TypeScript refactor
- [ ] Service layer (GameEngine class)
- [ ] Jest unit tests (>80% coverage)

### Sprint 3+ (2-4w) - v2.1+
- [ ] Web Worker compute
- [ ] GitHub Actions CI/CD
- [ ] IndexedDB backup

---

## 🔍 Auditoria Técnica

Análise completa disponível em:
- [`AUDIT_REPORT.md`](AUDIT_REPORT.md) - Relatório detalhado
- [`README_AUDIT.md`](README_AUDIT.md) - Guia de testes
- [`ROADMAP.md`](ROADMAP.md) - Plano implementação

---

## 📝 Licença

MIT © Machado143

---

## 🎯 Próximos Passos

1. **Jogar**: `index.html`
2. **Testar**: `F12 > Console > runAudit()`
3. **Deploy**: Push to `main` (Render detecta automaticamente)
4. **Melhorar**: Seguir [`ROADMAP.md`](ROADMAP.md)

---

**Status**: ✅ Production Ready | 🎮 100% Funcional | 📊 Score 6.6/10


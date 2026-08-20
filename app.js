let allPlayers = [];
let draftedSquad = [];
let foreignCount = 0;

const drawBtn = document.getElementById('draw-btn');
const simBtn = document.getElementById('sim-btn');
const cardOptions = document.getElementById('card-options');
const rosterGrid = document.getElementById('roster');
const foreignCountEl = document.getElementById('foreign-count');
const squadCountEl = document.getElementById('squad-count');
const simResultsEl = document.getElementById('sim-results');

async function initApp() {
  try {
    const res = await fetch('players.json');
    allPlayers = await res.json();
    renderEmptyRoster();
  } catch (err) {
    console.error('Failed to load player database:', err);
  }
}

function renderEmptyRoster() {
  rosterGrid.innerHTML = '';
  for (let i = 1; i <= 11; i++) {
    const slot = document.createElement('div');
    slot.className = 'roster-slot';
    slot.innerText = `Slot ${i}: Empty`;
    rosterGrid.appendChild(slot);
  }
}

drawBtn.addEventListener('click', () => {
  if (draftedSquad.length >= 11) return;

  const available = allPlayers.filter(
    p => !draftedSquad.some(s => s.id === p.id)
  );

  const shuffled = [...available].sort(() => 0.5 - Math.random());
  const choices = shuffled.slice(0, 2);

  cardOptions.innerHTML = '';
  choices.forEach(player => {
    const card = document.createElement('div');
    card.className = 'player-card';
    card.innerHTML = `
      <h3>${player.name}</h3>
      <p><strong>Role:</strong> ${player.role}</p>
      <p><strong>Era:</strong> ${player.team_era}</p>
      <p>BAT: ${player.batting} | BOW: ${player.bowling}</p>
      ${player.is_foreign ? '<span style="color:#facc15;">✈️ Overseas</span>' : ''}
    `;
    card.addEventListener('click', () => selectPlayer(player));
    cardOptions.appendChild(card);
  });
});

function selectPlayer(player) {
  if (player.is_foreign && foreignCount >= 4) {
    alert('Maximum 4 overseas players allowed!');
    return;
  }

  draftedSquad.push(player);
  if (player.is_foreign) foreignCount++;

  updateUI();
  cardOptions.innerHTML = '';

  if (draftedSquad.length === 11) {
    drawBtn.disabled = true;
    simBtn.disabled = false;
  }
}

function updateUI() {
  foreignCountEl.innerText = `${foreignCount} / 4`;
  squadCountEl.innerText = `${draftedSquad.length} / 11`;

  const slots = rosterGrid.querySelectorAll('.roster-slot');
  draftedSquad.forEach((p, idx) => {
    slots[idx].innerText = `${idx + 1}. ${p.name} (${p.role})`;
    slots[idx].style.borderColor = '#38bdf8';
  });
}

simBtn.addEventListener('click', () => {
  const totalBatting = draftedSquad.reduce((acc, p) => acc + p.batting, 0);
  const totalBowling = draftedSquad.reduce((acc, p) => acc + p.bowling, 0);
  const teamScore = totalBatting + totalBowling;
  
  const opponentScore = 1600;
  const winProb = teamScore / (teamScore + opponentScore);

  let wins = 0;
  for (let m = 1; m <= 14; m++) {
    if (Math.random() < winProb) wins++;
  }

  const losses = 14 - wins;
  simResultsEl.innerHTML = `
    <p>Final Record: <span style="color:#38bdf8">${wins}-${losses}</span></p>
    <p>${wins === 14 ? '🏆 PERFECT 14-0 SEASON! UNBEATEN!' : 'Good attempt! Try drafting a higher-rated XI.'}</p>
  `;
});

initApp();
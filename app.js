let allPlayers = [];
let draftedSquad = [];
let foreignCount = 0;

// Enforce squad position sequence (11 total)
const SQUAD_STRUCTURE = [
  { id: 1, role: 'Opener' },
  { id: 2, role: 'Opener' },
  { id: 3, role: 'Middle Order' },
  { id: 4, role: 'Middle Order' },
  { id: 5, role: 'Middle Order' },
  { id: 6, role: 'Wicketkeeper' },
  { id: 7, role: 'All-Rounder' },
  { id: 8, role: 'All-Rounder' },
  { id: 9, role: 'Bowler' },
  { id: 10, role: 'Bowler' },
  { id: 11, role: 'Bowler' }
];

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
  SQUAD_STRUCTURE.forEach(slot => {
    const div = document.createElement('div');
    div.className = 'roster-slot';
    div.innerText = `Slot ${slot.id}: ${slot.role}`;
    rosterGrid.appendChild(div);
  });
}

drawBtn.addEventListener('click', () => {
  if (draftedSquad.length >= 11) return;

  const currentRequirement = SQUAD_STRUCTURE[draftedSquad.length];
  
  // 1. Filter out players already drafted
  // 2. Filter players matching the required position
  let available = allPlayers.filter(
    p => p.role === currentRequirement.role && !draftedSquad.some(s => s.id === p.id)
  );

  // If foreign cap reached (4/4), exclude foreign choices
  if (foreignCount >= 4) {
    available = available.filter(p => !p.is_foreign);
  }

  if (available.length < 2) {
    alert(`Not enough available players left for role: ${currentRequirement.role}`);
    return;
  }

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
  
  // Render filled slots
  draftedSquad.forEach((p, idx) => {
    slots[idx].innerText = `${idx + 1}. ${p.name} (${p.role})`;
    slots[idx].style.borderColor = '#38bdf8';
    slots[idx].classList.add('filled');
  });

  // Prompt next target slot role on draw button text
  if (draftedSquad.length < 11) {
    const nextRole = SQUAD_STRUCTURE[draftedSquad.length].role;
    drawBtn.innerText = `Draft ${nextRole}`;
  } else {
    drawBtn.innerText = `Draft Complete`;
  }
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
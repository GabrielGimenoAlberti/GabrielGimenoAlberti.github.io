const pokemonCache = {};
const team = [];

const input = document.getElementById('pokemon-input');
const findBtn = document.getElementById('find-btn');
const pokemonSection = document.getElementById('pokemon-section');
const teamSection = document.getElementById('team-section');
const teamBody = document.getElementById('team-body');
const pokemonImage = document.getElementById('pokemon-image');
const pokemonNameEl = document.getElementById('pokemon-name');
const pokemonIdEl = document.getElementById('pokemon-id');
const pokemonAudio = document.getElementById('pokemon-audio');
const addBtn = document.getElementById('add-btn');
const addMessage = document.getElementById('add-message');

const moveSelects = [
  document.getElementById('move-1'),
  document.getElementById('move-2'),
  document.getElementById('move-3'),
  document.getElementById('move-4'),
];

let currentPokemon = null;

async function fetchPokemon(nameOrId) {
  const key = String(nameOrId).toLowerCase().trim();
  if (pokemonCache[key]) return pokemonCache[key];

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${key}`);
  if (!res.ok) throw new Error(`Pokémon "${nameOrId}" not found.`);

  const data = await res.json();
  pokemonCache[key] = data;
  return data;
}

function displayPokemon(data) {
  pokemonNameEl.textContent = data.name;
  pokemonIdEl.textContent = `#${String(data.id).padStart(3, '0')}`;

  pokemonImage.src = data.sprites.other['official-artwork'].front_default;
  pokemonImage.alt = data.name;

  pokemonAudio.src = data.cries.latest;
  pokemonAudio.load();

  const moves = data.moves.map(m => m.move.name).sort();
  moveSelects.forEach(sel => {
    sel.innerHTML = '<option value="">-- Select Move --</option>';
    moves.forEach(moveName => {
      const opt = document.createElement('option');
      opt.value = moveName;
      opt.textContent = moveName;
      sel.appendChild(opt);
    });
  });

  addMessage.textContent = '';
  pokemonSection.style.display = 'block';
}

findBtn.addEventListener('click', async () => {
  const query = input.value.trim();
  if (!query) {
    alert('Please enter a Pokémon name or ID.');
    return;
  }

  findBtn.disabled = true;
  findBtn.textContent = 'Loading…';

  try {
    const data = await fetchPokemon(query);
    currentPokemon = data;
    displayPokemon(data);
  } catch (err) {
    alert(err.message);
    pokemonSection.style.display = 'none';
    currentPokemon = null;
  } finally {
    findBtn.disabled = false;
    findBtn.textContent = 'Find';
  }
});

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') findBtn.click();
});

addBtn.addEventListener('click', () => {
  if (!currentPokemon) return;

  if (team.length >= 6) {
    addMessage.style.color = '#ff6b6b';
    addMessage.textContent = 'Your team is full! (Max 6 Pokémon)';
    return;
  }

  const entry = {
    name: currentPokemon.name,
    sprite: currentPokemon.sprites.front_default,
    moves: moveSelects.map(sel => sel.value).filter(v => v !== ''),
  };

  team.push(entry);
  renderTeam();

  addMessage.style.color = '#3ddc84';
  addMessage.textContent = `${currentPokemon.name} added to team!`;
});

function renderTeam() {
  teamBody.innerHTML = '';

  team.forEach(entry => {
    const row = document.createElement('tr');

    const pokemonCell = document.createElement('td');
    pokemonCell.innerHTML = `
      <div class="team-pokemon-cell">
        <img src="${entry.sprite}" alt="${entry.name}" class="team-sprite" />
        <span class="team-pokemon-name">${entry.name}</span>
      </div>
    `;

    const movesCell = document.createElement('td');
    const movesDiv = document.createElement('div');
    movesDiv.className = 'team-moves';
    entry.moves.forEach(move => {
      const badge = document.createElement('span');
      badge.className = 'team-move';
      badge.textContent = move;
      movesDiv.appendChild(badge);
    });
    movesCell.appendChild(movesDiv);

    row.appendChild(pokemonCell);
    row.appendChild(movesCell);
    teamBody.appendChild(row);
  });

  teamSection.style.display = team.length > 0 ? 'block' : 'none';
}
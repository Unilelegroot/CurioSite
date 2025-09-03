const INITIAL_DATA = [
  {
    id: 'c1',
    title: '✨ Olhando para as estrelas vemos o passado',
    text: 'A luz viaja a uma velocidade finita (≈300.000 km/s). Isso significa que, quando vemos uma estrela a 100 anos-luz de distância, estamos vendo como ela era há 100 anos. Observar o céu é, na prática, olhar para diferentes momentos do passado do Universo.',
    image: 'https://images.unsplash.com/photo-1508402476522-c77c2fa4479d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Astronomia',
    tags: ['estrelas','astronomia','galáxia', 'céu', 'física', 'espaço']
  },
  {
    id: 'c2',
    title: '☀ O Sol domina o Sistema Solar',
    text: 'O Sol concentra 99,86% de toda a massa do Sistema Solar. Todos os planetas, luas, asteroides e cometas juntos representam apenas 0,14%. É essa imensa gravidade que mantém tudo orbitando ao seu redor.',
    image: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Astronomia',
    tags: ['planetas','astronomia','galáxia', 'sol', 'física', 'espaço']
  },
  {
    id: 'c3',
    title: '⚡ O relâmpago mais longo da história',
    text: 'Em 2020, a Organização Meteorológica Mundial registrou um relâmpago que percorreu mais de 700 km sobre o sul dos Estados Unidos. Ele se estendeu por estados inteiros, quebrando o recorde mundial anterior e provando que tempestades podem gerar fenômenos muito maiores do que imaginamos.',
    image: 'https://images.unsplash.com/photo-1465799522714-8eb0e6fccf73?q=80&w=1013&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Climatologia',
    tags: ['fenômeno','espaço','clima', 'relâmpago', 'climatologia']
  },
  {
    id: 'c4',
    title: '🕳 Um buraco negro no centro da nossa galáxia',
    text: 'No centro da Via Láctea existe Sagittarius A*, um buraco negro supermassivo com cerca de 4 milhões de vezes a massa do Sol. Toda a nossa galáxia — incluindo o Sistema Solar — orbita ao redor dele, completando uma volta a cada 230 milhões de anos.',
    image: 'https://wallpapers.com/images/high/interstellar-black-hole-6kkuxfcpge3xyspm.webp',
    category: 'Física',
    tags: ['física','galáxia','gravidade', 'espaço', 'buraco negro']
  },
  {
    id: 'c5',
    title: '⏳ O tempo passa mais devagar na gravidade intensa',
    text: 'A Teoria da Relatividade Geral de Einstein prevê que o tempo é afetado pela gravidade: quanto mais forte ela for, mais devagar ele passa. Experimentos com relógios atômicos em satélites e na Terra confirmaram esse efeito — em órbita, o tempo literalmente corre ligeiramente mais rápido que no solo.',
    image: 'https://museuweg.net/blog/wp-content/uploads/2023/03/Formula-da-Relatividade.jpg',
    category: 'Física',
    tags: ['física','galáxia','gravidade', 'einstein', 'teoria']
  }
];

 const state = {
  items: [...INITIAL_DATA],
  filters: {
    search: '',
    category: 'Todos',
    sort: 'recent' // 'recent' | 'alpha'
  }
};

// =====================
// RENDER: CARDS
// =====================
function renderCards(){
  const row = document.getElementById('cardsRow');
  const empty = document.getElementById('emptyState');
  row.innerHTML = '';

  const filtered = sortItems(state.items.filter(matchesFilters));

  if(filtered.length === 0){
    empty.classList.remove('d-none');
    return;
  }else{
    empty.classList.add('d-none');
  }

  filtered.forEach(item => {
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-lg-4';

    const card = document.createElement('div');
    card.className = 'card card-curio h-100 border-0';
    card.innerHTML = `
      
      <div class="card-body d-flex flex-column border-dark mb-3">
      <img src="${item.image}" class="card-img-top" alt="${item.title}">  <div class="d-flex justify-content-between align-items-start mb-2">
          <h5 class="card-title mb-0">${item.title}</h5>
          <span class="badge rounded-pill badge-cat">${item.category}</span>
        </div>
        <p class="card-text flex-grow-1">${item.text}</p>
        <div class="d-flex gap-2 flex-wrap mb-3">
          ${(item.tags||[]).map(t=>`<span class="badge text-bg-light">#${t}</span>`).join('')}
        </div>
        <div class="d-flex justify-content-between align-items-center mt-auto">
          <button class="btn btn-sm btn-outline-primary" disabled title="Curtidas na Aula 7">♡</button>
          <button class="btn btn-sm btn-outline-secondary" disabled title="Detalhes na Aula 7">Ver mais</button>
        </div>
      </div>`;

    col.appendChild(card);
    row.appendChild(col);
  });
}

// =====================
// INTERAÇÕES
// =====================
function setupInteractions(){
  // Busca
  document.getElementById('searchInput').addEventListener('input', (e)=>{
    state.filters.search = e.target.value;
    renderCards();
  });
  // Ordenação
  document.getElementById('sortSelect').addEventListener('change', (e)=>{
    state.filters.sort = e.target.value;
    renderCards();
  });
  // Validação Bootstrap + adicionar item
  const form = document.getElementById('formAdd');
  form.addEventListener('submit', (event)=>{
    event.preventDefault();
    event.stopPropagation();
    if(!form.checkValidity()){
      form.classList.add('was-validated');
      return;
    }
    const newItem = {
      id: 'c' + (Date.now()),
      title: document.getElementById('fldTitle').value.trim(),
      text: document.getElementById('fldText').value.trim(),
      image: document.getElementById('fldImage').value.trim(),
      category: document.getElementById('fldCategory').value.trim(),
      tags: document.getElementById('fldTags').value.split(',').map(t=>t.trim()).filter(Boolean)
    };
    state.items.push(newItem);
    saveItems();
    form.reset();
    form.classList.remove('was-validated');
    const canvas = bootstrap.Offcanvas.getOrCreateInstance('#offcanvasAdd');
    canvas.hide();
    state.filters.category = 'Todos';
    document.getElementById('searchInput').value = '';
    state.filters.search = '';
    render();
  });

  // Tema
  const themeBtn = document.getElementById('themeToggle');
  themeBtn.addEventListener('click', ()=>{
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(LS_THEME_KEY, next);
    themeBtn.setAttribute('aria-pressed', String(next==='dark'));
    themeBtn.textContent = next==='dark' ? '☀️' : '🌙';
  });
}


// =====================
// RENDER: CHIPS
// =====================
function renderChips(){
  const chipsEl = document.getElementById('chips');
  chipsEl.innerHTML = '';
  const categories = ['Todos', ...new Set(state.items.map(i => i.category))];

  categories.forEach(cat => {
    const span = document.createElement('span');
    span.className = 'badge rounded-pill badge-cat filter-chip px-3 py-2';
    span.textContent = cat;
    span.setAttribute('role','button');
    span.setAttribute('aria-pressed', String(cat === state.filters.category));
    span.addEventListener('click', () => {
      state.filters.category = cat;
      // atualizar aria-pressed de todos e refazer cards
      document.querySelectorAll('#chips .filter-chip').forEach(el=>{
        el.setAttribute('aria-pressed', String(el.textContent === state.filters.category));
      });
      renderCards();
    });
    chipsEl.appendChild(span);
  });
}

function render(){
  renderChips()
  renderCards()
}

// =====================
// STARTUP
// =====================
document.addEventListener('DOMContentLoaded', ()=>{
  const toggler = document.querySelector('.navbar-toggler');
  if(toggler && !toggler.querySelector('span.navbar-toggler-icon')){
    const span = document.createElement('span');
    span.className = 'navbar-toggler-icon';
    toggler.appendChild(span);
  }
});
// =====================
// FILTRO + ORDENAÇÃO
// =====================
function matchesFilters(item){
  const search = state.filters.search.trim().toLowerCase();
  const inSearch = search === '' || [item.title, item.text, (item.tags||[]).join(' ')].join(' ').toLowerCase().includes(search);
  const inCat = state.filters.category === 'Todos' || item.category === state.filters.category;
  return inSearch && inCat;
}

function sortItems(items){
  const mode = state.filters.sort;
  if(mode === 'alpha'){
    return [...items].sort((a,b)=> a.title.localeCompare(b.title));
  }
  // 'recent' → manter ordem de inserção (itens mais novos no fim)
  return [...items];
}

const LS_ITEMS_KEY = 'curio_items_v1';
const LS_LIKES_KEY = 'curio_likes_v1';
const LS_THEME_KEY = 'curio_theme_v1';

function loadFromStorage(){
  try{
    const savedItems = JSON.parse(localStorage.getItem(LS_ITEMS_KEY));
    const savedLikes = JSON.parse(localStorage.getItem(LS_LIKES_KEY));
    const savedTheme = localStorage.getItem(LS_THEME_KEY);

    
    state.items = Array.isArray(savedItems) ? savedItems : INITIAL_DATA;
    state.likes = savedLikes && typeof savedLikes === 'object' ? savedLikes : {};
    if(savedTheme){
      document.documentElement.setAttribute('data-theme', savedTheme);
      const isDark = savedTheme === 'dark';
      document.getElementById('themeToggle').setAttribute('aria-pressed', String(isDark));
      document.getElementById('themeToggle').textContent = isDark ? '☀️' : '🌙';
    }
  }catch(e){
    state.items = INITIAL_DATA;
    state.likes = {};
  }
}

function saveItems(){ localStorage.setItem(LS_ITEMS_KEY, JSON.stringify(state.items)); }
function saveLikes(){ localStorage.setItem(LS_LIKES_KEY, JSON.stringify(state.likes)); }

function openDetails(item){
  document.getElementById('modalTitle').textContent = item.title;
  document.getElementById('modalText').textContent = item.text;
  const img = document.getElementById('modalImage');
  img.src = item.image; img.alt = item.title;
  const tags = document.getElementById('modalTags');
  tags.innerHTML = (item.tags||[]).map(t=>`<span class="badge text-bg-secondary">#${t}</span>`).join(' ');

  const modal = new bootstrap.Modal(document.getElementById('modalDetails'));
  modal.show();
}

loadFromStorage()
setupInteractions()
render()

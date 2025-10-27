const API_BASE = '/api';
let token = localStorage.getItem('token') || null;

// Elementos
const authSection = document.getElementById('authSection');
const crudSection = document.getElementById('crudSection');
const authForm = document.getElementById('authForm');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const logoutBtn = document.getElementById('logoutBtn');
const assetForm = document.getElementById('assetForm');
const tableBody = document.querySelector('#assetsTable tbody');

let editingId = null;

// =========================
// ==== Helper Functions ====
// =========================

function showSection(isAuthenticated) {
  authSection.style.display = isAuthenticated ? 'none' : 'block';
  crudSection.style.display = isAuthenticated ? 'block' : 'none';
}

function setToken(newToken) {
  token = newToken;
  if (token) localStorage.setItem('token', token);
  else localStorage.removeItem('token');
  showSection(!!token);
}

async function apiFetch(url, options = {}) {
  const headers = options.headers || {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  headers['Content-Type'] = 'application/json';
  const res = await fetch(url, { ...options, headers });
  if (res.status === 401) {
    alert('Sesión expirada o no autorizada');
    setToken(null);
    return null;
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    alert(err.error || 'Error inesperado');
    return null;
  }
  return res.json().catch(() => ({}));
}

// =====================
// ==== AUTH FLOW ======
// =====================

loginBtn.addEventListener('click', async () => {
  const email = authForm.email.value;
  const password = authForm.password.value;
  const data = await apiFetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  if (data && data.token) {
    setToken(data.token);
    loadAssets();
  }
});

registerBtn.addEventListener('click', async () => {
  const email = authForm.email.value;
  const password = authForm.password.value;
  const reg = await apiFetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  if (reg && reg.email) {
    alert('Usuario registrado, ahora inicia sesión.');
  }
});

logoutBtn.addEventListener('click', () => {
  setToken(null);
});

// =====================
// ==== CRUD FLOW ======
// =====================

async function loadAssets() {
  const data = await apiFetch(`${API_BASE}/assets`);
  if (!data) return;
  tableBody.innerHTML = '';
  data.forEach(a => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${a.id}</td>
      <td>${a.name}</td>
      <td>${a.type}</td>
      <td>${a.owner || ''}</td>
      <td>
        <button onclick="editAsset(${a.id}, '${a.name}', '${a.type}', '${a.owner || ''}')">✏️</button>
        <button onclick="deleteAsset(${a.id})">🗑️</button>
      </td>`;
    tableBody.appendChild(tr);
  });
}

async function saveAsset(e) {
  e.preventDefault();
  const asset = {
    name: assetForm.name.value,
    type: assetForm.type.value,
    owner: assetForm.owner.value
  };
  const method = editingId ? 'PUT' : 'POST';
  const url = editingId ? `${API_BASE}/assets/${editingId}` : `${API_BASE}/assets`;
  await apiFetch(url, { method, body: JSON.stringify(asset) });
  editingId = null;
  assetForm.reset();
  loadAssets();
}

async function deleteAsset(id) {
  if (!confirm('¿Eliminar este asset?')) return;
  await apiFetch(`${API_BASE}/assets/${id}`, { method: 'DELETE' });
  loadAssets();
}

function editAsset(id, name, type, owner) {
  editingId = id;
  assetForm.name.value = name;
  assetForm.type.value = type;
  assetForm.owner.value = owner;
}

assetForm.addEventListener('submit', saveAsset);

// =====================
// ==== INIT FLOW ======
// =====================

showSection(!!token);
if (token) loadAssets();

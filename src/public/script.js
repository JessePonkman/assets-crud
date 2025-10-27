const API = '/api/assets';
const form = document.getElementById('assetForm');
const tableBody = document.querySelector('#assetsTable tbody');
let editingId = null;

async function loadAssets() {
  const res = await fetch(API);
  const data = await res.json();
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
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

async function saveAsset(e) {
  e.preventDefault();
  const asset = {
    name: form.name.value,
    type: form.type.value,
    owner: form.owner.value
  };
  const method = editingId ? 'PUT' : 'POST';
  const url = editingId ? `${API}/${editingId}` : API;
  await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(asset) });
  editingId = null;
  form.reset();
  loadAssets();
}

async function deleteAsset(id) {
  if (confirm('¿Eliminar este asset?')) {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    loadAssets();
  }
}

function editAsset(id, name, type, owner) {
  editingId = id;
  form.name.value = name;
  form.type.value = type;
  form.owner.value = owner;
}

form.addEventListener('submit', saveAsset);
loadAssets();

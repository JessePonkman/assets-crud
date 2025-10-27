import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function AssetsPage() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const [assets, setAssets] = useState([]);
  const [form, setForm] = useState({ id: null, name: '', type: '', owner: '' });

  const loadAssets = async () => {
    try {
      const data = await api.get('/assets', { token });
      setAssets(data);
    } catch {
      logout();
    }
  };

  const saveAsset = async (e) => {
    e.preventDefault();
    const { id, ...rest } = form;
    if (id) await api.put(`/assets/${id}`, rest, { token });
    else await api.post('/assets', rest, { token });
    setForm({ id: null, name: '', type: '', owner: '' });
    loadAssets();
  };

  const editAsset = (asset) => setForm(asset);

  const deleteAsset = async (id) => {
    if (!confirm('¿Eliminar este asset?')) return;
    await api.del(`/assets/${id}`, { token });
    loadAssets();
  };

  useEffect(() => { loadAssets(); }, []);

  return (
    <div className="assets">
      <header>
        <h2>Assets</h2>
        <button onClick={() => { logout(); navigate('/login'); }}>Cerrar sesión</button>
      </header>

      <form onSubmit={saveAsset}>
        <input type="text" placeholder="Nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input type="text" placeholder="Tipo" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} required />
        <input type="text" placeholder="Propietario" value={form.owner} onChange={(e) => setForm({ ...form, owner: e.target.value })} />
        <button type="submit">{form.id ? 'Actualizar' : 'Agregar'}</button>
      </form>

      <table>
        <thead>
          <tr><th>ID</th><th>Nombre</th><th>Tipo</th><th>Propietario</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {assets.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.name}</td>
              <td>{a.type}</td>
              <td>{a.owner || ''}</td>
              <td>
                <button onClick={() => editAsset(a)}>✏️</button>
                <button onClick={() => deleteAsset(a.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await api.post('/auth/login', { email, password });
      login(data.token);
      navigate('/');
    } catch (err) {
      alert('Credenciales inválidas');
    }
  };

  return (
    <div className="auth">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Entrar</button>
      </form>
      <br/>
      <button className="fullwidth" onClick={() => navigate('/register')}>Crear cuenta</button>
    </div>
  );
}

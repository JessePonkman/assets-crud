export const api = {
  async request(path, { method = 'GET', body, token } = {}) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`/api${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    });

    // manejo de errores
    if (res.status === 401) throw new Error('Unauthorized');
    if (res.status === 403) throw new Error('Forbidden');
    if (res.status === 404) throw new Error('Not Found');
    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || `Error ${res.status}`);
    }

    // intentar parsear JSON (puede estar vacío)
    try {
      return await res.json();
    } catch {
      return null;
    }
  },

  // helpers CRUD específicos
  get: (path, opts) => api.request(path, { ...opts, method: 'GET' }),
  post: (path, body, opts) => api.request(path, { ...opts, method: 'POST', body }),
  put: (path, body, opts) => api.request(path, { ...opts, method: 'PUT', body }),
  del: (path, opts) => api.request(path, { ...opts, method: 'DELETE' })
};

# 🧭 Asset Manager — CRUD + Auth (React + Node.js + PostgreSQL)

Aplicación full-stack para gestión de *assets* (equipos informáticos, celulares, monitores, etc.) con autenticación JWT.  
Incluye frontend en **React (Vite)**, backend en **Express + Sequelize**, y base de datos **PostgreSQL**.  
Se puede ejecutar tanto localmente como en contenedores Docker.

---

## 🚀 Tecnologías principales

| Capa | Tecnología | Descripción |
|------|-------------|--------------|
| **Frontend** | React + Vite + Fetch API | UI rápida y ligera |
| **Backend** | Node.js (Express) | API REST con JWT |
| **ORM** | Sequelize | Abstracción sobre PostgreSQL |
| **Base de datos** | PostgreSQL 16 | Datos persistentes |
| **Autenticación** | JWT | Inicio de sesión seguro |
| **Infraestructura** | Docker + Docker Compose | Despliegue completo con un solo comando |

---

## 📁 Estructura del proyecto
```
asset-crud/
├── frontend/ # Frontend (React + Vite)
│ ├── src/
│ ├── public/
│ ├── package.json
│ └── Dockerfile
│
├── backend/ # Backend (Express + Sequelize + JWT)
│ ├── src/
│ ├── package.json
│ ├── .env
│ └── Dockerfile
│
├── docker-compose.yml
└── README.md
```
## Ejecucion de proyecto (Docker Compose)
```bash
docker-compose up --build -d
```

## Utilizacion
Una vez levantado, se podra acceder a:
- Frontend: http://localhost
- Backend (API): http://localhost:3000
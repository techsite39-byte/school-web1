# School Website

This project is split into two separate parts:

- Frontend: the Next.js website in the `app/` folder
- Backend: the Express API in the `backend/` folder

## Project structure

```bash
school1/
├── app/                  # Frontend pages and layouts
├── components/           # Reusable frontend components
├── data/                 # Shared frontend data
├── public/               # Frontend static assets
├── backend/              # Express + TypeScript API
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
├── package.json          # Frontend scripts and dependencies
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── README.md
└── .gitignore
```

## Frontend

The frontend is the main site and is represented by the `app/` folder.

### Install and run

```bash
npm install
npm run dev
```

Open http://localhost:3000 in the browser.

### Production build

```bash
npm run build
npm run start
```

## Backend

The backend is a separate Express API in the `backend/` directory.

### Install and run

```bash
cd backend
npm install
npm run dev
```

The API will run on:

```bash
http://localhost:5000
```

### Production build

```bash
cd backend
npm run build
npm run start
```

## Environment variables

Create a `.env` file in the `backend/` folder if needed for database and app configuration, for example:

```bash
PORT=5000
CLIENT_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
```

## Notes

- Frontend and backend are intentionally separated for independent development and deployment.
- The frontend can be deployed on Vercel.
- The backend can be deployed on a Node.js host or serverless platform such as Render, Railway, or Vercel with a separate server setup.

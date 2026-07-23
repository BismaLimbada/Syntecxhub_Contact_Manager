# Contact Manager (MERN Stack)

A full CRUD contact management app: React frontend, Node.js/Express backend, MongoDB database.

## Project structure
```
contact-manager/
├── backend/     Express + MongoDB API
└── frontend/    React (Vite) UI
```

## 1. Prerequisites — check what you already have

Open a terminal in VS Code and run:
```bash
node -v      # need v18 or higher
npm -v
mongod --version   # only if running MongoDB locally
```
- If `node -v` fails: install Node.js from https://nodejs.org (LTS version).
- For MongoDB you have two options — pick ONE:
  - **Option A (easiest, no install): MongoDB Atlas** — free cloud database at https://www.mongodb.com/cloud/atlas. Create a free cluster, get a connection string.
  - **Option B: Install MongoDB Community Server locally** from https://www.mongodb.com/try/download/community, then run `mongod` in a terminal to start it.

## 2. Backend setup
```bash
cd backend
npm install
cp .env.example .env
```
Open `.env` and set your Mongo connection string:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/contact_manager
```
(If using Atlas, paste the Atlas connection string here instead.)

Run it:
```bash
npm run dev
```
You should see `MongoDB connected` and `Server running on port 5000`.
Test it's alive: open http://localhost:5000 in a browser — you should see a JSON message.

## 3. Frontend setup
Open a **second terminal**:
```bash
cd frontend
npm install
npm run dev
```
Vite will print a local URL (usually http://localhost:5173). Open it in your browser.

## 4. Using the app
- Add a contact using the form (name, email, phone, address).
- Edit/Delete using the buttons on each contact card.
- Search box filters by name or email live.

## 5. API endpoints (for reference / Postman testing)
| Method | Endpoint            | Description        |
|--------|----------------------|---------------------|
| GET    | /api/contacts         | List all (supports `?search=`) |
| GET    | /api/contacts/:id     | Get one contact    |
| POST   | /api/contacts         | Create a contact   |
| PUT    | /api/contacts/:id     | Update a contact   |
| DELETE | /api/contacts/:id     | Delete a contact   |

## 6. Pushing to GitHub
Since your repo is already connected in VS Code:
```bash
git add .
git commit -m "Project 2: Contact Manager - full CRUD MERN app"
git push
```
`node_modules` and `.env` are already excluded via `.gitignore`, so your secrets won't be pushed.

## Notes on validation/error handling included
- Backend: Mongoose schema validation + `express-validator` request validation + centralized error handler (handles bad IDs, duplicate emails, validation errors).
- Frontend: client-side validation before submit, inline field errors, and a banner for server-side errors (e.g. duplicate email).

# Yatra Mates

A group travel planning website: discover trips, find travel mates and plan your trip budget.

Built with HTML, CSS and JavaScript (frontend), Node.js + Express (backend) and MongoDB (database).

## Quick start

1. Install [Node.js](https://nodejs.org) (version 20 or newer) and [Git](https://git-scm.com/downloads).
2. Get the code and start the app:

   ```
   git clone https://github.com/sai9392-rgb/Yatra-Mates.git
   cd Yatra-Mates
   npm start
   ```

3. Open http://localhost:5000

## Everyday commands

Run these in a terminal inside the `Yatra-Mates` folder (in VS Code: **Terminal → New Terminal**).

| What you want | Command |
|---|---|
| Start the app | `npm start` |
| Stop the app | `Ctrl + C` in that terminal (if asked "Terminate batch job?", type `Y`) |
| Run the tests (app must be running, use a second terminal) | `cd backend` then `npm test` |
| Get your teammates' latest code | `git pull` |
| See what you changed | `git status` |
| Save your changes to Git | `git add .` then `git commit -m "Describe what you changed"` |
| Send your commits to GitHub | `git push` |

## What `npm start` does

1. Installs the backend packages (first run only).
2. Creates `backend/.env` pointing at a local database (first run only).
3. Starts MongoDB if it isn't running already.
4. Starts the server, which serves both the website and the API on http://localhost:5000

## Database

`npm start` looks for MongoDB on your computer (on your PATH, or in a `MongoDB` folder in your home folder).
If MongoDB isn't installed, do one of these:

- Install [MongoDB Community Server](https://www.mongodb.com/try/download/community) (the default options run it automatically).
- Use MongoDB Atlas: put your connection string in `backend/.env`:

  ```
  MONGO_URI=mongodb+srv://USER:PASSWORD@YOUR-CLUSTER/YatraMates?retryWrites=true&w=majority
  ```

`backend/.env` holds your database password, so it is never committed (it's in `.gitignore`). Each teammate keeps their own.

## Working with Git and GitHub

### One-time setup (once per computer)

```
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

To push, the repository owner must add you on GitHub: **Settings → Collaborators → Add people**.

### Every time you work on the project

```
git pull
```

Make your changes, then **save all files** (in VS Code, turn on **File → Auto Save** so nothing is left unsaved), and:

```
git status
git add .
git commit -m "Add trip details page"
git push
```

Write commit messages that say what changed, e.g. `Fix search on mobile`, not `update`.

### If something goes wrong

- **`git push` is rejected** ("fetch first" or "non-fast-forward"): a teammate pushed first. Run `git pull`, then `git push` again.
- **`git pull` reports a conflict**: open the files it lists, keep the right code between the `<<<<<<<` and `>>>>>>>` markers and delete the markers, then `git add .`, `git commit -m "Merge teammate changes"` and `git push`.
- **Authentication failed**: complete the GitHub sign-in that opens in your browser.

### Working on a branch (optional)

A branch keeps your work separate until it's ready:

```
git checkout -b my-feature
git add .
git commit -m "Describe the feature"
git push -u origin my-feature
```

Then open the repository on GitHub and click **Compare & pull request** to merge it into `main`.
To switch back: `git checkout main`.

## Project structure

```
Yatra-Mates/
├── start.js                  what `npm start` runs
├── package.json              defines `npm start`
├── backend/
│   ├── server.js             Express server: API + serves the website
│   ├── models/User.js        user schema (name, email, password hash)
│   ├── routes/userRoutes.js  register and login API
│   ├── test-auth.js          checks register and login (`npm test`)
│   └── .env                  database address (not in Git)
└── frontend/
    ├── index.html            homepage: search, destinations, trips, budget planner
    ├── script.js             homepage behaviour
    ├── register.html         sign-up page
    ├── login.html            login page
    ├── auth.js               register and login forms
    └── style.css             all styles
```

## API

| Method | Route | Body | Result |
|---|---|---|---|
| GET | `/api/trips` | - | list of trips |
| POST | `/api/users/register` | `{ name, email, password }` | 201 created, 409 email already registered, 400 invalid input |
| POST | `/api/users/login` | `{ email, password }` | 200 with `{ user: { name, email } }`, 401 wrong email or password, 400 invalid input |

Passwords are hashed with bcrypt before they're saved; the API never returns them.

## Troubleshooting

| Problem | Fix |
|---|---|
| `npm` or `git` is not recognized | Install Node.js / Git, then close and reopen the terminal (or VS Code). |
| "MongoDB is not running and was not found" | See [Database](#database). |
| "Could not start on port 5000" (`EADDRINUSE`) | The app is already running in another terminal. Use that one, or stop it with `Ctrl + C` first. |
| http://localhost:5000 won't load, or the page says "Cannot connect to the server" | The app isn't running. Run `npm start`. |
| "MongoDB connection failed" | Check `MONGO_URI` in `backend/.env`. For Atlas, also check **Network Access** allows your IP. |

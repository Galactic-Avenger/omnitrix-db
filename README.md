# Omnitrix DB 🛸

### A Ben 10–inspired game where you learn SQL by querying a database of aliens

Omnitrix DB is a browser game where you complete missions by writing **real SQL queries** against an in-browser SQLite database. Pick the right alien for the job by filtering, joining, and aggregating across tables of aliens, villains, and battles. Built with TypeScript and React.

---

## Demo

<!--
  To add a demo:
  - Record a short screen capture of solving a mission or two
  - Upload to YouTube (Unlisted) and paste the link here as:
    [![Omnitrix DB Demo](https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg)](https://youtu.be/VIDEO_ID)
-->

*Screen recording coming soon.*

---

## How It Works

Each mission gives you a story brief, a goal in plain English, and the relevant table schema. You write SQL in an in-app editor, run it against a real database, and your result is checked against the expected answer. Solve it and the next mission unlocks; get it wrong and you get a hint.

The queries are genuinely executed — there's no faking it. The app runs a real SQLite database entirely in the browser using **sql.js** (SQLite compiled to WebAssembly), so every `SELECT`, `JOIN`, `GROUP BY`, and subquery runs for real, with no backend or server required.

The six missions build up gradually:

1. Basic `SELECT` with `WHERE`
2. `ORDER BY` and `LIMIT`
3. Multiple conditions with `AND` / `OR`
4. Joining two tables
5. `GROUP BY` with an aggregate
6. A subquery / aggregate combination

---

## Tech Stack

| | |
|---|---|
| **Language** | TypeScript |
| **Framework** | React + Vite |
| **Database** | SQLite in the browser via sql.js (WebAssembly) |
| **Editor** | Monaco (the editor behind VS Code) |
| **Styling** | Custom CSS (alien-tech theme) |

---

## Run Locally

```bash
git clone https://github.com/Galactic-Avenger/omnitrix-db.git
cd omnitrix-db
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

---

## Author

Built by Abdulla Saleh — [GitHub](https://github.com/Galactic-Avenger) · [LinkedIn](https://www.linkedin.com/in/abdulla-saleh-10)

---

*Ben 10–inspired theme built with original styling. No official logos or copyrighted artwork are used.*

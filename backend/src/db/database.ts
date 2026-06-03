import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(__dirname, '../../likes.db');

const db = new Database(DB_PATH);

db.exec(`
  CREATE TABLE IF NOT EXISTS likes (
    photo_id INTEGER PRIMARY KEY,
    liked_at TEXT NOT NULL
  )
`);

export default db;

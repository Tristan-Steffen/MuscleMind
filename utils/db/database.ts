import { type SQLiteDatabase } from "expo-sqlite";

const DATABASE_VERSION = 2;

export async function initDatabase(db: SQLiteDatabase) {
  let user_version = await db.getFirstAsync<{
    user_version: number;
  }>("PRAGMA user_version");

  console.log("user version", user_version)

  if (
    user_version &&
    user_version.user_version >= DATABASE_VERSION &&
    user_version.user_version !== 0
  ) {
    return; // Database is up-to-date
  }

  // Initial migration or any updates
  if (user_version && user_version.user_version === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';

      CREATE TABLE IF NOT EXISTS sets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        reps INTEGER NOT NULL,
        weight REAL NOT NULL,
        rest INTEGER,
        exerciseInstanceId INTEGER,
        FOREIGN KEY(exerciseInstanceId) REFERENCES exerciseInstances(id)
      );

      CREATE TABLE IF NOT EXISTS exercises (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        image TEXT,
        cues TEXT,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        date TEXT NOT NULL,
        isPreset INTEGER NOT NULL,
        isExample INTEGER NOT NULL,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS exerciseInstances (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        exerciseId INTEGER,
        sessionId INTEGER,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL,
        FOREIGN KEY(exerciseId) REFERENCES exercises(id),
        FOREIGN KEY(sessionId) REFERENCES sessions(id)
      );

      CREATE TABLE IF NOT EXISTS muscles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS exercise_muscles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        exerciseId INTEGER NOT NULL,
        muscleId INTEGER NOT NULL,
        isPrimary BOOLEAN NOT NULL,
        FOREIGN KEY (exerciseId) REFERENCES exercises(id),
        FOREIGN KEY (muscleId) REFERENCES muscles(id)
      );
    `);
    user_version.user_version ++
  }
  console.log("user version", user_version)


  if (user_version && user_version.user_version === 1) {
    // Migration from version 1 to version 2
    await db.execAsync(`
      ALTER TABLE sets ADD COLUMN repsInReserve INTEGER;
    `);
    user_version.user_version ++
  }

  console.log("Database initialized");
  await db.execAsync(`PRAGMA user_version = ${user_version!.user_version}`);
}

export async function checkIfDatabaseIsEmpty(
  db: SQLiteDatabase
): Promise<boolean> {
  const result = db.getAllSync<{ count: number }>(
    "SELECT COUNT(*) as count FROM exercises"
  );
  return result[0].count === 0;
}

import type { Database, InitSqlJsStatic, SqlJsStatic } from 'sql.js';
import sqlWasmUrl from 'sql.js/dist/sql-wasm-browser.wasm?url';
import type { QueryResult, SqlValue } from '../types';
import { SCHEMA_SQL } from './schema';
import { SEED_SQL } from './seed';

let dbInstance: Database | null = null;
let initSqlJsLoader: Promise<InitSqlJsStatic> | null = null;

async function getInitSqlJs(): Promise<InitSqlJsStatic> {
  if (!initSqlJsLoader) {
    initSqlJsLoader = import('sql.js/dist/sql-wasm-browser.js').then((module) => {
      const initSqlJs =
        'default' in module && module.default
          ? (module.default as InitSqlJsStatic)
          : (module as unknown as InitSqlJsStatic);

      return initSqlJs;
    });
  }

  return initSqlJsLoader;
}

export async function initDatabase(): Promise<Database> {
  if (dbInstance) {
    return dbInstance;
  }

  const initSqlJs = await getInitSqlJs();
  const SQL: SqlJsStatic = await initSqlJs({
    locateFile: () => sqlWasmUrl,
  });

  const db = new SQL.Database();
  db.run(SCHEMA_SQL);
  db.run(SEED_SQL);
  dbInstance = db;
  return db;
}

export function executeQuery(db: Database, sql: string): QueryResult {
  const trimmed = sql.trim();
  if (!trimmed) {
    return { columns: [], rows: [] };
  }

  const results = db.exec(trimmed);

  if (results.length === 0) {
    return { columns: [], rows: [] };
  }

  const { columns, values } = results[0];
  return {
    columns,
    rows: values as SqlValue[][],
  };
}

export function getTableSchemas(): { name: string; sql: string }[] {
  return [
    {
      name: 'aliens',
      sql: `CREATE TABLE aliens (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  species TEXT NOT NULL,
  planet TEXT NOT NULL,
  element_type TEXT NOT NULL,
  power_level INTEGER NOT NULL,
  speed INTEGER NOT NULL,
  transform_seconds INTEGER NOT NULL,
  is_unlocked INTEGER NOT NULL DEFAULT 1
);`,
    },
    {
      name: 'villains',
      sql: `CREATE TABLE villains (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  threat_level INTEGER NOT NULL,
  weakness_element TEXT NOT NULL,
  is_defeated INTEGER NOT NULL DEFAULT 0
);`,
    },
    {
      name: 'battles',
      sql: `CREATE TABLE battles (
  id INTEGER PRIMARY KEY,
  alien_id INTEGER NOT NULL,
  villain_id INTEGER NOT NULL,
  outcome TEXT NOT NULL CHECK(outcome IN ('win', 'loss')),
  FOREIGN KEY (alien_id) REFERENCES aliens(id),
  FOREIGN KEY (villain_id) REFERENCES villains(id)
);`,
    },
  ];
}

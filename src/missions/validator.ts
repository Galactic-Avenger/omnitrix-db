import type { QueryResult, SqlValue } from '../types';

function normalizeValue(value: SqlValue): string {
  if (value === null) {
    return '';
  }
  if (typeof value === 'number') {
    return String(Math.round(value * 10000) / 10000);
  }
  return String(value).toLowerCase().trim();
}

function serializeRows(rows: SqlValue[][]): string {
  return rows
    .map((row) => row.map(normalizeValue).join('|'))
    .sort()
    .join('\n');
}

export function resultsMatch(player: QueryResult, expected: QueryResult): boolean {
  if (player.rows.length !== expected.rows.length) {
    return false;
  }

  if (player.rows.length === 0 && expected.rows.length === 0) {
    return true;
  }

  if (player.columns.length !== expected.columns.length) {
    return false;
  }

  return serializeRows(player.rows) === serializeRows(expected.rows);
}

export function isSelectQuery(sql: string): boolean {
  const normalized = sql.trim().toLowerCase();
  return normalized.startsWith('select') || normalized.startsWith('with');
}

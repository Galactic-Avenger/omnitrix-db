export const SCHEMA_SQL = `
CREATE TABLE aliens (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  species TEXT NOT NULL,
  planet TEXT NOT NULL,
  element_type TEXT NOT NULL,
  power_level INTEGER NOT NULL,
  speed INTEGER NOT NULL,
  transform_seconds INTEGER NOT NULL,
  is_unlocked INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE villains (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  threat_level INTEGER NOT NULL,
  weakness_element TEXT NOT NULL,
  is_defeated INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE battles (
  id INTEGER PRIMARY KEY,
  alien_id INTEGER NOT NULL,
  villain_id INTEGER NOT NULL,
  outcome TEXT NOT NULL CHECK(outcome IN ('win', 'loss')),
  FOREIGN KEY (alien_id) REFERENCES aliens(id),
  FOREIGN KEY (villain_id) REFERENCES villains(id)
);
`;

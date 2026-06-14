import type { Mission, TableSchema } from '../types';

export const MISSIONS: Mission[] = [
  {
    id: 1,
    title: 'Thermal Scan',
    storyBrief:
      'The Omnitrix database has detected hostile fire-element signatures across the galaxy. Before deploying transformation protocols, you must identify every fire-aligned alien form in the registry.',
    goal: 'Find all aliens with the fire element type.',
    difficulty: 'beginner',
    hint: 'Use SELECT with a WHERE clause to filter aliens by their element_type column. Fire aliens have element_type equal to \'fire\'.',
    starterSql: 'SELECT *\nFROM aliens\nWHERE ',
    relevantTables: ['aliens'],
    validationSql: "SELECT * FROM aliens WHERE element_type = 'fire'",
  },
  {
    id: 2,
    title: 'Power Ranking',
    storyBrief:
      'Command needs the top combat-ready forms for an urgent planetary defense. Pull the strongest aliens from the database — only the elite three will be authorized for deployment.',
    goal: 'Find the 3 aliens with the highest power_level.',
    difficulty: 'beginner',
    hint: 'Sort aliens by power_level in descending order and use LIMIT to return only the top 3 rows.',
    starterSql: 'SELECT *\nFROM aliens\nORDER BY ',
    relevantTables: ['aliens'],
    validationSql: 'SELECT * FROM aliens ORDER BY power_level DESC LIMIT 3',
  },
  {
    id: 3,
    title: 'Rapid Response',
    storyBrief:
      'A time-critical rescue mission requires forms that are both fast and quick to activate. Scan the registry for aliens who can move at high speed and transform in three seconds or less.',
    goal: 'Find aliens with speed greater than 80 AND transform_seconds of 3 or less.',
    difficulty: 'intermediate',
    hint: 'Combine two conditions with AND in your WHERE clause: one comparing speed, another comparing transform_seconds.',
    starterSql: 'SELECT *\nFROM aliens\nWHERE ',
    relevantTables: ['aliens'],
    validationSql:
      'SELECT * FROM aliens WHERE speed > 80 AND transform_seconds <= 3',
  },
  {
    id: 4,
    title: 'Victory Trace',
    storyBrief:
      'Malware Prime has been neutralized, but HQ needs a full after-action report. Cross-reference battle logs with alien and villain records to identify which forms secured the victory.',
    goal: 'Find the names of all aliens who defeated the villain "Malware Prime".',
    difficulty: 'intermediate',
    hint: 'You will need JOIN to link battles with aliens and villains. Filter for the villain name and battles where outcome is \'win\'.',
    starterSql: 'SELECT a.name\nFROM battles b\nJOIN aliens a ON ',
    relevantTables: ['battles', 'aliens', 'villains'],
    validationSql: `SELECT a.name
FROM battles b
JOIN aliens a ON b.alien_id = a.id
JOIN villains v ON b.villain_id = v.id
WHERE v.name = 'Malware Prime' AND b.outcome = 'win'`,
  },
  {
    id: 5,
    title: 'Battle Analytics',
    storyBrief:
      'Strategic command wants a win-loss breakdown per alien form. Aggregate the battle data to reveal how many victories each registered alien has achieved.',
    goal: 'Count the number of wins per alien. Return each alien\'s name and their win count.',
    difficulty: 'advanced',
    hint: 'JOIN battles to aliens, filter for wins only, then use GROUP BY on the alien and COUNT(*) to tally victories.',
    starterSql: 'SELECT a.name, COUNT(*) AS wins\nFROM battles b\nJOIN aliens a ON ',
    relevantTables: ['battles', 'aliens'],
    validationSql: `SELECT a.name, COUNT(*) AS wins
FROM battles b
JOIN aliens a ON b.alien_id = a.id
WHERE b.outcome = 'win'
GROUP BY a.id, a.name
ORDER BY wins DESC`,
  },
  {
    id: 6,
    title: 'Elite Operatives',
    storyBrief:
      'The Omnitrix is calibrating its auto-select algorithm. Identify the ultimate performers: aliens with a flawless win record across at least two confirmed battles.',
    goal: 'Find all aliens with a 100% win rate who have fought at least 2 battles.',
    difficulty: 'advanced',
    hint: 'GROUP BY alien, use HAVING to require at least 2 total battles and that every battle was a win. Compare win count to total count.',
    starterSql: 'SELECT a.name\nFROM battles b\nJOIN aliens a ON ',
    relevantTables: ['battles', 'aliens'],
    validationSql: `SELECT a.name
FROM battles b
JOIN aliens a ON b.alien_id = a.id
GROUP BY a.id, a.name
HAVING COUNT(*) >= 2
  AND SUM(CASE WHEN b.outcome = 'win' THEN 1 ELSE 0 END) = COUNT(*)`,
  },
];

export const TABLE_SCHEMAS: TableSchema[] = [
  {
    name: 'aliens',
    columns: [
      { name: 'id', type: 'INTEGER', description: 'Unique alien form ID' },
      { name: 'name', type: 'TEXT', description: 'Codename of the alien form' },
      { name: 'species', type: 'TEXT', description: 'Species classification' },
      { name: 'planet', type: 'TEXT', description: 'Home world' },
      { name: 'element_type', type: 'TEXT', description: 'Primary element (fire, water, ice, etc.)' },
      { name: 'power_level', type: 'INTEGER', description: 'Combat strength rating (0–100)' },
      { name: 'speed', type: 'INTEGER', description: 'Movement speed rating' },
      { name: 'transform_seconds', type: 'INTEGER', description: 'Seconds needed to transform' },
      { name: 'is_unlocked', type: 'INTEGER', description: '1 if unlocked, 0 if locked' },
    ],
  },
  {
    name: 'villains',
    columns: [
      { name: 'id', type: 'INTEGER', description: 'Unique villain ID' },
      { name: 'name', type: 'TEXT', description: 'Villain codename' },
      { name: 'threat_level', type: 'INTEGER', description: 'Danger rating (1–10)' },
      { name: 'weakness_element', type: 'TEXT', description: 'Element that counters this villain' },
      { name: 'is_defeated', type: 'INTEGER', description: '1 if defeated, 0 if active' },
    ],
  },
  {
    name: 'battles',
    columns: [
      { name: 'id', type: 'INTEGER', description: 'Battle record ID' },
      { name: 'alien_id', type: 'INTEGER', description: 'FK → aliens.id' },
      { name: 'villain_id', type: 'INTEGER', description: 'FK → villains.id' },
      { name: 'outcome', type: 'TEXT', description: "'win' or 'loss'" },
    ],
  },
];

export function getMissionById(id: number): Mission | undefined {
  return MISSIONS.find((mission) => mission.id === id);
}

export const TOTAL_MISSIONS = MISSIONS.length;

export const SEED_SQL = `
INSERT INTO aliens (id, name, species, planet, element_type, power_level, speed, transform_seconds, is_unlocked) VALUES
  (1, 'Pyronix', 'Pyronite', 'Pyros-7', 'fire', 85, 72, 3, 1),
  (2, 'Aquaflux', 'Aquarian', 'Hydrox', 'water', 70, 65, 5, 1),
  (3, 'Voltara', 'Fulminite', 'Tesla Prime', 'electric', 78, 90, 2, 1),
  (4, 'Terraguard', 'Petrosian', 'Petropia', 'earth', 82, 45, 8, 1),
  (5, 'Frostbyte', 'Cryonite', 'Glacius IV', 'ice', 76, 58, 4, 1),
  (6, 'Aerowing', 'Aerosian', 'Stratos', 'air', 68, 95, 1, 1),
  (7, 'Shadowmorph', 'Ectonurite', 'Anur Transyl', 'shadow', 80, 55, 6, 1),
  (8, 'Chromablaze', 'Methanosian', 'Methanos', 'fire', 88, 60, 7, 1),
  (9, 'Crystalix', 'Lithonian', 'Krystalon', 'crystal', 75, 50, 9, 1),
  (10, 'Swarmcaster', 'Lepidosian', 'Lepidoptra', 'insect', 65, 85, 2, 1),
  (11, 'Magnetron', 'Magnosian', 'Magna', 'metal', 90, 40, 10, 0),
  (12, 'Phasecaller', 'Naljian', 'Null Zone', 'cosmic', 95, 70, 12, 0);

INSERT INTO villains (id, name, threat_level, weakness_element, is_defeated) VALUES
  (1, 'Dr. Vortex', 9, 'electric', 0),
  (2, 'Malware Prime', 8, 'fire', 1),
  (3, 'Crusher Hive', 7, 'ice', 0),
  (4, 'Dark Matter Lord', 10, 'light', 0),
  (5, 'Rust King', 6, 'water', 1),
  (6, 'Nebula Warden', 8, 'cosmic', 0);

INSERT INTO battles (id, alien_id, villain_id, outcome) VALUES
  (1, 1, 2, 'win'),
  (2, 3, 1, 'win'),
  (3, 5, 3, 'win'),
  (4, 2, 5, 'win'),
  (5, 8, 2, 'win'),
  (6, 4, 3, 'loss'),
  (7, 6, 1, 'loss'),
  (8, 7, 6, 'win'),
  (9, 10, 5, 'win'),
  (10, 1, 3, 'win'),
  (11, 3, 2, 'win'),
  (12, 5, 6, 'loss'),
  (13, 2, 3, 'loss'),
  (14, 8, 4, 'loss'),
  (15, 9, 5, 'win');
`;

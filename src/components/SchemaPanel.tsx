import { useState } from 'react';
import { TABLE_SCHEMAS } from '../missions/missions';

interface SchemaPanelProps {
  relevantTables: string[];
}

export function SchemaPanel({ relevantTables }: SchemaPanelProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTable, setActiveTable] = useState(relevantTables[0] ?? 'aliens');

  const tables = TABLE_SCHEMAS.filter(
    (schema) => relevantTables.includes(schema.name) || !relevantTables.length,
  );

  const activeSchema = TABLE_SCHEMAS.find((schema) => schema.name === activeTable);

  return (
    <div className={`schema-panel ${isOpen ? 'open' : 'collapsed'}`}>
      <button
        type="button"
        className="schema-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <span className="panel-icon" aria-hidden="true">⬡</span>
        Schema Reference
        <span className="toggle-chevron">{isOpen ? '▾' : '▸'}</span>
      </button>

      {isOpen && (
        <div className="schema-content">
          <div className="schema-tabs">
            {tables.map((schema) => (
              <button
                key={schema.name}
                type="button"
                className={`schema-tab ${activeTable === schema.name ? 'active' : ''}`}
                onClick={() => setActiveTable(schema.name)}
              >
                {schema.name}
              </button>
            ))}
          </div>

          {activeSchema && (
            <div className="schema-table-info">
              <div className="schema-table-name">
                <span className="sql-keyword">TABLE</span> {activeSchema.name}
              </div>
              <table className="schema-columns">
                <thead>
                  <tr>
                    <th>Column</th>
                    <th>Type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {activeSchema.columns.map((col) => (
                    <tr key={col.name}>
                      <td className="col-name">{col.name}</td>
                      <td className="col-type">{col.type}</td>
                      <td className="col-desc">{col.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

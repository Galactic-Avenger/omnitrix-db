import type { QueryResult } from '../types';

interface ResultTableProps {
  result: QueryResult | null;
  error: string | null;
}

export function ResultTable({ result, error }: ResultTableProps) {
  if (error) {
    return (
      <div className="result-panel result-error">
        <div className="result-header">
          <span className="result-label result-label-error">Query Error</span>
        </div>
        <pre className="error-message">{error}</pre>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="result-panel result-empty">
        <div className="result-header">
          <span className="result-label">Query Results</span>
        </div>
        <p className="empty-message">Run a query to see results here.</p>
      </div>
    );
  }

  if (result.rows.length === 0) {
    return (
      <div className="result-panel">
        <div className="result-header">
          <span className="result-label">Query Results</span>
          <span className="result-meta">0 rows</span>
        </div>
        <p className="empty-message">Query returned no rows.</p>
      </div>
    );
  }

  return (
    <div className="result-panel">
      <div className="result-header">
        <span className="result-label">Query Results</span>
        <span className="result-meta">
          {result.rows.length} row{result.rows.length !== 1 ? 's' : ''}
        </span>
      </div>
      <div className="table-wrapper">
        <table className="result-table">
          <thead>
            <tr>
              {result.columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell === null ? 'NULL' : String(cell)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

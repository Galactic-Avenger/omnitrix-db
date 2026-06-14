declare module 'sql.js/dist/sql-wasm-browser.js' {
  import type { InitSqlJsStatic } from 'sql.js';

  const initSqlJs: InitSqlJsStatic;
  export default initSqlJs;
}

declare module 'sql.js/dist/sql-wasm-browser.wasm?url' {
  const url: string;
  export default url;
}

declare module 'sql.js/dist/sql-wasm.wasm?url' {
  const url: string;
  export default url;
}

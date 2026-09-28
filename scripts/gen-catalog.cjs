/**
 * DEPRECATED — no regenerar catálogo genérico.
 * Usa: node scripts/build-quality-catalog.mjs
 */
console.error(`
╔══════════════════════════════════════════════════════════════════╗
║  gen-catalog.cjs está DESHABILITADO                              ║
║                                                                  ║
║  El catálogo de calidad se genera con:                           ║
║    node scripts/build-quality-catalog.mjs                        ║
║                                                                  ║
║  Validación:                                                     ║
║    node scripts/validate-catalog.mjs                             ║
╚══════════════════════════════════════════════════════════════════╝
`);
process.exit(1);

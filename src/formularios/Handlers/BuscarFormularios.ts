export function buscarFormularios(inicial, final) {
  const primeiroDiaDoMes = new Date(inicial);
  const ultimoDiaDoMes = new Date(final);

  return { primeiroDiaDoMes, ultimoDiaDoMes };
}

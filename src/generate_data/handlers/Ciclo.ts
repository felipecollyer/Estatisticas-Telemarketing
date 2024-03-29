export function Ciclo(quantidadeData) {
  const { quantidade } = quantidadeData;

  const Ciclo = [];

  for (let i = 0; i < quantidade; i++) {
    const numeroRandom = Math.floor(Math.random() * 9);
    Ciclo.push(String(numeroRandom));
  }

  return Ciclo;
}

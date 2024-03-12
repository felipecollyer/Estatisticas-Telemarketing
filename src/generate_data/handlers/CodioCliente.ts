export function CodigoCliente(quantidadeData) {
  const { quantidade } = quantidadeData;

  const CodigoCliente = [];

  for (let i = 0; i < quantidade; i++) {
    const numeroRandom = Math.floor(Math.random() * 9000) + 1000;
    CodigoCliente.push(numeroRandom);
  }

  return CodigoCliente;
}

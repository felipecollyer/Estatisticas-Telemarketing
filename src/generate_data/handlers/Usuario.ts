export function Usuario(quantidadeData) {
  const { quantidade } = quantidadeData;

  const Usuario = [];

  for (let i = 0; i < quantidade; i++) {
    const numeroRandom = Math.floor(Math.random() * 3);
    if (numeroRandom == 0) {
      Usuario.push(1);
    } else {
      Usuario.push(numeroRandom);
    }
  }

  return Usuario;
}

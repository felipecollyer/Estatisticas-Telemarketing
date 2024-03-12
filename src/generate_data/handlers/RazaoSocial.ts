export function RazaoSocial(quantidadeData) {
  const { quantidade } = quantidadeData;

  const razaoSocial = [];

  for (let i = 0; i < quantidade; i++) {
    razaoSocial.push(`Razao social ${i}`);
  }

  return razaoSocial;
}

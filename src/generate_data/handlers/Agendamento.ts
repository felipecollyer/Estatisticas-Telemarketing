export function Agendamento(quantidadeData) {
  const { quantidade } = quantidadeData;

  const agendamento = [];

  for (let i = 0; i < quantidade; i++) {
    const numeroSorteado = Math.floor(Math.random() * 2);
    switch (numeroSorteado) {
      case 0:
        agendamento.push('24');
        break;
      case 1:
        agendamento.push('48');
        break;
      default:
        break;
    }
  }

  return agendamento;
}

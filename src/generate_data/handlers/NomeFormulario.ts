export function NomeFormulario(quantidadeData) {
  const { quantidade } = quantidadeData;

  const formularios = [];

  for (let i = 0; i < quantidade; i++) {
    const numeroSorteado = Math.floor(Math.random() * 3);

    switch (numeroSorteado) {
      case 0:
        formularios.push(`Pedido`);
        break;
      case 1:
        formularios.push(`Sem pedido`);

        break;
      case 2:
        formularios.push(`Sem retorno`);

        break;
      default:
        break;
    }
  }

  return formularios;
}

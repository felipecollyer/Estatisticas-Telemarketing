export function TipoDeContato(quantidadeData) {
  const { quantidade } = quantidadeData;

  const TipoDeContato = [];

  for (let i = 0; i < quantidade; i++) {
    const numeroSorteado = Math.floor(Math.random() * 4);

    switch (numeroSorteado) {
      case 0:
        TipoDeContato.push(`Whatsapp ativo`);
        break;
      case 1:
        TipoDeContato.push(`Whatsapp passivo`);

        break;
      case 2:
        TipoDeContato.push(`Ligacao ativa`);

        break;
      case 3:
        TipoDeContato.push(`Ligacao passiva`);

        break;
      default:
        break;
    }
  }

  return TipoDeContato;
}

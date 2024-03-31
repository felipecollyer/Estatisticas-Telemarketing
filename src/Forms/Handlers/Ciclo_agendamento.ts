export function Ciclo_agendamento(ComPedido, SemPedido, SemRetorno) {
  const arrayCiclo = [ComPedido, SemPedido, SemRetorno];

  const quantidadeTotalCiclo = {
    ComPedido: {},
    SemPedido: {},
    SemRetorno: {},
  };

  arrayCiclo.forEach((formularios, index) => {
    formularios.forEach((data) => {
      const agendamento = data.ciclo_agendamento;
      quantidadeTotalCiclo[Object.keys(quantidadeTotalCiclo)[index]][
        agendamento
      ] = quantidadeTotalCiclo[Object.keys(quantidadeTotalCiclo)[index]][
        agendamento
      ]
        ? quantidadeTotalCiclo[Object.keys(quantidadeTotalCiclo)[index]][
            agendamento
          ] + 1
        : 1;
    });
  });

  return quantidadeTotalCiclo;
}

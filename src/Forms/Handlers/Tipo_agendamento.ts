export function Tipo_agendamento(ComPedido, SemPedido) {
  const arrayAgendamento = [ComPedido, SemPedido];

  const totalTiposAgendamento = {
    ComPedido: {},
    SemPedido: {},
  };

  arrayAgendamento.forEach((formularios, index) => {
    formularios.forEach((data) => {
      const agendamento = data.tipo_agendamento;
      totalTiposAgendamento[Object.keys(totalTiposAgendamento)[index]][
        agendamento
      ] = totalTiposAgendamento[Object.keys(totalTiposAgendamento)[index]][
        agendamento
      ]
        ? totalTiposAgendamento[Object.keys(totalTiposAgendamento)[index]][
            agendamento
          ] + 1
        : 1;
    });
  });

  return totalTiposAgendamento;
}

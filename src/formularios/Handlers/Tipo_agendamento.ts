export function Tipo_agendamento(formularios) {
  const totalTiposAgendamento = {};

  formularios.forEach((formulario) => {
    const tipo = formulario.tipo_agendamento;
    totalTiposAgendamento[tipo] = totalTiposAgendamento[tipo]
      ? totalTiposAgendamento[tipo] + 1
      : 1;
  });

  return totalTiposAgendamento;
}

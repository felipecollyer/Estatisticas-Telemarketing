export function cicloAgendado(formularios) {
  const totalCiclosAgendamento = {};

  formularios.forEach((formulario) => {
    const ciclo = formulario.ciclo_agendamento;
    totalCiclosAgendamento[ciclo] = totalCiclosAgendamento[ciclo]
      ? totalCiclosAgendamento[ciclo] + 1
      : 1;
  });

  return totalCiclosAgendamento;
}

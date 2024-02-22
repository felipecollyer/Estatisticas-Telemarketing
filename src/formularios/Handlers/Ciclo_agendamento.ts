export function cicloAgendado(formularios) {
  const totalCiclosAgendamento = {};

  // Iterando sobre os formulários para contar os totais de cada ciclo de agendamento
  formularios.forEach((formulario) => {
    const ciclo = formulario.ciclo_agendamento;
    totalCiclosAgendamento[ciclo] = totalCiclosAgendamento[ciclo]
      ? totalCiclosAgendamento[ciclo] + 1
      : 1;
  });

  return totalCiclosAgendamento;
}

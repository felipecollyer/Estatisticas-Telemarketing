export function somaTotal(formularios) {
  const totalFormularios = formularios.length;
  let totalAgendamento24 = 0;
  let totalAgendamento48 = 0;

  formularios.forEach((formulario) => {
    if (formulario.agendamento === '24') {
      totalAgendamento24++;
    } else if (formulario.agendamento === '48') {
      totalAgendamento48++;
    }
  });

  return { totalFormularios, totalAgendamento24, totalAgendamento48 };
}

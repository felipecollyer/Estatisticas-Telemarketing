import { HandlersIndex } from './index';

export function FormularioSemRetorno(formularios) {
  const formulariosSemRetorno = formularios.filter(
    (formulario) => formulario.nome_formulario === 'Sem Retorno',
  );

  const Ciclo = HandlersIndex.Ciclo_agendamento(formulariosSemRetorno);

  return {
    Total: formulariosSemRetorno.length,
    Ciclo,
  };
}

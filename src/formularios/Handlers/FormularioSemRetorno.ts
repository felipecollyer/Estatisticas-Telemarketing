import { HandlersIndex } from './index';

export function FormularioSemRetorno(formularios) {
  const formulariosSemRetorno = formularios.filter(
    (formulario) => formulario.nome_formulario === 'Sem Retorno',
  );

  const ClienteSemRetorno = formulariosSemRetorno.map(function (formulario) {
    return {
      codigo: formulario.codigo,
      razao_social: formulario.razao_social,
      ciclo_agendamento: formulario.ciclo_agendamento,
    };
  });

  const Ciclo = HandlersIndex.Ciclo_agendamento(formulariosSemRetorno);

  return {
    Total: formulariosSemRetorno.length,
    Ciclo,
    ClienteSemRetorno,
  };
}

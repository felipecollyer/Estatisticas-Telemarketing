import { HandlersIndex } from './index';

export function FormularioSemRetorno(formularios) {
  const formulariosSemRetorno = formularios.filter(
    (formulario) => formulario.nome_formulario === 'Sem Retorno',
  );

  const Ciclo = HandlersIndex.cicloAgendado(formulariosSemRetorno);

  return {
    Total: formulariosSemRetorno.length,
    Ciclo,
  };
}

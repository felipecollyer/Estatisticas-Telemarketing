import { HandlersIndex } from './index';

export function FormularioComPedido(formularios) {
  const formulariosPedido = formularios.filter(
    (formulario) => formulario.nome_formulario === 'Pedido',
  );

  const Agendamento = HandlersIndex.tipoAgendamento(formulariosPedido);
  const Ciclo = HandlersIndex.cicloAgendado(formulariosPedido);

  // const formulariosSemPedido = formularios.filter(
  //   (formulario) => formulario.nome_formulario === 'Sem Pedido',
  // );
  // const formulariosSemRetorno = formularios.filter(
  //   (formulario) => formulario.nome_formulario === 'Sem Retorno',
  // );

  return {
    Total: formulariosPedido.length,
    Agendamento,
    Ciclo,
  };
}

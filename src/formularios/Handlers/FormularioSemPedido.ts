import { HandlersIndex } from './index';

export function FormularioSemPedido(formularios) {
  const formulariosSemPedido = formularios.filter(
    (formulario) => formulario.nome_formulario === 'Sem Pedido',
  );

  const Agendamento = HandlersIndex.tipoAgendamento(formulariosSemPedido);
  const Ciclo = HandlersIndex.cicloAgendado(formulariosSemPedido);



  return {
    Total: formulariosSemPedido.length,
    Agendamento,
    Ciclo,
  };
}

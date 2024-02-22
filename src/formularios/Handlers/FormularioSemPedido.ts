import { HandlersIndex } from './index';

export function FormularioSemPedido(formularios) {
  const formulariosSemPedido = formularios.filter(
    (formulario) => formulario.nome_formulario === 'Sem Pedido',
  );

  const Agendamento = HandlersIndex.Tipo_agendamento(formulariosSemPedido);
  const Ciclo = HandlersIndex.Ciclo_agendamento(formulariosSemPedido);

  return {
    Total: formulariosSemPedido.length,
    Agendamento,
    Ciclo,
  };
}

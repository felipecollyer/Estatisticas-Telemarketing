import { HandlersIndex } from './index';

export function FormularioComPedido(formularios) {
  const formulariosPedido = formularios.filter(
    (formulario) => formulario.nome_formulario === 'Pedido',
  );

  const Agendamento = HandlersIndex.Tipo_agendamento(formulariosPedido);
  const Ciclo = HandlersIndex.Ciclo_agendamento(formulariosPedido);

  return {
    Total: formulariosPedido.length,
    Agendamento,
    Ciclo,
  };
}

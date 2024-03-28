import { HandlersIndex } from './index';

export function FormularioSemPedido(formularios) {
  const formulariosSemPedido = formularios.filter(
    (formulario) => formulario.nome_formulario === 'Sem pedido',
  );
  const ClienteSemPedido = formulariosSemPedido.map(function (formulario) {
    return {
      codigo: formulario.codigo_cliente,
      razao_social: formulario.razao_social,
      ciclo_agendamento: formulario.ciclo_agendamento,
    };
  });

  const Agendamento = HandlersIndex.Tipo_agendamento(formulariosSemPedido);
  const Ciclo = HandlersIndex.Ciclo_agendamento(formulariosSemPedido);

  return {
    Total: formulariosSemPedido.length,
    Agendamento,
    Ciclo,
    ClienteSemPedido,
  };
}


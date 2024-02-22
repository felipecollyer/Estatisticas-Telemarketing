import { HandlersIndex } from './index';

export function Estatisticas_por_agendamento(formulario) {
  //const soma = HandlersIndex.somaTotal(formulario_24);
  const Com_Pedido = HandlersIndex.FormularioComPedido(formulario);
  const Sem_Pedido = HandlersIndex.FormularioSemPedido(formulario);
  const Sem_Retorno = HandlersIndex.FormularioSemRetorno(formulario);

  // const Tipo_de_agendamento = HandlersIndex.tipoAgendamento(formulario_24);
  // const ciclo = HandlersIndex.cicloAgendado(formulario_24);

  return { Com_Pedido, Sem_Pedido, Sem_Retorno };
}

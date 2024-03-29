import { Tipo_agendamento } from './Tipo_agendamento';
import { Ciclo_agendamento } from './Ciclo_agendamento';

export function gerarEstatisticas(formularios) {
  const { ComPedido, SemPedido, SemRetorno } = formularios;

  const totalTipoAgendamento = Tipo_agendamento(ComPedido, SemPedido);
  const totalCiclo = Ciclo_agendamento(ComPedido, SemPedido, SemRetorno);
  const total = {
    ComPedido: ComPedido.length,
    SemPedido: SemPedido.length,
    SemRetorno: SemRetorno.length,
  };

  return { totalTipoAgendamento, totalCiclo, total };
}

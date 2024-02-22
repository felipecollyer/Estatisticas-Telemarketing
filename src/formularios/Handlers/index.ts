import { somaTotal } from '../Handlers/Soma_total';
import { FormularioSemPedido } from './FormularioSemPedido';
import { FormularioComPedido } from './FormularioComPedido';
import { FormularioSemRetorno } from './FormularioSemRetorno';
import { tipoAgendamento } from './Tipo_agendamento';
import { cicloAgendado } from './Ciclo_agendamento';

export class HandlersIndex {
  static somaTotal = somaTotal;
  static FormularioComPedido = FormularioComPedido;
  static FormularioSemPedido = FormularioSemPedido;
  static FormularioSemRetorno = FormularioSemRetorno;
  static tipoAgendamento = tipoAgendamento;
  static cicloAgendado = cicloAgendado;
}

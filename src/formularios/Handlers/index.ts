import { somaTotal } from '../Handlers/Soma_total';
import { FormularioSemPedido } from './FormularioSemPedido';
import { FormularioComPedido } from './FormularioComPedido';
import { FormularioSemRetorno } from './FormularioSemRetorno';
import { Tipo_agendamento } from './Tipo_agendamento';
import { Ciclo_agendamento } from './Ciclo_agendamento';

export class HandlersIndex {
  static somaTotal = somaTotal;
  static FormularioComPedido = FormularioComPedido;
  static FormularioSemPedido = FormularioSemPedido;
  static FormularioSemRetorno = FormularioSemRetorno;
  static Tipo_agendamento = Tipo_agendamento;
  static Ciclo_agendamento = Ciclo_agendamento;
}

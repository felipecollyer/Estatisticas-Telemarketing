import { Injectable } from '@nestjs/common';
import { CreateGenerateDatumDto } from './dto/create-generate_datum.dto';
import { UpdateGenerateDatumDto } from './dto/update-generate_datum.dto';
import { NomeFormulario } from './handlers/NomeFormulario';
import { CodigoCliente } from './handlers/CodioCliente';
import { RazaoSocial } from './handlers/RazaoSocial';
import { Agendamento } from './handlers/Agendamento';
import { TipoDeContato } from './handlers/TipoDeContato';
import { Ciclo } from './handlers/Ciclo';
import { Usuario } from './handlers/Usuario';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GenerateDataService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createGenerateDatumDto: CreateGenerateDatumDto) {
    const quantidadeData = createGenerateDatumDto;

    const gerarNomeFormulario = NomeFormulario(quantidadeData);
    const gerarCodigoCliente = CodigoCliente(quantidadeData);
    const gerarRazaoSocial = RazaoSocial(quantidadeData);
    const gerarAgendamento = Agendamento(quantidadeData);
    const gerarTipoDeContato = TipoDeContato(quantidadeData);
    const gerarCiclo = Ciclo(quantidadeData);
    const gerarUsuario = Usuario(quantidadeData);

    const objetos = gerarNomeFormulario.map((item, index) => {
      return {
        nome_formulario: item,
        codigo_cliente: gerarCodigoCliente[index],
        razao_social: gerarRazaoSocial[index],
        agendamento: gerarAgendamento[index],
        tipo_agendamento: gerarTipoDeContato[index],
        ciclo_agendamento: gerarCiclo[index],
        usuario_id: gerarUsuario[index],
      };
    });

    try {
      const resultados = await this.prisma.formulario.createMany({
        data: objetos,
      });
      console.log('Dados adicionados com sucesso:', resultados);
    } catch (error) {
      console.error('Erro ao adicionar dados:', error);
    } finally {
      await this.prisma.$disconnect();
    }

    return `Dados adicionado com sucesso`;
  }

  findAll() {
    return `This action returns all generateData`;
  }

  findOne(id: number) {
    return `This action returns a #${id} generateDatum`;
  }

  update(id: number, updateGenerateDatumDto: UpdateGenerateDatumDto) {
    return `This action updates a #${id} generateDatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} generateDatum`;
  }
}

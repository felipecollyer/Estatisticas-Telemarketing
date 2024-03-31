export function separateForms(data) {
  const formulariosPedido = data.filter(
    (formulario) => formulario.nome_formulario === 'Pedido',
  );

  const formulariosSemPedido = data.filter(
    (formulario) => formulario.nome_formulario === 'Sem pedido',
  );

  const formulariosSemRetorno = data.filter(
    (formulario) => formulario.nome_formulario === 'Sem retorno',
  );

  return {
    ComPedido: formulariosPedido,
    SemPedido: formulariosSemPedido,
    SemRetorno: formulariosSemRetorno,
  };
}

import { PropostaEntity } from "../../domain/entities/proposta";

export class PropostaPresenter {
  static toDTO(proposta: PropostaEntity) {
    const produtoDTO = {
      id: proposta.produto.id,
      nome: proposta.produto.nome,
      dataCadastro: proposta.produto.dataCadastro,
      valorEsperado: proposta.produto.valorEsperado,
      valorMinimo: proposta.produto.valorMinimo,
    };

    return {
      produto: produtoDTO,
      documento: proposta.documento,
      valor: proposta.valor,
      dataProposta: proposta.dataProposta,
    };
  }
}

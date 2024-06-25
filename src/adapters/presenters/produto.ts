import { ProdutoDTO } from "../../common/dtos/produto.dto";
import { ProdutoEntity } from "../../domain/entities/produto";
import { PropostaEntity } from "../../domain/entities/proposta";
import { PropostaPresenter } from "./proposta";

export class ProdutoPresenter {
  static toDTO(
    produto: ProdutoEntity,
    propostas?: PropostaEntity[]
  ): ProdutoDTO {
    let dto: ProdutoDTO = {
      id: produto.id,
      nome: produto.nome,
      dataCadastro: produto.dataCadastro,
      valorEsperado: produto.valorEsperado,
      valorMinimo: produto.valorMinimo,
    };
    if (propostas) {
      const propostasDto = propostas.map((x) => PropostaPresenter.toDTO(x));
      dto = { ...dto, propostas: propostasDto };
    }

    return dto;
  }
}

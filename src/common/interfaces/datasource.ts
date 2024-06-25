import { ProdutoDTO } from "../dtos/produto.dto.js";
import { PropostaDTO } from "../dtos/proposta.dto.js";

export interface IDataSource {
  buscarPropostasParaProduto(id: string): Promise<PropostaDTO[] | null>;
  incluirProduto(produto: ProdutoDTO): Promise<boolean>;
  buscarProdutoPorId(id: string): Promise<ProdutoDTO | null>;
  incluirProposta(proposta: PropostaDTO): Promise<boolean>;
  buscarTodosProdutos(): Promise<ProdutoDTO[]>
}

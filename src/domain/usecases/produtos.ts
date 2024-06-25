import { generateRandomString } from "../../common/helpers/generators";
import { ProdutoEntity } from "../entities/produto.js";
import { ProdutoGateway } from "../../adapters/gateways/produto.js";
import { PropostaEntity } from "../entities/proposta";

export class ProdutosUseCase {
  static async buscarPropostas(
    produto: ProdutoEntity,
    produtoGateway: ProdutoGateway
  ): Promise<PropostaEntity[] | null> {
    const propostas = await produtoGateway.buscarPropostas(produto);
    return propostas;
  }

  static cadastrarProduto(
    nome: string,
    valorEsperado: number,
    valorMinimo: number,
    produtoGateway: ProdutoGateway
  ) {
    const novoId = generateRandomString();
    const now = new Date();
    const nowSeconds = now.getTime();

    const novoProduto = new ProdutoEntity(
      novoId,
      nome,
      nowSeconds,
      valorEsperado,
      valorMinimo
    );
    produtoGateway.cadastrar(novoProduto);
    return novoProduto;
  }

  static async buscarPorId(id: string, gateway: ProdutoGateway) {
    const produto = await gateway.buscarPorId(id);
    return produto;
  }

  static cadastrarProposta(
    produto: ProdutoEntity,
    documento: string,
    valor: number,
    produtoGateway: ProdutoGateway
  ): PropostaEntity {
    if (valor < produto.valorMinimo) {
      throw new Error("Proposta rejeitada, valor abaixo do minimo");
    }

    const novaProposta = new PropostaEntity(produto, documento, valor);
    produtoGateway.cadastrarProposta(novaProposta);

    return novaProposta;
  }

  static async buscarTodos(produtoGateway: ProdutoGateway) {
    const produtos = produtoGateway.buscarTodos();
    return produtos;
  }
}

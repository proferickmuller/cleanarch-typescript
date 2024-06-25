import { ProdutoDTO } from "../../common/dtos/produto.dto";
import { PropostaDTO } from "../../common/dtos/proposta.dto";
import { IDataSource } from "../../common/interfaces/datasource";
import { ProdutoEntity } from "../../domain/entities/produto";
import { PropostaEntity } from "../../domain/entities/proposta";

export class ProdutoGateway {
  dataSource: IDataSource;
  constructor(ds: IDataSource) {
    this.dataSource = ds;
  }

  async cadastrar(produto: ProdutoEntity): Promise<boolean> {
    const produtoDto: ProdutoDTO = {
      id: produto.id,
      nome: produto.nome,
      dataCadastro: produto.dataCadastro,
      valorEsperado: produto.valorEsperado,
      valorMinimo: produto.valorMinimo,
    };

    const sucesso = await this.dataSource.incluirProduto(produtoDto);
    return sucesso;
  }

  async buscarPorId(id: string): Promise<ProdutoEntity | null> {
    const produto_ds: ProdutoDTO | null =
      await this.dataSource.buscarProdutoPorId(id);

    if (produto_ds) {
      const produto = new ProdutoEntity(
        (id = produto_ds.id),
        produto_ds.nome,
        produto_ds.dataCadastro,
        produto_ds.valorEsperado,
        produto_ds.valorMinimo
      );
      return produto;
    }

    return null;
  }

  async buscarTodos(): Promise<ProdutoEntity[]> {
    const todosProdutos = await this.dataSource.buscarTodosProdutos();

    console.log(todosProdutos);

    if (todosProdutos) {
      const produtos: ProdutoEntity[] = [];
      for (const produto of todosProdutos) {
        const produtoEntity: ProdutoEntity = {
          id: produto.id,
          nome: produto.nome,
          dataCadastro: produto.dataCadastro,
          valorEsperado: produto.valorEsperado,
          valorMinimo: produto.valorMinimo,
        }
        produtos.push(produtoEntity);
      }
      return produtos;
    }

    return [];
  }

  async cadastrarProposta(novaProposta: PropostaEntity): Promise<boolean> {
    const propostaDto: PropostaDTO = {
      produto: novaProposta.produto,
      documento: novaProposta.documento,
      valor: novaProposta.valor,
      dataProposta: novaProposta.dataProposta,
    };
    const sucesso = this.dataSource.incluirProposta(propostaDto);
    return sucesso;
  }

  async buscarPropostas(
    produto: ProdutoEntity
  ): Promise<PropostaEntity[] | null> {
    const propostas_ds = await this.dataSource.buscarPropostasParaProduto(
      produto.id
    );

    if (!propostas_ds) return null;

    const propostas = propostas_ds.map((x) => {
      return new PropostaEntity(produto, x.documento, x.valor, x.dataProposta);
    });

    return propostas;
  }
}

export class ProdutoEntity {
  public id: string;
  public nome: string;
  public dataCadastro: number;
  public valorEsperado: number;
  public valorMinimo: number;

  constructor(
    id: string,
    nome: string,
    dataCadastro: number,
    valorEsperado: number,
    valorMinimo: number,
  ) {
    this.id = id;
    this.nome = nome;
    this.dataCadastro = dataCadastro;
    this.valorEsperado = valorEsperado;
    this.valorMinimo = valorMinimo;
  }
}

export class ProdutoControllerError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, ProdutoControllerError.prototype);
  }
}

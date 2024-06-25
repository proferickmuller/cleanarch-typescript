import { throws } from "assert";
import { ProdutoEntity } from "./produto";

export class PropostaEntity {
    public produto: ProdutoEntity;
    public documento: string; 
    public valor: number; 
    public dataProposta: number;

    constructor(produto?: ProdutoEntity, documento?: string, valor?: number, dataProposta?: number) {
        if (!produto) {
            throw new Error("produto inválido");
        }

        if (!documento) {
            throw new Error("documento inválido");
        }

        if (!valor) {
            throw new Error("valor inválido");
        }
        
        this.produto = produto;
        this.documento = documento;
        this.valor = valor;
        
        if (dataProposta) {
            this.dataProposta = dataProposta;
        } else {
            const dt = new Date();
            this.dataProposta = dt.getTime();
        }
    }
}


import {BetterSQLite3Database, drizzle} from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import {text, integer, sqliteTable} from "drizzle-orm/sqlite-core";
import {IDataSource} from "../../common/interfaces/datasource";
import {ProdutoDTO} from "../../common/dtos/produto.dto";
import {eq} from "drizzle-orm";
import {PropostaDTO} from "../../common/dtos/proposta.dto";
import {ProdutoEntity} from "../../domain/entities/produto";

export class DrizzleSqliteDataSource implements IDataSource {
    private db: BetterSQLite3Database;
    private produto;
    private proposta;

    constructor() {
        const sqlite = new Database("database.sqlite");
        this.db = drizzle(sqlite);

        const produtoTable = sqliteTable("produto", {
            ID: text("id").primaryKey(),
            nome: text("nome"),
            dataCadastro: integer("data_cadastro"),
            valorEsperado: integer("valor_esperado"),
            valorMinimo: integer("valor_minimo"),
        });

        const propostaTable = sqliteTable("proposta", {
            produtoId: text("produto_id"),
            valor: integer("valor"),
            documento: text("documento"),
            dataProposta: integer("data_proposta"),
        });

        this.produto = produtoTable;
        this.proposta = propostaTable;
    }

    buscarTodosProdutos(): Promise<ProdutoDTO[]> {
        const rows: any = this.db
            .select()
            .from(this.produto)
            .all();

        return rows.map((produto: any) => {
            const p = {
                nome: produto.nome,
                dataCadastro: produto.dataCadastro,
                valorEsperado: produto.valorEsperado,
                valorMinimo: produto.valorMinimo,
                id: produto.ID,
            }
            return p
        });
    }


    async buscarPropostasParaProduto(
        produto_id: string
    ): Promise<PropostaDTO[] | null> {
        const rows: any = this.db
            .select()
            .from(this.proposta)
            .where(eq(this.proposta.produtoId, produto_id))
            .all();
        if (!rows || rows.length === 0) {
            return null;
        }
        const propostas = rows.map((x: any) => {
            const p: PropostaDTO = {
                produto: x.produtoId,
                dataProposta: x.dataProposta,
                valor: x.valor,
                documento: x.documento,
            };
            return p;
        });
        return propostas;
    }

    async incluirProduto(produto: ProdutoDTO): Promise<boolean> {
        const val = {
            ID: produto.id,
            nome: produto.nome,
            dataCadastro: produto.dataCadastro,
            valorEsperado: produto.valorEsperado,
            valorMinimo: produto.valorMinimo,
        };
        try {
            const retorno = await this.db
                .insert(this.produto)
                .values(val)
                .returning();
            console.log(retorno);
            return true;
        } catch (_err) {
            console.log(_err);
            return false;
        }
    }

    async buscarProdutoPorId(id: string): Promise<ProdutoDTO | null> {
        const rows: any = this.db
            .select()
            .from(this.produto)
            .where(eq(this.produto.ID, id))
            .all();
        if (!rows || rows.length === 0) {
            return null;
        }

        const item = rows[0];
        const produto: ProdutoDTO = {
            id: item.ID,
            nome: item.nome,
            dataCadastro: item.dataCadastro,
            valorEsperado: item.valorEsperado,
            valorMinimo: item.valorMinimo,
        };
        return produto;
    }

    async incluirProposta(propostaDto: PropostaDTO): Promise<boolean> {
        const val = {
            produtoId: propostaDto.produto.id,
            valor: propostaDto.valor,
            documento: propostaDto.documento,
            dataProposta: propostaDto.dataProposta,
        };
        try {
            const retorno = await this.db
                .insert(this.proposta)
                .values(val)
                .returning();
            console.log(retorno);
            return true;
        } catch (_err) {
            console.log(_err);
            return false;
        }
    }
}

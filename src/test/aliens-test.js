require("dotenv").config();

const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

/**
 * Assertion Style
 */
const should = chai.should();

const Alien = require("../models/aliens");

/**
 * Bloco de código responsável por realizar os testes da API
 */
describe("Aliens", () => {
    let newAlien = new Alien({
        _id: "5f82d2a8f0b843b765ad8168",
        name: "Gladson",
        tech: "NodeJS",
        sub: false,
    });

    /**
     * TESTE => Salvar
     * Rota: /aliens
     */
    describe("POST /aliens", () => {
        it("POST: Criar um novo alien", (done) => {
            chai.request(`${process.env.HOST}:${process.env.PORT}`)
                .post("/aliens")
                .send(newAlien)
                .end((error, res) => {
                    /**
                     * Salvando com sucesso, irá retornar status 200
                     */
                    res.should.have.status(200);
                    done();
                });
        });
    });

    /**
     * TESTE => Listar
     * Rota: /aliens
     */
    describe("GET /aliens", () => {
        it("GET: Listar os aliens", (done) => {
            chai.request(`${process.env.HOST}:${process.env.PORT}`)
                .get("/aliens")
                .end((error, res) => {
                    /**
                     * Listando com sucesso, irá retornar status 200
                     */
                    res.should.have.status(200);
                    res.should.be.json;

                    /**
                     * Se o retorno for 200, irá retornar um conjunto de elementos no array contidos na base de dados
                     */
                    res.body.should.be.a("object");

                    done();
                });
        });
    });

    /**
     * TESTE => Listar por ID
     * Rota: /aliens/:id
     */
    describe("GET /aliens/:id", () => {
        it("GET: Pegar o alien através do ID", (done) => {
            chai.request(`${process.env.HOST}:${process.env.PORT}`)
                .get(`/aliens/${newAlien.id}`)
                .end((error, res) => {
                    /**
                     * Listando com sucesso, irá retornar status 200
                     */
                    res.should.have.status(200);

                    /**
                     * Se o retorno for 200, irá retornar um conjunto de elementos no array contidos na base de dados
                     */
                    res.body.should.be.a("object");

                    done();
                });
        });
    });

    /**
     * TESTE => Listar por ID
     * Rota: /aliens/:id
     */
    describe("GET(ERROR) /aliens/:id", () => {
        it("GET(ERROR): Pegar o alien através do ID errado", (done) => {
            chai.request(`${process.env.HOST}:${process.env.PORT}`)
                .get("/aliens/5f824e3db459792e0be520d5")
                .end((error, res) => {
                    /**
                     * Listando com sucesso, irá retornar status 200
                     */
                    res.should.have.status(404);

                    /**
                     * Se o retorno for 200, irá retornar um conjunto de elementos no array contidos na base de dados
                     */
                    res.body.should.be.a("object");

                    done();
                });
        });
    });

    /**
     * TESTE => Atualizar campos específicos
     * Rota: /aliens/:id
     */
    describe("PATCH /aliens/:id", async () => {
        it("PATCH: Atualizar um campo específico do alien", (done) => {
            const alienPatch = {
                sub: true,
            };
            chai.request(`${process.env.HOST}:${process.env.PORT}`)
                .patch(`/aliens/${newAlien.id}`)
                .send(alienPatch)
                .end((error, res) => {
                    /**
                     * Salvando com sucesso, irá retornar status 200
                     */
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.sub = true;

                    done();
                });
        });
    });

    // /**
    //  * TESTE => Atualizar campos
    //  * Rota: /aliens/:id
    //  */
    // describe('PUT /aliens/:id', async () => {
    //     it('PUT: Atualizar um ou mais campos do alien', (done) => {
    //         const alienPatch = {
    //             name: 'Gladson',
    //             tech: 'Dart',
    //             sub: false,
    //         };
    //         chai.request(`${process.env.HOST}:${process.env.PORT}`)
    //             .put(`/aliens/${newAlien.id}`)
    //             .send(alienPatch)
    //             .end((error, res) => {
    //                 /**
    //                  * Salvando com sucesso, irá retornar status 200
    //                  */
    //                 res.should.have.status(200)
    //                 res.should.be.json
    //                 res.body.sub = false

    //                 done()
    //             })
    //     })
    // })

    /**
     *  TESTE => Deletar objeto do banco de dados
     *  Rota: /aliens/:id
     */
    describe("DELETE /aliens/:id", async () => {
        it("DELETE: Deletar o alien do banco de dados", (done) => {
            chai.request(`${process.env.HOST}:${process.env.PORT}`)
                .delete(`/aliens/${newAlien.id}`)
                .end((error, res) => {
                    /**
                     * Salvando com sucesso, irá retornar status 200
                     */
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body._id = newAlien.id;

                    done();
                });
        });
    });
});

const mongoose = require("mongoose");
const mocha = require("mocha");

// const before = mocha.before;
// const beforeEach = mocha.beforeEach;

mongoose.Promise = global.Promise;

const Alien = require("../../models/aliens");

setTimeout(() => {
    beforeEach(async () => {
        mongoose.connect(process.env.MONGOURI, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });
        mongoose.connection
            .once("open", () => {
                done();
            })
            .on("error", (error) => {
                console.warn("Atenção", error);
            });
    });

    afterEach(async () => {
        Alien.deleteMany({ name: "Gladson" }).then(() => {
            done();
        });
    });
});

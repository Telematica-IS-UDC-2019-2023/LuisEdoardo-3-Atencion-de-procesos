const Proceso = (function (ID) {
    this.id = ID;
    this.siguiente = null;
    this.anterior = null;
    this.ciclosR = Number(Math.floor(Math.random() * (14 - 4 + 1) ) + 4);
});
module.exports = Proceso;
const Proceso = require('./Proceso.js');
let Procesador = (function () {
    let inicial = null;
    var NumeroT = 1;
    var ciclosV = 0;
    var procesosC = 0;
    var procesosP = 0;
    const iniciar = () => {
        for (let ciclos = 0; ciclos <= 300; ciclos++) {
            if ((Math.ceil(Math.random() * 100)) <= 39) {
                let nuevaProceso = new Proceso(NumeroT);
                agregar(nuevaProceso);
                NumeroT++;
                procesosP++;
            }
            if (inicial != null) {
                if (inicial.ciclosR == 0) {
                    eliminar(inicial);
                    procesosC++;
                    procesosP--;
                }
                inicial.ciclosR--;
                inicial = inicial.siguiente;
            }
            if (inicial == null) {
                ciclosV++;
            }
            mostrar();
        }
    }
    const mostrar = () => {
        console.log(`Ciclos vacíos: ${ciclosV}\nProcesos realizados: ${procesosC}\nProcesos pendientes: ${procesosP}\n`);
    }
    const agregar = (proceso) => {
        if (inicial == null) {
            inicial = proceso;
            inicial.siguiente = inicial;
            inicial.anterior = inicial;
        } else {
            let aux = inicial;
            while (aux.siguiente != inicial) {
                aux = aux.siguiente;
            }
            aux.siguiente = proceso;
            aux.siguiente.anterior = aux;
            aux.siguiente.siguiente = inicial;
            inicial.anterior = proceso;
        }
        return proceso;
    }
    const buscar = (proceso) => {
        let aux = inicial;
        if (aux != null) {
            while (aux != proceso && aux.siguiente != inicial) {
                aux = aux.siguiente;
            }
            if (aux == proceso) {
                return aux;
            } else {
                return console.error('Error', 'buscar');
            }
        }
    }
    const eliminar = (proceso) => {
        if (proceso == inicial && inicial.anterior == inicial && inicial.siguiente == inicial) {
            inicial = null;
        } else if (inicial == proceso) {
            inicial.siguiente.anterior = inicial.anterior;
            inicial.anterior.siguiente = inicial.siguiente;
            inicial = inicial.siguiente;
        } else {
            let aux = inicial;
            while (aux.siguiente != proceso && aux.siguiente != inicial) {
                aux = aux.siguiente;
            }
            if (aux.siguiente == proceso) {
                aux.siguiente = aux.siguiente.siguiente;
                aux.siguiente.anterior = aux;
            } else {
                return console.error('Error', 'eliminar');
            }
        }
    }
    return {
        iniciar: iniciar,
        mostrar: mostrar,
    };
});
module.exports = Procesador;
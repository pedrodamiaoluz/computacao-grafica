// Função para converter coordenadas polares para cartesianas
function polarParaCartesianas(raio, angulo) {
    const x = raio * Math.cos(angulo);
    const y = raio * Math.sin(angulo);
    return { x, y };
}

// Exemplo de uso
const raio = 5; // comprimento do raio
const angulo = Math.PI / 4; // 45 graus em radianos

const coordenadasCartesianas = polarParaCartesianas(raio, angulo);
console.log(coordenadasCartesianas); // { x: 3.5355339059327378, y: 3.5355339059327378 }
// ---------------------------------------------------------------------------------------
// function polarParaCartesianas(raio, angulo) {
//     const x = raio * Math.cos(angulo);
//     const y = raio * Math.sin(angulo);
//     return { x, y };
// }

// function converterCoordenadas() {
//     const raio = parseFloat(document.getElementById('raio').value);
//     const angulo = parseFloat(document.getElementById('angulo').value);
//     const coordenadas = polarParaCartesianas(raio, angulo);
//     document.getElementById('resultado').innerText = `X: ${coordenadas.x}, Y: ${coordenadas.y}`;
// }

// Adicionar manipulador de eventos ao botão após a definição da função
// document.getElementById('converterBotao').addEventListener('click', converterCoordenadas);
// ---------------------------------------------------------------------------------------



// Função para converter coordenadas cartesianas para polares
// function cartesianasParaPolar(x, y) {
//     const raio = Math.sqrt(x * x + y * y);
//     const angulo = Math.atan2(y, x);
//     return { raio, angulo };
// }

// // Exemplo de uso
// const x = 3.5355339059327378;
// const y = 3.5355339059327378;

// const coordenadasPolares = cartesianasParaPolar(x, y);
// console.log(coordenadasPolares); // { raio: 5, angulo: 0.7853981633974483 }

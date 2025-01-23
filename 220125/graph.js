// Obtemos os elementos dos sliders e do ponto
const xSlider = document.getElementById('xSlider');
const ySlider = document.getElementById('ySlider');
const dataPoint = document.getElementById('dataPoint');

const xVal = document.getElementById('xVal');
const yVal = document.getElementById('yVal');

// Definimos limites do eixo no SVG (em pixels)
const xMinPixel = 50;   // Início do eixo X
const xMaxPixel = 450;  // Fim do eixo X

const yMinPixel = 50;    // Início do eixo Y (top)
const yMaxPixel = 450;   // Fim do eixo Y (base)

const axisRange = 20;    // 0 a 20

// Função para atualizar a posição do ponto no SVG
function updatePointPosition() {
  const xValue = parseFloat(xSlider.value);
  const yValue = parseFloat(ySlider.value);
  
  // Atualiza os valores exibidos
  xVal.textContent = xValue.toFixed(1);
  yVal.textContent = yValue.toFixed(1);
  
  // Mapeia o valor de X para a posição em pixels
  let xPixel = xMinPixel + (xValue / axisRange) * (xMaxPixel - xMinPixel);
  
  // Mapeia o valor de Y para a posição em pixels
  // Note que no SVG, Y aumenta para baixo, então subtraímos
  let yPixel = yMaxPixel - (yValue / axisRange) * (yMaxPixel - yMinPixel);
  
  // Garantir que o ponto não extrapole os limites do gráfico
  xPixel = Math.max(xMinPixel, Math.min(xPixel, xMaxPixel));
  yPixel = Math.max(yMinPixel, Math.min(yPixel, yMaxPixel));
  
  // Atualiza a posição do círculo
  dataPoint.setAttribute('cx', xPixel);
  dataPoint.setAttribute('cy', yPixel);
}

// Inicializa a posição do ponto
updatePointPosition();

// Adiciona eventos para atualizar o ponto quando os sliders mudam
xSlider.addEventListener('input', updatePointPosition);
ySlider.addEventListener('input', updatePointPosition);
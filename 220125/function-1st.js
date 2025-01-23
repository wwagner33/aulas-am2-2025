  // Pega o slider de X
  const xSlider = document.getElementById('xSlider');
  // Pega o campo de texto da equação
  const equacaoInput = document.getElementById('equacaoInput');
  // Pega o círculo no SVG
  const dataPoint = document.getElementById('dataPoint');
  
  // Elementos para exibição
  const xVal = document.getElementById('xVal');
  const yVal = document.getElementById('yVal');
  
  // Limites do eixo em pixels
  const xMinPixel = 50;  
  const xMaxPixel = 450; 
  const yMinPixel = 50;  
  const yMaxPixel = 450; 
  const axisRange = 20;  
  
  /**
   * Função que recebe uma string do tipo "2*x-5", "10+3*x", "x-1", "5", etc.
   * e retorna um objeto { a, b } para calcular Y = a*x + b.
   *
   * Não usa eval, não usa regexp.
   */
  function parseEquation(equationStr) {
    // 1. Remover espaços
    equationStr = equationStr.split(' ').join('');
    
    // Se a string estiver vazia, considere a = 0, b = 0
    if (!equationStr) {
      return { a: 0, b: 0 }; //forma de retornar mais de um valor em uma função. No caso, retorno um objeto literal.
    }
    
    // 2. Garantir que a expressão comece com '+' ou '-'
    // Ex: Se for "2*x+5", vira "+2*x+5". Se for "-x+2", já tá ok.
    const firstChar = equationStr[0];
    if (firstChar !== '+' && firstChar !== '-') {
      equationStr = '+' + equationStr;  // Ex: "2*x" => "+2*x"
    }
    
    // 3. Dividir a string em tokens separados por '+' ou '-',
    //    mas manter o sinal no início de cada token.
    //
    //    Exemplo: "+2*x-5" => ["+2*x", "-5"]
    //             "-3*x+10" => ["-3*x", "+10"]
    //
    // Para isso, percorremos caractere a caractere, e sempre que
    // encontramos '+' ou '-' (exceto o da posição 0), iniciamos um novo token.
    
    const tokens = [];
    let currentToken = '';
    for (let c = 0; c < equationStr.length; c++) {
      let ch = equationStr[c];
      
      // Se este caractere for '+' ou '-' e NÃO for o primeiro caractere,
      // quer dizer que iniciamos um novo token.
      if ((ch === '+' || ch === '-') && c !== 0) {
        // Antes de adicionar o sinal `ch`, empurramos o token atual para o array
        tokens.push(currentToken);
        // Começamos um novo token (zerado), que já inicia com o novo sinal
        currentToken = '';
      }
      
      // Concatena o caractere atual ao token
      currentToken += ch;
    }
    
    // Ao final do loop, sobra um token pendente
    if (currentToken) {
      tokens.push(currentToken);
    }
    
    // 4. Agora analisamos cada token, identificando se é parte de "a*x" ou somente "b".
    let a = 0; // coeficiente de x
    let b = 0; // termo constante
    
    for (let token of tokens) {
      // Exemplo de token: "+2*x", "-3*x", "+x", "-x", "+5", "-5"...
      
      // Extraímos o sinal. Se começar com '-', sign = -1, caso contrário +1
      let sign = (token[0] === '-') ? -1 : 1;
      
      // Remove o primeiro caractere (sinal), ficando só o conteúdo
      let content = token.substring(1); // Ex: "2*x"
      
      // Verificamos se existe 'x' no token (depois do sinal)
      let xIndex = content.indexOf('x');
      
      if (xIndex !== -1) {
        // Tem x. Exemplo: "2*x", "*x", "x", "3*x"
        
        // Remover o 'x'
        // Se contiver '*', remova também.
        content = content.replace('*', ''); // "2x", "x"
        content = content.replace('x', ''); // "2", ""
        
        // Se depois de remover sobrou "", significa que era apenas "+x" ou "-x"
        // Isso equivale a 1*x ou -1*x
        if (content === '') {
          content = '1';
        }
        
        // Converte em número
        let val = parseFloat(content);
        // Se for NaN, zere
        let coef = isNaN(val) ? 0 : val;
        
        // Soma ao coeficiente total 'a', respeitando o sinal
        a += coef * sign;
      } else {
        // Não tem 'x', então é só número (parte constante)
        let val = parseFloat(content);
        let num = isNaN(val) ? 0 : val;
        b += num * sign;
      }
    }
    
    return { a, b };
  }
  
  // Função para atualizar a posição do ponto no gráfico
  function updatePointPosition() {
    // Lê o X do slider
    let xValue = parseFloat(xSlider.value);
    
    // Faz o parse da equação e pega a, b
    let { a, b } = parseEquation(equacaoInput.value);
    
    // Calcula Y
    let yValue = a * xValue + b;
    
    // Atualiza display
    xVal.textContent = xValue.toFixed(1);
    yVal.textContent = `Y = ${yValue.toFixed(1)}`;
    
    // Converte xValue para posição em pixels
    let xPixel = xMinPixel + (xValue / axisRange) * (xMaxPixel - xMinPixel);
    // Converte yValue para posição em pixels (lembrando que no SVG o Y é invertido)
    let yPixel = yMaxPixel - (yValue / axisRange) * (yMaxPixel - yMinPixel);
    
    // Limita o ponto
    xPixel = Math.max(xMinPixel, Math.min(xPixel, xMaxPixel));
    yPixel = Math.max(yMinPixel, Math.min(yPixel, yMaxPixel));
    
    // Move o círculo
    dataPoint.setAttribute('cx', xPixel);
    dataPoint.setAttribute('cy', yPixel);
  }
  
  // Eventos
  xSlider.addEventListener('input', updatePointPosition);
  equacaoInput.addEventListener('input', updatePointPosition);
  
  // Inicializa
  updatePointPosition();

//Segunda Versão

//    // Pega o slider de X
//    const xSlider = document.getElementById('xSlider');
//    // Pega o campo de texto da equação
//    const equacaoInput = document.getElementById('equacaoInput');
//    // Pega o círculo no SVG
//    const dataPoint = document.getElementById('dataPoint');
   
//    // Elementos para exibição
//    const xVal = document.getElementById('xVal');
//    const yVal = document.getElementById('yVal');
   
//    // Limites do eixo em pixels
//    const xMinPixel = 50;  
//    const xMaxPixel = 450; 
//    const yMinPixel = 50;  
//    const yMaxPixel = 450; 
//    const axisRange = 20;  
   
//    /**
//     * Função que faz parse de uma expressão linear usando Regex + laço.
//     * Suporta formas como: "a*x+b", "b+a*x", "a*x-b", "b-a*x", "a*x", "b", etc.
//     *
//     * Retorna um objeto { a, b } tal que Y = a*x + b.
//     */
//    function parseEquation(equationStr) {
//      // Remove espaços
//      equationStr = equationStr.replace(/\s+/g, '');
     
//      // Usamos uma RegEx para quebrar a string em tokens do tipo:
//      //   - [opcionalmente + ou -] + [número (opcional) + . + número (opcional) + *x ] OU só x
//      // Exemplos de tokens gerados: "+2*x", "-3*x", "x", "-x", "5", "+10", etc.
//      // Se não encontrar nada, tokens será null.
//      const tokens = equationStr.match(/[+\-]?(?:\d+(?:\.\d+)?(?:\*x)?|x)/g);
 
//      // Se não conseguiu casar nada, consideramos a=0 e b=0
//      if (!tokens) {
//        return { a: 0, b: 0 };
//      }
     
//      let a = 0; // coeficiente de x
//      let b = 0; // termo constante
     
//      // Percorre cada token
//      for (let token of tokens) {
//        // Verifica se contém "x"
//        if (token.includes('x')) {
//          // Exemplo de token: "+2.5*x" ou "-x" ou "x" ou "2*x" etc.
//          // Remove '*'
//          token = token.replace('*', '');
//          // Remove 'x'
//          token = token.replace('x', '');
         
//          // Se depois de remover x e * sobrar só "" ou "+" ou "-", tratamos como ±1
//          if (token === '' || token === '+') {
//            token = '1';
//          } else if (token === '-') {
//            token = '-1';
//          }
         
//          // Agora convertendo pra número...
//          let val = parseFloat(token);
//          if (!isNaN(val)) {
//            a += val;  // soma ao coeficiente total de x
//          }
//        } else {
//          // Caso não tenha 'x', é um valor constante (parte de b).
//          let val = parseFloat(token);
//          if (!isNaN(val)) {
//            b += val;
//          }
//        }
//      }
//      return { a, b };
//    }
   
//    // Função para atualizar a posição do ponto no gráfico
//    function updatePointPosition() {
//      // Lê o X do slider
//      const xValue = parseFloat(xSlider.value);
//      // Faz o parse da equação e pega a, b
//      const { a, b } = parseEquation(equacaoInput.value);
     
//      // Calcula Y usando a e b
//      const yValue = a * xValue + b;
     
//      // Atualiza display dos valores
//      xVal.textContent = xValue.toFixed(1);
//      yVal.textContent = `Y = ${yValue.toFixed(1)}`;
     
//      // Converte xValue para posição em pixels
//      let xPixel = xMinPixel + (xValue / axisRange) * (xMaxPixel - xMinPixel);
     
//      // Converte yValue para posição em pixels (SVG é invertido em Y)
//      let yPixel = yMaxPixel - (yValue / axisRange) * (yMaxPixel - yMinPixel);
     
//      // Limita o ponto à área do gráfico
//      xPixel = Math.max(xMinPixel, Math.min(xPixel, xMaxPixel));
//      yPixel = Math.max(yMinPixel, Math.min(yPixel, yMaxPixel));
     
//      // Atualiza posição do círculo
//      dataPoint.setAttribute('cx', xPixel);
//      dataPoint.setAttribute('cy', yPixel);
//    }
   
//    // Eventos
//    xSlider.addEventListener('input', updatePointPosition);
//    equacaoInput.addEventListener('input', updatePointPosition);
   
//    // Inicializa
//    updatePointPosition();

//Terceira Versão
//   // Pega o slider de X
//   const xSlider = document.getElementById('xSlider');
//   // Pega o campo de texto da equação
//   const equacaoInput = document.getElementById('equacaoInput');
//   // Pega o círculo no SVG
//   const dataPoint = document.getElementById('dataPoint');
  
//   // Elementos para exibição
//   const xVal = document.getElementById('xVal');
//   const yVal = document.getElementById('yVal');
  
//   // Limites do eixo em pixels
//   const xMinPixel = 50;  
//   const xMaxPixel = 450; 
//   const yMinPixel = 50;  
//   const yMaxPixel = 450; 
//   const axisRange = 20;  
  
//   /**
//    * Função para avaliar a expressão da equação (tipo "2*x+5", "5+2*x", "2*x-5", etc.).
//    * Substitui 'x' pelo valor de X e usa eval para obter o valor numérico.
//    */
//   function parseEquation(equationStr, xValue) {
//     // Remove espaços
//     let expr = equationStr.replace(/\s+/g, '');
    
//     // Faz uma checagem simples para evitar caracteres inesperados (você pode refinar mais se quiser)
//     // Permitimos dígitos, ponto, +, -, * e x
//     if (!/^[0-9.*+\-x]+$/.test(expr)) {
//       alert("Equação inválida! Use apenas dígitos, ., +, -, * e x.");
//       return 0;
//     }
    
//     // Substitui cada 'x' pelo valor numérico atual de xValue
//     expr = expr.replace(/x/g, `(${xValue})`);
    
//     // Avalia a expressão
//     let y;
//     try {
//       // Converte para número
//       y = Number(eval(expr));
//       if (isNaN(y)) {
//         throw new Error();
//       }
//     } catch {
//       alert("Equação inválida! Verifique o formato.");
//       y = 0;
//     }
    
//     return y;
//   }
  
//   // Função para atualizar a posição do ponto no gráfico
//   function updatePointPosition() {
//     // Lê o X do slider
//     const xValue = parseFloat(xSlider.value);
//     // Lê e avalia a equação
//     const yValue = parseEquation(equacaoInput.value, xValue);
    
//     // Atualiza display dos valores
//     xVal.textContent = xValue.toFixed(1);
//     yVal.textContent = `Y = ${yValue.toFixed(1)}`;
    
//     // Converte xValue para posição em pixels
//     let xPixel = xMinPixel + (xValue / axisRange) * (xMaxPixel - xMinPixel);
    
//     // Converte yValue para posição em pixels (lembrando que no SVG o Y é invertido)
//     let yPixel = yMaxPixel - (yValue / axisRange) * (yMaxPixel - yMinPixel);
    
//     // Limita o ponto à área do gráfico
//     xPixel = Math.max(xMinPixel, Math.min(xPixel, xMaxPixel));
//     yPixel = Math.max(yMinPixel, Math.min(yPixel, yMaxPixel));
    
//     // Atualiza posição do círculo
//     dataPoint.setAttribute('cx', xPixel);
//     dataPoint.setAttribute('cy', yPixel);
//   }
  
//   // Eventos
//   xSlider.addEventListener('input', updatePointPosition);
//   equacaoInput.addEventListener('input', updatePointPosition);
  
//   // Inicializa
//   updatePointPosition();
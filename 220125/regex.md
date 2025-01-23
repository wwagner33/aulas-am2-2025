1. ^ e $ são os delimitadores que indicam o início e o fim da string (pra garantir que ela corresponde exatamente ao padrão, e não apenas contenha o padrão no meio).

2. ([+-]?\d+(\.\d+)?):

    a. [+-]? significa que o número pode ter sinal positivo ou negativo, ou nenhum sinal.
    \d+ é um ou mais dígitos (0-9).
    (\.\d+)? diz que pode existir um ponto decimal seguido de um ou mais dígitos (ou seja, parte fracionária), mas isso é opcional.
    b. ([+\-]) captura o sinal + ou -. Basicamente, está pegando se é “+” ou “-” pra gente poder usar depois.
    c. (\d+(\.\d+)?) novamente, um número (sem sinal dessa vez, porque o sinal já foi capturado no passo anterior), podendo ter parte decimal opcional. Exemplo: “4” ou “4.53”.

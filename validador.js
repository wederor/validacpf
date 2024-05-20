var inputCpf = document.getElementById("cpf");
var inputUf = document.getElementById("uf");

const grupo1 = ["DF", "GO", "MS", "MT", "TO"];
const grupo2 = ["AC", "AM", "AP", "PA", "RO", "RR"];
const grupo3 = ["CE", "MA", "PI"];
const grupo4 = ["PB", "PE", "RN"];
const grupo5 = ["BA", "SE"];
const grupo6 = ["MG"];
const grupo7 = ["ES", "RJ"];
const grupo8 = ["SP"];
const grupo9 = ["PR", "SC"];
const grupo0 = ["RS"];

//Armazena os grupos do 9º digito do CPF por UF

let ufCerta;
let primeiroVerificador;
let segundoVerificador;

let validaUF = (cpfDividido, UF) => { //função que verifica se o 9º digito do CPF confere com o padrão de UF
    var UF = inputUf.value;

    switch(true){

        case cpfDividido[8] == 1 && grupo1.includes(UF):
            ufCerta = true;
            break;
        case cpfDividido[8] == 2 && grupo2.includes(UF):
            ufCerta = true;
            break;
        case cpfDividido[8] == 3 && grupo3.includes(UF):
            ufCerta = true;
            break;
        case cpfDividido[8] == 4 && grupo4.includes(UF):
            ufCerta = true;
            break;
        case cpfDividido[8] == 5 && grupo5.includes(UF):
            ufCerta = true;
            break;
        case cpfDividido[8] == 6 && grupo6.includes(UF):
            ufCerta = true;
            break;
        case cpfDividido[8] == 7 && grupo7.includes(UF):
            ufCerta = true;
            break;
        case cpfDividido[8] == 8 && grupo8.includes(UF):
            ufCerta = true;
            break;
        case cpfDividido[8] == 9 && grupo9.includes(UF):
            ufCerta = true;
            break;
        default:
            ufCerta = false;
            break;

    }
}


let validaCPF = () => { //função que valida o primeiro digito verificador do CPF
    var cpf = String(inputCpf.value);
    var cpfDividido = cpf.split(""); //Armazena o CPF digitado separadamente

    let validador1 = (cpfDividido) => {

       let verificador = ["10", "9", "8", "7", "6", "5", "4", "3", "2"]; //lista padrão para verificação do primeiro digito verificador

       let resultado = 0

       for(let i = 0; i < 9; i++){ //for para que os numeros do CPF sejam multiplicados pela lista padrão de verificação do resultado

            resultado += parseInt(verificador[i]) * parseInt(cpfDividido[i]);
       }

       resultado = resultado % 11 // conta padrão para descobrir o primeiro verificador do CPF

       if(11 - resultado >= 10){ // caso o valor de 11 - o resultado do calculo acima seja maior ou igual a 10, o primeiro digito verificador é igual a 0

        primeiroVerificador = 0

       } else{

        primeiroVerificador = 11 - resultado // caso o valor de 11 - o resultado do calculo acima seja menor que 10, o primeiro digito verificador é o resultado de 11 - o resultado

       }

       return primeiroVerificador
    }

    let validador2 = (cpfDividido) => {

        let verificador = ["11", "10", "9", "8", "7", "6", "5", "4", "3", "2"]; //lista padrão para verificação do segundo digito verificador

        let resultado = 0

        for(let i = 0; i < 10; i++){ //for para que os numeros do CPF sejam multiplicados pela lista padrão de verificação do resultado

             resultado += parseInt(verificador[i]) * parseInt(cpfDividido[i]);
        }

        resultado = resultado % 11 // conta padrão para descobrir o segundo verificador do CPF

        if(11 - resultado >= 10){ // caso o valor de 11 - o resultado do calculo acima seja maior ou igual a 10, o segundo digito verificador é igual a 0

            segundoVerificador = 0

        } else{

            segundoVerificador = 11 - resultado // caso o valor de 11 - o resultado do calculo acima seja menor que 10, o segundo digito verificador é o resultado de 11 - o resultado

        }

        return segundoVerificador
    }

    validador1(cpfDividido)
    validador2(cpfDividido)

}

let validador = (cpf, UF) => {

    const resultadoParaP = document.getElementById('resultado');
    
    var cpf = String(inputCpf.value);
    var cpfDividido = cpf.split(""); //Armazena o CPF digitado separadamente
    if (cpf.length != 11){ //valida se o CPF informado tem o tamanho padrão de um CPF (11 digitos)

       resultadoParaP.textContent = "CPF informado não tem o tamanho correto!";
        return undefined;
    }

    validaUF(cpfDividido, UF)
    validaCPF()

    if(ufCerta && cpfDividido[9] == primeiroVerificador && cpfDividido[10] == segundoVerificador){

        resultadoParaP.textContent = "O CPF é valido!"

    } else{

        resultadoParaP.textContent = "O CPF é invalido!"

    }

}   

const valida = document.getElementById("submit")

valida.addEventListener('click', () => {
    validador(cpf, UF);
    var UF = inputUf.value;
    var cpf = String(inputCpf.value);
});
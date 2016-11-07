app.factory('TrabalhoFreelancerService', function($http) {
    var urlDisponiveis = "/php/freelancer/trabalho-disponivel.php";
    var urlAndamento = "/php/freelancer/trabalho-andamento.php";
    var urlConcluido = "/php/freelancer/trabalho-concluido.php";
    var urlAltera = "/php/freelancer/altera-trabalho.php";
    //TODO: var urlCadastra = "/php/cliente/cadastra-trabalho.php";
    
    
    var getDisponiveis = function(filtro) {
        return $http.post(urlDisponiveis, {filtro: filtro}).then(
            function sucesso(respostaServidor) {
                return respostaServidor.data;
            },
            function erro(respostaServidor) {
                return {resultado : false, mensagem: "Erro ao se comunicar com a servidor"};
            });
    }
    var getAndamento = function(filtro) {
        return $http.post(urlAndamento, {filtro: filtro}).then(
            function sucesso(respostaServidor) {
                return respostaServidor.data;
            },
            function erro(respostaServidor) {
                return {resultado : false, mensagem: "Erro ao se comunicar com a servidor"};
            });
    }
    var getConcluido = function(filtro) {
        return $http.post(urlConcluido, {filtro: filtro}).then(
            function sucesso(respostaServidor) {
                return respostaServidor.data;
            },
            function erro(respostaServidor) {
                return {resultado : false, mensagem: "Erro ao se comunicar com a servidor"};
            });
    }
    var altera = function(modificacoes) {
        return $http.post(urlAltera, modificacoes).then(
            function sucesso(respostaServidor) {
                return respostaServidor.data;
            },
            function erro(respostaServidor) {
                return {resultado : false, mensagem: "Erro ao se comunicar com a servidor"};
            });
    }
    
    
    return {
        getDisponiveis: getDisponiveis,
        getAndamento: getAndamento,
        getConcluido: getConcluido,
        altera: altera
    };
});
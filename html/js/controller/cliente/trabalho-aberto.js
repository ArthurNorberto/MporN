app.controller("ClienteTrabalhoAbertoController", function($scope, $location, store, jwtHelper, TrabalhoClienteService) {
    $scope.dataClienteTrabalhoAberto = {
        loading: 0,
        dados: []
    };

    $scope.dataClienteTrabalhoAberto.loading += 1;
    TrabalhoClienteService.getAbertos().then(function(data) {
        if (data.trabalhos) {
            $scope.dataClienteTrabalhoAberto.dados = data.trabalhos;
            $scope.dataClienteTrabalhoAberto.loading -= 1;
        }
        else {
            $scope.dataClienteTrabalhoAberto.erro = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
        }
    });
})
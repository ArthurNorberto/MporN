app.controller("ClienteTrabalhoAssinadoController", function($scope, $location, store, jwtHelper, TrabalhoClienteService) {
    $scope.dataClienteTrabalhoAssinado = {
        loading: 0,
        dados: []
    };

    $scope.dataClienteTrabalhoAssinado.loading += 1;
    TrabalhoClienteService.getAssinados().then(function(data) {
        if (data.trabalhos) {
            $scope.dataClienteTrabalhoAssinado.dados = data.trabalhos;
            $scope.dataClienteTrabalhoAssinado.loading -= 1;
        }
        else {
            $scope.dataClienteTrabalhoAssinado.erro = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
        }
    });
})
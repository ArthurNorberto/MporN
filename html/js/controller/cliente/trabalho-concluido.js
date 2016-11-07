app.controller("ClienteTrabalhoConcluidoController", function($scope, $location, store, jwtHelper, TrabalhoClienteService) {
    $scope.dataClienteTrabalhoConcluido = {
        loading: 0,
        dados: []
    };

    $scope.dataClienteTrabalhoConcluido.loading += 1;
    TrabalhoClienteService.getConcluidos().then(function(data) {
        if (data.trabalhos) {
            $scope.dataClienteTrabalhoConcluido.dados = data.trabalhos;
            $scope.dataClienteTrabalhoConcluido.loading -= 1;
        }
        else {
            $scope.dataClienteTrabalhoConcluido.erro = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
        }
    });
})
app.controller("FreelancerTrabalhoConcluidoController", function($scope, $location, store, jwtHelper, TrabalhoService) {
    $scope.dataFreelancerTrabalhoConcluido = {
        loading: 0,
        dados: []
    };

    $scope.dataFreelancerTrabalhoConcluido.loading += 1;
    TrabalhoService.getConcluido().then(function(data) {
        if (data.trabalhos) {
            $scope.dataFreelancerTrabalhoConcluido.dados = data.trabalhos;
            $scope.dataFreelancerTrabalhoConcluido.loading -= 1;
        }
        else {
            $scope.dataFreelancerTrabalhoConcluido.erro = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
        }
    });
})
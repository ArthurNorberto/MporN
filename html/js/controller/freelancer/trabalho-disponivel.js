app.controller("FreelancerTrabalhoDisponivelController", function($scope, $location, store, jwtHelper, TrabalhoFreelancerService) {
    $scope.dataFreelancerTrabalhoDisponivel = {
        loading: 0,
        dados: []
    };

    $scope.dataFreelancerTrabalhoDisponivel.loading += 1;
    TrabalhoFreelancerService.getDisponiveis().then(function(data) {
        if (data.trabalhos) {
            $scope.dataFreelancerTrabalhoDisponivel.dados = data.trabalhos;
            $scope.dataFreelancerTrabalhoDisponivel.loading -= 1;
        }
        else {
            $scope.dataFreelancerTrabalhoDisponivel.erro = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
        }
    });
})
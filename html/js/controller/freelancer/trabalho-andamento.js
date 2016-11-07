app.controller("FreelancerTrabalhoAndamentoController", function($scope, $location, store, jwtHelper, TrabalhoFreelancerService) {
    $scope.dataFreelancerTrabalhoAndamento = {
        loading: 0,
        dados: []
    };

    $scope.dataFreelancerTrabalhoAndamento.loading += 1;
    TrabalhoFreelancerService.getAndamento().then(function(data) {
        if (data.trabalhos) {
            $scope.dataFreelancerTrabalhoAndamento.dados = data.trabalhos
            $scope.dataFreelancerTrabalhoAndamento.loading -= 1;
        }
        else {
            $scope.dataFreelancerTrabalhoAndamento.erro = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
        }
    });
})
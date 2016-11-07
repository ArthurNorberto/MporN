app.controller("ClienteCriarTrabalhoController", function($scope, $location, store, jwtHelper, TrabalhoClienteService, PlanoService) {
    $scope.dataClienteCriarTrabalho = {
        loading: 0,
        dados: []
    };
    
    
    function cadastraValido() {
        $scope.dataClienteCriarTrabalho.erro.nome.requerido = $scope.criarTrabalhoForm.nomeInput.$error.required === true;
        $scope.dataClienteCriarTrabalho.erro.nome.tamanho = $scope.criarTrabalhoForm.nomeInput.$error.minlength === true; //evita undefined
        
        $scope.dataClienteCriarTrabalho.erro.email.requerido = $scope.criarTrabalhoForm.descricaoInput.$error.required === true;
        $scope.dataClienteCriarTrabalho.erro.email.invalido = $scope.criarTrabalhoForm.descricaoInput.$error.email === true;
        
        return $scope.criarTrabalhoForm.$valid;
    }
    
    
    $scope.cadastrar = function(trabalho) {
        //verificações:
        if(!cadastraValido()) return;
        
        $scope.dataClienteCriarTrabalho.loading += 1;
        var resposta = TrabalhoClienteService.cadastrarTrabalho(trabalho);
            resposta.then(function(data) {
            if(data.resultado == true) {
                $scope.dataClienteCriarTrabalho.loading -= 1;
                $location.path('/cliente/aberto');
            } else {
                $scope.dataClienteCriarTrabalho.erro.mensagem = "Erro no Cadastro: " + data.mensagem;
                $scope.dataClienteCriarTrabalho.loading -= 1;
            }
        });
    };
    
    PlanoService.getPlanos().then(function(data) {
        if (data.planos) {
            $scope.dataClienteCriarTrabalho.todosPlanos = data.planos;
            $scope.dataClienteCriarTrabalho.loading -= 1;
        } else {
            $scope.dataClienteCriarTrabalho.erro.mensagem = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
            $scope.dataClienteCriarTrabalho.loading -= 1;
        }
    });
    
    
})
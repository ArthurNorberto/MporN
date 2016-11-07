app.controller("ClienteDadosController", function($scope, $location, store, jwtHelper, ClienteService) {
    $scope.dataCliente = {
        loading: 0,
        erro: {
            mensagem: null,
            nome: {
                requerido: false,
                tamanho: false
                },
            email: {
                requerido: false,
                invalido: false
                },
            cpfcnpj: {
                requerido: false,
                invalido: false
                },
            senha: {
                requerido: false,
                tamanho: false,
                difere: false
                },
            especialidade: {
                requerido: false
                }
            },
        dados: {}
    };    
    
    function cadastraValido() {
        $scope.dataCliente.erro.nome.requerido = $scope.cadastroForm.nomeInput.$error.required === true;
        $scope.dataCliente.erro.nome.tamanho = $scope.cadastroForm.nomeInput.$error.minlength === true; //evita undefined
        
        $scope.dataCliente.erro.email.requerido = $scope.cadastroForm.emailInput.$error.required === true;
        $scope.dataCliente.erro.email.invalido = $scope.cadastroForm.emailInput.$error.email === true;
        
        $scope.dataCliente.erro.cpfcnpj.requerido = $scope.cadastroForm.cpfcnpjInput.$error.required === true;
        $scope.dataCliente.erro.cpfcnpj.invalido = //se não for preenchido não verfica por validade
            (!$scope.dataCliente.erro.cpfcnpj.requerido && !$scope.cadastroForm.cpfcnpjInput.$valid);
        
        //senha não é obrigatorio
        //$scope.dataCliente.erro.senha.requerido = $scope.cadastroForm.senhaInput.$error.required === true;
        //$scope.dataCliente.erro.senha.tamanho = $scope.cadastroForm.senhaInput.$error.minlength === true;
        
        $scope.dataCliente.erro.especialidade.requerido = $scope.cadastroForm.especialidadeInput.$error.required === true;
        
        //Verfica se as senhas são iguais, mas somente se a primeira é maior que o minimo
        if($scope.dataCliente.dados.hasOwnProperty('senha') && $scope.dataCliente.dados.senha != null && $scope.dataCliente.dados.senha != '')
            $scope.dataCliente.erro.senha.difere = !$scope.dataCliente.erro.senha.tamanho &&
                ($scope.dataCliente.senha2 != $scope.dataCliente.dados.senha);
        
        return $scope.cadastroForm.$valid;
    }

    $scope.atualizaClienteDados = function() {
        if (!cadastraValido()) {
            return;
        }
        $scope.dataCliente.loading += 1;
        ClienteService.setDados($scope.dataCliente.dados).then(function(data) {
            if (data.resultado) {
                $location.path('/cliente/aberto');
                $scope.dataCliente.loading -= 1;
            } else {
                $scope.dataCliente.erro.mensagem = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
                $scope.dataCliente.loading -= 1;
            }
        });
    }

    $scope.dataCliente.loading += 2;
    ClienteService.getDados().then(function(data) {
        if (data) {
            $scope.dataCliente.dados = data;
            $scope.dataCliente.senha2 = $scope.dataCliente.dados.senha;
            $scope.dataCliente.loading -= 1;
        } else {
            $scope.dataCliente.erro.mensagem = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
            $scope.dataCliente.loading -= 1;
        }
    });
    ClienteService.getEspecialidades().then(function(data) {
        if (data.especialidades) {
            $scope.dataCliente.todasEspecialidades = data.especialidades;
            $scope.dataCliente.loading -= 1;
        } else {
            $scope.dataCliente.erro.mensagem = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
            $scope.dataCliente.loading -= 1;
        }
    });
})
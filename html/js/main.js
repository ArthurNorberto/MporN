var app = angular.module('mporn', ['ngRoute', 'angular-storage', 'angular-jwt', 'ui.mask', 'ngCpfCnpj']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        redirectTo: '/inicio'
    }).when('/inicio', {
        templateUrl: 'views/inicio.html',
        controller: 'InicioController'
    }).when('/login/freelancer', {
        templateUrl: 'views/login/freelancer.html',
        controller: 'LoginFreelancerController'
    }).when('/login/cliente', {
        templateUrl: 'views/login/cliente.html',
        controller: 'LoginClienteController'
    }).when('/cadastro/freelancer', {
        templateUrl: 'views/cadastro/freelancer.html',
        controller: 'CadastroFreelancerController'
    }).when('/cadastro/cliente', {
        templateUrl: 'views/cadastro/cliente.html',
        controller: 'CadastroClienteController'
    }).when('/freelancer', {
        redirectTo: '/freelancer/disponivel'
    }).when('/cliente', {
        redirectTo: '/cliente/aberto'
    }).when('/cliente/criar-trabalho', {
        templateUrl: 'views/cliente/criar-trabalho.html',
        controller: 'ClienteCriarTrabalhoController'
    }).when('/cliente/aberto', {
        templateUrl: 'views/cliente/trabalho-aberto.html',
        controller: 'ClienteTrabalhoAbertoController'
    }).when('/cliente/assinado', {
        templateUrl: 'views/cliente/trabalho-assinado.html',
        controller: 'ClienteTrabalhoAssinadoController'
    }).when('/cliente/concluido', {
        templateUrl: 'views/cliente/trabalho-concluido.html',
        controller: 'ClienteTrabalhoConcluidoController'
    }).when('/freelancer/disponivel', {
        templateUrl: 'views/freelancer/trabalho-disponivel.html',
        controller: 'FreelancerTrabalhoDisponivelController'
    }).when('/freelancer/andamento', {
        templateUrl: 'views/freelancer/trabalho-andamento.html',
        controller: 'FreelancerTrabalhoAndamentoController'
    }).when('/freelancer/concluido', {
        templateUrl: 'views/freelancer/trabalho-concluido.html',
        controller: 'FreelancerTrabalhoConcluidoController'
    }).when('/freelancer/dados', {
        templateUrl: 'views/freelancer/dados.html',
        controller: 'FreelancerDadosController'
    }).otherwise({
        redirectTo: '/'
    });
}]);

app.config(function Config($httpProvider, jwtInterceptorProvider) {
    jwtInterceptorProvider.tokenGetter = ['store', function(store) {
        return store.get('jwt');
    }];

    $httpProvider.interceptors.push('jwtInterceptor');
})

app.controller("MainController", function($scope, $location, store, jwtHelper, LoginService) {
    $scope.dataMain = {isLoged: false, loading: false, usuario: {}};
    
    $scope.isTelaAtiva = function (viewLocation) { 
        return viewLocation === $location.path();
    };
    
    $scope.getTelaAtiva = function (viewLocation) { 
        return $location.path();
    };
    
    $scope.logout = function() {
        $scope.dataMain.isLoged = false;
        store.remove('jwt');
        $scope.dataMain.usuario = {};
        $location.path('/');
    }

    $scope.login = function(usuario) {
        alert("Erro login não implementado");
    };
    
    var jwt = store.get('jwt');
    if(store.get('jwt') == null){
        //não logado
        $scope.dataMain.isLoged = false;
        $scope.dataMain.usuario = {};
    } else if(jwtHelper.isTokenExpired(jwt)) {
        //logado, mas o login expirou
        $scope.dataMain.isLoged = false;
        $scope.dataMain.usuario = {};
        store.remove('jwt');
    } else {
        //logado e valido
        $scope.dataMain.usuario = jwtHelper.decodeToken(jwt).data;
        $scope.dataMain.isLoged = true;
    }
});
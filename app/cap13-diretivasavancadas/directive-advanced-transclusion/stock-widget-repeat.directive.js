/**
 * Created by mayco on 24/06/2017.
 *
 * Nao posso o templateUrl e template properties juntos ao criar a diretiva
 *
 * template: usado para criar um html inline
 * templateUrl: usado para acessar um html externo
 *
 * restrict: 
 *
 * 'A' permite que a diretiva seja declarada como Atributo  <div stock-widget>
 *  Preferiveis em mudancas de comporto exemplo: ng-show
 *
 * 'E' permite que a diretiva seja declarada como um novo Elemento html  <stock-widget></stock-widget>
 * Usada para criarmos conteudos html novos
 *
 * 'C' permite que a diretiva seja declarada como uma class css exemplo <div class="stock-widget"
 * Usado na renderizacao do DOM exemplo: ng-cloack
 *
 * 'M' permite que a diretiva seja declarada como comentario exemplo <!-- directive: stock-widget -->
 *     
 * link:  chamada funcao link
 * usada como um controlador da diretiva possui
 * tres atributos padroes $scope, $element, $attrs
 *
 * scope:
 *
 * podem ser false, true ou object
 *
 * false valor default a diretiva herda o escopo do pai
 * true a diretiva herda o escopo do pai e a diretiva tera seu proprio escopo, qualquer modificacao nao estara
 * disponivel para o pai
 *
 * object, chamado de escopo isolado, mais utilizado para criacao de componentes reutilizaveis
 * ele nao herda nada do pai e qualquer dado que deve ser compártilhado do escopo-pai devera
 * ser passado por meio de atributos html
 *
 * tipos de atributos serão especificados no html
 *
 * '=' O Atributo sera tratado como objeto json
 * '@' O Atributo sera tratado como uma string que pode ter sim ou nao expressoes de binding do angular
 * '&' O Atributo devera ser tratado como uma função , e a diretiva pode disparar essa funcao a qualquer momento
 *
 *    scope: {
              stockData: '='
     }

 <div stock-widget stock-data="stock">
 *
 * Transclusions
 *
 *  Ojetivo nao perder a referencia do template principal, quando uma diretiva for carregada
 *
 *  1º
 * transclude: quando true informa que o angular deve fazer uma copia do seu conteudo e armazena-la para que ela
 * nao seja perdida quando o AngularJS substitui-la pelo template da diretiva.
 *
 * 2º
 * ng-tranclude: usada para definir o llocal onde devera colocar o conteudo armazenado no template. Isso é
 * feito por meio de ng-transclude, que garante que o conteudo capturado se tornara filho do elemento no template da
 * diretiva
 *
 * */

(function () {

    'use strict';

    app.directive('simpleStockRepeat', SimpleStockRepeat);

    SimpleStockRepeat.$inject = [];

    function SimpleStockRepeat() {
        return {
            restrict: 'A',
            //Captura e substitui todo o elemento em vez de fazer isso somente com seu conteudo
            transclude: 'element',
            //Um $transclude é passado como quinto argumento da funcao link
            link: function ($scope, $element, $attrs, ctrl, $transclude) {

                var myArray = $scope.$eval($attrs.simpleStockRepeat);

                var container = angular.element(
                    '<div class="container"></div>');

                for (var i = 0; i < myArray.length; i++) {
                    //Cria uma instancia do elemento com um novo escopo--filho usando a funcao de ligacao clone

                    var instance = $transclude($scope.$new(), function (clonedElement, newScope) {
                       //Expoe as variaveis personalizadas da instancia
                        newScope.currentIndex = i;
                        newScope.nome = myArray[i].nome = "Maycon";
                        newScope.stock = myArray[i];
                    });

                    // Adiciona o novo elemento ao container

                    container.append(instance);
                }

                // Com transclude: 'element', o elemento é substituido por um comentário. Adiciona
                // o nosso conteudo gerado apos o comentario
                $element.after(container);
            }
        };
    }

    // TEMPLATE
    // function StockWidget() {
    //     return {
    //         template: '<div class="stock-dash">' +
    //             'Name: ' +
    //             '<span class="stock-name" ng-bind="stock.name"></span>' +
    //             'Price: ' +
    //             '<span class="stock-price" ng-bind="stock.price | currency"></span>' +
    //             'Percent Change: ' +
    //             '<span class="stock-change" ng-bind="mainCtrl.getChange(stock)">' +
    //             '%' +
    //             '</span>' +
    //             '</div>'
    //     };
    // }

})();
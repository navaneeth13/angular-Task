(function() {

    angular.module('myApp',[])
        .controller('GithubCtrl',[ '$scope','$http', '$window', function( $scope, $http, $window ) {

            $scope.query = 'github';

            $scope.results =[];

            $scope.done = true;

            $scope.httpGET = function() {

                $http.get( 'http://it-ebooks-api.info/v1/search/'+ $scope.query+'/page/'+$scope.page )
                    .then(function( res ) {

                        $scope.visible = true;
                        $scope.authError = '';
                        angular.forEach( res.data.Books, function( book ) {

                            $scope.results.push( book );

                        });

                        if( res.data.Books.length < 10 ) {

                            $scope.visible = false;
                            $scope.done = true;

                        }

                    }, function( err ) {

                        $scope.authError = err;

                    });

            };

            $scope.submit = function() {

                $scope.page = 1;
                $scope.visible = false;
                $scope.done = false;
                $scope.results =[];
                $scope.httpGET();

            };

            $scope.submit();

            $scope.more = function() {

                if( $scope.visible ) {

                    $scope.visible = false;
                    $scope.page++;
                    $scope.httpGET();
                }


            };


            /**** INIFINITE SCROLL FUNCTIONALITY ***/


                $window.onscroll = function() {

                    console.log('SCROLLTOP IS ' + document.body.scrollTop);
                    console.log( 'InnerHeight is ' + window.innerHeight );
                    console.log('80% of InnerHeight is ' + 0.80*window.innerHeight);

                    console.log('-----------');

                    console.log('document.body.scrollHeight is ' + document.body.scrollHeight);
                    var value = document.body.scrollHeight - window.innerHeight - 0.4*window.innerHeight;
                    console.log('document.body.scrollHeight - window.innerHeight - 0.4*window.innerHeight is ' + value);

                    if( ( (document.documentElement.scrollTop||document.body.scrollTop) >= ( document.body.scrollHeight - window.innerHeight - 0.4*window.innerHeight ) ) ) {

                            console.log('Inside IF CONDITION, calling MORE FUNCTION...');
                            $scope.more();

                    }

                };


            /***INFINITE SCROLL FUNCTIONALITY **/


            $scope.clickFunc = function() {

                $scope.clicked = !!!$scope.clicked;

            };

        }]);


})();
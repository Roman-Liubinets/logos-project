var app = angular.module('app', ['ngDialog']);

// app.config(['$locationProvider', function ($locationProvider) {
//     $locationProvider.hashPrefix('');
//     $locationProvider.html5Mode(true);
// }]);
//
// app.config(function($routeProvider) {
//     $routeProvider
//     .otherwise({
//         redirectTo:'/'
//     })
// });


app.controller('myCtrl', function($scope, $http, ngDialog) {
    $scope.items = [];

    $http.get('http://localhost:8000/goods')
        .then(function successCallback(response) {
            $scope.items = response.data;
        }, function errorCallback(response) {
            console.log("Error!!!" + response.err);
        });
//Додати товар

})
//Директива Меню
app.directive("headerBlock", function() {
    return {
        replace: true,
        templateUrl: "template/menu.html",
        controller: function($scope, $http) {
            $scope.home = true;
            $scope.contact = false;
            $scope.blog = false;
            $scope.goods = false;
            $scope.bodyLoginBlock = false;

            $scope.menuButton = [{
                name: "Home",
                action: function() {
                    $scope.contact = false;
                    $scope.home = true;
                    $scope.blog = false;
                    $scope.goods = false;
                    $scope.bodyLoginBlock = false;
                }
            }, {
                name: "Contact",
                action: function() {
                    $scope.contact = true;
                    $scope.home = false;
                    $scope.blog = false;
                    $scope.goods = false;
                    $scope.bodyLoginBlock = false;
                }
            }, {
                name: "Blog",
                action: function() {
                    $scope.contact = false;
                    $scope.home = false;
                    $scope.blog = true;
                    $scope.goods = false;
                    $scope.bodyLoginBlock = false;
                }
                }, {
                    name: "Goods",
                    action: function() {
                        $scope.contact = false;
                        $scope.home = false;
                        $scope.blog = false;
                        $scope.goods = true;
                        $scope.bodyLoginBlock = false;
                }
            }
            // , {
            //     name: "Login",
            //     action: function() {
            //         $scope.contact = false;
            //         $scope.home = false;
            //         $scope.blog = false;
            //         $scope.goods = false;
            //         $scope.bodyLoginBlock = true;
            // }
            // }
        ];

        $scope.loginBlockShow = function() {
            $scope.home = false;
            $scope.contact = false;
            $scope.blog = false;
            $scope.goods = false;
            $scope.bodyLoginBlock = true;
        }

            $scope.checkUsers = function() {
                let obj = {
                    login: $scope.login,
                    pass: $scope.password
                }

                $http.post('http://localhost:8000/login', obj)
                    .then(function successCallback(response) {
                        console.log(response.data);

                    }, function errorCallback(response) {
                        console.log("Error!!!" + response.err);
                    });
            }
        }
    }
})

// app.directive("loginBlock", function() {
//     return {
//         replace:true,
//         templateUrl: "template/login.html",
//         controller: function() {
//
//         }
//     }
// })

app.directive("bodyBlock", function() {
    return {
        replace: true,
        templateUrl: "template/blog.html",
        controller: function($scope, $http) {
            $scope.newsArray = [{
                    title: "Джордж Веа - один з головних претендентів  \n на посаду президента Ліберії",
                    news: "Екс-форвард Монако, ПСЖ і Мілана Джордж Веа може бути обраний президентом Ліберії, повідомляє Le Parisien"
                },
                {
                    title: "Мбаппе - наймолодший в історії претендент на Золотий м'яч",
                    news: "Нападник ПСЖ Кіліан Мбаппе, який в минулому сезоні виступав за Монако, став наймолодшим в історії гравцем, який був номінований на Золотий м'яч, повідомляє Get French Football."
                }, {
                    title: "Шевчук: Хорвати не показали надфутболу.",
                    news: "Колишній гравець гірників, а нині головний тренер Шахтаря U-17 В'ячеслав Шевчук прокоментував результат матчу відбору на Чемпіонат світу - 2018 Україна - Хорватія."
                }
            ];
// Чат
            // $scope.myArray = [];
            // $scope.myName = "Anonim";
            //
            //
            // $scope.setName = function(name) {
            //     $scope.myName = name;
            //     $scope.enterName = "";
            //     console.log($scope.myArray)
            // }
            //
            // $scope.sendMassage = function(message) {
            //     $scope.myMessage = message;
            //     $scope.myArray.push($scope.myName, $scope.myMessage);
            //     $scope.enterText = "";
            //     console.log($scope.myArray)
            // }

// $scope.sendMassage = function() {
//     let chatObj = {
//         name: $scope.enterName,
//         message: $scope.enterText
//     };
//
//     $http.post('http://localhost:8000/chat-mess', chatObj)
//         .then(function successCallback(response) {
//         }, function errorCallback(response) {
//             console.log("Error!!!" + response.err);
//         });
// }



// Товари
// $scope.addGoods  = function(name, price) {
//     $scope.goodsName = name;
//     $scope.goodsPrice = price;
//
//     $scope.goodsArr = [{
//         name: $scope.goodsName,
//         price: $scope.goodsPrice
//     }];
//     console.log($scope.goodsArr);
// }

// добавляння товару
$scope.addGoods  = function() {
    let goodsObj = {
        name: $scope.setGoodsName,
        price: $scope.setGoodsPrice
    };

    $http.post('http://localhost:8000/goods-add', goodsObj)
        .then(function successCallback(response) {
        }, function errorCallback(response) {
            console.log("Error!!!" + response.err);
        });

}
//Змінна товару

//Регистрація
$scope.registerAcc  = function() {
    let loginObj = {
        login: $scope.login,
        password: $scope.password
    };

    $http.post('http://localhost:8000/login-reg', loginObj)
        .then(function successCallback(response) {
        }, function errorCallback(response) {
            console.log("Error!!!" + response.err);
        });
        $scope.login = "";
        $scope.password = "";
        }

//Змінна паролю
$scope.changeAccPass = function() {
    let loginObj = {
        login: $scope.login,
        password: $scope.password
    };

    $http.post('http://localhost:8000/login-change', loginObj)
        .then(function successCallback(response) {
        }, function errorCallback(response) {
            console.log("Error!!!" + response.err);
        });
        $scope.login = "";
        $scope.password = "";
};


//Слайдер
            var slideNow = 1;
            var translateWidth = 0;
            var slideCount = $('#slidewrapper').children().length;

            function nextSlide() {
                if (slideNow == 2) {
                    $("#slidewrapper li:nth-child(3)").css({
                        "display": "inline"
                    })
                } else if (slideNow == 3) {
                    $("#slidewrapper li:nth-child(4)").css({
                        "display": "inline"
                    })
                }
                if (slideNow == slideCount || slideNow <= 0 || slideNow > slideCount) {
                    $("#slidewrapper").css('transform', 'translate(0, 0)');
                    slideNow = 1;
                } else {
                    translateWidth = -$('#viewport').width() * (slideNow);
                    $('#slidewrapper').css({
                        'transform': 'translate(' + translateWidth + 'px, 0)',
                        '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
                        '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
                    });
                    slideNow++;
                }
            }

            var slideInterval = 2000;

            // $(document).ready(function() {
            //     var switchInterval = setInterval(nextSlide, slideInterval);
            //
            //     $('#viewport').hover(function() {
            //         clearInterval(switchInterval);
            //     }, function() {
            //         switchInterval = setInterval(nextSlide, slideInterval);
            //     });
            // });

            function prevSlide() {
                if (slideNow == 1) {
                    $("#slidewrapper li:nth-child(4)").css({
                        "display": "inline"
                    })
                } else if (slideNow == 4) {
                    $("#slidewrapper li:nth-child(3)").css({
                        "display": "inline"
                    })
                }

                if (slideNow == 1 || slideNow <= 0 || slideNow > slideCount) {
                    translateWidth = -$('#viewport').width() * (slideCount - 1);
                    $('#slidewrapper').css({
                        'transform': 'translate(' + translateWidth + 'px, 0)',
                        '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
                        '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
                    });
                    slideNow = slideCount;
                } else {
                    translateWidth = -$('#viewport').width() * (slideNow - 2);
                    $('#slidewrapper').css({
                        'transform': 'translate(' + translateWidth + 'px, 0)',
                        '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
                        '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
                    });
                    slideNow--;
                }
            }

            $('#next-btn').click(function() {
                nextSlide();
            });

            $('#prev-btn').click(function() {
                prevSlide();
            });

            var navBtnId = 0;

            $('.slide-nav-btn').click(function() {
                navBtnId = $(this).index();
                if (this) {
                    $("#slidewrapper li:nth-child(3)").css({
                        "display": "inline"
                    })
                    $("#slidewrapper li:nth-child(4)").css({
                        "display": "inline"
                    })
                }

                if (navBtnId + 1 != slideNow) {
                    translateWidth = -$('#viewport').width() * (navBtnId);
                    $('#slidewrapper').css({
                        'transform': 'translate(' + translateWidth + 'px, 0)',
                        '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
                        '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
                    });
                    slideNow = navBtnId + 1;
                }
            });
        }
    }
})

// app.directive("sliderBlock", function() {
//     return {
//         replace: true,
//         templateUrl: "template/slider.html",
//         controller: function($scope) {
//             var slideNow = 1;
//             var translateWidth = 0;
//             var slideCount = $('#slidewrapper').children().length;
//
//             function nextSlide() {
//                 if (slideNow == 2) {
//                     $("#slidewrapper li:nth-child(3)").css({
//                         "display": "inline"
//                     })
//                 } else if (slideNow == 3) {
//                     $("#slidewrapper li:nth-child(4)").css({
//                         "display": "inline"
//                     })
//                 }
//                 if (slideNow == slideCount || slideNow <= 0 || slideNow > slideCount) {
//                     $("#slidewrapper").css('transform', 'translate(0, 0)');
//                     slideNow = 1;
//                 } else {
//                     translateWidth = -$('#viewport').width() * (slideNow);
//                     $('#slidewrapper').css({
//                         'transform': 'translate(' + translateWidth + 'px, 0)',
//                         '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
//                         '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
//                     });
//                     slideNow++;
//                 }
//             }
//
//             var slideInterval = 2000;
//
//             // $(document).ready(function() {
//             //     var switchInterval = setInterval(nextSlide, slideInterval);
//             //
//             //     $('#viewport').hover(function() {
//             //         clearInterval(switchInterval);
//             //     }, function() {
//             //         switchInterval = setInterval(nextSlide, slideInterval);
//             //     });
//             // });
//
//             function prevSlide() {
//                 if (slideNow == 1) {
//                     $("#slidewrapper li:nth-child(4)").css({
//                         "display": "inline"
//                     })
//                 } else if (slideNow == 4) {
//                     $("#slidewrapper li:nth-child(3)").css({
//                         "display": "inline"
//                     })
//                 }
//
//                 if (slideNow == 1 || slideNow <= 0 || slideNow > slideCount) {
//                     translateWidth = -$('#viewport').width() * (slideCount - 1);
//                     $('#slidewrapper').css({
//                         'transform': 'translate(' + translateWidth + 'px, 0)',
//                         '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
//                         '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
//                     });
//                     slideNow = slideCount;
//                 } else {
//                     translateWidth = -$('#viewport').width() * (slideNow - 2);
//                     $('#slidewrapper').css({
//                         'transform': 'translate(' + translateWidth + 'px, 0)',
//                         '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
//                         '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
//                     });
//                     slideNow--;
//                 }
//             }
//
//             $('#next-btn').click(function() {
//                 nextSlide();
//             });
//
//             $('#prev-btn').click(function() {
//                 prevSlide();
//             });
//
//             var navBtnId = 0;
//
//             $('.slide-nav-btn').click(function() {
//                 navBtnId = $(this).index();
//                 if (this) {
//                     $("#slidewrapper li:nth-child(3)").css({
//                         "display": "inline"
//                     })
//                     $("#slidewrapper li:nth-child(4)").css({
//                         "display": "inline"
//                     })
//                 }
//
//                 if (navBtnId + 1 != slideNow) {
//                     translateWidth = -$('#viewport').width() * (navBtnId);
//                     $('#slidewrapper').css({
//                         'transform': 'translate(' + translateWidth + 'px, 0)',
//                         '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
//                         '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
//                     });
//                     slideNow = navBtnId + 1;
//                 }
//             });

        // }








    // }
// })

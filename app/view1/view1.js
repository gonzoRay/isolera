'use strict';

(function () {
    angular.module('isolera.view1', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/view1', {
                templateUrl: 'view1/view1.html',
                controller: 'PostsController',
                controllerAs: 'ctrl'
            });
        }]).controller('PostsController', PostsController);

    PostsController.$inject = ['$scope'];

    function PostsController($scope) {
        ////
        // Setup
        ////
        var self = this;

        ////
        // API
        ////
        self.getComments = getComments;
        self.getArticles = getHottestArticles;
        self.posts = [];
        ////
        // Scope
        ////
        init();

        ////
        // Functions
        ////
        function init() {
            var isMock = false;
            //ctrl.comments = isMock ? getMockComments() : getComments("3oe5l8", "homeland", 10);
            getHottestArticles("aww", 10);
            console.log('returned articles: ' + self.posts);
        }

        function getMockComments() {
            var comments = [];
            for (var i = 1; i <= 10; i++) {
                comments.push({text: 'lorem ipsum ' + i});
            }
            return comments;
        }

        function getComments(article, sub, take) {
            var comments = undefined;
            // Fetch the hottest comment on article 23ha0a from /r/pics
            reddit.comments(article, sub).limit(take)
                .sort("hot")
                .fetch(function(res) {
                    comments = res.data;
                    console.log(comments);
            });
            return comments;
        }

        function getHottestArticles(sub, take) {
            var container = document.querySelector(".container");
            //var articles = [];
            reddit.hot(sub).limit(take).fetch(get);

            function get(res) {
                self.posts = angular.copy(res.data.children);
                render(self.posts);
            }

            function error(error) {
                console.log('Errors: ', error);
            }

            function render(posts) {
                for (var i = 0; i < posts.length; i++) {
                    var awwData = posts[i].data;
                    var thumbnail = document.createElement("img");
                    var aww = document.createElement("img");
                    var row = document.createElement("div");
                    var left = document.createElement("div");
                    var right = document.createElement("div");
                    var link = document.createElement("a");
                    row.className = "row";
                    left.className = "col-xs-4";
                    thumbnail.setAttribute("src", awwData.thumbnail);
                    link.setAttribute("href", "http://www.reddit.com" + awwData.permalink);
                    link.innerText = awwData.title;
                    left.appendChild(thumbnail);
                    left.appendChild(link);
                    row.appendChild(left);
                    right.className = "col-xs-8";
                    aww.className = "img-responsive";
                    aww.setAttribute("src", awwData.url);
                    right.appendChild(aww);
                    row.appendChild(right);
                    container.appendChild(row);
                }
            }

        }
    }
})();
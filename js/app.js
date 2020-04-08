"use strict";
var myApp = angular.module("myApp", ["firebase", "ui.router", "oc.lazyLoad", "ngSanitize"]);
myApp.config(["$stateProvider", "$urlRouterProvider", "$ocLazyLoadProvider", "$locationProvider", function(e, t, a, $locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
    t.otherwise("/"), e.state("tech", {
        url: "/tech",
        templateUrl: "template/cat/tech.html",
        controller: "mainController"
    }).state("sports", {
        url: "/sports",
        templateUrl: "template/cat/spot.html",
        controller: "mainController"
    }).state("rwanda", {
        url: "/rwanda",
        templateUrl: "template/location/rwanda.html"
    }).state("brazil", {
        url: "/brazil",
        templateUrl: "template/location/brazil.html"
    }).state("nigeria", {
        url: "/nigeria",
        templateUrl: "template/location/nigeria.html"
    }).state("japan", {
        url: "/japan",
        templateUrl: "template/location/japan.html"
    }).state("kenya", {
        url: "/kenya",
        templateUrl: "template/location/kenya.html"
    }).state("trend", {
        url: "/trend",
        templateUrl: "template/cat/trend.html"
    }).state("movie", {
        url: "/movie",
        templateUrl: "template/cat/movie.html"
    }).state("music", {
        url: "/music",
        templateUrl: "template/cat/music.html"
    }).state("sportvideo", {
        url: "/sport",
        templateUrl: "template/cat/sport.html"
    }).state("uk", {
        url: "/uk",
        templateUrl: "template/location/uk.html"
    }).state("vietnam", {
        url: "/vietnam",
        templateUrl: "template/location/vietnam.html"
    }).state("mexico", {
        url: "/mexico",
        templateUrl: "template/location/mexico.html"
    }).state("hongkong", {
        url: "/hongkong",
        templateUrl: "template/location/hongkong.html"
    }).state("russia", {
        url: "/russia",
        templateUrl: "template/location/russia.html"
    }).state("saudi", {
        url: "/saudi",
        templateUrl: "template/location/saudi.html"
    }).state("thailand", {
        url: "/thailand",
        templateUrl: "template/location/thailand.html"
    }).state("belgium", {
        url: "/belgium",
        templateUrl: "template/location/belgium.html"
    }).state("india", {
        url: "/india",
        templateUrl: "template/location/india.html"
    }).state("france", {
        url: "/france",
        templateUrl: "template/location/france.html"
    }).state("home", {
        url: "/home",
        templateUrl: "template/news.html",
        controller: "mainController",
        resolve: {
            loadMyService: ["$ocLazyLoad", function(e) {
                return e.load("js/index.js")
            }]
        }
    })
}]), myApp.directive("content", ["$state", function(e) {
    return {
        restrict: "E",
        replace: !1,
        templateUrl: "template/news.html"
    }
}]), myApp.directive("shared", ["$state", function(e) {
    return {
        restrict: "E",
        replace: !1,
        templateUrl: "template/shared.html"
    }
}]), myApp.directive("menu", ["$state", function(e) {
    return {
        restrict: "E",
        replace: !1,
        templateUrl: "template/menu.html"
    }
}]), myApp.directive("foot", ["$state", function(e) {
    return {
        restrict: "E",
        replace: !1,
        templateUrl: "template/footer.html"
    }
}]), myApp.directive("space", function() {
    return {
        restrict: "E",
        replace: !1,
        template: "<br><br>"
    }
}), myApp.directive("script", function() {
    return {
        restrict: "E",
        scope: !1,
        link: function(e, t, a) {
            if ("text/javascript-lazy" === a.type) {
                var r = document.createElement("script");
                r.type = "text/javascript";
                var l = t.attr("src");
                if (void 0 !== l) r.src = l;
                else {
                    var n = t.text();
                    r.text = n
                }
                document.head.appendChild(r), t.remove()
            }
        }
    }
}), myApp.controller("mainController", ["$scope", "$firebaseObject", "$firebaseArray", "$state", "$ocLazyLoad", "$sce", function(e, t, a, r, l, n) {
    var o = new Firebase("https://jenzzo.firebaseio.com/data"),
        i = new Firebase("https://jenzzo.firebaseio.com/testing"),
        s = t(o);
    document.getElementById("iframe");
    s.$bindTo(e, "data"), e.myScript = function() {
        l.load("js/index.js"), console.log("hello bite ")
    }, e.urls = t(o.child("data").child("urls")), e.audio = t(o.child("data").child("audio")), e.links = "", e.saveUrls = function() {
        e.urls.$value = e.links, e.urls.$save()
    };
    e.urls.$loaded().then(function() {
        e.urls.$value.length > 0 ? e.activeTemplate = n.trustAsResourceUrl(e.urls.$value) : console.log("found nothing")
    }), e.audio.$loaded().then(function() {
        e.audio.$value.length > 0 ? e.audioUrl = n.trustAsResourceUrl(e.audio.$value) : console.log("found nothing")
    }), e.currentPage = 0, e.pageSize = 1, e.messages = a(i), e.numberOfPages = function() {
        return Math.ceil(e.messages.length / e.pageSize)
    }, e.addMessage = function() {
        e.messages.$add({
            text: e.newMessageText
        })
    }
}]), myApp.controller("FeedCtrl", ["$scope", "FeedService", function(e, t) {
    e.loadButonText = "Load", e.feedSrc = "https://www.infoworld.com/index.rss", e.loadFeed = function(a) {
        t.parseFeed(e.feedSrc).then(function(t) {
            "" != angular.element(a.target).text() ? (console.log("hello"), e.loadButonText = angular.element(a.target).text(), e.feeds = t.data.responseData.feed.entries) : (e.loadButonText = "#News", e.feeds = t.data.responseData.feed.entries)
        })
    }, e.loadFeed(e.loadButonText)
}]), myApp.factory("FeedService", ["$http", function(e) {
    return {
        parseFeed: function(t) {
            return e.jsonp("//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=" + encodeURIComponent(t))
        }
    }
}]), myApp.filter("startFrom", function() {
    return function(e, t) {
        return t = +t, e.slice(t)
    }
});

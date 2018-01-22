/**
 * TreasyJS WebApp
 * @author Johseffer <johseffer@gmail.com>
 */

/**
 * Main AngularJS Web Application
 */
var app = angular.module('treasyJSWebApp', [
  'ngRoute', 'treeGrid',
]);

app.config(['$locationProvider', function ($locationProvider) {
  $locationProvider.hashPrefix('');
}]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {
      templateUrl: "partials/home.html",
      controller: "PageCtrl"
    })
    // Pages
    // -- Users
    .when("/users", {
      templateUrl: "partials/users.html",
      controller: "UsersCtrl"
    })
    // -- Products
    .when("/products", {
      templateUrl: "partials/products.html",
      controller: "ProductsCtrl"
    })
    // else 404
    .otherwise("/404", {
      templateUrl: "partials/404.html",
      controller: "PageCtrl"
    });
}]);

app.factory('DataDemo', function () {
  return {
    getDatas: function () {
      return [{
        'DemographicId': 1,
        'ParentId': null,
        'Name': 'United States of America',
        'Description': 'United States of America',
        'Area': 9826675,
        'Population': 318212000,
        'TimeZone': 'UTC -5 to -10'
      }, {
        'DemographicId': 2,
        'ParentId': 1,
        'Name': 'California',
        'Description': 'The Tech State',
        'Area': 423970,
        'Population': 38340000,
        'TimeZone': 'Pacific Time'
      }, {
        'DemographicId': 3,
        'ParentId': 2,
        'Name': 'San Francisco',
        'Description': 'The happening city',
        'Area': 231,
        'Population': 837442,
        'TimeZone': 'PST'
      }, {
        'DemographicId': 4,
        'ParentId': 2,
        'Name': 'Los Angeles',
        'Description': 'Disco city',
        'Area': 503,
        'Population': 3904657,
        'TimeZone': 'PST'
      }, {
        'DemographicId': 5,
        'ParentId': 1,
        'Name': 'Illinois',
        'Description': 'Not so cool',
        'Area': 57914,
        'Population': 12882135,
        'TimeZone': 'Central Time Zone'
      }, {
        'DemographicId': 6,
        'ParentId': 5,
        'Name': 'Chicago',
        'Description': 'Financial City',
        'Area': 234,
        'Population': 2695598,
        'TimeZone': 'CST'
      }, {
        'DemographicId': 7,
        'ParentId': 1,
        'Name': 'Texas',
        'Description': 'Rances, Oil & Gas',
        'Area': 268581,
        'Population': 26448193,
        'TimeZone': 'Mountain'
      }, {
        'DemographicId': 8,
        'ParentId': 1,
        'Name': 'New York',
        'Description': 'The largest diverse city',
        'Area': 141300,
        'Population': 19651127,
        'TimeZone': 'Eastern Time Zone'
      }, {
        'DemographicId': 14,
        'ParentId': 8,
        'Name': 'Manhattan',
        'Description': 'Time Square is the place',
        'Area': 269.403,
        'Population': 0,
        'TimeZone': 'EST'
      }, {
        'DemographicId': 15,
        'ParentId': 14,
        'Name': 'Manhattan City',
        'Description': 'Manhattan island',
        'Area': 33.77,
        'Population': 0,
        'TimeZone': 'EST'
      }, {
        'DemographicId': 16,
        'ParentId': 14,
        'Name': 'Time Square',
        'Description': 'Time Square for new year',
        'Area': 269.40,
        'Population': 0,
        'TimeZone': 'EST'
      }, {
        'DemographicId': 17,
        'ParentId': 8,
        'Name': 'Niagra water fall',
        'Description': 'Close to Canada',
        'Area': 65.7,
        'Population': 0,
        'TimeZone': 'EST'
      }, {
        'DemographicId': 18,
        'ParentId': 8,
        'Name': 'Long Island',
        'Description': 'Harbour to Atlantic',
        'Area': 362.9,
        'Population': 0,
        'TimeZone': 'EST'
      }, {
        'DemographicId': 51,
        'ParentId': 1,
        'Name': 'All_Other',
        'Description': 'All_Other demographics',
        'Area': 0,
        'Population': 0,
        'TimeZone': 0
      }, {
        'DemographicId': 201,
        'ParentId': null,
        'Name': 'India',
        'Description': 'Hydrabad tech city',
        'Area': 9826675,
        'Population': 318212000,
        'TimeZone': 'IST'
      }, {
        'DemographicId': 301,
        'ParentId': null,
        'Name': 'Bangladesh',
        'Description': 'Country of love',
        'Area': 9826675,
        'Population': 318212000,
        'TimeZone': 'BST'
      }];
    },
    getBigData: function (sample, number, deptMax, fn, keyId, keyParent) {

      function forDept(obj, fn, opt, deptParent) {
        'use strict';
        var childs = [],
          data, width;

        if (angular.isFunction(fn)) {
          width = getRandomInt(2, 6);
          for (var i = 1; i < width && opt.amount <= opt.limit; i++) {
            opt.amount++;
            data = fn(obj, angular.copy(obj), opt);

            // random children
            if (deptParent < opt.deptMax && getRandomInt(-2, 2) > 0) {
              forDept(data, fn, opt, ++deptParent);
            }

            childs.push(data);
          }
        }

        obj.__children__ = childs;
        return obj;
      }

      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }

      console.time('Generate_BigData');
      var data = [],
        opt = {
          amount: 0,
          deptMax: deptMax,
          limit: number
        },
        patern,
        fnGenerate = fn || function (parent, cloned, _opt) {
          'use strict';
          var keyO = Object.keys(cloned),
            lenO = keyO.length;
          if (keyParent) {
            cloned[keyParent] = parent && parent[keyId] || null;
          }

          cloned[keyId] = _opt.amount;

          for (var i = 0; i < lenO; i++) {
            if (keyO[i] !== keyParent && keyO[i] !== keyId) {
              cloned[keyO[i]] += '#' + _opt.amount;
            }
          }

          return cloned;
        };


      while (opt.amount < number) {
        opt.amount++;
        patern = fnGenerate(null, angular.copy(sample), opt);
        data.push(forDept(patern, fnGenerate, opt, 1));
      }

      console.timeEnd('Generate_BigData');
      return data;
    }
  }
});

/**
 * Controls the Blog
 */
app.controller('UsersCtrl', function ($scope /*, $location, $http */ ) {
  console.log("Users Controller reporting for duty.");
});

app.controller('ProductsCtrl', [
  '$scope',
  function ($scope, DataDemo) {

    $scope.tree_data = [{
        Name: "USA",
        Area: 9826675,
        Population: 318212000,
        TimeZone: "UTC -5 to -10",
        children: [{
            Name: "California",
            Area: 423970,
            Population: 38340000,
            TimeZone: "Pacific Time",
            children: [{
                Name: "San Francisco",
                Area: 231,
                Population: 837442,
                TimeZone: "PST"
              },
              {
                Name: "Los Angeles",
                Area: 503,
                Population: 3904657,
                TimeZone: "PST"
              }
            ],
            icons: {
              iconLeaf: "fa fa-sun-o"
            }
          },
          {
            Name: "Illinois",
            Area: 57914,
            Population: 12882135,
            TimeZone: "Central Time Zone",
            children: [{
              Name: "Chicago",
              Area: 234,
              Population: 2695598,
              TimeZone: "CST"
            }]
          }
        ],
        icons: {
          iconLeaf: "fa fa-flag",
          iconCollapse: "fa fa-folder-open",
          iconExpand: "fa fa-folder"
        }
      },
      {
        Name: "Texas",
        Area: 268581,
        Population: 26448193,
        TimeZone: "Mountain"
      }
    ];

    $scope.col_defs = [{
        field: "Name"
      },
      {
        field: "Area",
        sortable: true,
        sortingType: "number",
        filterable: true
      },
      {
        field: "Population",
        filterable: true
      },
      {
        field: "TimeZone"
      }
    ];


    $scope.my_tree_handler = function (item) {
      $scope.selectedItem = item;
    }

    $scope.addNode = function () {
      $scope.selectedItem.children.push({
        Name: "BRASIL",
        Area: 123123123,
        Population: 123123123,
        TimeZone: "UTC -3",
      });
    }
  }
]);


/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function ( /* $scope, $location, $http */ ) {
  console.log("Page Controller reporting for duty.");
});
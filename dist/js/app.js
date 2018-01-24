/**
 * TreasyJS WebApp
 * @author Johseffer <johseffer@gmail.com>
 */

/**
 * Main AngularJS Web Application
 */
var app = angular.module('treasyJSWebApp', [
  'ngRoute', 'treeGrid', 'ui.bootstrap'
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
  };
});

/**
 * Controls the Blog
 */
app.controller('UsersCtrl', ["$scope", function ($scope /*, $location, $http */ ) {
  console.log("Users Controller reporting for duty.");
}]);

app.controller('ProductsCtrl', [
  '$scope', '$modal', '$filter', '$timeout',
  function ($scope, $modal, $filter, $timeout, DataDemo) {

    $scope.products_treegrid = {};

    $scope.filterString = "";

    $scope.getTreeData = function () {
      return [{
          Name: "Calças",
          Value: 4000.00,
          Quant: 20,
          visible: true,
          level: 1,
          children: [{
              Name: "   Calça Jeans",
              Value: 200.00,
              Quant: 10,
              visible: true,
              level: 2,
              children: [{
                  Name: "-     Calça Jeans P",
                  Value: 200.00,
                  Quant: 10,
                  visible: true,
                  level: 3,
                  icons: {
                    iconLeaf: "fa fa-circle-o",
                    iconCollapse: "fa fa-minus",
                    iconExpand: "fa fa-plus"
                  }
                },
                {
                  Name: "-     Calça Jeans M",
                  Value: 200.00,
                  Quant: 10,
                  visible: true,
                  level: 3,
                  icons: {
                    iconLeaf: "fa fa-circle-o",
                    iconCollapse: "fa fa-minus",
                    iconExpand: "fa fa-plus"
                  }
                },
                {
                  Name: "-     Calça Jeans G",
                  Value: 200.00,
                  Quant: 10,
                  visible: true,
                  level: 3,
                  icons: {
                    iconLeaf: "fa fa-circle-o",
                    iconCollapse: "fa fa-minus",
                    iconExpand: "fa fa-plus"
                  }
                }
              ],
              icons: {
                iconLeaf: "fa fa-circle-o",
                iconCollapse: "fa fa-minus",
                iconExpand: "fa fa-plus"
              }
            },
            {
              Name: "   Calça Moleton",
              Value: 200.00,
              Quant: 10,
              visible: true,
              level: 2,
              children: [{
                  Name: "-     Calça Moleton P",
                  Value: 200.00,
                  Quant: 10,
                  visible: true,
                  level: 3,
                  icons: {
                    iconLeaf: "fa fa-circle-o",
                    iconCollapse: "fa fa-minus",
                    iconExpand: "fa fa-plus"
                  }
                },
                {
                  Name: "-     Calça Moleton M",
                  Value: 200.00,
                  Quant: 10,
                  visible: true,
                  level: 3,
                  icons: {
                    iconLeaf: "fa fa-circle-o",
                    iconCollapse: "fa fa-minus",
                    iconExpand: "fa fa-plus"
                  }
                },
                {
                  Name: "-     Calça Moleton G",
                  Value: 200.00,
                  Quant: 10,
                  visible: true,
                  level: 3,
                  icons: {
                    iconLeaf: "fa fa-circle-o",
                    iconCollapse: "fa fa-minus",
                    iconExpand: "fa fa-plus"
                  }
                }
              ],
              icons: {
                iconLeaf: "fa fa-circle-o",
                iconCollapse: "fa fa-minus",
                iconExpand: "fa fa-plus"
              }
            }
          ],
          icons: {
            iconLeaf: "fa fa-circle-o",
            iconCollapse: "fa fa-minus",
            iconExpand: "fa fa-plus"
          }
        },
        {
          Name: "Bermudas",
          Value: 999.80,
          Quant: 20,
          visible: true,
          level: 1,
          children: [{
              Name: "Bermuda Jeans",
              Value: 49.99,
              Quant: 10,
              visible: true,
              level: 2,
              icons: {
                iconLeaf: "fa fa-circle-o",
                iconCollapse: "fa fa-minus",
                iconExpand: "fa fa-plus"
              }
            },
            {
              Name: "Bermuda Tactel",
              Value: 49.99,
              Quant: 10,
              visible: true,
              level: 2,
              icons: {
                iconLeaf: "fa fa-circle-o",
                iconCollapse: "fa fa-minus",
                iconExpand: "fa fa-plus"
              }
            }
          ],
          icons: {
            iconLeaf: "fa fa-circle-o",
            iconCollapse: "fa fa-minus",
            iconExpand: "fa fa-plus"
          }
        },
        {
          Name: "Camisetas",
          Value: 1799.9,
          Quant: 30,
          visible: true,
          level: 1,
          children: [{
              Name: "Camiseta Regata",
              Value: 39.99,
              Quant: 10,
              visible: true,
              level: 2,
              icons: {
                iconLeaf: "fa fa-circle-o",
                iconCollapse: "fa fa-minus",
                iconExpand: "fa fa-plus"
              }
            },
            {
              Name: "Camiseta Estampada",
              Value: 49.99,
              Quant: 10,
              visible: true,
              level: 2,
              icons: {
                iconLeaf: "fa fa-circle-o",
                iconCollapse: "fa fa-minus",
                iconExpand: "fa fa-plus"
              }
            },
            {
              Name: "Camiseta Gola Polo",
              Value: 69.99,
              Quant: 10,
              visible: true,
              level: 2,
              icons: {
                iconLeaf: "fa fa-circle-o",
                iconCollapse: "fa fa-minus",
                iconExpand: "fa fa-plus"
              }
            }
          ],
          icons: {
            iconLeaf: "fa fa-circle-o",
            iconCollapse: "fa fa-minus",
            iconExpand: "fa fa-plus"
          }
        },
        {
          Name: "Camisas",
          Value: 2299.8,
          Quant: 20,
          visible: true,
          level: 1,
          TimeZone: "Mountain",
          children: [{
              Name: "Camisa Jeans",
              Value: 99.99,
              Quant: 10,
              visible: true,
              level: 2,
              icons: {
                iconLeaf: "fa fa-circle-o",
                iconCollapse: "fa fa-minus",
                iconExpand: "fa fa-plus"
              }
            },
            {
              Name: "Camisa Linho",
              Value: 129.99,
              Quant: 10,
              visible: true,
              level: 2,
              icons: {
                iconLeaf: "fa fa-circle-o",
                iconCollapse: "fa fa-minus",
                iconExpand: "fa fa-plus"
              }
            }
          ],
          icons: {
            iconLeaf: "fa fa-circle-o",
            iconCollapse: "fa fa-minus",
            iconExpand: "fa fa-plus"
          }
        },
        {
          Name: "Roupas Intimas",
          Value: 1299.6,
          Quant: 20,
          visible: true,
          level: 1,
          children: [{
              Name: "Cueca Box",
              Value: 29.99,
              Quant: 10,
              visible: true,
              level: 2,
              icons: {
                iconLeaf: "fa fa-circle-o",
                iconCollapse: "fa fa-minus",
                iconExpand: "fa fa-plus"
              }
            },
            {
              Name: "Sunga",
              Value: 29.99,
              Quant: 10,
              visible: true,
              level: 2,
              icons: {
                iconLeaf: "fa fa-circle-o",
                iconCollapse: "fa fa-minus",
                iconExpand: "fa fa-plus"
              }
            },
            {
              Name: "Calcinha",
              Value: 19.99,
              Quant: 10,
              visible: true,
              level: 2,
              icons: {
                iconLeaf: "fa fa-circle-o",
                iconCollapse: "fa fa-minus",
                iconExpand: "fa fa-plus"
              }
            },
            {
              Name: "Sutiã",
              Value: 49.99,
              Quant: 10,
              visible: true,
              level: 2,
              icons: {
                iconLeaf: "fa fa-circle-o",
                iconCollapse: "fa fa-minus",
                iconExpand: "fa fa-plus"
              }
            }
          ],
          icons: {
            iconLeaf: "fa fa-circle-o",
            iconCollapse: "fa fa-minus",
            iconExpand: "fa fa-plus"
          }
        }

      ];
    };

    $scope.tree_data = $scope.getTreeData();

    $scope.expanding_property = {
      field: "Name",
      displayName: "Name",
      sortable: true,
      filterable: true,
      cellTemplate: "<span>{{row.branch[expandingProperty.field]}}</span>"
    };

    $scope.checkIfEnterKeyWasPressed = function ($event) {
      var keyCode = $event.which || $event.keyCode;
      if (keyCode === 13) {
        $scope.search();
      }
    };

    $scope.search = function () {
      $scope.tree_data = $filter('searchFor')($scope.getTreeData(), $scope.filterString, $scope.expanding_property, $scope.col_defs, true);
    };

    $scope.col_defs = [{
        field: "Value",
        sortable: true,
        cellTemplate: "<span>R$ {{ row.branch[col.field] }}</span>",
        sortingType: "number"
      },
      {
        field: "Quant",
        sortable: true,
        sortingType: "number"
      }
    ];

    $scope.my_tree_handler = function (item) {
      $scope.selectedItem = item;
    };

    $scope.addForm = function () {
      $scope.isEdit = false;

      var modalInstance = $modal.open({
        templateUrl: '../templates/modal-form.html',
        controller: ModalInstanceCtrl,
        scope: $scope,
        resolve: {
          productForm: function () {
            return $scope.productForm;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {}, function () {

      });
    };


    $scope.editForm = function () {
      $scope.isEdit = true;

      if ($scope.selectedItem) {
        var modalInstance = $modal.open({
          templateUrl: '../templates/modal-form.html',
          controller: ModalInstanceCtrl,
          scope: $scope,
          resolve: {
            productForm: function () {
              return $scope.productForm;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {}, function () {

        });
      } else
        alert("Não há nenhum item selecionado.");
    };

    $scope.deleteForm = function () {
      if ($scope.selectedItem) {

        for (var i = 0; i < this.tree_data.length; i++) {
          var curObj = this.tree_data[i];
          if (curObj.Name == $scope.selectedItem.Name)
            this.tree_data.slice(i, 1);
        }
      } else
        alert("Não há nenhum item selecionado.");
    };

    var ModalInstanceCtrl = function ($scope, $modalInstance, productForm) {
      $scope.form = {};
      $scope.product = {};
      $scope.oldName = "";

      if ($scope.isEdit && $scope.selectedItem) {
        $scope.oldName = $scope.selectedItem.Name;
        $scope.product.name = $scope.selectedItem.Name;
        $scope.product.value = $scope.selectedItem.Value;
        $scope.product.quant = $scope.selectedItem.Quant;
      }

      $scope.formInit = function () {};

      $scope.submitForm = function () {
        if ($scope.form.productForm.$valid) {

          if (!$scope.isEdit) {
            var obj = {};

            if ($scope.selectedItem) {
              $scope.selectedItem.expanded = true;
              obj = $scope.selectedItem.children;
            } else
              obj = $scope.tree_data;

            obj.push({
              Name: $scope.product.name,
              Value: $scope.product.value,
              Quant: $scope.product.quant,
              icons: {
                iconLeaf: "fa fa-circle-o",
                iconCollapse: "fa fa-minus",
                iconExpand: "fa fa-plus"
              }
            });

          } else {

            $scope.updateItem($scope.tree_data);

            alert("Dados alterados com sucesso!");
          }

          $modalInstance.close('closed');
        } else {
          console.log('productForm is not in scope');
        }
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };

      $scope.updateItem = function (obj) {
        if (obj) {
          for (var i = 0; i < obj.length; i++) {
            var curObj = obj[i];
            if (curObj && curObj.Name == $scope.oldName) {
              curObj.Name = $scope.product.name;
              curObj.Value = $scope.product.value;
              curObj.Quant = $scope.product.quant;
              break;
            } else if (curObj.children && curObj.children.length > 0) {
              $scope.updateItem(curObj.children);
            }
          }
        }
      };
    };
    ModalInstanceCtrl.$inject = ["$scope", "$modalInstance", "productForm"];
  }
]);


/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function ( /* $scope, $location, $http */ ) {
  console.log("Page Controller reporting for duty.");
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFRQSxJQUFBLE1BQUEsUUFBQSxPQUFBLGtCQUFBO0VBQ0EsV0FBQSxZQUFBOzs7O0FBSUEsSUFBQSxPQUFBLENBQUEscUJBQUEsVUFBQSxtQkFBQTtFQUNBLGtCQUFBLFdBQUE7Ozs7OztBQU1BLElBQUEsT0FBQSxDQUFBLGtCQUFBLFVBQUEsZ0JBQUE7RUFDQTs7S0FFQSxLQUFBLEtBQUE7TUFDQSxhQUFBO01BQ0EsWUFBQTs7OztLQUlBLEtBQUEsVUFBQTtNQUNBLGFBQUE7TUFDQSxZQUFBOzs7S0FHQSxLQUFBLGFBQUE7TUFDQSxhQUFBO01BQ0EsWUFBQTs7O0tBR0EsVUFBQSxRQUFBO01BQ0EsYUFBQTtNQUNBLFlBQUE7Ozs7QUFJQSxJQUFBLFFBQUEsWUFBQSxZQUFBO0VBQ0EsT0FBQTtJQUNBLFVBQUEsWUFBQTtNQUNBLE9BQUEsQ0FBQTtRQUNBLGlCQUFBO1FBQ0EsWUFBQTtRQUNBLFFBQUE7UUFDQSxlQUFBO1FBQ0EsUUFBQTtRQUNBLGNBQUE7UUFDQSxZQUFBO1NBQ0E7UUFDQSxpQkFBQTtRQUNBLFlBQUE7UUFDQSxRQUFBO1FBQ0EsZUFBQTtRQUNBLFFBQUE7UUFDQSxjQUFBO1FBQ0EsWUFBQTtTQUNBO1FBQ0EsaUJBQUE7UUFDQSxZQUFBO1FBQ0EsUUFBQTtRQUNBLGVBQUE7UUFDQSxRQUFBO1FBQ0EsY0FBQTtRQUNBLFlBQUE7U0FDQTtRQUNBLGlCQUFBO1FBQ0EsWUFBQTtRQUNBLFFBQUE7UUFDQSxlQUFBO1FBQ0EsUUFBQTtRQUNBLGNBQUE7UUFDQSxZQUFBO1NBQ0E7UUFDQSxpQkFBQTtRQUNBLFlBQUE7UUFDQSxRQUFBO1FBQ0EsZUFBQTtRQUNBLFFBQUE7UUFDQSxjQUFBO1FBQ0EsWUFBQTtTQUNBO1FBQ0EsaUJBQUE7UUFDQSxZQUFBO1FBQ0EsUUFBQTtRQUNBLGVBQUE7UUFDQSxRQUFBO1FBQ0EsY0FBQTtRQUNBLFlBQUE7U0FDQTtRQUNBLGlCQUFBO1FBQ0EsWUFBQTtRQUNBLFFBQUE7UUFDQSxlQUFBO1FBQ0EsUUFBQTtRQUNBLGNBQUE7UUFDQSxZQUFBO1NBQ0E7UUFDQSxpQkFBQTtRQUNBLFlBQUE7UUFDQSxRQUFBO1FBQ0EsZUFBQTtRQUNBLFFBQUE7UUFDQSxjQUFBO1FBQ0EsWUFBQTtTQUNBO1FBQ0EsaUJBQUE7UUFDQSxZQUFBO1FBQ0EsUUFBQTtRQUNBLGVBQUE7UUFDQSxRQUFBO1FBQ0EsY0FBQTtRQUNBLFlBQUE7U0FDQTtRQUNBLGlCQUFBO1FBQ0EsWUFBQTtRQUNBLFFBQUE7UUFDQSxlQUFBO1FBQ0EsUUFBQTtRQUNBLGNBQUE7UUFDQSxZQUFBO1NBQ0E7UUFDQSxpQkFBQTtRQUNBLFlBQUE7UUFDQSxRQUFBO1FBQ0EsZUFBQTtRQUNBLFFBQUE7UUFDQSxjQUFBO1FBQ0EsWUFBQTtTQUNBO1FBQ0EsaUJBQUE7UUFDQSxZQUFBO1FBQ0EsUUFBQTtRQUNBLGVBQUE7UUFDQSxRQUFBO1FBQ0EsY0FBQTtRQUNBLFlBQUE7U0FDQTtRQUNBLGlCQUFBO1FBQ0EsWUFBQTtRQUNBLFFBQUE7UUFDQSxlQUFBO1FBQ0EsUUFBQTtRQUNBLGNBQUE7UUFDQSxZQUFBO1NBQ0E7UUFDQSxpQkFBQTtRQUNBLFlBQUE7UUFDQSxRQUFBO1FBQ0EsZUFBQTtRQUNBLFFBQUE7UUFDQSxjQUFBO1FBQ0EsWUFBQTtTQUNBO1FBQ0EsaUJBQUE7UUFDQSxZQUFBO1FBQ0EsUUFBQTtRQUNBLGVBQUE7UUFDQSxRQUFBO1FBQ0EsY0FBQTtRQUNBLFlBQUE7U0FDQTtRQUNBLGlCQUFBO1FBQ0EsWUFBQTtRQUNBLFFBQUE7UUFDQSxlQUFBO1FBQ0EsUUFBQTtRQUNBLGNBQUE7UUFDQSxZQUFBOzs7SUFHQSxZQUFBLFVBQUEsUUFBQSxRQUFBLFNBQUEsSUFBQSxPQUFBLFdBQUE7O01BRUEsU0FBQSxRQUFBLEtBQUEsSUFBQSxLQUFBLFlBQUE7UUFDQTtRQUNBLElBQUEsU0FBQTtVQUNBLE1BQUE7O1FBRUEsSUFBQSxRQUFBLFdBQUEsS0FBQTtVQUNBLFFBQUEsYUFBQSxHQUFBO1VBQ0EsS0FBQSxJQUFBLElBQUEsR0FBQSxJQUFBLFNBQUEsSUFBQSxVQUFBLElBQUEsT0FBQSxLQUFBO1lBQ0EsSUFBQTtZQUNBLE9BQUEsR0FBQSxLQUFBLFFBQUEsS0FBQSxNQUFBOzs7WUFHQSxJQUFBLGFBQUEsSUFBQSxXQUFBLGFBQUEsQ0FBQSxHQUFBLEtBQUEsR0FBQTtjQUNBLFFBQUEsTUFBQSxJQUFBLEtBQUEsRUFBQTs7O1lBR0EsT0FBQSxLQUFBOzs7O1FBSUEsSUFBQSxlQUFBO1FBQ0EsT0FBQTs7O01BR0EsU0FBQSxhQUFBLEtBQUEsS0FBQTtRQUNBLE9BQUEsS0FBQSxNQUFBLEtBQUEsWUFBQSxNQUFBLFFBQUE7OztNQUdBLFFBQUEsS0FBQTtNQUNBLElBQUEsT0FBQTtRQUNBLE1BQUE7VUFDQSxRQUFBO1VBQ0EsU0FBQTtVQUNBLE9BQUE7O1FBRUE7UUFDQSxhQUFBLE1BQUEsVUFBQSxRQUFBLFFBQUEsTUFBQTtVQUNBO1VBQ0EsSUFBQSxPQUFBLE9BQUEsS0FBQTtZQUNBLE9BQUEsS0FBQTtVQUNBLElBQUEsV0FBQTtZQUNBLE9BQUEsYUFBQSxVQUFBLE9BQUEsVUFBQTs7O1VBR0EsT0FBQSxTQUFBLEtBQUE7O1VBRUEsS0FBQSxJQUFBLElBQUEsR0FBQSxJQUFBLE1BQUEsS0FBQTtZQUNBLElBQUEsS0FBQSxPQUFBLGFBQUEsS0FBQSxPQUFBLE9BQUE7Y0FDQSxPQUFBLEtBQUEsT0FBQSxNQUFBLEtBQUE7Ozs7VUFJQSxPQUFBOzs7O01BSUEsT0FBQSxJQUFBLFNBQUEsUUFBQTtRQUNBLElBQUE7UUFDQSxTQUFBLFdBQUEsTUFBQSxRQUFBLEtBQUEsU0FBQTtRQUNBLEtBQUEsS0FBQSxRQUFBLFFBQUEsWUFBQSxLQUFBOzs7TUFHQSxRQUFBLFFBQUE7TUFDQSxPQUFBOzs7Ozs7OztBQVFBLElBQUEsV0FBQSx3QkFBQSxVQUFBLGlDQUFBO0VBQ0EsUUFBQSxJQUFBOzs7QUFHQSxJQUFBLFdBQUEsZ0JBQUE7RUFDQSxVQUFBLFVBQUEsV0FBQTtFQUNBLFVBQUEsUUFBQSxRQUFBLFNBQUEsVUFBQSxVQUFBOztJQUVBLE9BQUEsb0JBQUE7O0lBRUEsT0FBQSxlQUFBOztJQUVBLE9BQUEsY0FBQSxZQUFBO01BQ0EsT0FBQSxDQUFBO1VBQ0EsTUFBQTtVQUNBLE9BQUE7VUFDQSxPQUFBO1VBQ0EsU0FBQTtVQUNBLE9BQUE7VUFDQSxVQUFBLENBQUE7Y0FDQSxNQUFBO2NBQ0EsT0FBQTtjQUNBLE9BQUE7Y0FDQSxTQUFBO2NBQ0EsT0FBQTtjQUNBLFVBQUEsQ0FBQTtrQkFDQSxNQUFBO2tCQUNBLE9BQUE7a0JBQ0EsT0FBQTtrQkFDQSxTQUFBO2tCQUNBLE9BQUE7a0JBQ0EsT0FBQTtvQkFDQSxVQUFBO29CQUNBLGNBQUE7b0JBQ0EsWUFBQTs7O2dCQUdBO2tCQUNBLE1BQUE7a0JBQ0EsT0FBQTtrQkFDQSxPQUFBO2tCQUNBLFNBQUE7a0JBQ0EsT0FBQTtrQkFDQSxPQUFBO29CQUNBLFVBQUE7b0JBQ0EsY0FBQTtvQkFDQSxZQUFBOzs7Z0JBR0E7a0JBQ0EsTUFBQTtrQkFDQSxPQUFBO2tCQUNBLE9BQUE7a0JBQ0EsU0FBQTtrQkFDQSxPQUFBO2tCQUNBLE9BQUE7b0JBQ0EsVUFBQTtvQkFDQSxjQUFBO29CQUNBLFlBQUE7Ozs7Y0FJQSxPQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsY0FBQTtnQkFDQSxZQUFBOzs7WUFHQTtjQUNBLE1BQUE7Y0FDQSxPQUFBO2NBQ0EsT0FBQTtjQUNBLFNBQUE7Y0FDQSxPQUFBO2NBQ0EsVUFBQSxDQUFBO2tCQUNBLE1BQUE7a0JBQ0EsT0FBQTtrQkFDQSxPQUFBO2tCQUNBLFNBQUE7a0JBQ0EsT0FBQTtrQkFDQSxPQUFBO29CQUNBLFVBQUE7b0JBQ0EsY0FBQTtvQkFDQSxZQUFBOzs7Z0JBR0E7a0JBQ0EsTUFBQTtrQkFDQSxPQUFBO2tCQUNBLE9BQUE7a0JBQ0EsU0FBQTtrQkFDQSxPQUFBO2tCQUNBLE9BQUE7b0JBQ0EsVUFBQTtvQkFDQSxjQUFBO29CQUNBLFlBQUE7OztnQkFHQTtrQkFDQSxNQUFBO2tCQUNBLE9BQUE7a0JBQ0EsT0FBQTtrQkFDQSxTQUFBO2tCQUNBLE9BQUE7a0JBQ0EsT0FBQTtvQkFDQSxVQUFBO29CQUNBLGNBQUE7b0JBQ0EsWUFBQTs7OztjQUlBLE9BQUE7Z0JBQ0EsVUFBQTtnQkFDQSxjQUFBO2dCQUNBLFlBQUE7Ozs7VUFJQSxPQUFBO1lBQ0EsVUFBQTtZQUNBLGNBQUE7WUFDQSxZQUFBOzs7UUFHQTtVQUNBLE1BQUE7VUFDQSxPQUFBO1VBQ0EsT0FBQTtVQUNBLFNBQUE7VUFDQSxPQUFBO1VBQ0EsVUFBQSxDQUFBO2NBQ0EsTUFBQTtjQUNBLE9BQUE7Y0FDQSxPQUFBO2NBQ0EsU0FBQTtjQUNBLE9BQUE7Y0FDQSxPQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsY0FBQTtnQkFDQSxZQUFBOzs7WUFHQTtjQUNBLE1BQUE7Y0FDQSxPQUFBO2NBQ0EsT0FBQTtjQUNBLFNBQUE7Y0FDQSxPQUFBO2NBQ0EsT0FBQTtnQkFDQSxVQUFBO2dCQUNBLGNBQUE7Z0JBQ0EsWUFBQTs7OztVQUlBLE9BQUE7WUFDQSxVQUFBO1lBQ0EsY0FBQTtZQUNBLFlBQUE7OztRQUdBO1VBQ0EsTUFBQTtVQUNBLE9BQUE7VUFDQSxPQUFBO1VBQ0EsU0FBQTtVQUNBLE9BQUE7VUFDQSxVQUFBLENBQUE7Y0FDQSxNQUFBO2NBQ0EsT0FBQTtjQUNBLE9BQUE7Y0FDQSxTQUFBO2NBQ0EsT0FBQTtjQUNBLE9BQUE7Z0JBQ0EsVUFBQTtnQkFDQSxjQUFBO2dCQUNBLFlBQUE7OztZQUdBO2NBQ0EsTUFBQTtjQUNBLE9BQUE7Y0FDQSxPQUFBO2NBQ0EsU0FBQTtjQUNBLE9BQUE7Y0FDQSxPQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsY0FBQTtnQkFDQSxZQUFBOzs7WUFHQTtjQUNBLE1BQUE7Y0FDQSxPQUFBO2NBQ0EsT0FBQTtjQUNBLFNBQUE7Y0FDQSxPQUFBO2NBQ0EsT0FBQTtnQkFDQSxVQUFBO2dCQUNBLGNBQUE7Z0JBQ0EsWUFBQTs7OztVQUlBLE9BQUE7WUFDQSxVQUFBO1lBQ0EsY0FBQTtZQUNBLFlBQUE7OztRQUdBO1VBQ0EsTUFBQTtVQUNBLE9BQUE7VUFDQSxPQUFBO1VBQ0EsU0FBQTtVQUNBLE9BQUE7VUFDQSxVQUFBO1VBQ0EsVUFBQSxDQUFBO2NBQ0EsTUFBQTtjQUNBLE9BQUE7Y0FDQSxPQUFBO2NBQ0EsU0FBQTtjQUNBLE9BQUE7Y0FDQSxPQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsY0FBQTtnQkFDQSxZQUFBOzs7WUFHQTtjQUNBLE1BQUE7Y0FDQSxPQUFBO2NBQ0EsT0FBQTtjQUNBLFNBQUE7Y0FDQSxPQUFBO2NBQ0EsT0FBQTtnQkFDQSxVQUFBO2dCQUNBLGNBQUE7Z0JBQ0EsWUFBQTs7OztVQUlBLE9BQUE7WUFDQSxVQUFBO1lBQ0EsY0FBQTtZQUNBLFlBQUE7OztRQUdBO1VBQ0EsTUFBQTtVQUNBLE9BQUE7VUFDQSxPQUFBO1VBQ0EsU0FBQTtVQUNBLE9BQUE7VUFDQSxVQUFBLENBQUE7Y0FDQSxNQUFBO2NBQ0EsT0FBQTtjQUNBLE9BQUE7Y0FDQSxTQUFBO2NBQ0EsT0FBQTtjQUNBLE9BQUE7Z0JBQ0EsVUFBQTtnQkFDQSxjQUFBO2dCQUNBLFlBQUE7OztZQUdBO2NBQ0EsTUFBQTtjQUNBLE9BQUE7Y0FDQSxPQUFBO2NBQ0EsU0FBQTtjQUNBLE9BQUE7Y0FDQSxPQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsY0FBQTtnQkFDQSxZQUFBOzs7WUFHQTtjQUNBLE1BQUE7Y0FDQSxPQUFBO2NBQ0EsT0FBQTtjQUNBLFNBQUE7Y0FDQSxPQUFBO2NBQ0EsT0FBQTtnQkFDQSxVQUFBO2dCQUNBLGNBQUE7Z0JBQ0EsWUFBQTs7O1lBR0E7Y0FDQSxNQUFBO2NBQ0EsT0FBQTtjQUNBLE9BQUE7Y0FDQSxTQUFBO2NBQ0EsT0FBQTtjQUNBLE9BQUE7Z0JBQ0EsVUFBQTtnQkFDQSxjQUFBO2dCQUNBLFlBQUE7Ozs7VUFJQSxPQUFBO1lBQ0EsVUFBQTtZQUNBLGNBQUE7WUFDQSxZQUFBOzs7Ozs7O0lBT0EsT0FBQSxZQUFBLE9BQUE7O0lBRUEsT0FBQSxxQkFBQTtNQUNBLE9BQUE7TUFDQSxhQUFBO01BQ0EsVUFBQTtNQUNBLFlBQUE7TUFDQSxjQUFBOzs7SUFHQSxPQUFBLDRCQUFBLFVBQUEsUUFBQTtNQUNBLElBQUEsVUFBQSxPQUFBLFNBQUEsT0FBQTtNQUNBLElBQUEsWUFBQSxJQUFBO1FBQ0EsT0FBQTs7OztJQUlBLE9BQUEsU0FBQSxZQUFBO01BQ0EsT0FBQSxZQUFBLFFBQUEsYUFBQSxPQUFBLGVBQUEsT0FBQSxjQUFBLE9BQUEsb0JBQUEsT0FBQSxVQUFBOzs7SUFHQSxPQUFBLFdBQUEsQ0FBQTtRQUNBLE9BQUE7UUFDQSxVQUFBO1FBQ0EsY0FBQTtRQUNBLGFBQUE7O01BRUE7UUFDQSxPQUFBO1FBQ0EsVUFBQTtRQUNBLGFBQUE7Ozs7SUFJQSxPQUFBLGtCQUFBLFVBQUEsTUFBQTtNQUNBLE9BQUEsZUFBQTs7O0lBR0EsT0FBQSxVQUFBLFlBQUE7TUFDQSxPQUFBLFNBQUE7O01BRUEsSUFBQSxnQkFBQSxPQUFBLEtBQUE7UUFDQSxhQUFBO1FBQ0EsWUFBQTtRQUNBLE9BQUE7UUFDQSxTQUFBO1VBQ0EsYUFBQSxZQUFBO1lBQ0EsT0FBQSxPQUFBOzs7OztNQUtBLGNBQUEsT0FBQSxLQUFBLFVBQUEsY0FBQSxJQUFBLFlBQUE7Ozs7OztJQU1BLE9BQUEsV0FBQSxZQUFBO01BQ0EsT0FBQSxTQUFBOztNQUVBLElBQUEsT0FBQSxjQUFBO1FBQ0EsSUFBQSxnQkFBQSxPQUFBLEtBQUE7VUFDQSxhQUFBO1VBQ0EsWUFBQTtVQUNBLE9BQUE7VUFDQSxTQUFBO1lBQ0EsYUFBQSxZQUFBO2NBQ0EsT0FBQSxPQUFBOzs7OztRQUtBLGNBQUEsT0FBQSxLQUFBLFVBQUEsY0FBQSxJQUFBLFlBQUE7Ozs7UUFJQSxNQUFBOzs7SUFHQSxPQUFBLGFBQUEsWUFBQTtNQUNBLElBQUEsT0FBQSxjQUFBOztRQUVBLEtBQUEsSUFBQSxJQUFBLEdBQUEsSUFBQSxLQUFBLFVBQUEsUUFBQSxLQUFBO1VBQ0EsSUFBQSxTQUFBLEtBQUEsVUFBQTtVQUNBLElBQUEsT0FBQSxRQUFBLE9BQUEsYUFBQTtZQUNBLEtBQUEsVUFBQSxNQUFBLEdBQUE7OztRQUdBLE1BQUE7OztJQUdBLElBQUEsb0JBQUEsVUFBQSxRQUFBLGdCQUFBLGFBQUE7TUFDQSxPQUFBLE9BQUE7TUFDQSxPQUFBLFVBQUE7TUFDQSxPQUFBLFVBQUE7O01BRUEsSUFBQSxPQUFBLFVBQUEsT0FBQSxjQUFBO1FBQ0EsT0FBQSxVQUFBLE9BQUEsYUFBQTtRQUNBLE9BQUEsUUFBQSxPQUFBLE9BQUEsYUFBQTtRQUNBLE9BQUEsUUFBQSxRQUFBLE9BQUEsYUFBQTtRQUNBLE9BQUEsUUFBQSxRQUFBLE9BQUEsYUFBQTs7O01BR0EsT0FBQSxXQUFBLFlBQUE7O01BRUEsT0FBQSxhQUFBLFlBQUE7UUFDQSxJQUFBLE9BQUEsS0FBQSxZQUFBLFFBQUE7O1VBRUEsSUFBQSxDQUFBLE9BQUEsUUFBQTtZQUNBLElBQUEsTUFBQTs7WUFFQSxJQUFBLE9BQUEsY0FBQTtjQUNBLE9BQUEsYUFBQSxXQUFBO2NBQ0EsTUFBQSxPQUFBLGFBQUE7O2NBRUEsTUFBQSxPQUFBOztZQUVBLElBQUEsS0FBQTtjQUNBLE1BQUEsT0FBQSxRQUFBO2NBQ0EsT0FBQSxPQUFBLFFBQUE7Y0FDQSxPQUFBLE9BQUEsUUFBQTtjQUNBLE9BQUE7Z0JBQ0EsVUFBQTtnQkFDQSxjQUFBO2dCQUNBLFlBQUE7Ozs7aUJBSUE7O1lBRUEsT0FBQSxXQUFBLE9BQUE7O1lBRUEsTUFBQTs7O1VBR0EsZUFBQSxNQUFBO2VBQ0E7VUFDQSxRQUFBLElBQUE7Ozs7TUFJQSxPQUFBLFNBQUEsWUFBQTtRQUNBLGVBQUEsUUFBQTs7O01BR0EsT0FBQSxhQUFBLFVBQUEsS0FBQTtRQUNBLElBQUEsS0FBQTtVQUNBLEtBQUEsSUFBQSxJQUFBLEdBQUEsSUFBQSxJQUFBLFFBQUEsS0FBQTtZQUNBLElBQUEsU0FBQSxJQUFBO1lBQ0EsSUFBQSxVQUFBLE9BQUEsUUFBQSxPQUFBLFNBQUE7Y0FDQSxPQUFBLE9BQUEsT0FBQSxRQUFBO2NBQ0EsT0FBQSxRQUFBLE9BQUEsUUFBQTtjQUNBLE9BQUEsUUFBQSxPQUFBLFFBQUE7Y0FDQTttQkFDQSxJQUFBLE9BQUEsWUFBQSxPQUFBLFNBQUEsU0FBQSxHQUFBO2NBQ0EsT0FBQSxXQUFBLE9BQUE7Ozs7Ozs7Ozs7Ozs7O0FBYUEsSUFBQSxXQUFBLFlBQUEsNENBQUE7RUFDQSxRQUFBLElBQUE7R0FDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRyZWFzeUpTIFdlYkFwcFxuICogQGF1dGhvciBKb2hzZWZmZXIgPGpvaHNlZmZlckBnbWFpbC5jb20+XG4gKi9cblxuLyoqXG4gKiBNYWluIEFuZ3VsYXJKUyBXZWIgQXBwbGljYXRpb25cbiAqL1xudmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCd0cmVhc3lKU1dlYkFwcCcsIFtcbiAgJ25nUm91dGUnLCAndHJlZUdyaWQnLCAndWkuYm9vdHN0cmFwJ1xuXSk7XG5cblxuYXBwLmNvbmZpZyhbJyRsb2NhdGlvblByb3ZpZGVyJywgZnVuY3Rpb24gKCRsb2NhdGlvblByb3ZpZGVyKSB7XG4gICRsb2NhdGlvblByb3ZpZGVyLmhhc2hQcmVmaXgoJycpO1xufV0pO1xuXG4vKipcbiAqIENvbmZpZ3VyZSB0aGUgUm91dGVzXG4gKi9cbmFwcC5jb25maWcoWyckcm91dGVQcm92aWRlcicsIGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xuICAkcm91dGVQcm92aWRlclxuICAgIC8vIEhvbWVcbiAgICAud2hlbihcIi9cIiwge1xuICAgICAgdGVtcGxhdGVVcmw6IFwicGFydGlhbHMvaG9tZS5odG1sXCIsXG4gICAgICBjb250cm9sbGVyOiBcIlBhZ2VDdHJsXCJcbiAgICB9KVxuICAgIC8vIFBhZ2VzXG4gICAgLy8gLS0gVXNlcnNcbiAgICAud2hlbihcIi91c2Vyc1wiLCB7XG4gICAgICB0ZW1wbGF0ZVVybDogXCJwYXJ0aWFscy91c2Vycy5odG1sXCIsXG4gICAgICBjb250cm9sbGVyOiBcIlVzZXJzQ3RybFwiXG4gICAgfSlcbiAgICAvLyAtLSBQcm9kdWN0c1xuICAgIC53aGVuKFwiL3Byb2R1Y3RzXCIsIHtcbiAgICAgIHRlbXBsYXRlVXJsOiBcInBhcnRpYWxzL3Byb2R1Y3RzLmh0bWxcIixcbiAgICAgIGNvbnRyb2xsZXI6IFwiUHJvZHVjdHNDdHJsXCJcbiAgICB9KVxuICAgIC8vIGVsc2UgNDA0XG4gICAgLm90aGVyd2lzZShcIi80MDRcIiwge1xuICAgICAgdGVtcGxhdGVVcmw6IFwicGFydGlhbHMvNDA0Lmh0bWxcIixcbiAgICAgIGNvbnRyb2xsZXI6IFwiUGFnZUN0cmxcIlxuICAgIH0pO1xufV0pO1xuXG5hcHAuZmFjdG9yeSgnRGF0YURlbW8nLCBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB7XG4gICAgZ2V0RGF0YXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBbe1xuICAgICAgICAnRGVtb2dyYXBoaWNJZCc6IDEsXG4gICAgICAgICdQYXJlbnRJZCc6IG51bGwsXG4gICAgICAgICdOYW1lJzogJ1VuaXRlZCBTdGF0ZXMgb2YgQW1lcmljYScsXG4gICAgICAgICdEZXNjcmlwdGlvbic6ICdVbml0ZWQgU3RhdGVzIG9mIEFtZXJpY2EnLFxuICAgICAgICAnQXJlYSc6IDk4MjY2NzUsXG4gICAgICAgICdQb3B1bGF0aW9uJzogMzE4MjEyMDAwLFxuICAgICAgICAnVGltZVpvbmUnOiAnVVRDIC01IHRvIC0xMCdcbiAgICAgIH0sIHtcbiAgICAgICAgJ0RlbW9ncmFwaGljSWQnOiAyLFxuICAgICAgICAnUGFyZW50SWQnOiAxLFxuICAgICAgICAnTmFtZSc6ICdDYWxpZm9ybmlhJyxcbiAgICAgICAgJ0Rlc2NyaXB0aW9uJzogJ1RoZSBUZWNoIFN0YXRlJyxcbiAgICAgICAgJ0FyZWEnOiA0MjM5NzAsXG4gICAgICAgICdQb3B1bGF0aW9uJzogMzgzNDAwMDAsXG4gICAgICAgICdUaW1lWm9uZSc6ICdQYWNpZmljIFRpbWUnXG4gICAgICB9LCB7XG4gICAgICAgICdEZW1vZ3JhcGhpY0lkJzogMyxcbiAgICAgICAgJ1BhcmVudElkJzogMixcbiAgICAgICAgJ05hbWUnOiAnU2FuIEZyYW5jaXNjbycsXG4gICAgICAgICdEZXNjcmlwdGlvbic6ICdUaGUgaGFwcGVuaW5nIGNpdHknLFxuICAgICAgICAnQXJlYSc6IDIzMSxcbiAgICAgICAgJ1BvcHVsYXRpb24nOiA4Mzc0NDIsXG4gICAgICAgICdUaW1lWm9uZSc6ICdQU1QnXG4gICAgICB9LCB7XG4gICAgICAgICdEZW1vZ3JhcGhpY0lkJzogNCxcbiAgICAgICAgJ1BhcmVudElkJzogMixcbiAgICAgICAgJ05hbWUnOiAnTG9zIEFuZ2VsZXMnLFxuICAgICAgICAnRGVzY3JpcHRpb24nOiAnRGlzY28gY2l0eScsXG4gICAgICAgICdBcmVhJzogNTAzLFxuICAgICAgICAnUG9wdWxhdGlvbic6IDM5MDQ2NTcsXG4gICAgICAgICdUaW1lWm9uZSc6ICdQU1QnXG4gICAgICB9LCB7XG4gICAgICAgICdEZW1vZ3JhcGhpY0lkJzogNSxcbiAgICAgICAgJ1BhcmVudElkJzogMSxcbiAgICAgICAgJ05hbWUnOiAnSWxsaW5vaXMnLFxuICAgICAgICAnRGVzY3JpcHRpb24nOiAnTm90IHNvIGNvb2wnLFxuICAgICAgICAnQXJlYSc6IDU3OTE0LFxuICAgICAgICAnUG9wdWxhdGlvbic6IDEyODgyMTM1LFxuICAgICAgICAnVGltZVpvbmUnOiAnQ2VudHJhbCBUaW1lIFpvbmUnXG4gICAgICB9LCB7XG4gICAgICAgICdEZW1vZ3JhcGhpY0lkJzogNixcbiAgICAgICAgJ1BhcmVudElkJzogNSxcbiAgICAgICAgJ05hbWUnOiAnQ2hpY2FnbycsXG4gICAgICAgICdEZXNjcmlwdGlvbic6ICdGaW5hbmNpYWwgQ2l0eScsXG4gICAgICAgICdBcmVhJzogMjM0LFxuICAgICAgICAnUG9wdWxhdGlvbic6IDI2OTU1OTgsXG4gICAgICAgICdUaW1lWm9uZSc6ICdDU1QnXG4gICAgICB9LCB7XG4gICAgICAgICdEZW1vZ3JhcGhpY0lkJzogNyxcbiAgICAgICAgJ1BhcmVudElkJzogMSxcbiAgICAgICAgJ05hbWUnOiAnVGV4YXMnLFxuICAgICAgICAnRGVzY3JpcHRpb24nOiAnUmFuY2VzLCBPaWwgJiBHYXMnLFxuICAgICAgICAnQXJlYSc6IDI2ODU4MSxcbiAgICAgICAgJ1BvcHVsYXRpb24nOiAyNjQ0ODE5MyxcbiAgICAgICAgJ1RpbWVab25lJzogJ01vdW50YWluJ1xuICAgICAgfSwge1xuICAgICAgICAnRGVtb2dyYXBoaWNJZCc6IDgsXG4gICAgICAgICdQYXJlbnRJZCc6IDEsXG4gICAgICAgICdOYW1lJzogJ05ldyBZb3JrJyxcbiAgICAgICAgJ0Rlc2NyaXB0aW9uJzogJ1RoZSBsYXJnZXN0IGRpdmVyc2UgY2l0eScsXG4gICAgICAgICdBcmVhJzogMTQxMzAwLFxuICAgICAgICAnUG9wdWxhdGlvbic6IDE5NjUxMTI3LFxuICAgICAgICAnVGltZVpvbmUnOiAnRWFzdGVybiBUaW1lIFpvbmUnXG4gICAgICB9LCB7XG4gICAgICAgICdEZW1vZ3JhcGhpY0lkJzogMTQsXG4gICAgICAgICdQYXJlbnRJZCc6IDgsXG4gICAgICAgICdOYW1lJzogJ01hbmhhdHRhbicsXG4gICAgICAgICdEZXNjcmlwdGlvbic6ICdUaW1lIFNxdWFyZSBpcyB0aGUgcGxhY2UnLFxuICAgICAgICAnQXJlYSc6IDI2OS40MDMsXG4gICAgICAgICdQb3B1bGF0aW9uJzogMCxcbiAgICAgICAgJ1RpbWVab25lJzogJ0VTVCdcbiAgICAgIH0sIHtcbiAgICAgICAgJ0RlbW9ncmFwaGljSWQnOiAxNSxcbiAgICAgICAgJ1BhcmVudElkJzogMTQsXG4gICAgICAgICdOYW1lJzogJ01hbmhhdHRhbiBDaXR5JyxcbiAgICAgICAgJ0Rlc2NyaXB0aW9uJzogJ01hbmhhdHRhbiBpc2xhbmQnLFxuICAgICAgICAnQXJlYSc6IDMzLjc3LFxuICAgICAgICAnUG9wdWxhdGlvbic6IDAsXG4gICAgICAgICdUaW1lWm9uZSc6ICdFU1QnXG4gICAgICB9LCB7XG4gICAgICAgICdEZW1vZ3JhcGhpY0lkJzogMTYsXG4gICAgICAgICdQYXJlbnRJZCc6IDE0LFxuICAgICAgICAnTmFtZSc6ICdUaW1lIFNxdWFyZScsXG4gICAgICAgICdEZXNjcmlwdGlvbic6ICdUaW1lIFNxdWFyZSBmb3IgbmV3IHllYXInLFxuICAgICAgICAnQXJlYSc6IDI2OS40MCxcbiAgICAgICAgJ1BvcHVsYXRpb24nOiAwLFxuICAgICAgICAnVGltZVpvbmUnOiAnRVNUJ1xuICAgICAgfSwge1xuICAgICAgICAnRGVtb2dyYXBoaWNJZCc6IDE3LFxuICAgICAgICAnUGFyZW50SWQnOiA4LFxuICAgICAgICAnTmFtZSc6ICdOaWFncmEgd2F0ZXIgZmFsbCcsXG4gICAgICAgICdEZXNjcmlwdGlvbic6ICdDbG9zZSB0byBDYW5hZGEnLFxuICAgICAgICAnQXJlYSc6IDY1LjcsXG4gICAgICAgICdQb3B1bGF0aW9uJzogMCxcbiAgICAgICAgJ1RpbWVab25lJzogJ0VTVCdcbiAgICAgIH0sIHtcbiAgICAgICAgJ0RlbW9ncmFwaGljSWQnOiAxOCxcbiAgICAgICAgJ1BhcmVudElkJzogOCxcbiAgICAgICAgJ05hbWUnOiAnTG9uZyBJc2xhbmQnLFxuICAgICAgICAnRGVzY3JpcHRpb24nOiAnSGFyYm91ciB0byBBdGxhbnRpYycsXG4gICAgICAgICdBcmVhJzogMzYyLjksXG4gICAgICAgICdQb3B1bGF0aW9uJzogMCxcbiAgICAgICAgJ1RpbWVab25lJzogJ0VTVCdcbiAgICAgIH0sIHtcbiAgICAgICAgJ0RlbW9ncmFwaGljSWQnOiA1MSxcbiAgICAgICAgJ1BhcmVudElkJzogMSxcbiAgICAgICAgJ05hbWUnOiAnQWxsX090aGVyJyxcbiAgICAgICAgJ0Rlc2NyaXB0aW9uJzogJ0FsbF9PdGhlciBkZW1vZ3JhcGhpY3MnLFxuICAgICAgICAnQXJlYSc6IDAsXG4gICAgICAgICdQb3B1bGF0aW9uJzogMCxcbiAgICAgICAgJ1RpbWVab25lJzogMFxuICAgICAgfSwge1xuICAgICAgICAnRGVtb2dyYXBoaWNJZCc6IDIwMSxcbiAgICAgICAgJ1BhcmVudElkJzogbnVsbCxcbiAgICAgICAgJ05hbWUnOiAnSW5kaWEnLFxuICAgICAgICAnRGVzY3JpcHRpb24nOiAnSHlkcmFiYWQgdGVjaCBjaXR5JyxcbiAgICAgICAgJ0FyZWEnOiA5ODI2Njc1LFxuICAgICAgICAnUG9wdWxhdGlvbic6IDMxODIxMjAwMCxcbiAgICAgICAgJ1RpbWVab25lJzogJ0lTVCdcbiAgICAgIH0sIHtcbiAgICAgICAgJ0RlbW9ncmFwaGljSWQnOiAzMDEsXG4gICAgICAgICdQYXJlbnRJZCc6IG51bGwsXG4gICAgICAgICdOYW1lJzogJ0JhbmdsYWRlc2gnLFxuICAgICAgICAnRGVzY3JpcHRpb24nOiAnQ291bnRyeSBvZiBsb3ZlJyxcbiAgICAgICAgJ0FyZWEnOiA5ODI2Njc1LFxuICAgICAgICAnUG9wdWxhdGlvbic6IDMxODIxMjAwMCxcbiAgICAgICAgJ1RpbWVab25lJzogJ0JTVCdcbiAgICAgIH1dO1xuICAgIH0sXG4gICAgZ2V0QmlnRGF0YTogZnVuY3Rpb24gKHNhbXBsZSwgbnVtYmVyLCBkZXB0TWF4LCBmbiwga2V5SWQsIGtleVBhcmVudCkge1xuXG4gICAgICBmdW5jdGlvbiBmb3JEZXB0KG9iaiwgZm4sIG9wdCwgZGVwdFBhcmVudCkge1xuICAgICAgICAndXNlIHN0cmljdCc7XG4gICAgICAgIHZhciBjaGlsZHMgPSBbXSxcbiAgICAgICAgICBkYXRhLCB3aWR0aDtcblxuICAgICAgICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKGZuKSkge1xuICAgICAgICAgIHdpZHRoID0gZ2V0UmFuZG9tSW50KDIsIDYpO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgd2lkdGggJiYgb3B0LmFtb3VudCA8PSBvcHQubGltaXQ7IGkrKykge1xuICAgICAgICAgICAgb3B0LmFtb3VudCsrO1xuICAgICAgICAgICAgZGF0YSA9IGZuKG9iaiwgYW5ndWxhci5jb3B5KG9iaiksIG9wdCk7XG5cbiAgICAgICAgICAgIC8vIHJhbmRvbSBjaGlsZHJlblxuICAgICAgICAgICAgaWYgKGRlcHRQYXJlbnQgPCBvcHQuZGVwdE1heCAmJiBnZXRSYW5kb21JbnQoLTIsIDIpID4gMCkge1xuICAgICAgICAgICAgICBmb3JEZXB0KGRhdGEsIGZuLCBvcHQsICsrZGVwdFBhcmVudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNoaWxkcy5wdXNoKGRhdGEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG9iai5fX2NoaWxkcmVuX18gPSBjaGlsZHM7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGdldFJhbmRvbUludChtaW4sIG1heCkge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikpICsgbWluO1xuICAgICAgfVxuXG4gICAgICBjb25zb2xlLnRpbWUoJ0dlbmVyYXRlX0JpZ0RhdGEnKTtcbiAgICAgIHZhciBkYXRhID0gW10sXG4gICAgICAgIG9wdCA9IHtcbiAgICAgICAgICBhbW91bnQ6IDAsXG4gICAgICAgICAgZGVwdE1heDogZGVwdE1heCxcbiAgICAgICAgICBsaW1pdDogbnVtYmVyXG4gICAgICAgIH0sXG4gICAgICAgIHBhdGVybixcbiAgICAgICAgZm5HZW5lcmF0ZSA9IGZuIHx8IGZ1bmN0aW9uIChwYXJlbnQsIGNsb25lZCwgX29wdCkge1xuICAgICAgICAgICd1c2Ugc3RyaWN0JztcbiAgICAgICAgICB2YXIga2V5TyA9IE9iamVjdC5rZXlzKGNsb25lZCksXG4gICAgICAgICAgICBsZW5PID0ga2V5Ty5sZW5ndGg7XG4gICAgICAgICAgaWYgKGtleVBhcmVudCkge1xuICAgICAgICAgICAgY2xvbmVkW2tleVBhcmVudF0gPSBwYXJlbnQgJiYgcGFyZW50W2tleUlkXSB8fCBudWxsO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNsb25lZFtrZXlJZF0gPSBfb3B0LmFtb3VudDtcblxuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuTzsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoa2V5T1tpXSAhPT0ga2V5UGFyZW50ICYmIGtleU9baV0gIT09IGtleUlkKSB7XG4gICAgICAgICAgICAgIGNsb25lZFtrZXlPW2ldXSArPSAnIycgKyBfb3B0LmFtb3VudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gY2xvbmVkO1xuICAgICAgICB9O1xuXG5cbiAgICAgIHdoaWxlIChvcHQuYW1vdW50IDwgbnVtYmVyKSB7XG4gICAgICAgIG9wdC5hbW91bnQrKztcbiAgICAgICAgcGF0ZXJuID0gZm5HZW5lcmF0ZShudWxsLCBhbmd1bGFyLmNvcHkoc2FtcGxlKSwgb3B0KTtcbiAgICAgICAgZGF0YS5wdXNoKGZvckRlcHQocGF0ZXJuLCBmbkdlbmVyYXRlLCBvcHQsIDEpKTtcbiAgICAgIH1cblxuICAgICAgY29uc29sZS50aW1lRW5kKCdHZW5lcmF0ZV9CaWdEYXRhJyk7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gIH07XG59KTtcblxuLyoqXG4gKiBDb250cm9scyB0aGUgQmxvZ1xuICovXG5hcHAuY29udHJvbGxlcignVXNlcnNDdHJsJywgZnVuY3Rpb24gKCRzY29wZSAvKiwgJGxvY2F0aW9uLCAkaHR0cCAqLyApIHtcbiAgY29uc29sZS5sb2coXCJVc2VycyBDb250cm9sbGVyIHJlcG9ydGluZyBmb3IgZHV0eS5cIik7XG59KTtcblxuYXBwLmNvbnRyb2xsZXIoJ1Byb2R1Y3RzQ3RybCcsIFtcbiAgJyRzY29wZScsICckbW9kYWwnLCAnJGZpbHRlcicsICckdGltZW91dCcsXG4gIGZ1bmN0aW9uICgkc2NvcGUsICRtb2RhbCwgJGZpbHRlciwgJHRpbWVvdXQsIERhdGFEZW1vKSB7XG5cbiAgICAkc2NvcGUucHJvZHVjdHNfdHJlZWdyaWQgPSB7fTtcblxuICAgICRzY29wZS5maWx0ZXJTdHJpbmcgPSBcIlwiO1xuXG4gICAgJHNjb3BlLmdldFRyZWVEYXRhID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIFt7XG4gICAgICAgICAgTmFtZTogXCJDYWzDp2FzXCIsXG4gICAgICAgICAgVmFsdWU6IDQwMDAuMDAsXG4gICAgICAgICAgUXVhbnQ6IDIwLFxuICAgICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgICAgbGV2ZWw6IDEsXG4gICAgICAgICAgY2hpbGRyZW46IFt7XG4gICAgICAgICAgICAgIE5hbWU6IFwiICAgQ2Fsw6dhIEplYW5zXCIsXG4gICAgICAgICAgICAgIFZhbHVlOiAyMDAuMDAsXG4gICAgICAgICAgICAgIFF1YW50OiAxMCxcbiAgICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgbGV2ZWw6IDIsXG4gICAgICAgICAgICAgIGNoaWxkcmVuOiBbe1xuICAgICAgICAgICAgICAgICAgTmFtZTogXCItICAgICBDYWzDp2EgSmVhbnMgUFwiLFxuICAgICAgICAgICAgICAgICAgVmFsdWU6IDIwMC4wMCxcbiAgICAgICAgICAgICAgICAgIFF1YW50OiAxMCxcbiAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICBsZXZlbDogMyxcbiAgICAgICAgICAgICAgICAgIGljb25zOiB7XG4gICAgICAgICAgICAgICAgICAgIGljb25MZWFmOiBcImZhIGZhLWNpcmNsZS1vXCIsXG4gICAgICAgICAgICAgICAgICAgIGljb25Db2xsYXBzZTogXCJmYSBmYS1taW51c1wiLFxuICAgICAgICAgICAgICAgICAgICBpY29uRXhwYW5kOiBcImZhIGZhLXBsdXNcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgTmFtZTogXCItICAgICBDYWzDp2EgSmVhbnMgTVwiLFxuICAgICAgICAgICAgICAgICAgVmFsdWU6IDIwMC4wMCxcbiAgICAgICAgICAgICAgICAgIFF1YW50OiAxMCxcbiAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICBsZXZlbDogMyxcbiAgICAgICAgICAgICAgICAgIGljb25zOiB7XG4gICAgICAgICAgICAgICAgICAgIGljb25MZWFmOiBcImZhIGZhLWNpcmNsZS1vXCIsXG4gICAgICAgICAgICAgICAgICAgIGljb25Db2xsYXBzZTogXCJmYSBmYS1taW51c1wiLFxuICAgICAgICAgICAgICAgICAgICBpY29uRXhwYW5kOiBcImZhIGZhLXBsdXNcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgTmFtZTogXCItICAgICBDYWzDp2EgSmVhbnMgR1wiLFxuICAgICAgICAgICAgICAgICAgVmFsdWU6IDIwMC4wMCxcbiAgICAgICAgICAgICAgICAgIFF1YW50OiAxMCxcbiAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICBsZXZlbDogMyxcbiAgICAgICAgICAgICAgICAgIGljb25zOiB7XG4gICAgICAgICAgICAgICAgICAgIGljb25MZWFmOiBcImZhIGZhLWNpcmNsZS1vXCIsXG4gICAgICAgICAgICAgICAgICAgIGljb25Db2xsYXBzZTogXCJmYSBmYS1taW51c1wiLFxuICAgICAgICAgICAgICAgICAgICBpY29uRXhwYW5kOiBcImZhIGZhLXBsdXNcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgaWNvbnM6IHtcbiAgICAgICAgICAgICAgICBpY29uTGVhZjogXCJmYSBmYS1jaXJjbGUtb1wiLFxuICAgICAgICAgICAgICAgIGljb25Db2xsYXBzZTogXCJmYSBmYS1taW51c1wiLFxuICAgICAgICAgICAgICAgIGljb25FeHBhbmQ6IFwiZmEgZmEtcGx1c1wiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIE5hbWU6IFwiICAgQ2Fsw6dhIE1vbGV0b25cIixcbiAgICAgICAgICAgICAgVmFsdWU6IDIwMC4wMCxcbiAgICAgICAgICAgICAgUXVhbnQ6IDEwLFxuICAgICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICAgICAgICBsZXZlbDogMixcbiAgICAgICAgICAgICAgY2hpbGRyZW46IFt7XG4gICAgICAgICAgICAgICAgICBOYW1lOiBcIi0gICAgIENhbMOnYSBNb2xldG9uIFBcIixcbiAgICAgICAgICAgICAgICAgIFZhbHVlOiAyMDAuMDAsXG4gICAgICAgICAgICAgICAgICBRdWFudDogMTAsXG4gICAgICAgICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgbGV2ZWw6IDMsXG4gICAgICAgICAgICAgICAgICBpY29uczoge1xuICAgICAgICAgICAgICAgICAgICBpY29uTGVhZjogXCJmYSBmYS1jaXJjbGUtb1wiLFxuICAgICAgICAgICAgICAgICAgICBpY29uQ29sbGFwc2U6IFwiZmEgZmEtbWludXNcIixcbiAgICAgICAgICAgICAgICAgICAgaWNvbkV4cGFuZDogXCJmYSBmYS1wbHVzXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIE5hbWU6IFwiLSAgICAgQ2Fsw6dhIE1vbGV0b24gTVwiLFxuICAgICAgICAgICAgICAgICAgVmFsdWU6IDIwMC4wMCxcbiAgICAgICAgICAgICAgICAgIFF1YW50OiAxMCxcbiAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICBsZXZlbDogMyxcbiAgICAgICAgICAgICAgICAgIGljb25zOiB7XG4gICAgICAgICAgICAgICAgICAgIGljb25MZWFmOiBcImZhIGZhLWNpcmNsZS1vXCIsXG4gICAgICAgICAgICAgICAgICAgIGljb25Db2xsYXBzZTogXCJmYSBmYS1taW51c1wiLFxuICAgICAgICAgICAgICAgICAgICBpY29uRXhwYW5kOiBcImZhIGZhLXBsdXNcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgTmFtZTogXCItICAgICBDYWzDp2EgTW9sZXRvbiBHXCIsXG4gICAgICAgICAgICAgICAgICBWYWx1ZTogMjAwLjAwLFxuICAgICAgICAgICAgICAgICAgUXVhbnQ6IDEwLFxuICAgICAgICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIGxldmVsOiAzLFxuICAgICAgICAgICAgICAgICAgaWNvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgaWNvbkxlYWY6IFwiZmEgZmEtY2lyY2xlLW9cIixcbiAgICAgICAgICAgICAgICAgICAgaWNvbkNvbGxhcHNlOiBcImZhIGZhLW1pbnVzXCIsXG4gICAgICAgICAgICAgICAgICAgIGljb25FeHBhbmQ6IFwiZmEgZmEtcGx1c1wiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBpY29uczoge1xuICAgICAgICAgICAgICAgIGljb25MZWFmOiBcImZhIGZhLWNpcmNsZS1vXCIsXG4gICAgICAgICAgICAgICAgaWNvbkNvbGxhcHNlOiBcImZhIGZhLW1pbnVzXCIsXG4gICAgICAgICAgICAgICAgaWNvbkV4cGFuZDogXCJmYSBmYS1wbHVzXCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgaWNvbnM6IHtcbiAgICAgICAgICAgIGljb25MZWFmOiBcImZhIGZhLWNpcmNsZS1vXCIsXG4gICAgICAgICAgICBpY29uQ29sbGFwc2U6IFwiZmEgZmEtbWludXNcIixcbiAgICAgICAgICAgIGljb25FeHBhbmQ6IFwiZmEgZmEtcGx1c1wiXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgTmFtZTogXCJCZXJtdWRhc1wiLFxuICAgICAgICAgIFZhbHVlOiA5OTkuODAsXG4gICAgICAgICAgUXVhbnQ6IDIwLFxuICAgICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgICAgbGV2ZWw6IDEsXG4gICAgICAgICAgY2hpbGRyZW46IFt7XG4gICAgICAgICAgICAgIE5hbWU6IFwiQmVybXVkYSBKZWFuc1wiLFxuICAgICAgICAgICAgICBWYWx1ZTogNDkuOTksXG4gICAgICAgICAgICAgIFF1YW50OiAxMCxcbiAgICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgbGV2ZWw6IDIsXG4gICAgICAgICAgICAgIGljb25zOiB7XG4gICAgICAgICAgICAgICAgaWNvbkxlYWY6IFwiZmEgZmEtY2lyY2xlLW9cIixcbiAgICAgICAgICAgICAgICBpY29uQ29sbGFwc2U6IFwiZmEgZmEtbWludXNcIixcbiAgICAgICAgICAgICAgICBpY29uRXhwYW5kOiBcImZhIGZhLXBsdXNcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBOYW1lOiBcIkJlcm11ZGEgVGFjdGVsXCIsXG4gICAgICAgICAgICAgIFZhbHVlOiA0OS45OSxcbiAgICAgICAgICAgICAgUXVhbnQ6IDEwLFxuICAgICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICAgICAgICBsZXZlbDogMixcbiAgICAgICAgICAgICAgaWNvbnM6IHtcbiAgICAgICAgICAgICAgICBpY29uTGVhZjogXCJmYSBmYS1jaXJjbGUtb1wiLFxuICAgICAgICAgICAgICAgIGljb25Db2xsYXBzZTogXCJmYSBmYS1taW51c1wiLFxuICAgICAgICAgICAgICAgIGljb25FeHBhbmQ6IFwiZmEgZmEtcGx1c1wiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIGljb25zOiB7XG4gICAgICAgICAgICBpY29uTGVhZjogXCJmYSBmYS1jaXJjbGUtb1wiLFxuICAgICAgICAgICAgaWNvbkNvbGxhcHNlOiBcImZhIGZhLW1pbnVzXCIsXG4gICAgICAgICAgICBpY29uRXhwYW5kOiBcImZhIGZhLXBsdXNcIlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIE5hbWU6IFwiQ2FtaXNldGFzXCIsXG4gICAgICAgICAgVmFsdWU6IDE3OTkuOSxcbiAgICAgICAgICBRdWFudDogMzAsXG4gICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICBsZXZlbDogMSxcbiAgICAgICAgICBjaGlsZHJlbjogW3tcbiAgICAgICAgICAgICAgTmFtZTogXCJDYW1pc2V0YSBSZWdhdGFcIixcbiAgICAgICAgICAgICAgVmFsdWU6IDM5Ljk5LFxuICAgICAgICAgICAgICBRdWFudDogMTAsXG4gICAgICAgICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgICAgICAgIGxldmVsOiAyLFxuICAgICAgICAgICAgICBpY29uczoge1xuICAgICAgICAgICAgICAgIGljb25MZWFmOiBcImZhIGZhLWNpcmNsZS1vXCIsXG4gICAgICAgICAgICAgICAgaWNvbkNvbGxhcHNlOiBcImZhIGZhLW1pbnVzXCIsXG4gICAgICAgICAgICAgICAgaWNvbkV4cGFuZDogXCJmYSBmYS1wbHVzXCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgTmFtZTogXCJDYW1pc2V0YSBFc3RhbXBhZGFcIixcbiAgICAgICAgICAgICAgVmFsdWU6IDQ5Ljk5LFxuICAgICAgICAgICAgICBRdWFudDogMTAsXG4gICAgICAgICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgICAgICAgIGxldmVsOiAyLFxuICAgICAgICAgICAgICBpY29uczoge1xuICAgICAgICAgICAgICAgIGljb25MZWFmOiBcImZhIGZhLWNpcmNsZS1vXCIsXG4gICAgICAgICAgICAgICAgaWNvbkNvbGxhcHNlOiBcImZhIGZhLW1pbnVzXCIsXG4gICAgICAgICAgICAgICAgaWNvbkV4cGFuZDogXCJmYSBmYS1wbHVzXCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgTmFtZTogXCJDYW1pc2V0YSBHb2xhIFBvbG9cIixcbiAgICAgICAgICAgICAgVmFsdWU6IDY5Ljk5LFxuICAgICAgICAgICAgICBRdWFudDogMTAsXG4gICAgICAgICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgICAgICAgIGxldmVsOiAyLFxuICAgICAgICAgICAgICBpY29uczoge1xuICAgICAgICAgICAgICAgIGljb25MZWFmOiBcImZhIGZhLWNpcmNsZS1vXCIsXG4gICAgICAgICAgICAgICAgaWNvbkNvbGxhcHNlOiBcImZhIGZhLW1pbnVzXCIsXG4gICAgICAgICAgICAgICAgaWNvbkV4cGFuZDogXCJmYSBmYS1wbHVzXCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgaWNvbnM6IHtcbiAgICAgICAgICAgIGljb25MZWFmOiBcImZhIGZhLWNpcmNsZS1vXCIsXG4gICAgICAgICAgICBpY29uQ29sbGFwc2U6IFwiZmEgZmEtbWludXNcIixcbiAgICAgICAgICAgIGljb25FeHBhbmQ6IFwiZmEgZmEtcGx1c1wiXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgTmFtZTogXCJDYW1pc2FzXCIsXG4gICAgICAgICAgVmFsdWU6IDIyOTkuOCxcbiAgICAgICAgICBRdWFudDogMjAsXG4gICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICBsZXZlbDogMSxcbiAgICAgICAgICBUaW1lWm9uZTogXCJNb3VudGFpblwiLFxuICAgICAgICAgIGNoaWxkcmVuOiBbe1xuICAgICAgICAgICAgICBOYW1lOiBcIkNhbWlzYSBKZWFuc1wiLFxuICAgICAgICAgICAgICBWYWx1ZTogOTkuOTksXG4gICAgICAgICAgICAgIFF1YW50OiAxMCxcbiAgICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgbGV2ZWw6IDIsXG4gICAgICAgICAgICAgIGljb25zOiB7XG4gICAgICAgICAgICAgICAgaWNvbkxlYWY6IFwiZmEgZmEtY2lyY2xlLW9cIixcbiAgICAgICAgICAgICAgICBpY29uQ29sbGFwc2U6IFwiZmEgZmEtbWludXNcIixcbiAgICAgICAgICAgICAgICBpY29uRXhwYW5kOiBcImZhIGZhLXBsdXNcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBOYW1lOiBcIkNhbWlzYSBMaW5ob1wiLFxuICAgICAgICAgICAgICBWYWx1ZTogMTI5Ljk5LFxuICAgICAgICAgICAgICBRdWFudDogMTAsXG4gICAgICAgICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgICAgICAgIGxldmVsOiAyLFxuICAgICAgICAgICAgICBpY29uczoge1xuICAgICAgICAgICAgICAgIGljb25MZWFmOiBcImZhIGZhLWNpcmNsZS1vXCIsXG4gICAgICAgICAgICAgICAgaWNvbkNvbGxhcHNlOiBcImZhIGZhLW1pbnVzXCIsXG4gICAgICAgICAgICAgICAgaWNvbkV4cGFuZDogXCJmYSBmYS1wbHVzXCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgaWNvbnM6IHtcbiAgICAgICAgICAgIGljb25MZWFmOiBcImZhIGZhLWNpcmNsZS1vXCIsXG4gICAgICAgICAgICBpY29uQ29sbGFwc2U6IFwiZmEgZmEtbWludXNcIixcbiAgICAgICAgICAgIGljb25FeHBhbmQ6IFwiZmEgZmEtcGx1c1wiXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgTmFtZTogXCJSb3VwYXMgSW50aW1hc1wiLFxuICAgICAgICAgIFZhbHVlOiAxMjk5LjYsXG4gICAgICAgICAgUXVhbnQ6IDIwLFxuICAgICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgICAgbGV2ZWw6IDEsXG4gICAgICAgICAgY2hpbGRyZW46IFt7XG4gICAgICAgICAgICAgIE5hbWU6IFwiQ3VlY2EgQm94XCIsXG4gICAgICAgICAgICAgIFZhbHVlOiAyOS45OSxcbiAgICAgICAgICAgICAgUXVhbnQ6IDEwLFxuICAgICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICAgICAgICBsZXZlbDogMixcbiAgICAgICAgICAgICAgaWNvbnM6IHtcbiAgICAgICAgICAgICAgICBpY29uTGVhZjogXCJmYSBmYS1jaXJjbGUtb1wiLFxuICAgICAgICAgICAgICAgIGljb25Db2xsYXBzZTogXCJmYSBmYS1taW51c1wiLFxuICAgICAgICAgICAgICAgIGljb25FeHBhbmQ6IFwiZmEgZmEtcGx1c1wiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIE5hbWU6IFwiU3VuZ2FcIixcbiAgICAgICAgICAgICAgVmFsdWU6IDI5Ljk5LFxuICAgICAgICAgICAgICBRdWFudDogMTAsXG4gICAgICAgICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgICAgICAgIGxldmVsOiAyLFxuICAgICAgICAgICAgICBpY29uczoge1xuICAgICAgICAgICAgICAgIGljb25MZWFmOiBcImZhIGZhLWNpcmNsZS1vXCIsXG4gICAgICAgICAgICAgICAgaWNvbkNvbGxhcHNlOiBcImZhIGZhLW1pbnVzXCIsXG4gICAgICAgICAgICAgICAgaWNvbkV4cGFuZDogXCJmYSBmYS1wbHVzXCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgTmFtZTogXCJDYWxjaW5oYVwiLFxuICAgICAgICAgICAgICBWYWx1ZTogMTkuOTksXG4gICAgICAgICAgICAgIFF1YW50OiAxMCxcbiAgICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgbGV2ZWw6IDIsXG4gICAgICAgICAgICAgIGljb25zOiB7XG4gICAgICAgICAgICAgICAgaWNvbkxlYWY6IFwiZmEgZmEtY2lyY2xlLW9cIixcbiAgICAgICAgICAgICAgICBpY29uQ29sbGFwc2U6IFwiZmEgZmEtbWludXNcIixcbiAgICAgICAgICAgICAgICBpY29uRXhwYW5kOiBcImZhIGZhLXBsdXNcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBOYW1lOiBcIlN1dGnDo1wiLFxuICAgICAgICAgICAgICBWYWx1ZTogNDkuOTksXG4gICAgICAgICAgICAgIFF1YW50OiAxMCxcbiAgICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgbGV2ZWw6IDIsXG4gICAgICAgICAgICAgIGljb25zOiB7XG4gICAgICAgICAgICAgICAgaWNvbkxlYWY6IFwiZmEgZmEtY2lyY2xlLW9cIixcbiAgICAgICAgICAgICAgICBpY29uQ29sbGFwc2U6IFwiZmEgZmEtbWludXNcIixcbiAgICAgICAgICAgICAgICBpY29uRXhwYW5kOiBcImZhIGZhLXBsdXNcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICBpY29uczoge1xuICAgICAgICAgICAgaWNvbkxlYWY6IFwiZmEgZmEtY2lyY2xlLW9cIixcbiAgICAgICAgICAgIGljb25Db2xsYXBzZTogXCJmYSBmYS1taW51c1wiLFxuICAgICAgICAgICAgaWNvbkV4cGFuZDogXCJmYSBmYS1wbHVzXCJcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgXTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLnRyZWVfZGF0YSA9ICRzY29wZS5nZXRUcmVlRGF0YSgpO1xuXG4gICAgJHNjb3BlLmV4cGFuZGluZ19wcm9wZXJ0eSA9IHtcbiAgICAgIGZpZWxkOiBcIk5hbWVcIixcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk5hbWVcIixcbiAgICAgIHNvcnRhYmxlOiB0cnVlLFxuICAgICAgZmlsdGVyYWJsZTogdHJ1ZSxcbiAgICAgIGNlbGxUZW1wbGF0ZTogXCI8c3Bhbj57e3Jvdy5icmFuY2hbZXhwYW5kaW5nUHJvcGVydHkuZmllbGRdfX08L3NwYW4+XCJcbiAgICB9O1xuXG4gICAgJHNjb3BlLmNoZWNrSWZFbnRlcktleVdhc1ByZXNzZWQgPSBmdW5jdGlvbiAoJGV2ZW50KSB7XG4gICAgICB2YXIga2V5Q29kZSA9ICRldmVudC53aGljaCB8fCAkZXZlbnQua2V5Q29kZTtcbiAgICAgIGlmIChrZXlDb2RlID09PSAxMykge1xuICAgICAgICAkc2NvcGUuc2VhcmNoKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgICRzY29wZS5zZWFyY2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAkc2NvcGUudHJlZV9kYXRhID0gJGZpbHRlcignc2VhcmNoRm9yJykoJHNjb3BlLmdldFRyZWVEYXRhKCksICRzY29wZS5maWx0ZXJTdHJpbmcsICRzY29wZS5leHBhbmRpbmdfcHJvcGVydHksICRzY29wZS5jb2xfZGVmcywgdHJ1ZSk7XG4gICAgfTtcblxuICAgICRzY29wZS5jb2xfZGVmcyA9IFt7XG4gICAgICAgIGZpZWxkOiBcIlZhbHVlXCIsXG4gICAgICAgIHNvcnRhYmxlOiB0cnVlLFxuICAgICAgICBjZWxsVGVtcGxhdGU6IFwiPHNwYW4+UiQge3sgcm93LmJyYW5jaFtjb2wuZmllbGRdIH19PC9zcGFuPlwiLFxuICAgICAgICBzb3J0aW5nVHlwZTogXCJudW1iZXJcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZmllbGQ6IFwiUXVhbnRcIixcbiAgICAgICAgc29ydGFibGU6IHRydWUsXG4gICAgICAgIHNvcnRpbmdUeXBlOiBcIm51bWJlclwiXG4gICAgICB9XG4gICAgXTtcblxuICAgICRzY29wZS5teV90cmVlX2hhbmRsZXIgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgJHNjb3BlLnNlbGVjdGVkSXRlbSA9IGl0ZW07XG4gICAgfTtcblxuICAgICRzY29wZS5hZGRGb3JtID0gZnVuY3Rpb24gKCkge1xuICAgICAgJHNjb3BlLmlzRWRpdCA9IGZhbHNlO1xuXG4gICAgICB2YXIgbW9kYWxJbnN0YW5jZSA9ICRtb2RhbC5vcGVuKHtcbiAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi90ZW1wbGF0ZXMvbW9kYWwtZm9ybS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogTW9kYWxJbnN0YW5jZUN0cmwsXG4gICAgICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICBwcm9kdWN0Rm9ybTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICRzY29wZS5wcm9kdWN0Rm9ybTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBtb2RhbEluc3RhbmNlLnJlc3VsdC50aGVuKGZ1bmN0aW9uIChzZWxlY3RlZEl0ZW0pIHt9LCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIH0pO1xuICAgIH07XG5cblxuICAgICRzY29wZS5lZGl0Rm9ybSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICRzY29wZS5pc0VkaXQgPSB0cnVlO1xuXG4gICAgICBpZiAoJHNjb3BlLnNlbGVjdGVkSXRlbSkge1xuICAgICAgICB2YXIgbW9kYWxJbnN0YW5jZSA9ICRtb2RhbC5vcGVuKHtcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3RlbXBsYXRlcy9tb2RhbC1mb3JtLmh0bWwnLFxuICAgICAgICAgIGNvbnRyb2xsZXI6IE1vZGFsSW5zdGFuY2VDdHJsLFxuICAgICAgICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgcHJvZHVjdEZvcm06IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS5wcm9kdWN0Rm9ybTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1vZGFsSW5zdGFuY2UucmVzdWx0LnRoZW4oZnVuY3Rpb24gKHNlbGVjdGVkSXRlbSkge30sIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZVxuICAgICAgICBhbGVydChcIk7Do28gaMOhIG5lbmh1bSBpdGVtIHNlbGVjaW9uYWRvLlwiKTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmRlbGV0ZUZvcm0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoJHNjb3BlLnNlbGVjdGVkSXRlbSkge1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50cmVlX2RhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgY3VyT2JqID0gdGhpcy50cmVlX2RhdGFbaV07XG4gICAgICAgICAgaWYgKGN1ck9iai5OYW1lID09ICRzY29wZS5zZWxlY3RlZEl0ZW0uTmFtZSlcbiAgICAgICAgICAgIHRoaXMudHJlZV9kYXRhLnNsaWNlKGksIDEpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2VcbiAgICAgICAgYWxlcnQoXCJOw6NvIGjDoSBuZW5odW0gaXRlbSBzZWxlY2lvbmFkby5cIik7XG4gICAgfTtcblxuICAgIHZhciBNb2RhbEluc3RhbmNlQ3RybCA9IGZ1bmN0aW9uICgkc2NvcGUsICRtb2RhbEluc3RhbmNlLCBwcm9kdWN0Rm9ybSkge1xuICAgICAgJHNjb3BlLmZvcm0gPSB7fTtcbiAgICAgICRzY29wZS5wcm9kdWN0ID0ge307XG4gICAgICAkc2NvcGUub2xkTmFtZSA9IFwiXCI7XG5cbiAgICAgIGlmICgkc2NvcGUuaXNFZGl0ICYmICRzY29wZS5zZWxlY3RlZEl0ZW0pIHtcbiAgICAgICAgJHNjb3BlLm9sZE5hbWUgPSAkc2NvcGUuc2VsZWN0ZWRJdGVtLk5hbWU7XG4gICAgICAgICRzY29wZS5wcm9kdWN0Lm5hbWUgPSAkc2NvcGUuc2VsZWN0ZWRJdGVtLk5hbWU7XG4gICAgICAgICRzY29wZS5wcm9kdWN0LnZhbHVlID0gJHNjb3BlLnNlbGVjdGVkSXRlbS5WYWx1ZTtcbiAgICAgICAgJHNjb3BlLnByb2R1Y3QucXVhbnQgPSAkc2NvcGUuc2VsZWN0ZWRJdGVtLlF1YW50O1xuICAgICAgfVxuXG4gICAgICAkc2NvcGUuZm9ybUluaXQgPSBmdW5jdGlvbiAoKSB7fTtcblxuICAgICAgJHNjb3BlLnN1Ym1pdEZvcm0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICgkc2NvcGUuZm9ybS5wcm9kdWN0Rm9ybS4kdmFsaWQpIHtcblxuICAgICAgICAgIGlmICghJHNjb3BlLmlzRWRpdCkge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9O1xuXG4gICAgICAgICAgICBpZiAoJHNjb3BlLnNlbGVjdGVkSXRlbSkge1xuICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRJdGVtLmV4cGFuZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgb2JqID0gJHNjb3BlLnNlbGVjdGVkSXRlbS5jaGlsZHJlbjtcbiAgICAgICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgICBvYmogPSAkc2NvcGUudHJlZV9kYXRhO1xuXG4gICAgICAgICAgICBvYmoucHVzaCh7XG4gICAgICAgICAgICAgIE5hbWU6ICRzY29wZS5wcm9kdWN0Lm5hbWUsXG4gICAgICAgICAgICAgIFZhbHVlOiAkc2NvcGUucHJvZHVjdC52YWx1ZSxcbiAgICAgICAgICAgICAgUXVhbnQ6ICRzY29wZS5wcm9kdWN0LnF1YW50LFxuICAgICAgICAgICAgICBpY29uczoge1xuICAgICAgICAgICAgICAgIGljb25MZWFmOiBcImZhIGZhLWNpcmNsZS1vXCIsXG4gICAgICAgICAgICAgICAgaWNvbkNvbGxhcHNlOiBcImZhIGZhLW1pbnVzXCIsXG4gICAgICAgICAgICAgICAgaWNvbkV4cGFuZDogXCJmYSBmYS1wbHVzXCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAkc2NvcGUudXBkYXRlSXRlbSgkc2NvcGUudHJlZV9kYXRhKTtcblxuICAgICAgICAgICAgYWxlcnQoXCJEYWRvcyBhbHRlcmFkb3MgY29tIHN1Y2Vzc28hXCIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgICRtb2RhbEluc3RhbmNlLmNsb3NlKCdjbG9zZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygncHJvZHVjdEZvcm0gaXMgbm90IGluIHNjb3BlJyk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICRtb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xuICAgICAgfTtcblxuICAgICAgJHNjb3BlLnVwZGF0ZUl0ZW0gPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIGlmIChvYmopIHtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGN1ck9iaiA9IG9ialtpXTtcbiAgICAgICAgICAgIGlmIChjdXJPYmogJiYgY3VyT2JqLk5hbWUgPT0gJHNjb3BlLm9sZE5hbWUpIHtcbiAgICAgICAgICAgICAgY3VyT2JqLk5hbWUgPSAkc2NvcGUucHJvZHVjdC5uYW1lO1xuICAgICAgICAgICAgICBjdXJPYmouVmFsdWUgPSAkc2NvcGUucHJvZHVjdC52YWx1ZTtcbiAgICAgICAgICAgICAgY3VyT2JqLlF1YW50ID0gJHNjb3BlLnByb2R1Y3QucXVhbnQ7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJPYmouY2hpbGRyZW4gJiYgY3VyT2JqLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgJHNjb3BlLnVwZGF0ZUl0ZW0oY3VyT2JqLmNoaWxkcmVuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcbiAgfVxuXSk7XG5cblxuLyoqXG4gKiBDb250cm9scyBhbGwgb3RoZXIgUGFnZXNcbiAqL1xuYXBwLmNvbnRyb2xsZXIoJ1BhZ2VDdHJsJywgZnVuY3Rpb24gKCAvKiAkc2NvcGUsICRsb2NhdGlvbiwgJGh0dHAgKi8gKSB7XG4gIGNvbnNvbGUubG9nKFwiUGFnZSBDb250cm9sbGVyIHJlcG9ydGluZyBmb3IgZHV0eS5cIik7XG59KTsiXX0=

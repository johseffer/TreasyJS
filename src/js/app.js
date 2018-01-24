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
app.controller('UsersCtrl', function ($scope /*, $location, $http */ ) {
  console.log("Users Controller reporting for duty.");
});

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
          Observation: "obs...",
          level: 1,
          children: [{
              Name: "   Calça Jeans",
              Value: 200.00,
              Quant: 10,
              visible: true,
              Observation: "obs...",
              level: 2,
              children: [{
                  Name: "-     Calça Jeans P",
                  Value: 200.00,
                  Quant: 10,
                  visible: true,
                  Observation: "obs...",
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
                  Observation: "obs...",
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
                  Observation: "obs...",
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
              Observation: "obs...",
              level: 2,
              children: [{
                  Name: "-     Calça Moleton P",
                  Value: 200.00,
                  Quant: 10,
                  visible: true,
                  Observation: "obs...",
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
                  Observation: "obs...",
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
                  Observation: "obs...",
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
          Observation: "obs...",
          level: 1,
          children: [{
              Name: "Bermuda Jeans",
              Value: 49.99,
              Quant: 10,
              visible: true,
              Observation: "obs...",
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
              Observation: "obs...",
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
          Observation: "obs...",
          level: 1,
          children: [{
              Name: "Camiseta Regata",
              Value: 39.99,
              Quant: 10,
              visible: true,
              Observation: "obs...",
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
              Observation: "obs...",
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
              Observation: "obs...",
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
          Observation: "obs...",
          level: 1,
          TimeZone: "Mountain",
          children: [{
              Name: "Camisa Jeans",
              Value: 99.99,
              Quant: 10,
              visible: true,
              Observation: "obs...",
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
              Observation: "obs...",
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
          Observation: "obs...",
          level: 1,
          children: [{
              Name: "Cueca Box",
              Value: 29.99,
              Quant: 10,
              visible: true,
              Observation: "obs...",
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
              Observation: "obs...",
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
              Observation: "obs...",
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
              Observation: "obs...",
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

    $scope.deleteChild = function (item) {
      for (var i = 0; i < item.children.length; i++) {
        var curObj = item.children[i];
        if (curObj.Name == $scope.selectedItem.Name)
          item.children.splice(i, 1);
        else if (curObj.children && curObj.children.length > 0)
          $scope.deleteChild(curObj);
      }
    };

    $scope.deleteForm = function () {
      if ($scope.selectedItem) {
        if (confirm("Deseja remover o item selecionado?")) {
          for (var i = 0; i < this.tree_data.length; i++) {
            var curObj = this.tree_data[i];
            if (curObj.Name == $scope.selectedItem.Name)
              this.tree_data.splice(i, 1);
            else if (curObj.children && curObj.children.length > 0)
              $scope.deleteChild(curObj);
          }
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
        $scope.product.observation = $scope.selectedItem.Observation;
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
              Observation: $scope.product.observation,
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
              curObj.Observation = $scope.product.observation;
              break;
            } else if (curObj.children && curObj.children.length > 0) {
              $scope.updateItem(curObj.children);
            }
          }
        }
      };
    };
  }
]);


/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function ( /* $scope, $location, $http */ ) {
  console.log("Page Controller reporting for duty.");
});
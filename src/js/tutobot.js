(function(){
    'use strict';

    angular.module('tutobot', [])
    .directive('tutobotStep', function($compile, $timeout){
        return {
          restrict: 'A',
          replace: true,
          template: '',
          scope: {
            'tutobotStep': '@tutobotStep'
          },
          controller: function($scope, tutobotService, $element){
            $scope.visible = false;
            $scope.tutobot = tutobotService;
            $scope.$watch('tutobot.index', function(o, n){
              if (o != n){
                $scope.step = $scope.tutobot.getCurrent();
                if ($scope.tutobot.overlay){
                  $element.removeClass('tutobot-active-element');
                  angular.element($scope.step.element).addClass('tutobot-active-element');
                }
              }
            })
            $scope.step = $scope.tutobot.getCurrent();
            if ($scope.tutobot.overlay){
              $element.removeClass('tutobot-active-element');
              angular.element($scope.step.element).addClass('tutobot-active-element');
            }

            $scope.getStyle = function(){
              return $scope.tutobot.computePlacement();
            }
          },
          link: function(scope, element){
            angular.element(window).on('resize', function(){
              $timeout(function(){
                scope.tutobot.get(scope.tutobotStep).forEach(function(v){
                  v.offset = scope.tutobot.getOffset(element[0]);
                })
              }, 1);
            })

            angular.element(window).on('scroll', function(){
              $timeout(function(){
                scope.tutobot.get(scope.tutobotStep).forEach(function(v){
                  v.offset = scope.tutobot.getOffset(element[0]);
                })
              }, 1);
            })


            scope.tutobot.get(scope.tutobotStep).forEach(function(v){
              v.offset = scope.tutobot.getOffset(element[0]);
              v.element = element[0];
            })
            console.log(scope.tutobot.steps);

            if (!scope.tutobot.installed){
              var template = '<div class="tutobot" ng-style="getStyle()" ng-class="tutobot.getCurrent().position">' +
                               '<div class="content">{{step.content}}</div>' +
                               '<button ng-if="tutobot.canBefore" ng-click="tutobot.before()">before</button>' +
                               '<button ng-if="tutobot.canNext" ng-click="tutobot.next()">next</button>' +
                             '</div>'
              ;
              if (scope.tutobot.overlay){
                template += '<div class="tutobot-overlay"></div>';
              }
              var linkFn = $compile(template);
              var content = linkFn(scope);
              element.parent().append(content);
              scope.tutobot.element = element[0].parentNode.querySelector('.tutobot');
              scope.tutobot.installed = true;
            }
          }
        }
    })

    .service('tutobotService', function(){
      this.installed = false;
      this.steps = new Map();
      this.stepNames = [];
      this.index = 0;
      this.canBefore = false;
      this.canNext = true;
      this.element = null; // DOM Element for current step ;)

      this.getOffset = function(el) {
        el = el.getBoundingClientRect();
        return {
          left: el.left + window.scrollX,
          top: el.top + window.scrollY,
          bottom: el.bottom + window.scrollY,
          right: el.right + window.scrollX,
          height: el.height,
          width: el.width
        }
      }
      this.computePlacement = function(){
        var step = this.getCurrent();

        var baseOffset = this.getOffset(this.element);

        switch(step.position){
          case 'top-left':
            return {
              left: step.offset.left - baseOffset.width + 'px',
              top: step.offset.top + 'px'
            }
            break;
          case 'top-right':
            return {
              left: step.offset.left + step.offset.width + 'px',
              top: step.offset.top + 'px'
            }
            break;
          case 'bottom-left':
            return {
              left: step.offset.left -baseOffset.width + 'px',
              top: step.offset.top + step.offset.height - baseOffset.height + 'px'
            }
            break;
          case 'bottom-right':
            return {
              left: step.offset.left + step.offset.width + 'px',
              top: step.offset.top + step.offset.height - baseOffset.height + 'px'
            }
          default:
              // nothing
        }

      }

      this.add = function(step){
        var __step = this.steps.get(step.name);
        if (typeof __step === 'undefined'){
          this.steps.set(step.name, [step]);
          this.stepNames.push(step.name);
        } else {
            __step.push(step);
            this.steps.set(step.name, __step);
        }
      }

      this.getCurrent = function(){
        return this.get(this.stepNames[this.index])[0];
      }

      this.get = function(name){
        return this.steps.get(name);
      }


      this.before = function(){
        if (this.index - 1 < 0) {
          this.index = 0;
        } else {
          this.index--;
        }
        this.canBefore = this.index > 0;
        this.canNext = this.index < this.stepNames.length - 1;
      }

      this.next = function(){
        if (this.index + 1 >= this.stepNames.length) {
          this.index = this.stepNames.length - 1;
        } else {
          this.index++;
        }
        this.canBefore = this.index > 0;
        this.canNext = this.index < this.stepNames.length - 1;
      }
    })

})();

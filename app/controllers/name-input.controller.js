angular.module('NameApp')
    .controller('NameInputController', ['UserService', '$location',
        function(UserService, $location) {
            const vm = this;
            vm.username = '';

            vm.saveName = function() {
                if (vm.username && vm.username.trim()) {
                    UserService.setUsername(vm.username.trim());
                    $location.path('/chat');
                }
            };
        }
    ]);
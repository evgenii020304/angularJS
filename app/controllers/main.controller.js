angular.module('NameApp')
    .controller('MainController', function(UserService) {
        var vm = this;

        vm.username = UserService.getUsername();
        vm.newUsername = '';

        vm.saveName = function() {
            if (vm.newUsername && vm.newUsername.trim()) {
                UserService.setUsername(vm.newUsername.trim());
                vm.username = vm.newUsername.trim();
                vm.newUsername = '';
            }
        };

        vm.changeName = function() {
            UserService.setUsername('');
            vm.username = null;
        };
    });
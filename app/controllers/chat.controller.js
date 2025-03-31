angular.module('NameApp')
    .controller('ChatController', ['UserService', 'MessageService', '$scope', '$window',
        function(UserService, MessageService, $scope, $window) {
            const vm = this;
            vm.currentUser = UserService.getUsername();
            vm.newMessage = '';
            vm.messages = [];
            vm.isConnected = true;

            // Инициализация чата
            vm.initChat = function() {
                MessageService.connect();
                vm.messages = MessageService.getHistory();

                // Подписка на новые сообщения
                const subscription = MessageService.onMessage().subscribe(function(message) {
                    $scope.$applyAsync(() => {
                        if (!vm.messages.some(m => m.id === message.id)) {
                            vm.messages.push(message);
                        }
                    });
                });

                // Очистка при закрытии вкладки
                $window.addEventListener('beforeunload', function() {
                    subscription.unsubscribe();
                });
            };

            // Отправка сообщения
            vm.sendMessage = function() {
                if (!vm.newMessage.trim()) return;

                const newMsg = {
                    author: vm.currentUser,
                    text: vm.newMessage,
                    timestamp: new Date()
                };

                MessageService.sendMessage(newMsg);
                vm.newMessage = '';
            };

            // Смена имени пользователя
            vm.changeName = function() {
                MessageService.sendMessage({
                    author: 'Система',
                    text: `${vm.currentUser} вышел из чата`,
                    timestamp: new Date(),
                    isSystem: true
                });
                UserService.clearUsername();
            };

            vm.initChat();
        }
    ]);
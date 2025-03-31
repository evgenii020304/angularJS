angular.module('NameApp')
    .service('UserService', ['$window', '$location', function($window, $location) {
        const USERNAME_KEY = 'chat_username';
        let channel = null;

        const getChannel = () => {
            if (!channel || channel.readyState === 'closed') {
                channel = new BroadcastChannel('user_channel');
            }
            return channel;
        };

        return {
            getUsername: function() {
                return $window.localStorage.getItem(USERNAME_KEY);
            },

            setUsername: function(username) {
                $window.localStorage.setItem(USERNAME_KEY, username);
                try {
                    getChannel().postMessage({
                        type: 'username_changed',
                        newUsername: username
                    });
                } catch (e) {
                    console.error('Ошибка отправки сообщения:', e);
                    channel = new BroadcastChannel('user_channel');
                }
                $location.path('/chat');
            },

            clearUsername: function() {
                const oldUsername = this.getUsername();
                $window.localStorage.removeItem(USERNAME_KEY);
                try {
                    getChannel().postMessage({
                        type: 'username_cleared',
                        oldUsername: oldUsername
                    });
                } catch (e) {
                    console.error('Ошибка отправки сообщения:', e);
                }
                $location.path('/name');
            },

            destroy: function() {
                if (channel && channel.readyState !== 'closed') {
                    channel.close();
                }
            }
        };
    }]);
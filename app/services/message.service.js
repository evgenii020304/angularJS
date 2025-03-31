angular.module('NameApp')
    .service('MessageService', function() {
        const { Subject } = rxjs;
        const messageSubject = new Subject();
        const messages = [];
        const channel = new BroadcastChannel('chat_channel');

        channel.onmessage = (event) => {
            const message = event.data;
            if (!messages.some(m => m.id === message.id)) {
                messages.push(message);
                messageSubject.next(message);
            }
        };

        return {
            sendMessage: function(message) {
                message.id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
                messages.push(message);
                messageSubject.next(message);
                channel.postMessage(message);
            },

            onMessage: function() {
                return messageSubject.asObservable();
            },

            getHistory: function() {
                return messages.slice();
            },

            connect: function() {
                const welcomeMsg = {
                    id: `welcome-${Date.now()}`,
                    author: 'Система',
                    text: 'Вы подключены к чату',
                    timestamp: new Date(),
                    isSystem: true
                };
                this.sendMessage(welcomeMsg);
            },

            destroy: function() {
                channel.close();
            }
        };
    });
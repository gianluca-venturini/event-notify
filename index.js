var notifications = []; // Contains all possible notifications

var observers = {};

exports.getNotifications = function() {
    return notifications.slice();
};

exports.addNotifications = function(_notifications) {
    _notifications.forEach(function(notification) {
        if(notifications.indexOf(notification) < 0) {
            notifications.push(notification);
        }
    });
};

exports.notificationCenter = {
    subscribe: function(notification, callback) {
        if(notifications.indexOf(notification) >= 0 ) {
            if(observers[notification] == undefined) {
                observers[notification] = [];
            }
            if(observers[notification].indexOf(callback) < 0) {
                // Check if the callback is a function
                if(callback && typeof callback === 'function') {
                    observers[notification].push(callback);
                }
                else {
                    throw "Callback is not a function";
                }
            }
        }
        else {
            throw "Notification not present: " + notification;
        }

    },
    dispatch: function(notification) {
        if(notifications.indexOf(notification) >= 0 ) {
            if(observers[notification] != undefined) {
                observers[notification].forEach(function(callback) {
                    callback();
                });
            }
        }
        else {
            throw "Notification not present: " + notification;
        }

    }
};
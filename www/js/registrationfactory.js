angular.module('xylidieet.registrationFactory', ['xylidieet.configuration'])
   
	.factory('registrationFactory', ['$http', 'HOST', 'REGISTRATION', '$log', function($http, HOST, REGISTRATION, $log){
		return {
			createUser: function (user, $cookies, callback){
				$log.debug('..FACTORY:REGISTRATIONFACTORY.. createUser, input: ', user);
				$http({
					method: 'POST',
					url: HOST + REGISTRATION,
					data: user,
				}).success(function(data, status, headers, config) {
					$log.debug('..FACTORY:REGISTRATIONFACTORY.. createUser, response: ', user);
					callback(data);
				}).error(function(data, status, headers, config) {
					$log.error('..FACTORY:REGISTRATIONFACTORY.. createUser, response: ', data, status);
					if (status === 401) {
						var	data = { "messages" : [] };
						var message = {	
							"messageType" : "SUCCESS",
							"messageCode" : "SERVICE_9998",
							"messageText" : url + " responded with " + status
						};								
					} else {
						var	data = { "messages" : [] };
						var message = {	
							"messageType" : "ERROR",
							"messageCode" : "SERVICE_9999",
							"messageText" : url + " responded with " + status
						};		
						data.messages.push(message);
					}	
					callback(data);
				});
			}
		};
	}])
	
;
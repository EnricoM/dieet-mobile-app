angular.module('xylidieet.sessionfactory', ['xylidieet.configuration'])
   
   .factory('sessionFactory', ['$http', 'HOST', 'SESSION', '$log', function($http, HOST, SESSION, $log){
		return {
			createSession: function (user, $cookies, callback){
				console.log('in the sessionFactory, service createSession:', user);
				$http({
					method: 'POST',
					url: HOST + SESSION,
					data: user,
				}).success(function(data, status, headers, config) {
					$log.debug('SESSIONFACTORY, createSession: ', data, status);
					callback(data);
				}).error(function(data, status, headers, config) {
					$log.error('SESSIONFACTORY, createSession: ', data, status);
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
			},
			
			deleteSession: function(callback){
				$log.debug('SESSIONFACTORY, deleteSession');
				$http({
					method: 'DELETE',
					url: HOST + SESSION,
				}).success(function(data, status, headers, config) {
					$log.debug('SESSIONFACTORY, deleteSession: ', data, status);
					callback(data);
				}).error(function(data, status, headers, config) {
					$log.error('SESSIONFACTORY, deleteSession: ', data, status);
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
				})
			}
		};
	}])
;
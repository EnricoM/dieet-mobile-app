angular.module('xylidieet.factories', [])
   
   .factory('sessionFactory', function($http){
		return {
			createSession: function (user, $cookies, callback){
				console.log('in the sessionFactory, service createSession:', user);
				$http({
					method: 'POST',
					url: 'http://localhost:5000/session',
					data: user,
				}).success(function(data, status, headers, config) {
					console.log('sessionFactory, createSession, success response :', data, status);
					callback(data);
				}).error(function(data, status, headers, config) {
					console.log('sessionFactory, createSession, error response :', data, status);
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
				console.log('in the sessionFactory, service deleteSession');
				$http({
					method: 'DELETE',
					url: 'http://localhost:5000/session'
				}).success(function(data, status, headers, config) {
					console.log('sessionFactory, deleteSession, success response :', data, status);
					callback(data);
				}).error(function(data, status, headers, config) {
					console.log('sessionFactory, deleteSession, error response :', data, status);
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
	})

   .factory('registrationFactory', function($http){
		return {
			createUser: function (user, $cookies, callback){
				console.log('in the registrationFactory, service createUser:', user);
				$http({
					method: 'POST',
					url: 'http://localhost:5000/registration',
					data: user,
				}).success(function(data, status, headers, config) {
					console.log('registrationFactory, createUser, success response :', data, status);
					callback(data);
				}).error(function(data, status, headers, config) {
					console.log('registrationFactory, createUser, error response :', data, status);
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
	})
	
   .factory('settingsFactory', function($http){
		return {
			createSettings: function (settings, callback){
				console.log('in the settingsFactory, service createSettings:', settings);
				$http({
					method: 'POST',
					url: 'settings.json',
					cache: false
				}).success(callback);
			},
			readSettings: function (id, callback){
				console.log('in the settingsFactory, service readSettings:', id);
				$http({
					method: 'GET',
					url: 'settings.json',
					cache: false
				}).success(callback);
			},
			updateSettings: function (settings, callback){
				console.log('in the settingsFactory, service updateSettings:', settings);
				$http({
					method: 'PUT',
					url: 'settings.json',
					cache: false
				}).success(callback);
			},
			deleteSettings: function (id, callback){
				console.log('in the settingsFactory, service deleteSettings:', id);
				$http({
					method: 'DELETE',
					url: 'settings.json',
					cache: false
				}).success(callback);
			}
		};
	})
   
   .factory('diaryFactory', function($http){
		return {
			createDiaryEntry: function (diaryEntry, callback){
				console.log('in the diaryFactory, service createDiaryEntry:', diaryEntry);
				$http({
					method: 'POST',
					url: 'diary.json',
					cache: false
				}).success(callback);
			},
			deleteDiaryEntry: function(diaryEntry, callback){
				console.log('in the diaryFactory, service deleteDiaryEntry:', diaryEntry);
				$http({
					method: 'DELETE',
					url: 'diary_' + id + '.json',
					cache: false
				}).success(callback);
			},
			readDiary: function (diary, callback){
				console.log('in the diaryFactory, service readDiary:', diary);
				$http({
					method: 'GET',
					url: 'diary.json',
					cache: false
				}).success(callback);
			}			
		};
	})
   
   .factory('productFactory', function($http){
		return {
			readCategories: function(callback){
				console.log('in the productFactory, service readCategories:');
				$http({
					method: 'GET',
					url: 'http://localhost:5000/categories',
					withCredentials: true,
					cache: false
				}).success(function(data, status, headers, config) {
					console.log('productFactory, readCategories, success response :', data, status);
					callback(data);
				}).error(function(data, status, headers, config) {
					console.log('productFactory, readCategories, error response :', data, status);
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
			readProducts: function(product, callback){
				console.log('in the productFactory, service readProducts:', product);
				$http({
					method: 'GET',
					url: 'products.json',
					cache: false
				}).success(callback);
			}			
		};
	})
;
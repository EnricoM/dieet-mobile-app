angular.module('xylidieet.factories', ['xylidieet.configuration'])
   
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
					url: 'http://localhost:5000/settings',
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
				console.log('..FACTORY:DIARYFACTORY.. createDiaryEntry: ', diaryEntry);
				$http({
					method: 'POST',
					url: 'http://localhost:5000/diaries',
					data: diaryEntry,
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
					url: 'http://localhost:5000/diaries?diaryDate=' + diary.diaryDate,
					cache: false
				}).success(callback);
			}			
		};
	})
   
   .factory('productFactory', function($http){
		return {
			readCategories: function(callback){
				console.log('..FACTORY:productFactory.. readCategories');
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
				console.log('..FACTORY:productFactory.. STARTING readProducts: ', product);
				$http({
					method: 'GET',
					url: 'http://localhost:5000/products?category=-1&product=' + product.product,
					withCredentials: true,
					cache: false
				}).success(function(data, status, headers, config) {
					console.log('..FACTORY:productFactory.. ENDING readProducts: ', data, status);
					callback(data);
				}).error(function(data, status, headers, config) {
					console.log('..FACTORY:productFactory.. ENDING readProducts: ', data, status);
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
			readProductDetails: function(product, callback){
				console.log('..FACTORY:productFactory.. STARTING readProductDetails: ', product);
				var url = 'http://localhost:5000/products?_id=' + product._id;
				$http({
					method: 'GET',
					url: url,
					withCredentials: true,
					cache: false
				}).success(function(data, status, headers, config) {
					console.log('..FACTORY:productFactory.. ENDING readProductDetails: ', data, status);
					callback(data);
				}).error(function(data, status, headers, config) {
					console.log('..FACTORY:productFactory.. ENDING readProductDetails: ', data, status);
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
;
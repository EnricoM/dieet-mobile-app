angular.module('xylidieet.controllers', [])

.controller('MenuCtrl', function($scope, $cookies, $state, sessionFactory) {
	$scope.deleteSession = function(){
		console.log('..CONTROLLER:MENUCTRL.. deleteSession');
		sessionFactory.deleteSession(function(response) {
			console.log('..CONTROLLER:MENUCTRL.. deleteSession, response: ', response);
			$state.go('app.index');
		});
	};
})

.controller('LoginCtrl', function($scope, $cookies, $state, sessionFactory) {
	$scope.createSession = function(user){
		console.log('..CONTROLLER:LOGINCTRL.. createSession, input: ', user);
		$scope.serviceError = false;
		sessionFactory.createSession(user, $cookies, function(response) {
			console.log('..CONTROLLER:LOGINCTRL.. createSession, response: ', response);
			if(response && response.messages && response.messages[0]) {
				var message = response.messages[0];
				switch(message.messageType) {
					case "ERROR" : {
						$scope.serviceError = true;
						$scope.messageText = message.messageText;
						break;
					}
					case "SUCCESS" : {
						$scope.loggedIn = true;
						$state.go('app.diary');
						break;
					}
				};
			}
		});
	};
})

.controller('RegisterCtrl', function($scope, $cookies, $state, registrationFactory) {
	$scope.createUser = function(user){
		console.log('..CONTROLLER:REGISTERCTRL.. createUser, input: ', user);
		$scope.serviceError = false;
		registrationFactory.createUser(user, $cookies, function(response) {
			console.log('..CONTROLLER:REGISTERCTRL.. createUser, response: ', response);
			if(response && response.messages && response.messages[0]) {
				var message = response.messages[0];
				switch(message.messageType) {
					case "ERROR" : {
						$scope.serviceError = true;
						$scope.messageText = message.messageText;
						break;
					}
					case "SUCCESS" : {
						$scope.loggedIn = true;
						$state.go('app.settings');
						break;
					}
				};
			}
		});
	};
})

.controller('DiaryCtrl', function($scope, diaryFactory, productFactory) {
	$scope.categories = {};
	$scope.init = function() {
		console.log('..CONTROLLER:DIARYCTRL.. init');
		productFactory.readCategories(function (response) {
			console.log('..CONTROLLER:DIARYCTRL.. init, response: ', response);
			if (response && response.categories) {
				$scope.categories = response.categories;
			}
		});
	}

	$scope.createDiaryEntry = function(diaryEntry){
		console.log('in createDiaryEntry function, input: ', diaryEntry);
		diaryFactory.createDiaryEntry(diaryEntry);
	};

	$scope.deleteDiaryEntry = function(diaryEntry){
		console.log('in deleteDiaryEntry function, input: ', diaryEntry);
		diaryFactory.deleteDiaryEntry(diaryEntry);
	};

	$scope.readDiary = function(diary){
		console.log('in readDiary function, input: ', diary);
		diaryFactory.readDiary(diary);
	};
	
	$scope.init();
})

.controller('WeightCtrl', function($scope) {

})

.controller('SettingsCtrl', ['$scope', '$ionicModal', function($scope, $ionicModal, settingsFactory) {

	$scope.model = null;

	$scope.rightButtons = [{ 
		type: 'button-positive',  
		content: '<i class="icon ion-navicon"></i>',
		tap: function(e) {
			$scope.date = null;
			$scope.modal.scope.model = {description :"",amount :""};
			$scope.openModal();
		}
	}]


	$ionicModal.fromTemplateUrl('templates/modal.html', function(modal) {
		$scope.modal = modal;
	},
	{
	// Use our scope for the scope of the modal to keep it simple
		scope: $scope, 
	// The animation we want to use for the modal entrance
		animation: 'slide-in-up'
	});

	$scope.openModal = function() {
		$scope.modal.show();
	};

	$scope.closeModal = function(model) {
		$scope.modal.hide();
	};

	$ionicModal.fromTemplateUrl('templates/datemodal.html', function(modal) {
		$scope.datemodal = modal;
	},
	{
	// Use our scope for the scope of the modal to keep it simple
		scope: $scope, 
	// The animation we want to use for the modal entrance
		animation: 'slide-in-up'
	});

	$scope.opendateModal = function() {
		$scope.datemodal.show();
	};
	$scope.closedateModal = function(model) {
		$scope.datemodal.hide();
		$scope.date = model;
	};

	$scope.save =  function(model){
		alert("Date :"+$scope.date+" Description: "+model.amount+ " Amount: "+model.amount);
		$scope.closeModal();
	};

	$scope.createSettings = function(settings){
		console.log('in createSettings function, input: ', settings);
		settingsFactory.createSettings(settings);
	};

	$scope.readSettings = function(id){
		console.log('in readSettings function, input: ', id);
		settingsFactory.readSettings(id);
	};

	$scope.updateSettings = function(settings){
		console.log('in updateSettings function, input: ', settings);
		settingsFactory.updateSettings(settings);
	};

	$scope.deleteSettings = function(id){
		console.log('in deleteSettings function, input: ', id);
		settingsFactory.deleteSettings(id);
	};	
}])
;


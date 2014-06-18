angular.module('xylidieet.controllers', [])

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
						$state.go('closed.settings');
						break;
					}
				};
			}
		});
	};
})

.controller('DiaryCtrl', function($scope, diaryFactory, productFactory, $ionicModal) {

	$scope.diaryInput = {};
	$scope.diary = {};
	
	$scope.deleteDiaryEntry = function(diaryEntry){
		console.log('..CONTROLLER:DIARYCTRL.. deleteDiaryEntry');
		diaryFactory.deleteDiaryEntry(diaryEntry);
	};

	$scope.readDiary = function(){
		console.log('..CONTROLLER:DIARYCTRL.. readDiary');
		$scope.diaryInput.diaryDate = new Date().toJSON().substring(0,10);
		diaryFactory.readDiary($scope.diaryInput, function (response) {
			console.log('..CONTROLLER:DIARYCTRL.. readDiary, response: ', response);
			if (response && response.actuals) {
				$scope.diary = response;
			}
		});
	};
	
	$scope.readDiary();
})

.controller('ProductsCtrl', function($scope, diaryFactory, productFactory, $ionicModal) {

	$scope.categories = {};
	$scope.product = {};
	$scope.productDetails = {};
	$scope.diaryInput = {};
	$scope.unitInput = {};

	$scope.init = function() {
		console.log('..CONTROLLER:PRODUCTSCTRL.. init');
		$scope.diaryInput.diaryDate = new Date().toJSON().substring(0,10);
		//$('#diaryDatePicker').val(new Date().toJSON().substring(0,10));
/*
		productFactory.readCategories(function (response) {
			console.log('..CONTROLLER:DIARYCTRL.. init, response: ', response);
			if (response && response.categories) {
				$scope.categories = response.categories;
			}
		});
*/		
	}

	$ionicModal.fromTemplateUrl('modal.html', function(modal) {
		$scope.diaryModal = modal;
	}, {
		scope: $scope,
		animation: 'slide-in-up'
	});	

	$scope.readProducts = function(product) {
		console.log('..CONTROLLER:PRODUCTSCTRL.. readProducts: ', product);
		productFactory.readProducts(product, function (response) {
			console.log('..CONTROLLER:PRODUCTSCTRL.. readProducts, response: ', response);
			if (response && response.products) {
				$scope.products = response.products;
			}
		});		
	}

	$scope.readProductDetails = function(product) {
		console.log('..CONTROLLER:PRODUCTSCTRL.. readProductDetails: ', product);
		productFactory.readProductDetails(product, function (response) {
			console.log('..CONTROLLER:PRODUCTSCTRL.. readProductDetails, response: ', response);
			if (response && response.products) {
				$scope.productDetails = response.products;
				$scope.unitInput = $scope.productDetails.Eenheden[0];
				$scope.diaryModal.show();
			}
		});		
	}

	$scope.closeDiaryModal = function() {
		$scope.diaryModal.hide();
	}

	$scope.createDiaryEntry = function(){
		console.log('..CONTROLLER:PRODUCTSCTRL.. createDiaryEntry: ');
		var diaries = {
			"diaryDate" : $scope.diaryInput.diaryDate,
			"productId" : $scope.productDetails._id,
			"totalQuantity" : $scope.unitInput.hoeveelheid * $scope.diaryInput.quantity
		};
		diaryFactory.createDiaryEntry(diaries, function (response) {
			console.log('..CONTROLLER:PRODUCTSCTRL.. createDiaryEntry, response: ', response);
			if (response) {
				console.log(response);
			}
		});	
	};
	
	$scope.init();
})

.controller('WeightCtrl', function($scope) {

})

//.controller('SettingsCtrl', ['$scope', '$ionicModal', function($scope, $ionicModal, settingsFactory) {
.controller('SettingsCtrl', function($scope, $ionicModal, settingsFactory) {

	$scope.createSettings = function(settings){
		console.log('in createSettings function, input: ', settings);
		settingsFactory.createSettings(settings, function(response) {
			console.log('..CONTROLLER:SETTINGSCTRL.. createSettings, response: ', response);
			if(response && response.messages && response.messages[0]) {
				var message = response.messages[0];
				switch(message.messageType) {
					case "ERROR" : {
						$scope.serviceError = true;
						$scope.messageText = message.messageText;
						break;
					}
					case "SUCCESS" : {
						$state.go('closed.goals');
						break;
					}
				};
			}
		});

	};

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
//}])
})
;


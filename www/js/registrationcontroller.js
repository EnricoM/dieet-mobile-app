angular.module('xylidieet.registrationcontroller', [])

.controller('RegisterCtrl', ['$scope', '$cookies', '$state', 'registrationFactory', '$log', function($scope, $cookies, $state, registrationFactory, $log) {

	$scope.createUser = function(user){
		$log.debug('..CONTROLLER:REGISTERCTRL.. createUser, input: ', user);
		$scope.serviceError = false;
		registrationFactory.createUser(user, $cookies, function(response) {
			$log.debug('..CONTROLLER:REGISTERCTRL.. createUser, response: ', response);
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
	
}])
;


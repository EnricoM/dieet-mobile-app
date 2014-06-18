angular.module('xylidieet.sessioncontroller', [])

.controller('SessionCtrl', ['$scope', '$cookies', '$state', 'sessionFactory', '$log', function($scope, $cookies, $state, sessionFactory, $log) {

	$scope.createSession = function(user){
		$log.debug('..CONTROLLER:SESSIONCTRL.. createSession, input: ', user);
		$scope.serviceError = false;
		sessionFactory.createSession(user, $cookies, function(response) {
			$log.debug('..CONTROLLER:SESSIONCTRL.. createSession, response: ', response);
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
						$state.go('closed.diary');
						break;
					}
				};
			}
		});
	};
	
	$scope.deleteSession = function(){
		$log.debug('..CONTROLLER:MENUCTRL.. deleteSession');
		sessionFactory.deleteSession(function(response) {
			$log.debug('..CONTROLLER:MENUCTRL.. deleteSession, response: ', response);
			$state.go('open.index');
		});
	};

}]);


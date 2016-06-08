namespace app.Controllers {
    export class HomeController {
        public status;

        constructor(private UserService: app.Services.UserService, private $location: ng.ILocationService, private $state: ng.ui.IStateService) {
            this.status = UserService.status;
            if ($location.search().code) {
                UserService.setToken($location.search().code);
                UserService.setUser();
                $location.search('');
                if ($location.hash()) $location.hash('');
            }
        }
    }
    angular.module('app').controller('HomeController', HomeController);
}

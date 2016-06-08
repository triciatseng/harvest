namespace app.Services{
    export class UserService {
        public status = { _id: null, name: null, email: null };

        public logout() {
            this.$window.localStorage.removeItem('token');
            this.clearUser();
        }

        public getToken() {
            return this.$window.localStorage.getItem('token');
        }

        public setToken(token: string) {
            return this.$window.localStorage.setItem('token', token);
        }

        public setUser() {
            let token = this.getToken();
            let u = JSON.parse(this.urlBase64Decode(this.getToken().split('.')[1]));
            this.status._id = u._id;
            this.status.name = u.name;
            this.status.email = u.email;
        }

        public clearUser() {
            this.status._id = null;
            this.status.name = null;
            this.status.email = null;
        }
        public urlBase64Decode(str) {
            var output = str.replace(/-/g, '+').replace(/_/g, '/');
            switch (output.length % 4) {
                case 0: { break; }
                case 2: { output += '=='; break; }
                case 3: { output += '='; break; }
                default: {
                    throw 'Illegal base64url string!';
                }
            }
            return decodeURIComponent(encodeURIComponent(this.$window.atob(output))); //polifyll https://github.com/davidchambers/Base64.js
        }

        constructor(private $http: ng.IHttpService, private $q: ng.IQService, private $window: ng.IWindowService) {
            if (this.getToken()) this.setUser();
        }
    }
    angular.module('app').service('UserService', UserService);
}

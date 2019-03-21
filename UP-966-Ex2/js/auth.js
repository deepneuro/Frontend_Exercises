  authorization:
    {
        /**
         * Login service used to send the username and password to obtain a authentication token.
         *
         * @attribute authorization.login
         * @type {ServiceMeta}
         */
        login: new ServiceMeta(UNO.SERVER_API, "api/auth/login", ServiceType.POST, ServiceBodyType.FORM, ServiceURLType.NONE),

        /**
         * Forgot password service is used to recover the user password.
         *
         * User password is recovered using a email.
         *
         * @attribute authorization.forgotPassword
         * @type {ServiceMeta}
         */
        forgotPassword: new ServiceMeta(UNO.SERVER_API, "api/auth/forgot-password", ServiceType.POST, ServiceBodyType.JSON, ServiceURLType.NONE),

        /**
         * The token validation service is used to check if the a JWT token is valid.
         *
         * It receives the token in the request header (bearer).
         *
         * Responds status code 200 if the token is valid, 401 if the token is invalid or 404 if the user is not registered.
         *
         * @attribute authorization.tokenValidation
         * @type {ServiceMeta}
         */
        tokenValidation: new ServiceMeta(UNO.SERVER_API, "api/token-validation", ServiceType.GET, ServiceBodyType.NONE, ServiceURLType.NONE)
    }

api/auth/login

Form["email"]
Form["password"]


method = { login: new ServiceMeta(UNO.SERVER_API, "http://urano.eqs.local:8081/api/auth/login", ServiceType.POST, ServiceBodyType.FORM, ServiceURLType.NONE) }

data: {email: username, password: pwd }
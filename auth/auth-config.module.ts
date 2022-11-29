import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';


@NgModule({
    imports: [AuthModule.forRoot({
        config: {
            authority: ' https://dev-nmq3w37a.us.auth0.com',
            redirectUrl: window.location.origin,
            clientId: 'XNdR6iVQVdT0txtxDFAWGTjpJZveJJzX',
            scope: 'openid profile offline_access email',
            responseType: 'code',
            silentRenew: true,
            useRefreshToken: true,
            secureRoutes:['http://localhost:2022/'],
            customParamsAuthRequest:{
                audience:'http://localhost:2022'

            }
        }
      })],
      providers:[],
    exports: [AuthModule],
})
export class AuthConfigModule {}

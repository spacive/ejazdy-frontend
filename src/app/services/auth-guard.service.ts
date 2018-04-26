import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import {CognitoService} from './cognito.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private cognito: CognitoService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.cognito.isAuthenticatedAs(route.data.allowedRole).do(is => {
      if (!is) {
        this.router.navigate(['/login']);
      }
    });
  }
}

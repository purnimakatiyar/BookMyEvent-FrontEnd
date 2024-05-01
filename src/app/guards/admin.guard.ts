import { inject } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';


export const adminGuard = ()=> {

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

    if (authService.isAdmin()) {
      return true; 
    } else {
      router.navigate(['/login']); 
      return false; 
    }
  
}

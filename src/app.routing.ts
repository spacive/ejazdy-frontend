import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {MainComponent} from './app/components/main/main.component';
import {PageNotFoundComponent} from './app/components/page-not-found/page-not-found.component';
import {LoginComponent} from './app/components/login/login.component';
import {HomeComponent} from './app/components/home/home.component';

import {AuthGuardService} from './app/services/auth-guard.service';
import {InstructorAdminComponent} from './app/components/instructor-admin/instructor-admin.component';
import {RoleGuardService} from './app/services/role-guard.service';
import {StudentAdminComponent} from './app/components/student-admin/student-admin.component';
import {CalendarInstructorComponent} from './app/components/calendar-instructor/calendar-instructor.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',
    component: MainComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'instructors',
        component: InstructorAdminComponent,
        canActivate: [RoleGuardService],
        data: {
          allowedGroups: ['admin']
        }
      },
      {
        path: 'students',
        component: StudentAdminComponent,
        canActivate: [RoleGuardService],
        data: {
          allowedGroups: ['admin']
        }
      },
      {
        path: 'calendar/instructor',
        component: CalendarInstructorComponent,
        canActivate: [RoleGuardService],
        data: {
          allowedGroups: ['admin', 'instructor']
        }
      }
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class RoutingModule {
}

//     ___           ___           ___           ___     
//     /  /\         /  /\         /  /\         /  /\    
//    /  /::\       /  /:/_       /  /:/        /  /:/    
//   /  /:/\:\     /  /:/ /\     /  /:/        /  /:/     
//  /  /:/  \:\   /  /:/ /::\   /  /:/  ___   /  /:/  ___ 
// /__/:/ \__\:\ /__/:/ /:/\:\ /__/:/  /  /\ /__/:/  /  /\
// \  \:\ /  /:/ \  \:\/:/~/:/ \  \:\ /  /:/ \  \:\ /  /:/
//  \  \:\  /:/   \  \::/ /:/   \  \:\  /:/   \  \:\  /:/ 
//   \  \:\/:/     \__\/ /:/     \  \:\/:/     \  \:\/:/  
//    \  \::/        /__/:/       \  \::/       \  \::/   
//     \__\/         \__\/         \__\/         \__\/    
// _   _       _     _            
// | \ | | ___ | | __| | ___ _ __  
// |  \| |/ _ \| |/ _` |/ _ \ '_ \ 
// | |\  | (_) | | (_| |  __/ | | |
// |_| \_|\___/|_|\__,_|\___|_| |_|
//                                
// ____                 
// | __ )  ___  _ __ ___ 
// |  _ \ / _ \| '__/ __|
// | |_) | (_) | |  \__ \
// |____/ \___/|_|  |___/
                      
// Library Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DragDropModule} from '@angular/cdk/drag-drop';

// Component Imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';

// import { DialogOverviewExampleDialog } from './dashboard/dashboard.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './api.service';

// Material Imports
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatSelectModule} from '@angular/material/select'; 
import {MatListModule} from '@angular/material/list'; 
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';  
import {MatDialogModule} from '@angular/material/dialog'; 
import {MatMenuModule} from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {MatIconModule} from '@angular/material/icon'; 

import {ClipboardModule} from '@angular/cdk/clipboard'; 

// Routes to take. Disallows Path Traversal.
const appRoutes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: '**', redirectTo: 'DashboardComponent'}
]

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),

    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    // All needed Material modules
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatListModule,
    MatMenuModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatIconModule,
    // To allow the drag and drop
    DragDropModule,
    ClipboardModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
import { Component, OnInit, ElementRef } from '@angular/core';

import { ApiService } from '../api.service';
import { UtilityService } from '../utility.service';
import { AuthService } from '../auth/auth.service';
// Library used for interacting with the page
// import {MatDialog} from '@angular/material/dialog';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

// To allow dialog windows within the current window
import { TemplateRef, ViewChild } from '@angular/core';
// Imports of different components to be shown within a dialog within the page

import { HttpClient} from '@angular/common/http';
// import { request } from 'https';

import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('CallAbout') CallAbout: TemplateRef<any>;
  
  oracle: string = '';

  constructor(
    private api: ApiService,
    public authService: AuthService,
    private dialog: MatDialog, 
    private _snackBar: MatSnackBar,
    private el: ElementRef,
    ) { }

  ngOnInit(){
    this.RequestOracle()
  }

  public async Test(){
    // console.log(temp)
  }

//   ______ _    _ _   _  _____ _______ _____ ____  _   _  _____ 
//  |  ____| |  | | \ | |/ ____|__   __|_   _/ __ \| \ | |/ ____|
//  | |__  | |  | |  \| | |       | |    | || |  | |  \| | (___  
//  |  __| | |  | | . ` | |       | |    | || |  | | . ` |\___ \ 
//  | |    | |__| | |\  | |____   | |   _| || |__| | |\  |____) |
//  |_|     \____/|_| \_|\_____|  |_|  |_____\____/|_| \_|_____/                                                   

public openSnackbar(input){
  this._snackBar.open(input, 'Close', {
    duration: 5000,
    panelClass: ['primary'], //FIXME: doesnt work
  });
}

handleErrorMessage(message) { //FIXME: needs renaming of error and message
  console.log(message)
  let output = ''
  
  if(message.statusText == 'OK'){
    output = 'Operation succesful.' 
  }
  else{
    output = 'Something went wrong.'
  }

  output = String(message.status) + ': ' + output + ' ' + message.statusText;

  this.openSnackbar(output); //FIXME: Spaghetti.
} 

public HandleColorChange() {
  (this.el.nativeElement as HTMLElement).style.setProperty('--main-color', 'white');
}

public HandleWallpaperChange() {
  (this.el.nativeElement as HTMLElement).style.setProperty('--wallpaper', 'url("../../img/wall.jpg") no-repeat');
}

//   _____  ______ ____  _    _ ______  _____ _______ _____ 
//  |  __ \|  ____/ __ \| |  | |  ____|/ ____|__   __/ ____|
//  | |__) | |__ | |  | | |  | | |__  | (___    | | | (___  
//  |  _  /|  __|| |  | | |  | |  __|  \___ \   | |  \___ \ 
//  | | \ \| |___| |__| | |__| | |____ ____) |  | |  ____) |
//  |_|  \_\______\___\_\\____/|______|_____/   |_| |_____/ 
    
  public RequestOracle(){
    this.api.GetOracle().subscribe(
      data => {
        this.oracle = data;
        this.HandleColorChange()
      }
    ); 
  }  

//   _____ _____          _      ____   _____  _____ 
//  |  __ \_   _|   /\   | |    / __ \ / ____|/ ____|
//  | |  | || |    /  \  | |   | |  | | |  __| (___  
//  | |  | || |   / /\ \ | |   | |  | | | |_ |\___ \ 
//  | |__| || |_ / ____ \| |___| |__| | |__| |____) |
//  |_____/_____/_/    \_\______\____/ \_____|_____/ 
                                           
  // Opens dialog for the about information
  public OpenAbout() {
    const dialogRef = this.dialog.open(ShowAboutDialog);
  }

}


//   _____ _                _____ _____ ______  _____ 
//  / ____| |        /\    / ____/ ____|  ____|/ ____|
// | |    | |       /  \  | (___| (___ | |__  | (___  
// | |    | |      / /\ \  \___ \\___ \|  __|  \___ \ 
// | |____| |____ / ____ \ ____) |___) | |____ ____) |
//  \_____|______/_/    \_\_____/_____/|______|_____/ 
                                                                                            
// Simple class to open the about information written in said html file.
@Component({
  selector: 'about-dialog',
  templateUrl: './dialogs/about-dialog.html',
})
export class ShowAboutDialog {}


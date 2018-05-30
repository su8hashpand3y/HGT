import { NgModule, ViewContainerRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { SmallVideoComponent } from './components/smallVideo/smallVideo.component';
import { BigVideoComponent } from './components/bigVideo/bigVideo.component';
import { SignUpComponent } from './components/signUp/signUp';
import { SigninComponent } from './components/signin/signin';
import { UploadComponent } from './components/upload/Upload';
import { ToastService } from './ToastService';
import { InternetService } from './InternetService';
import { AuthService } from './AuthService';
import { UserDetailComponent } from './components/userDetail/userDetail'


//import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { MaterialDesignModule } from './materialImports';
import { HttpClientModule } from '@angular/common/http';
import { AvatarPicker } from './components/avatarPicker/avatarPicker';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material';
import { StripePaymentComponent } from './components/stripePayment/stripePayment';


@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        SmallVideoComponent,
        SignUpComponent,
        SigninComponent,
        UploadComponent,
        BigVideoComponent,
        UserDetailComponent,
        ImageCropperComponent,
        AvatarPicker,
        StripePaymentComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule ,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'signup', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'upload', component: UploadComponent },
            { path: 'signup', component: SignUpComponent },
            { path: 'signin', component: SigninComponent },
            { path: 'video/:id', component: BigVideoComponent },
            { path: 'user/:id', component: UserDetailComponent },
            { path: 'avatar', component: AvatarPicker },
            { path: 'pay', component: StripePaymentComponent },
            { path: '**', redirectTo: 'home' }
        ]),
        BrowserAnimationsModule,
        MaterialDesignModule,
        MatSnackBarModule,
    ],
    providers: [ToastService, InternetService, AuthService, { provide: MatDialogRef, useValue: {} },]
})
export class AppModuleShared {

}




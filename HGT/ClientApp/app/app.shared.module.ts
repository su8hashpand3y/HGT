import { NgModule, ViewContainerRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { SmallVideoComponent } from './components/smallVideo/smallVideo.component';
import { SignUpComponent } from './components/signUp/signUp';
import { SigninComponent } from './components/signin/signin';
import { UploadComponent } from './components/upload/Upload';
import { ToastService } from './ToastService';

import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        SmallVideoComponent,
        SignUpComponent,
        SigninComponent,
        UploadComponent
        
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'signup', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'upload', component: UploadComponent },
            { path: 'signup', component: SignUpComponent },
            { path: 'signin', component: SigninComponent },
            { path: '**', redirectTo: 'home' }
        ]),
        BrowserAnimationsModule,
        ToastModule.forRoot()
    ],
    providers: [ToastService]
})
export class AppModuleShared {

}




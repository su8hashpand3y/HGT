import { Component, Inject } from "@angular/core";
import { CropperSettings } from "ng2-img-cropper";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
    selector: 'AvatarPicker',
    template: ` 
              <h3 mat-dialog-title>Pick an Image</h3>
               <mat-dialog-content>
                    <img-cropper [image]="data" [settings]="cropperSettings"></img-cropper><br>
                    <img *ngIf="data.image" [src]="data.image" [width]="cropperSettings.croppedWidth" [height]="cropperSettings.croppedHeight">
                </mat-dialog-content>
                <mat-dialog-actions>
                    <button type="button" mat-dialog-close class="btn btn-secondary" data-dismiss="modal"  (click)="onNoClick()>Close</button>
                    <button type="button" class="btn btn-primary" (click)="onDoneClick()">Done</button>
                </mat-dialog-actions>`,
})
export class AvatarPicker {
    data: any;
    cropperSettings: CropperSettings;

    constructor(public dialogRef: MatDialogRef<AvatarPicker>,
        @Inject(MAT_DIALOG_DATA) public dataSent: any) {

        this.cropperSettings = new CropperSettings();
        this.cropperSettings.width = 100;
        this.cropperSettings.height = 100;
        this.cropperSettings.croppedWidth = 100;
        this.cropperSettings.croppedHeight = 100;
        this.cropperSettings.canvasWidth = 400;
        this.cropperSettings.canvasHeight = 300;

        this.data = {};
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onDoneClick(): void {
        this.dialogRef.close(this.data.image);
    }

}
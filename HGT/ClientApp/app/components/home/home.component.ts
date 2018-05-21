import { Component } from '@angular/core';
import { InternetService } from '../../InternetService';
import { videoData } from '../../videoData';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    video1: string = "Media/SampleVideo_1280x720_1mb.mp4";
    videos: videoData[] = [];
    constructor(private internet: InternetService) {}
    ngOnInit() {
        this.internet.get("/video").subscribe((x: any) => {
            this.videos.push(...x);
            console.log(this.videos);
        });
    }
}

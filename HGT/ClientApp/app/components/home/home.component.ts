import { Component } from '@angular/core';
import { InternetService } from '../../InternetService';
import { videoData } from '../../videoData';
import { ChangeEvent } from 'angular2-virtual-scroll';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    video1: string = "Media/SampleVideo_1280x720_1mb.mp4";
    videos: videoData[] = [];
    constructor(private internet: InternetService) {
    }
    ngOnInit() {
        this.internet.get("/video").subscribe((x: any) => {
            this.videos.push(...x);
            console.log(this.videos);
        });
    }




    buffer: videoData[] = [];
    loading: boolean;

    onListChange(event: ChangeEvent) {
        if (event.end !== this.buffer.length) return;
        this.loading = true;
        this.fetchNextChunk(this.buffer.length, 10).then((chunk:any) => {
            this.buffer = this.buffer.concat(chunk);
            this.loading = false;
        }, () => this.loading = false);
    }

    fetchNextChunk(skip: number, limit: number): Promise<videoData[]> {
        return new Promise((resolve, reject) => {
            ....
        });
}
}

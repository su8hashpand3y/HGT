import { Component, Input} from '@angular/core';
import { videoData } from '../../videoData';

@Component({
    selector: 'smallVideo',
    templateUrl: './smallVideo.component.html',
    styleUrls: ['./smallVideo.component.css']
})
export class SmallVideoComponent {
    video1: string = "Media/SampleVideo_1280x720_1mb.mp4";

    poster: string = "";
    videoUrl: string = "";
    videoFormat: string = "";

    @Input()
    video: videoData = new videoData();

    ngOnChanges() {
        this.poster = this.video.poster;
        this.videoFormat = `video/${this.video.format}`;
        this.videoUrl = this.video.fileName;
        console.log(`The vide url is ${this.videoUrl}`);
    }
}

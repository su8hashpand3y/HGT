import { Component, Input} from '@angular/core';

@Component({
    selector: 'smallVideo',
    templateUrl: './smallVideo.component.html',
    styleUrls: ['./smallVideo.component.css']
})
export class SmallVideoComponent {
    video1: string = "Media/SampleVideo_1280x720_1mb.mp4";
    poster: string = "Media/Got_Talent_logo.jpg";
    @Input()
    videoUrl: string;
}

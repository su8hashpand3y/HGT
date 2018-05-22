import { Component, Input} from '@angular/core';
import { videoData } from '../../videoData';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'bigVideo',
    templateUrl: './bigVideo.component.html',
    styleUrls: ['./bigVideo.component.css']
})
export class BigVideoComponent {
    id: number;
    private sub: any;
    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number

            // In a real app: dispatch action to load the details here.
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }




    poster: string;
    videoUrl: string;
    videoFormat: string;

    @Input()
    video: videoData;

    ngOnChanges() {
        this.poster = this.video.poster;
        this.videoFormat = `video/${this.video.format}`;
        this.videoUrl = `/Media/${this.video.folderName}/${this.video.fileName}${this.video.format}`;
        console.log(`The vide url is ${this.videoUrl}`);
    }
}

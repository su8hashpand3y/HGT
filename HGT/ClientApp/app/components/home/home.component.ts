import { Component } from '@angular/core';
import { InternetService } from '../../InternetService';
import { videoData } from '../../videoData';
import { ChangeEvent } from 'angular2-virtual-scroll';
import { HostListener } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    video1: string = "Media/SampleVideo_1280x720_1mb.mp4";
    videos: videoData[] = [];

    modalScrollDistance: Number = 2;
    modalScrollThrottle: Number = 50;

    constructor(private internet: InternetService) {
    }
    ngOnInit() {
        this.internet.get("/video").subscribe((x: any) => {
            this.videos = x ;
            //this.videos.push(...x);
            console.log(this.videos);
        });
    }


    onScroll() {
        console.log("scrolled!!");
        this.fetchNextChunk(this.videos.length, 10);
    }


    ////onScroll(event:any) {
    ////    console.log('scroll event', event);
    ////    let heightPercentage = document.body.scrollHeight / (document.body.scrollTop +
    ////        window.innerHeight);

    ////    console.log(`document.body.scrollHeight is ${document.body.scrollHeight}`);
    ////    console.log(`document.body.scrollTop is ${document.body.scrollTop}`);
    ////    console.log(`window.innerHeight is ${window.innerHeight}`);
        
    ////    if (heightPercentage >.9)
    ////        {
    ////        console.log(heightPercentage);
    ////        console.log("Bottom");
    ////    }
    ////}

    //@HostListener('scroll', ['$event']) private onScroll($event: Event): void {
    //    console.log($event.srcElement!.scrollLeft, $event.srcElement!.scrollTop);
    //};


    loading: boolean = false;

    onListChange(event: ChangeEvent) {
        if (event.end !== this.videos.length) return;
        this.loading = true;
        this.fetchNextChunk(this.videos.length, 10);
    }

    fetchNextChunk(skip: number, limit: number){
        this.internet.get(`/video?skip=${skip}`).subscribe((x: any) => {
            this.videos.push(...x);
            console.log(this.videos);
            this.videos = this.videos.concat(x);
            this.loading = false;
        });
}
}

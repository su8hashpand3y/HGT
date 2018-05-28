import { Component, Input } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { ToastService } from '../../ToastService';
import { InternetService } from '../../InternetService';


import {ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';
import { MatDialog, MatDialogRef} from '@angular/material';
import { AvatarPicker } from '../avatarPicker/avatarPicker';


@Component({
    selector: 'signUp',
    templateUrl: './signUp.html',
    styleUrls: ['./signUp.css'],
})
export class SignUpComponent {
    firstName: string = "";
    lastName: string = "";
    email: string = "";
    capthaName: string = "";
    capthaAnswer: string = "";
    password: string = "";
    district: string = "";
    town: string = "";
    districts: string[] = ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul and Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"];
    selectedDistrict: string = ""
    gender: string = ""


    encodedSource : string

    constructor(private toast: ToastService, private internet: InternetService, private dialog: MatDialog) {
        this.selectedDistrict = "";
        this.encodedSource = 'data:image/png;base64,/9j/4AAQSAQEBMQDw8PEBAPDw8PDw8NDw8NFREWFhcVFRUYHSggGBolGxUVITEhJSkrLjAuFx8zODMtNygtLisBCgoKDg0OGhAQGy0lHx0tLS8rLy0rKy0tLS0tLS0tLy0tLS0rLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSstLS0tLf/AABEIAOQA3QMBEQACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAAAwECBAUGBwj/xAA9EAACAQICBgcGBAUEAwAAAAAAAQIDEQRRBQYSITFBEyJhcZGSoQdSYoGx0RYyQuEjM3Jz8BRTosFDk8L/xAAbAQEAAwEBAQEAAAAAAAAAAAAAAQIDBAUGB//EADMRAQACAQIDBwIFBAMBAQAAAAABAgMEERJRkQUTITFBUmEUFTJCcaHhBiKB8DOxwdFi/9oADAMBAAIRAxEAPwD3EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACypVUeIGo0hp+nTTu1u7RuiZ282ilrnDaVtqSclG8V1d7Svd7ufIz72u+zGdTj323dfgq+3G5o3ZAAAAAAAAAAAAAAAAAAAAAAAAAAAY2MxapxbbA4nTOnZT2thqMFe85boruzZhkzRXwjzcWo1tce8R5/s4HSunI7T2b1JL9dTfZ/DHgjhyZt/N42TU3yz/v/AE1MMdOpUp7Um71Ka/5orjvM2iPlGGu+Wu/N9BaDX8NdyPXfTtiAAAAAAAAAAAAAAAAAAAAAAAAAIsRVUU2wOJ01pDpHNydqUPzdvYjDLk2/th52u1UY4msT+v8A8eead0nKq7LqwjujFbkkefkt6Q+c7yclt5/w5yqzmdVWz1TwjrYyhHlGTqS/pit3rsnXpK75N+Tt0VOLLE8n0Jo+nswS7D1XusoAAAAAAAAAAAAAAAAAAAAAAAAAc9rPjtiNlxe4i07RupkvFKTafR5vp7G3tSi+rHfL4pvicVuc+r47V5pyX26/q5nEs5boxtdUiYbOqsvRvZVoR9bEyX8yyh/aXP5u77rHq6XHw03n1e9ocXBTefOXrEFZWOp2rgAAAAAAAAAAAAAAAAAAAAAAAC2bsmB5zrjpC1RLLaaXd+7Rll8tnk9rZ+7xxXn/AOOFrTvdvizms+YhhVzC0OijL1e0FLGVlCz6KLXSy/8AhPN8+wvhwcc7z5Q9XQ6actuKfKHueh8BGjCMUkkkkkuSSPSfQNiAAAAAAAAAAAAAAAAAAKNgQ1cXGPFgYNTTdNc0BYtPU8wJ6Wl6cuaAy6eKjLgwGIl1XbIDxnXbFNYpxtwivVsxyeb57teItlrE+kOf25PsWfAxmIeTw1httDat1MRJOV4U+cnuk18KfDvJrhm3n5PV0nZ18n92Twry9ZenaGwtDCU4xjZKK/zvZ1RERG0PoKUikRWvlDMq6x0o8ZRXe0id0zMR5o4a0UXwnF90kyN4RFonylmUdNU5c0Ssz6VeMuDAlAAAAAAAAAAAAABZUqKKuwOe0npvfsU7yk8t5W1orG8q2tFfNoNIYvZW1XqW+CLuznnLa34XHn1cY43mdnO4rT64U4bs5NsbTPnLxsvatp/C18tLVeTUe5WJ2cs6/P7lY6WrL9b9Cd5TXtLU1/Oz8JrLWhxtL/i/sWi8urH21lr+OIn9m9wmuV1ae1HvV14r9i8ZIeji7Y09/C28fqwsbDDYmbqy3yaSvtSW5diZE8E+Mtr49JqJ47TE/wCf5X4fB0Yb4U1dc7L6sjipVev02LxrEf4SYjSWwvzRh2LrMpOaZ/DDDN2lSvk0OO0xe9tqXbJtLwRnNrT5y8rL2ne3hEtPWxknku5Izcc5b285Ys6jfHeRvKNl9DG1Kf5Jyh3SdvDgTGS0eTox6jLj/DaXSaG13qUmlW60ffit674/bwNq6iPzPU0/acz4ZY/zD0zQmnadeEZRkpJrc07pnTExMbw9itotG8N0nclKoAAAAAAAAABbOVlcDmNMaRlUl0VLi+fJLNlL3isbqXts0elcdDCQ2Y9arLjLnc5I3vO8vM1mrjDHOXF4mtOrJyk22/Q3iIh83ky3y23lYqDyHgrwW5K9Ax4Hd2OheQ8EcFuSqpPIeCs0tyXqi8iPBHBbkkhSkuG75jeExjv6Jev7z8Svg14cvNj1KL57yd4UnHZi1KY2R4x5secTOYaRLGrTSMbTENqxMsCtiHyOeby6a44Q9IyIlpww3GgNN1MJUUoNuDd50+Uu1ZSOnDlmk/DfT6m2Gfh7jqzpmOJpRnF3TX+J5M9KJiY3h7tL1vWLV8pb0lcAAAAAAAAAaXWDSHRwaXEiZ2jdEzERvLn51VhqMqs/5k1fuyRw2mb2cWbNGOk3s4itUdabnLfd7u42/DGz5m0znvx2T06JWZb1xwmjQI3a8CvQDdPdnQDdHdq9AN0d2uVAbo7pd0RG6e7UdMI4EFSBKs1a3F1Et3Mt5OPJt5Q1ladzK9itWDXZzWdNGFUMpdFVqQWlscDhZSlGMYuVSbtGK4nRjrMztDKKWy24KPZNQtAvC025NudRqU+Oyna1or/vmeljpwxs+h0unjBThh2Zd0gAAAAAAAFlWVk2BzUaCxFaUp3cKbVkna8zz9bqJpMUr6+M/oTji8eKmltB0q9lN1LLlGdkeBm7Wy478NNujPN2dizx/fv1YVPVLDL/AHf/AGfsI7X1E8ujKvY+mr5b9U8dWMOv9zzl47Tzzy6Lx2Zgjn1XrVuh8fnLfcc3x0T9uw/PVd+HKHx+cn7hm+Oh9vw/PU/DlD4/OPuGb46H2/D89Vfw5Q+Pzj7hm+Oh9vw/PVX8O0Pj84+4ZvjofbsPz1Pw5Q+PzkfcM3x0Pt2H56rJauYf4/OUt2nmjl0PtuH56savqxh2v/Ku6p+xyZO3c9fLboiex8FvDx6tZV1Pw2dXzr7HNP8AUOqmfKvT+Sv9P6X56/wxKuqGGzq+dfYffdTPpHT+W1f6e0vO3X+GHW1Qw+dXzL7Fo7X1E8ujaP6f0vOev8MOep+Hzq+ZfYt90zfC/wBi03Oev8J8PqZhlGVSbq7MeHWV2+zcI7T1NrxTHETM/DLL2Lpojznr/DptTtVqdJursvalzk9pxjyjc+102K1KRx/i9XLi02PDv3f7u6pwUVZHQ2XgAAAAAAAAMHS9bZpt9gGBomns0k3xleT+bPmdXm3ve/8Ajo2rHgdJds+UnLxWmXTw+C9M3pdWYXpnRW6uyqZrFxdctFkK3LcQXHEjYuRxJ2UcjDJniqYhDOoedl1E2aRVjVaxyzaZbVoxKkxEN61Y1SZrWGsQxajNYhZDa5dDNo0OlqwpL8lKzl21H9l9T6H+nNHFptqbfpH/AK8vWZfHhdphqKjFJH1zhTAAAAAAAAAAGk1ln1LZtLxK3tw1m3KCEkurT7o/9Hw+qyTGn35uqsb2a9SPnInZ2bJoVDeuRnNU0ZG1cjOYXpm0ZEbK3NIyI2VuW7w2LjvEbIqldI5cur28KtK45ljzxBw2va0+LaMaCdYjZpFEM6haKtIqgnUNIqvDGnUNYhZC5l9jddh2nOPfci/4ZRafBvNVKW1tVHxnJy8T9D7Owxh01KRyj9/F4WW3FeZdQdrMAAAAAAAAAAOa1squMdpcVvXPfYw1P/Df9Ja4KxbJWs+stXpXTFWNONnG749VM+T1OClscVl7mn0eO1539Glena+cfIjzo0OHlPV3fRYvnqLT1fOPkRaNBh+eqPosX+yvWsNfOPkiXjR4vnqj6HDynquWsdfOHkRaNJi/2Ufb8PKeqv4kr5w8iJ+lxf7KPt+HlPUestf3oeRD6bGfbsPKerEr63V+ClDyIpbSY7c+rWvZuCPOJ6sd6zYjOHkiU+gw8p6t47Pw8p6rHrNiM4eSJP0GHlPVP2/DynqsestfOHkiW+gxfPVP0OH56opay184eSJaNDi5T1R9Hi+eqGeslfOHkRpGhxcv3R9Hi+erHnrHX96HkiaRocXKeqfo8Xz1RPWSvnDyRLfQ4uU9UfR4fnqvpax1+O1Dg/0RyItocXL91baTDt69Xr+q0bUo9y+h9nEbRs+KbwkAAAAAAAAAADltc/yMw1X/AA2/R0aX/mp+sOe0xvpw7j5nP+F9Jpfxy0jOSHctLIAKXCVsp2I3W2a/E4tvci9aesrRHJjqRfZpWo6g2XWuoTsI5VC0VVmVjqFoqzmUU6haKq7oJzNIg4ke2W2N0kJfQrMKzL3PUvEbdCm/ehF+KR9JSd6xL4e9eG015S6QsoAAAAAAAAAAHOa3U703z3NeKsZ5o4sdo+JaYbcOSs/MOWx72qMH2I+VyeNH1ODwyTDTyOaHasZIoBbOViFoa3FYm+5cDSlfWVoY6RdrWqjZK6yUiYhKKUy8QrKKUy0QztKN1C2zKZRymWiFd0UpF4gW7ROwkpyKzA9U9l+k70ujb305ONvh4p+D9Gezo8nFij4fKdpYe7zzPpbxekJnU4FQAAAAAAAAADU6w0r02B53OtLonG/5G48FwTsfO5MNY3rt5Ps8EVtNb84hqJV5Z+iOXuq8nfwVRvESz9ET3deSOCq2WJln6Iju68k8FWrxukpvcn6ItXDXz2W4KsL/AFU8/RGnd15Na4oWyxs/e9ET3VeTSKVRvGz970RaMVeS3BXkjnjanveiLRipyRNKoZ42fveiLxipyZ2rVE8ZP3vRF+6ryYzWqx4uefoie7ryUmtVHi55+iJ7uvJXgha8TLP0RPBVHDB/qJZ+iHBU4YXRxU8/RETjqtFYb/VDWCWGxMJzl/Dl1KnBWXKXyfo2bae0Y7bekvP7U0XfYd6R/dX/AHZ9CaLxiqQTTvuPTfHs4AAAAAAAAAAxtIU9qDXYB5li6exVqw5S6y+j+l/mePq6bZZ+X1HZuTj09f8A8zs0VWNm0cD248YQsga7H4m3VRMRutDW2LtK1WSZaGsI2WWhayUoploUmUEzSGUyjZaGUysJUkCFAhUCqC0JIMrLWHovs91xdFxw9Z9XcqU3wtyg+3I7NPn/AC2fM9q9mTWZzYo8PWP/AF7DgtIRqJNNHY+fZqYAAAAAAAAC2aumgPPdbsN0dSNRZ2fc/wB7epw66m9YtHo9jsfLtknHP5o/eHLY6HWvmeRaPF9RjnwavG19ldpRpDTve7sv5LVjdbImG0IpFoWhY0WWUYRKOSLQztKCaNIZTKGSLwzlbYlVQABWwQoEr0yGkSnovkZ2haXZas60V6DUW3Vpr3pWnGKylzXf4mtNbanhbxeLq+yMeWeLH/bP7PadBY3pqUJ2a2oqVpcVdX3nqxO8bvlbV4bTHJsyVQAAAAAAADQaz6P6WnLdyZFqxaNpXx5Jx3i9fOHnmMSVKTkkpQun3o450+Py4YfX4s/HSL1nwlxOJrucmyY02KPywz+oyT6oXJ5j6fF7Voz5fdKKc3mT9Pi9q31GX3SilN5sfT4+SfqcvulHtvNjuMfJP1OX3SObzY7jHyPqMvulZKTzZPcY+Sk6jL7kUpPNk9zj5Kznyc0cm82T3VOSk5snNY28x3VOR32Tmtu82O6pyO+vzVTebHdU5HfZOa67zHdU5I77JzWSk82O6pyIzZOaPpHmyO6pyXjPk5sihN5sdzTknv8AJ7nVasYN1qkIb30kt/8AbW+X2+ZEafHM/hc+p1eTHim3F+j6A0Rh9iml2HU+YZ4AAAAAAAACOvT2otAeT694OVCopq/RVHsz3blK25v6eBnevq9fs3UeE4p/WHC4mlsyeT4FYelMbMeQShmEopBKxhKjAsbCJRyJUlYyVVrAtYC5CFHICyTAsCYZeCpbUkvHuC0eL2D2ZaGveu1ufUp/21z+b9Ei9YeN2hm4r8EeVf8At6rCNlYs89cAAAAAAAAAAc/rXomOIozi1xT70+TC1LzS0Wj0eJ4+hKEpUp7p03Z8r9vzW8xnwl9NjvGWkWhrZsLbSgmwtsinIbrbSilMJ2lY6hG6eGUcqhO6JrKOVQbqTWVjmTupstdQI2U2xubLdobo2V2gbKBGy6MQl1GrGh5V6kKSTvPfNr9FJcfm+Hz7BEbyy1Gbuce/rPk+hNBYCNGnGKSSSSSW6ySNXzszv4toAAAAAAAAAAALKkLqwHlXtO1ak08RRT26ae2o369Pi/mvudekyUrfhvEbTzY5+84d8dpjblMvJKlZ5vxPa7jH7Y6Q8+NTn99usoJ1Xm/FjucftjpDSNRm989ZQyrPN+I7nH7Y6QvGfN756yjlVeb8Se4x+2OkLxnze+esrHVeb8R3GP2x0hPf5vfPWVrqPtInDj9sdE9/l989ZWubKzhx+2Oie/y+6esm0yk4qe2Oh3+X3T1lS7I7qntjod/k909ZN5HdU9sdDv8AJ7p6yrvI7qntjojv8nunrKqTHdU9sdEfUZPdPWV6THdU9sdETqMnunrLMweHba4t3SjFXblLkki0YscRvMR0Y31WXfhrad/1l7x7ONV3h6SnU31qlpTe923borsX1ueNnyRe+9Y2h34+OKxF5mZ+ZehRVjFdUAAAAAAAAAAAAMXH4VVItMDwn2h6nSw05V6UW6MnecUv5T5v+l+ncevotXEx3d/P0lwajBwzx18vV5/UTR6bCsxKGQXhY0SvurGk3wQRNohPHBvnuGzOc0ei+OCT4O/dvKzwx5yjvbekDwWTXc9zK8MT5SjvucLJYWS5FZrMLRliVvRFU8avREI41ypEI4mTRwl974Zc2WiPWWVsvpD1T2d6lPajia8bSX8qm1+RNfmfxfQ8rV6rj/sr5f8Abv02n4P7reb17D0VBJI4XYlAAAAAAAAAAAAAAAwtIYCNWLTSd1bhcDyXWz2avalUwto3u3RatBv4X+nu4dx6On19qRw38Y/dyZdLFp3p4S8/xmrtak2qlGtG3NQlOPykro9Ompw38rQ47UzV84WYbQVWbtCjWm/7c0vm3uRNtRhr52hEVzW8odRoj2eYmrbb2aEeat0k7fRepx5O0qx4UjdtTR2nxvLu9D+zPDU7OcOllnV6/pw9Dz8mszX856Oymnx19HT0dVqMVZQgu6KRz7y12hFi9UKFRNSp05LJwiyYtMeUk1ifOHLaV9mVGV3SUqT+BvZ8r3HTj1uWnrv+rnvpcdvTZxuk/Z9iad9lRrLs/hz8Hu9Tsp2hSfxRs5L6G8fgloq2r1aDtKhXXdTlNeMbo6I1GGfzOe2LPX8rJwGq+JqtKFCa+KqnTS8d/oVvq8NPXdNdNnv5+D0XVL2fRpSjVr2qVFvW60If0rPtZ5ufV2y+HlD0cGlri8fOXpGGwygrJHI6k4AAAAAAAAAAAAAAAABZOmnxQGJV0XTlyXgBSnommuS8AMqnh4x4JASgAAFGgI54eL4pAY8tGU3yXgBfTwEI8EgMiMUuAFwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//2Q==';
    }

    openDialog(): void {
        console.log("Oprining Dialog")
        let dialogRef = this.dialog.open(AvatarPicker, {
            data: { name: "", animal: "" }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            console.log(result);
            this.encodedSource = result;
        });
     }



    register() {
        let user = {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            capthaName: this.capthaName,
            capthaAnswer: this.capthaAnswer,
            password: this.password,
            district: this.selectedDistrict,
            town: this.town,
            gender: this.gender,
            avatarImage: this.encodedSource
        };

        this.internet.post("/api/Login/Register", user, 'application/json').subscribe((data: any) => {
            console.log("sign up service");
            console.log(data);
            this.toast.success(data);
        }, (err: any) => {
            this.toast.error(err._body);
        });
        
    }
}

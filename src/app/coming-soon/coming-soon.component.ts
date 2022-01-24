import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./coming-soon.component.css']
})
export class ComingSoonComponent implements OnInit {

  private subscription!: Subscription;
  
  public dateNow = new Date();
  public dDay = new Date('Marc 14 2022 18:00:00');
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute  = 60;

  public timeDifference:any;
  public secondsToDday:any;
  public minutesToDday:any;
  public hoursToDday:any;
  public daysToDday:any;
  public day_number!: string;


  private getTimeDifference () {
      this.timeDifference = this.dDay.getTime() - new  Date().getTime();
      this.allocateTimeUnits(this.timeDifference);
  }

private allocateTimeUnits (timeDifference: any) {
      this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
      this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
      this.hoursToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
      this.daysToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay));
      if ((this.daysToDday === 0) || (this.daysToDday === 1)){
        this.day_number = "Day";
      } else {
        this.day_number = "Days";
      }
      console.log(this.daysToDday);
      
}

  ngOnInit() {
     this.subscription = interval(1000)
         .subscribe(x => { this.getTimeDifference(); });
  }

 ngOnDestroy() {
    this.subscription.unsubscribe();
 }
}

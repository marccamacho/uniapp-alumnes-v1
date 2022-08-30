import {Pipe, PipeTransform, NgZone, ChangeDetectorRef, OnDestroy} from "@angular/core";
@Pipe({
	name:'timeAgo',
	pure:false
})
export class TimeAgoPipe implements PipeTransform, OnDestroy {
	private timer: number = 1;
	constructor(private changeDetectorRef: ChangeDetectorRef, private ngZone: NgZone) {}
	transform(value:string) {
		this.removeTimer();
//		console.log(value)
		let d = new Date(value);
//		console.log(d);
		var d_utc =  new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(),
					d.getHours(), d.getMinutes(), d.getSeconds()));

//	  console.log(d_utc);

		let now = new Date();
//		console.log(now);
		let seconds = Math.round(Math.abs((now.getTime() - d_utc.getTime())/1000));
//		console.log(seconds);
		let timeToUpdate = (Number.isNaN(seconds)) ? 1000 : this.getSecondsUntilUpdate(seconds) *1000;
		this.timer = this.ngZone.runOutsideAngular(() => {
			if (typeof window !== 'undefined') {
				return window.setTimeout(() => {
					this.ngZone.run(() => this.changeDetectorRef.markForCheck());
				}, timeToUpdate);
			}
			return 0;
		});
		let minutes = Math.round(Math.abs(seconds / 60));
		let hours = Math.round(Math.abs(minutes / 60));
		let days = Math.round(Math.abs(hours / 24));
		let months = Math.round(Math.abs(days/30.416));
		let years = Math.round(Math.abs(days/365));
		if (Number.isNaN(seconds)){
			return '';
		} else if (seconds <= 45) {
			return 'fa pocs segons';
		} else if (seconds <= 90) {
			return 'fa un minut';
		} else if (minutes <= 45) {
			return 'fa ' + minutes + ' minuts';
		} else if (minutes <= 90) {
			return 'fa una hora';
		} else if (hours <= 22) {
			return 'fa ' + hours + ' hores';
		} else if (hours <= 36) {
			return 'fa un dia';
		} else if (days <= 25) {
			return 'fa ' + days + ' dies';
		} else if (days <= 45) {
			return 'fa un mes';
		} else if (days <= 345) {
			return 'fa ' + months + ' mesos';
		} else if (days <= 545) {
			return 'fa un any';
		} else { // (days > 545)
			return 'fa ' + years + ' anys';
		}
	}
	ngOnDestroy(): void {
		this.removeTimer();
	}
	private removeTimer() {
		if (this.timer) {
			window.clearTimeout(this.timer);
			this.timer = 0;
		}
	}
	private getSecondsUntilUpdate(seconds:number) {
		let min = 60;
		let hr = min * 60;
		let day = hr * 24;
		if (seconds < min) { // less than 1 min, update every 2 secs
			return 2;
		} else if (seconds < hr) { // less than an hour, update every 30 secs
			return 30;
		} else if (seconds < day) { // less then a day, update every 5 mins
			return 300;
		} else { // update every hour
			return 3600;
		}
	}
}

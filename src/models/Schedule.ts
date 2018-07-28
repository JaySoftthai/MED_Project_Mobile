
export class Schedule {
    constructor(
        public title: string,
        public startTime: Date, 
        public endTime: Date,
        public allDay: false,
        public sEventName: string,
        public sEventDesc: string,
        public sStartTime: string, 
        public sEndTime: string,
        public cEventType: string,
    ){}
}
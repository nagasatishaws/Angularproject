import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Router } from '@angular/router';
import { Calendar } from '@fullcalendar/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public calendarPlugins = [dayGridPlugin, interactionPlugin];
  public showWeekends: boolean = true;
  public headerOptions: Object = {
    left: 'dayGridDay,dayGridWeek,dayGridMonth',
    center: 'title',
    right: 'today,prevYear,prev,next,nextYear'
  }

  public calendarEvents = [
    {
      title: 'event with URL',
      // url: 'http://localhost:4200/#/mainlayout/subject/a123',
      // url: '#',
      // id: '',
      date: '2019-11-25',
      mydata: 'a1234',
      name: 'subject',
      age: '24'
    }
  ];

  public fullCalendar: HTMLElement;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.fullCalendar = document.getElementById("fullcalendar");
  }

  addEvent() {
    // this.calendarEvents = this.calendarEvents.concat({ // creates a new array!
    //   title: 'event 2', date: '2019-04-02'
    // });
  }

  modifyTitle(eventIndex, newTitle) {
    let calendarEvents = this.calendarEvents.slice(); // a clone
    let singleEvent = Object.assign({}, calendarEvents[eventIndex]); // a clone
    singleEvent.title = newTitle;
    calendarEvents[eventIndex] = singleEvent;
    this.calendarEvents = calendarEvents; // reassign the array
  }

  eventClicked(data) {
    // console.log("Clicked::::: ", data.event._def.extendedProps);
    let subjectData = Object.assign({}, data.event._def.extendedProps);
    this.router.navigate(['/mainlayout/subject', subjectData.mydata])
  }

  changeCalenderView(view) {
    let calendar = new Calendar(this.fullCalendar, {
      defaultView: view
    });
    // calendar.changeView(view);

    calendar.render();
    // this.defaultView = view;
    // console.log(this.defaultView);

  }

  changeYear(option) {
    let calendar = new Calendar(this.fullCalendar);
    if (option === 'next') {
      calendar.nextYear();
    } else if (option === 'prev') {
      calendar.prevYear();
    }

    calendar.render();
  }

}

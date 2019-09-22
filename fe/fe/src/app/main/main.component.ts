import { Component, OnInit, ɵrenderComponent } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  isNotifications: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    try {
      this.authService.updateActivity();
      this.authService.startCheckingActivity();
    } catch (err) {
      console.log('Main Component error ', err);
    }
  }

  loadNotifications() {
    // import('../notification/notification.module')
    //   .then(({ NotificationModule }) => NotificationModule);
    // import('../notification/notification-list/notification-list.component')
    //   .then(({ NotificationListComponent }) => {
    //     ɵrenderComponent(NotificationListComponent);
    //   });
  }

  mouseover() {
    this.authService.updateActivity();
  }

  toggleNotifications(timer) {
    this.loadNotifications();
    setTimeout(() => {
      this.isNotifications = !this.isNotifications;
      console.log(this.isNotifications);
    }, timer);
  }
}

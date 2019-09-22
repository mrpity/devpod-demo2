import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Store , select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AvatarStoreState, AvatarStoreActions, AvatarStoreSelectors } from '../../store';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AvatarProxy } from '@app/avatar/models/avatar.model';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

_('avatar.links.FACEBOOK');
_('avatar.links.ODNOKLASSNIKI');
_('avatar.links.GOOGLE');

@Component({
  selector: 'app-links-tab',
  templateUrl: './links-tab.component.html',
  styleUrls: ['./links-tab.component.scss']
})
export class LinksTabComponent implements OnInit, OnDestroy {

  connections: any[];
  fbConnection: any;
  okConnection: any;
  googleConnection: any;
  isLoading$: Observable<boolean>;
  proxies: AvatarProxy[];
  connections$: Subscription;
  socialNetworks: string[];

  @Input() avatarId: number;

  constructor(
    private store$: Store<AvatarStoreState.State>
  ) {}

  ngOnInit() {

    this.isLoading$ = this.store$.pipe(
      delay(0),
      select(AvatarStoreSelectors.getIsLoading)
    );

    /**
     * Get proxies regions from Store
     */
    this.store$.pipe(
      delay(0),
      select(AvatarStoreSelectors.getProxies)
    ).subscribe((data: AvatarProxy[]) => {
      this.proxies = data;
    });

    /**
     * Get connections from Store
     */
    this.connections$ = this.store$.pipe(
      select(
        AvatarStoreSelectors.getConnections
      )
    ).subscribe((data: any) => {
      if (data) {
        this.socialNetworks = [];
        this.fbConnection = data['FACEBOOK'];
        this.okConnection = data['ODNOKLASSNIKI'];
        this.googleConnection = data['GOOGLE'];
        if (this.fbConnection && this.fbConnection.enabled) {
          this.socialNetworks.push('FACEBOOK');
        }
        if (this.okConnection && this.okConnection.enabled) {
          this.socialNetworks.push('ODNOKLASSNIKI');
        }
        if (this.googleConnection && this.googleConnection.enabled) {
          this.socialNetworks.push('GOOGLE');
        }
      }
    });

    this.store$.dispatch(
      new AvatarStoreActions.AvatarConnectionsActions.LoadConnectionsRequest({ id: this.avatarId })
    );
  }

  ngOnDestroy() {
    this.connections$.unsubscribe();
  }

  updateConnection($event) {
    this.store$.dispatch(
      new AvatarStoreActions.AvatarConnectionsActions.UpdateConnectionStartRequest($event)
    );
  }

}

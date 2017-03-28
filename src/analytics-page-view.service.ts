import { Injectable } from '@angular/core';
import { App, ViewController } from 'ionic-angular';
import { GoogleAnalytics } from 'ionic-native';

export interface ViewNames {
  [key:string]: string;
}

@Injectable()
export class AnalyticsPageViewService {
  viewNames: ViewNames;

  constructor(private app: App) {}

  init(id: string, viewNames: ViewNames) {
    this.viewNames = viewNames;
    this.app.viewDidEnter.subscribe(this._trackView.bind(this));

    return GoogleAnalytics.startTrackerWithId(id);
  }

  // Private methods

  _trackView(view: ViewController) {
    let title: string = this.viewNames[view.name];

    if (title) {
      GoogleAnalytics.trackView(title);
    }
  }
}

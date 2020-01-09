import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { WindowService } from '../../services/window/window.service';

@Component({
  selector: 'home',
  template: `
    <h3>Hello World!</h3>
  `,
  styles: [`
    .container {
        margin: 16px;
        padding: 16px;
        border: 1px black solid;
    }
  `]
})
export class HomeComponent implements OnInit {

  public title: string;
  public isBrowser: boolean = isPlatformBrowser(this.platformId);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private doc,
    private windowService: WindowService
  ) { }

  ngOnInit() {
    this.title = `This is the Homepage!`;
  }
}

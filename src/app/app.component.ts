import { Component, ViewChild, ElementRef, OnDestroy, AfterViewInit, ChangeDetectorRef, NgZone  } from '@angular/core';

import { FocusMonitor, FocusOrigin, LiveAnnouncer, InteractivityChecker, FocusTrapFactory } from '@angular/cdk/a11y';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnDestroy, AfterViewInit {
  name = 'mthurston Angular cdk a11y';
  isIcInputReadonly: boolean = false;
  isIcInputHidden: boolean = false;

  @ViewChild('inputToAnnounce') inputToAnnounce : ElementRef;
  @ViewChild('fmButton') focusMonitoredButton : ElementRef;
  @ViewChild('fmInput') focusMonitoredInput : ElementRef;
  @ViewChild('fmInputDisabled') focusMonitoredInputDisabled : ElementRef;
  @ViewChild('fmInputReadonly') focusMonitoredInputReadonly : ElementRef;
  @ViewChild('trapThis') trapThis : ElementRef;

  fmButtomOrigin = this.formatOrigin(null);
  fmInputOrigin = this.formatOrigin(null);
  fmInputDisabledOrigin = this.formatOrigin(null);
  fmInputReadonlyOrigin = this.formatOrigin(null);  

  constructor(private liveAnnouncer: LiveAnnouncer,
  public interactivityChecker: InteractivityChecker,
  private focusMonitor: FocusMonitor,
  private cdr: ChangeDetectorRef,
  private ngZone: NgZone,
  private focusTrapFactory: FocusTrapFactory) { }

 ngAfterViewInit() {
   this.focusMonitor.monitor(this.focusMonitoredButton)
    .subscribe(origin => this.ngZone.run(
      () => {
        this.fmButtomOrigin = this.formatOrigin(origin);
        this.cdr.markForCheck();
      }
    ));

    this.focusMonitor.monitor(this.focusMonitoredInput)
    .subscribe(origin => this.ngZone.run(
      () => {
        this.fmInputOrigin = this.formatOrigin(origin);
        this.cdr.markForCheck();
      }
    ))

    this.focusMonitor.monitor(this.focusMonitoredInputDisabled)
    .subscribe(origin => this.ngZone.run(
      () => {
        this.fmInputDisabledOrigin = this.formatOrigin(origin);
        this.cdr.markForCheck();
      }
    ))

    this.focusMonitor.monitor(this.focusMonitoredInputReadonly)
    .subscribe(origin => this.ngZone.run(
      () => {
        this.fmInputReadonlyOrigin = this.formatOrigin(origin);
        this.cdr.markForCheck();
      }
    ))    

    this.focusTrapFactory.create(this.trapThis.nativeElement);
 }

 ngOnDestroy() {
   this.focusMonitor.stopMonitoring(this.focusMonitoredButton);
   this.focusMonitor.stopMonitoring(this.focusMonitoredInput);
   this.focusMonitor.stopMonitoring(this.focusMonitoredInputDisabled);
   this.focusMonitor.stopMonitoring(this.focusMonitoredInputReadonly);
 }

 /** helper method for focus monitor */
 formatOrigin(origin: FocusOrigin) {
   return origin ? origin + ' focused' : 'blurred';
 } 

 testLiveAnnouncer(politeness) {
   let value = this.inputToAnnounce.nativeElement.value;

    if (!value) {
      value = "Please enter a value to live announce";
    }

   this.liveAnnouncer.announce(value, politeness);
 }

  announce(value, politeness) {
   this.liveAnnouncer.announce(value, politeness);
  }
}

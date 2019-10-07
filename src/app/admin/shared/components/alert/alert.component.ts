import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { AlertService, AlertType } from "../../services/alert-service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.scss"]
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() delay = 5000;
  public text: string;
  public type: AlertType = "success";

  aSub: Subscription;
  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.aSub = this.alertService.alert$.subscribe(alert => {
      this.text = alert.text;
      this.type = alert.type;

      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        this.text = "";
      }, this.delay);
    });
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }
}

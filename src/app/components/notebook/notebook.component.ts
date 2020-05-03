import { Component, OnInit } from "@angular/core";
import { BreakpointState, BreakpointObserver } from "@angular/cdk/layout";

@Component({
  selector: "app-notebook",
  templateUrl: "./notebook.component.html",
  styleUrls: ["./notebook.component.scss"],
})
export class NotebookComponent implements OnInit {
  opened: boolean = true;
  mode: string = "side";
  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.breakpointObserver
      .observe(["(max-width: 800px)"])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.opened = false;
          this.mode = "over";
        } else {
          this.opened = true;
          this.mode = "side";
        }
      });
  }
}

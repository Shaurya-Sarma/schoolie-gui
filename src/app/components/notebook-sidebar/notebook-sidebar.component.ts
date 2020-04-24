import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-notebook-sidebar",
  templateUrl: "./notebook-sidebar.component.html",
  styleUrls: ["./notebook-sidebar.component.scss"],
})
export class NotebookSidebarComponent implements OnInit {
  searchForm: FormGroup;
  value: string;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.searchForm = this.fb.group({});
  }
}

import { Component, Input } from "@angular/core";
import { Position } from "./ng-tooltip.model";

@Component({
  selector: "ng-tooltip",
  templateUrl: "./ng-tooltip.component.html",
  styleUrls: ["./ng-tooltip.scss"],
})
export class TooltipComponent {
  @Input() position: Position = "bottom";
  @Input() top!: string;
  @Input() left!: string;
  @Input() visible: boolean = false;
  @Input() text: string = "";
}

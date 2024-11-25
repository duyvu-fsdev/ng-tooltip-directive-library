import { Component, HostBinding, Input } from "@angular/core";
import { Position } from "./ng-tooltip.model";

@Component({
  selector: "ng-tooltip",
  templateUrl: "./ng-tooltip.component.html",
  styleUrls: ["./ng-tooltip.scss"],
})
export class TooltipComponent {
  @Input() position: Position;
  @Input() initPosition: Position;
  @Input() top!: string;
  @Input() initTop!: string;
  @Input() left!: string;
  @Input() initLeft!: string;
  @Input() visible: boolean = false;
  @Input() text!: string;
  @Input() class?: string;
}

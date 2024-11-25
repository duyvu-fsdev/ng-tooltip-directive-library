import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { TooltipModule } from "../../../../ng-tooltip-directive/src/lib/ng-tooltip.module";

@Component({
  selector: "other-component",
  standalone: true,
  imports: [CommonModule, TooltipModule],
  templateUrl: "./other-component.component.html",
  styleUrl: "./other-component.component.scss",
})
export class OtherComponent {}

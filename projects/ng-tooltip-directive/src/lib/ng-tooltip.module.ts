import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { TooltipComponent } from "./ng-tooltip.component";
import { TooltipDirective } from "./ng-tooltip.directive";

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [TooltipComponent, TooltipDirective],
  exports: [TooltipDirective],
})
export class TooltipModule {}

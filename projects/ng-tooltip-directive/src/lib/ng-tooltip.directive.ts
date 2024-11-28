import {
  Directive,
  Input,
  ElementRef,
  HostListener,
  Renderer2,
  ViewContainerRef,
  ComponentRef,
  AfterViewInit,
  Inject,
} from "@angular/core";

import { Option, Position } from "./ng-tooltip.model";
import { DOCUMENT } from "@angular/common";
import { TooltipComponent } from "./ng-tooltip.component";

@Directive({
  selector: "[tooltip]",
})
export class TooltipDirective implements AfterViewInit {
  @Input("tooltipOption") option!: Option;
  private tooltipComponentRef!: ComponentRef<TooltipComponent>;

  constructor(
    private el: ElementRef,
    private viewContainerRef: ViewContainerRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngAfterViewInit() {}

  @HostListener("mouseenter") onMouseEnter() {
    this.showTooltip();
  }

  @HostListener("mouseleave") onMouseLeave() {
    this.hideTooltip();
  }

  private getHostPosition(hostEl: HTMLElement): { w: number; h: number; l: number; t: number } {
    if (!hostEl) return { h: 0, w: 0, l: 0, t: 0 };
    const styles = getComputedStyle(hostEl);
    const { left, top, height, width } = hostEl.getBoundingClientRect();
    const l = styles.left === "auto" ? left : left + parseFloat(styles.marginLeft);
    const t = styles.top === "auto" ? top : top + parseFloat(styles.marginTop);
    const w = styles.width === "auto" ? width : parseFloat(styles.width);
    const h = styles.height === "auto" ? height : parseFloat(styles.height);
    return { w, h, l, t };
  }

  getStandardPosition(p: Position): { top: number; left: number } {
    const { h, w, l, t } = this.getHostPosition(this.el.nativeElement);
    if (p === "top") return { left: l + w / 2, top: t - 6 };
    if (p === "left") return { left: l - 6, top: t + h / 2 };
    if (p === "right") return { left: l + w + 6, top: t + h / 2 };
    else return { left: l + w / 2, top: t + h + 6 };
  }

  private showTooltip() {
    const factory = this.viewContainerRef.createComponent(TooltipComponent);
    this.tooltipComponentRef = factory;
    const tooltipInstance = this.tooltipComponentRef.instance;
    const tooltipEl = this.tooltipComponentRef.location.nativeElement;
    this.document.body.appendChild(tooltipEl);
    const { left, top } = this.getStandardPosition(this.option.position ?? "bottom");
    tooltipInstance.position = this.option.position ?? "bottom";
    tooltipInstance.text = this.option.text;
    tooltipInstance.left = `${left}px`;
    tooltipInstance.top = `${top}px`;
    tooltipInstance.visible = false;

    setTimeout(() => {
      const tooltipEl = this.tooltipComponentRef.location.nativeElement.querySelector(".tooltip-container");
      if (this.option.class) tooltipEl.classList.add(this.option.class);
      this.adjustPosition(tooltipEl).then((position) => {
        const { left, top } = this.getStandardPosition(position);
        tooltipInstance.position = position;
        tooltipInstance.left = `${left}px`;
        tooltipInstance.top = `${top}px`;
        tooltipInstance.visible = true;
      });
    }, 1);
  }

  private adjustPosition(initTooltipEl: HTMLElement): Promise<Position> {
    return new Promise((resolve) => {
      const { left, right, top, bottom } = initTooltipEl.getBoundingClientRect();
      const windowWidth = document.documentElement.clientWidth;
      const windowHeight = document.documentElement.clientHeight;
      const isOverLeft = left < 0;
      const isOverRight = right > windowWidth;
      const isOverTop = top < 0;
      const isOverBottom = bottom > windowHeight;

      if (!isOverLeft && !isOverRight && !isOverBottom && !isOverTop) resolve(this.option.position ?? "bottom");
      else if (isOverLeft && isOverRight && isOverBottom && isOverTop) resolve("bottom");
      else if (this.option.position === "top") {
        if (isOverLeft && !isOverRight && !isOverBottom && !isOverTop) resolve("right");
        if (!isOverLeft && isOverRight && !isOverBottom && !isOverTop) resolve("left");
        if (!isOverLeft && !isOverRight && isOverBottom && !isOverTop) resolve("top");
        if (!isOverLeft && !isOverRight && !isOverBottom && isOverTop) resolve("bottom");
        if (isOverLeft && isOverRight && !isOverBottom && !isOverTop) resolve("top");
        if (isOverLeft && !isOverRight && isOverBottom && !isOverTop) resolve("right");
        if (isOverLeft && !isOverRight && !isOverBottom && isOverTop) resolve("right");
        if (!isOverLeft && isOverRight && isOverBottom && !isOverTop) resolve("left");
        if (!isOverLeft && isOverRight && !isOverBottom && isOverTop) resolve("left");
        if (!isOverLeft && !isOverRight && isOverBottom && isOverTop) resolve("left");
        if (isOverLeft && isOverRight && isOverBottom && !isOverTop) resolve("top");
        if (isOverLeft && isOverRight && !isOverBottom && isOverTop) resolve("bottom");
        if (isOverLeft && !isOverRight && isOverBottom && isOverTop) resolve("right");
        if (!isOverLeft && isOverRight && isOverBottom && isOverTop) resolve("left");
      } else if (this.option.position === "left") {
        if (isOverLeft && !isOverRight && !isOverBottom && !isOverTop) resolve("right");
        if (!isOverLeft && isOverRight && !isOverBottom && !isOverTop) resolve("left");
        if (!isOverLeft && !isOverRight && isOverBottom && !isOverTop) resolve("left");
        if (!isOverLeft && !isOverRight && !isOverBottom && isOverTop) resolve("left");
        if (isOverLeft && isOverRight && !isOverBottom && !isOverTop) resolve("bottom");
        if (isOverLeft && !isOverRight && isOverBottom && !isOverTop) resolve("right");
        if (isOverLeft && !isOverRight && !isOverBottom && isOverTop) resolve("right");
        if (!isOverLeft && isOverRight && isOverBottom && !isOverTop) resolve("left");
        if (!isOverLeft && isOverRight && !isOverBottom && isOverTop) resolve("left");
        if (!isOverLeft && !isOverRight && isOverBottom && isOverTop) resolve("left");
        if (isOverLeft && isOverRight && isOverBottom && !isOverTop) resolve("top");
        if (isOverLeft && isOverRight && !isOverBottom && isOverTop) resolve("bottom");
        if (isOverLeft && !isOverRight && isOverBottom && isOverTop) resolve("right");
        if (!isOverLeft && isOverRight && isOverBottom && isOverTop) resolve("left");
      } else if (this.option.position === "right") {
        if (isOverLeft && !isOverRight && !isOverBottom && !isOverTop) resolve("right");
        if (!isOverLeft && isOverRight && !isOverBottom && !isOverTop) resolve("left");
        if (!isOverLeft && !isOverRight && isOverBottom && !isOverTop) resolve("right");
        if (!isOverLeft && !isOverRight && !isOverBottom && isOverTop) resolve("right");
        if (isOverLeft && isOverRight && !isOverBottom && !isOverTop) resolve("bottom");
        if (isOverLeft && !isOverRight && isOverBottom && !isOverTop) resolve("right");
        if (isOverLeft && !isOverRight && !isOverBottom && isOverTop) resolve("right");
        if (!isOverLeft && isOverRight && isOverBottom && !isOverTop) resolve("left");
        if (!isOverLeft && isOverRight && !isOverBottom && isOverTop) resolve("left");
        if (!isOverLeft && !isOverRight && isOverBottom && isOverTop) resolve("right");
        if (isOverLeft && isOverRight && isOverBottom && !isOverTop) resolve("top");
        if (isOverLeft && isOverRight && !isOverBottom && isOverTop) resolve("bottom");
        if (isOverLeft && !isOverRight && isOverBottom && isOverTop) resolve("right");
        if (!isOverLeft && isOverRight && isOverBottom && isOverTop) resolve("left");
      } else if (this.option.position === "bottom") {
        if (isOverLeft && !isOverRight && !isOverBottom && !isOverTop) resolve("right");
        if (!isOverLeft && isOverRight && !isOverBottom && !isOverTop) resolve("left");
        if (!isOverLeft && !isOverRight && isOverBottom && !isOverTop) resolve("top");
        if (!isOverLeft && !isOverRight && !isOverBottom && isOverTop) resolve("bottom");
        if (isOverLeft && isOverRight && !isOverBottom && !isOverTop) resolve("bottom");
        if (isOverLeft && !isOverRight && isOverBottom && !isOverTop) resolve("right");
        if (isOverLeft && !isOverRight && !isOverBottom && isOverTop) resolve("right");
        if (!isOverLeft && isOverRight && isOverBottom && !isOverTop) resolve("right");
        if (!isOverLeft && isOverRight && !isOverBottom && isOverTop) resolve("left");
        if (!isOverLeft && !isOverRight && isOverBottom && isOverTop) resolve("right");
        if (isOverLeft && isOverRight && isOverBottom && !isOverTop) resolve("top");
        if (isOverLeft && isOverRight && !isOverBottom && isOverTop) resolve("bottom");
        if (isOverLeft && !isOverRight && isOverBottom && isOverTop) resolve("right");
        if (!isOverLeft && isOverRight && isOverBottom && isOverTop) resolve("left");
      }
    });
  }
  private hideTooltip() {
    if (this.tooltipComponentRef) {
      const tooltipInstance = this.tooltipComponentRef.instance;
      tooltipInstance.visible = false;
      this.tooltipComponentRef.destroy();
    }
  }
}

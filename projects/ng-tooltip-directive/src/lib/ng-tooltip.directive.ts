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

  position: Position;
  initPosition: Position;
  visible: boolean = false;
  text!: string;
  class?: string;
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef,
    @Inject(DOCUMENT) private document: Document
  ) {}
  private hostEl!: HTMLElement;
  ngAfterViewInit() {
    this.hostEl = this.el.nativeElement;
    // this.createInitTooltip();
  }

  @HostListener("mouseenter") onMouseEnter() {
    this.showTooltip();
  }

  @HostListener("mouseleave") onMouseLeave() {
    this.hideTooltip();
  }

  private getHostPosition(hostEl: HTMLElement): {
    w: number;
    h: number;
    l: number;
    t: number;
  } {
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
    const { h, w, l, t } = this.getHostPosition(this.hostEl);
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
    this.initPosition = this.option.position ?? "bottom";
    const { left, top } = this.getStandardPosition(this.initPosition);
    tooltipInstance.initPosition = this.initPosition;
    tooltipInstance.class = this.option.class;
    tooltipInstance.initLeft = `${left}px`;
    tooltipInstance.initTop = `${top}px`;
    tooltipInstance.text = this.option.text;
    tooltipInstance.visible = false;

    this.document.body.appendChild(tooltipEl);
    this.adjustPosition().then(() => {
      const { left, top } = this.getStandardPosition(this.position);
      tooltipInstance.position = this.position;
      tooltipInstance.left = `${left}px`;
      tooltipInstance.top = `${top}px`;
      tooltipInstance.visible = true;
      const tooltipEl = (
        this.tooltipComponentRef.location.nativeElement as HTMLElement
      ).querySelector(".tooltip-container") as HTMLElement;

      if (this.option.class) {
        tooltipEl.classList.add(this.option.class);
        this.initTooltipEl.classList.add(this.option.class);
      }
    });
  }
  initTooltipEl!: HTMLElement;
  private adjustPosition(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const initTooltipEl = (
          this.tooltipComponentRef.location.nativeElement as HTMLElement
        ).querySelector(".init-tooltip-container") as HTMLElement;
        if (!initTooltipEl) {
          resolve();
          return;
        }
        this.initTooltipEl = initTooltipEl;
        const { left, right, top, bottom } = initTooltipEl.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const isOverLeft = left < 0;
        const isOverRight = right > windowWidth;
        const isOverTop = top < 0;
        const isOverBottom = bottom > windowHeight;

        if (!isOverLeft && !isOverRight && !isOverBottom && !isOverTop)
          this.position = this.initPosition;
        else if (isOverLeft && isOverRight && isOverBottom && isOverTop) this.position = "bottom";
        else if (this.initPosition === "top") {
          if (isOverLeft && !isOverRight && !isOverBottom && !isOverTop) this.position = "right";
          if (!isOverLeft && isOverRight && !isOverBottom && !isOverTop) this.position = "left";
          if (!isOverLeft && !isOverRight && isOverBottom && !isOverTop) this.position = "top";
          if (!isOverLeft && !isOverRight && !isOverBottom && isOverTop) this.position = "bottom";
          if (isOverLeft && isOverRight && !isOverBottom && !isOverTop) this.position = "top";
          if (isOverLeft && !isOverRight && isOverBottom && !isOverTop) this.position = "right";
          if (isOverLeft && !isOverRight && !isOverBottom && isOverTop) this.position = "right";
          if (!isOverLeft && isOverRight && isOverBottom && !isOverTop) this.position = "left";
          if (!isOverLeft && isOverRight && !isOverBottom && isOverTop) this.position = "left";
          if (!isOverLeft && !isOverRight && isOverBottom && isOverTop) this.position = "left";
          if (isOverLeft && isOverRight && isOverBottom && !isOverTop) this.position = "top";
          if (isOverLeft && isOverRight && !isOverBottom && isOverTop) this.position = "bottom";
          if (isOverLeft && !isOverRight && isOverBottom && isOverTop) this.position = "right";
          if (!isOverLeft && isOverRight && isOverBottom && isOverTop) this.position = "left";
        } else if (this.initPosition === "left") {
          if (isOverLeft && !isOverRight && !isOverBottom && !isOverTop) this.position = "right";
          if (!isOverLeft && isOverRight && !isOverBottom && !isOverTop) this.position = "left";
          if (!isOverLeft && !isOverRight && isOverBottom && !isOverTop) this.position = "left";
          if (!isOverLeft && !isOverRight && !isOverBottom && isOverTop) this.position = "left";
          if (isOverLeft && isOverRight && !isOverBottom && !isOverTop) this.position = "bottom";
          if (isOverLeft && !isOverRight && isOverBottom && !isOverTop) this.position = "right";
          if (isOverLeft && !isOverRight && !isOverBottom && isOverTop) this.position = "right";
          if (!isOverLeft && isOverRight && isOverBottom && !isOverTop) this.position = "left";
          if (!isOverLeft && isOverRight && !isOverBottom && isOverTop) this.position = "left";
          if (!isOverLeft && !isOverRight && isOverBottom && isOverTop) this.position = "left";
          if (isOverLeft && isOverRight && isOverBottom && !isOverTop) this.position = "top";
          if (isOverLeft && isOverRight && !isOverBottom && isOverTop) this.position = "bottom";
          if (isOverLeft && !isOverRight && isOverBottom && isOverTop) this.position = "right";
          if (!isOverLeft && isOverRight && isOverBottom && isOverTop) this.position = "left";
        } else if (this.initPosition === "right") {
          if (isOverLeft && !isOverRight && !isOverBottom && !isOverTop) this.position = "right";
          if (!isOverLeft && isOverRight && !isOverBottom && !isOverTop) this.position = "left";
          if (!isOverLeft && !isOverRight && isOverBottom && !isOverTop) this.position = "right";
          if (!isOverLeft && !isOverRight && !isOverBottom && isOverTop) this.position = "right";
          if (isOverLeft && isOverRight && !isOverBottom && !isOverTop) this.position = "bottom";
          if (isOverLeft && !isOverRight && isOverBottom && !isOverTop) this.position = "right";
          if (isOverLeft && !isOverRight && !isOverBottom && isOverTop) this.position = "right";
          if (!isOverLeft && isOverRight && isOverBottom && !isOverTop) this.position = "left";
          if (!isOverLeft && isOverRight && !isOverBottom && isOverTop) this.position = "left";
          if (!isOverLeft && !isOverRight && isOverBottom && isOverTop) this.position = "right";
          if (isOverLeft && isOverRight && isOverBottom && !isOverTop) this.position = "top";
          if (isOverLeft && isOverRight && !isOverBottom && isOverTop) this.position = "bottom";
          if (isOverLeft && !isOverRight && isOverBottom && isOverTop) this.position = "right";
          if (!isOverLeft && isOverRight && isOverBottom && isOverTop) this.position = "left";
        } else if (this.initPosition === "bottom") {
          if (isOverLeft && !isOverRight && !isOverBottom && !isOverTop) this.position = "right";
          if (!isOverLeft && isOverRight && !isOverBottom && !isOverTop) this.position = "left";
          if (!isOverLeft && !isOverRight && isOverBottom && !isOverTop) this.position = "top";
          if (!isOverLeft && !isOverRight && !isOverBottom && isOverTop) this.position = "bottom";
          if (isOverLeft && isOverRight && !isOverBottom && !isOverTop) this.position = "bottom";
          if (isOverLeft && !isOverRight && isOverBottom && !isOverTop) this.position = "right";
          if (isOverLeft && !isOverRight && !isOverBottom && isOverTop) this.position = "right";
          if (!isOverLeft && isOverRight && isOverBottom && !isOverTop) this.position = "right";
          if (!isOverLeft && isOverRight && !isOverBottom && isOverTop) this.position = "left";
          if (!isOverLeft && !isOverRight && isOverBottom && isOverTop) this.position = "right";
          if (isOverLeft && isOverRight && isOverBottom && !isOverTop) this.position = "top";
          if (isOverLeft && isOverRight && !isOverBottom && isOverTop) this.position = "bottom";
          if (isOverLeft && !isOverRight && isOverBottom && isOverTop) this.position = "right";
          if (!isOverLeft && isOverRight && isOverBottom && isOverTop) this.position = "left";
        }
        resolve();
      }, 100);
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

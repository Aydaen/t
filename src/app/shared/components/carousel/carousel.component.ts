import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent implements OnInit {
  progress: number = 50;
  startX: number = 0;
  active: number = 0;
  isDown: boolean = false;

  speedWheel: number = 0.02;
  speedDrag: number = -0.1;

  items: Element[] = [];
  cursors: Element[] = [];

  constructor() { }

  ngOnInit(): void {
    this.items = Array.from(document.querySelectorAll('.carousel-item'));
    this.cursors = Array.from(document.querySelectorAll('.cursor'));
    this.animate();
    this.setupListeners();

    this.items.forEach((item, i) => {
      item.addEventListener('click', () => {
        this.progress = (i / this.items.length) * 100 + 10;
        this.animate();
      });
    });
  }

  animate(): void {
    this.progress = Math.max(0, Math.min(this.progress, 100));
    this.active = Math.floor(this.progress / 100 * (this.items.length - 1));

    this.items.forEach((item, index) => this.displayItems(item, index, this.active));
  }

  displayItems(item: Element, index: number, active: number): void {
    const zIndex = this.getZindex([...this.items], active)[index];
    item.setAttribute('style', `--zIndex: ${zIndex}; --active: ${(index - active) / this.items.length}`);
  }

  getZindex(array: Element[], index: number): number[] {
    return array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i));
  }

  setupListeners(): void {
    document.addEventListener('wheel', this.handleWheel.bind(this));
    document.addEventListener('mousedown', this.handleMouseDown.bind(this));
    document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    document.addEventListener('mouseup', this.handleMouseUp.bind(this));
    document.addEventListener('touchstart', this.handleMouseDown.bind(this));
    document.addEventListener('touchmove', this.handleMouseMove.bind(this));
    document.addEventListener('touchend', this.handleMouseUp.bind(this));
  }

  handleWheel(e: WheelEvent): void {
    const wheelProgress = e.deltaY * this.speedWheel;
    this.progress += wheelProgress;
    this.animate();
  }

  handleMouseMove(e: MouseEvent | TouchEvent): void {
    if (e.type === 'mousemove') {
      this.cursors.forEach(cursor => {
        cursor.setAttribute('style', `transform: translate(${(e as MouseEvent).clientX}px, ${(e as MouseEvent).clientY}px)`);
      });
    }
    if (!this.isDown) return;
    const x = (e as MouseEvent).clientX || ((e as TouchEvent).touches && (e as TouchEvent).touches[0].clientX) || 0;
    const mouseProgress = (x - this.startX) * this.speedDrag;
    this.progress += mouseProgress;
    this.startX = x;
    this.animate();
  }

  handleMouseDown(e: MouseEvent | TouchEvent): void {
    this.isDown = true;
    this.startX = (e as MouseEvent).clientX || ((e as TouchEvent).touches && (e as TouchEvent).touches[0].clientX) || 0;
  }

  handleMouseUp(): void {
    this.isDown = false;
  }
}

import {ChangeDetectionStrategy, Component, ElementRef, Input, NgZone, OnInit, ViewChild} from '@angular/core';

import {Fake3d} from "../../../libs/shared/fake3d/src/lib/fake3d";


@Component({
  selector: 'app-fake3d',
  template: `
    <div class="fake3d">
      <canvas #canvas></canvas>
    </div>
  `,
  styleUrls: ['./fake3d.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Fake3dComponent implements OnInit {
  @ViewChild('canvas', {static: true}) private canvas!: ElementRef<HTMLCanvasElement>;
  @Input() originalImagePath!: string;
  @Input() depthMapImagePath!: string;
  @Input() verticalThreshold: number = 0;
  @Input() horizontalThreshold: number = 0;

  constructor(private ngZone: NgZone) {
  }

  public ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      new Fake3d(this.canvas, this.originalImagePath, this.depthMapImagePath, this.verticalThreshold, this.horizontalThreshold)
    });
  }
}

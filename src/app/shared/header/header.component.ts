import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Output() public navigationState: EventEmitter<boolean> = new EventEmitter<boolean>();
  public isOpen = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  public toggleNav(): void {
    this.isOpen = !this.isOpen;
    this.navigationState.emit(this.isOpen)
  }
}

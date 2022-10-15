import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { LayoutObserver } from './layout-observer.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ScBreakpoints } from './breakpoints';

export function isDefined(value: any): boolean {
  return value !== undefined && value !== null;
}

/**
 * Пайп для резолва значения в зависимости от вьюпорта пользователя
 *
 * @example
 *
 * <some-element [someProperty]="{xs: 'xsVal', default: 'defaultVal'} | scBreakpoint"></some-element>
 */
@Pipe({
  name: 'scBreakpoint',
  pure: false
})
export class BreakpointPipe implements PipeTransform, OnDestroy {
  private breakpoints$ = new BehaviorSubject<ScBreakpoints[]>([]);
  private subscriptions = new Subscription();

  /**
   * @ignore
   * @param layoutObserver
   */
  constructor(private layoutObserver: LayoutObserver) {
    this.subscriptions.add(this.layoutObserver.observe().subscribe(this.breakpoints$));
  }

  /**
   * Резолв значения из объекта, ключи которого являются {@link ScBreakpoints}
   * @param value
   * @return Возвращается значение, которое соответсвует текущему брикпоинту
   */
  transform(value: { [key in ScBreakpoints]?: any } & { default?: any }): any {
    if (!value) {
      return null;
    }

    const bp: ScBreakpoints | 'default' = this.breakpoints$.value
        .find(breakpoint => value.hasOwnProperty(breakpoint))
      || 'default';

    return isDefined(value[bp]) ? value[bp] : undefined;
  }

  /**
   * @ignore
   */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

import { ElementRef, Inject, Injectable, InjectionToken } from '@angular/core';
import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, pairwise, startWith, tap } from 'rxjs/operators';
import { coerceElement } from '@angular/cdk/coercion';

import { ScBreakpoints, MediaQueries } from './breakpoints';

/**
 * Токен для инъекции {@link MediaQueries}
 */
export const MEDIA_QUERIES = new InjectionToken<Map<ScBreakpoints, string>>('MEDIA QUERIES', {
  providedIn: 'root',
  factory() {
    return MediaQueries;
  }
});

/**
 * Сервис для отслеживания изменения пользовательского вьюпорта
 */
@Injectable({
  providedIn: 'root'
})
export class LayoutObserver {
  private readonly breakpoints: Observable<ScBreakpoints[]>;

  /**
   * @ignore
   * @param breakpointObserver
   * @param mediaMatcher
   * @param mediaQueries
   */
  constructor(private breakpointObserver: BreakpointObserver,
              private mediaMatcher: MediaMatcher,
              @Inject(MEDIA_QUERIES) private mediaQueries: Map<ScBreakpoints, string>) {
    this.breakpoints = breakpointObserver.observe([...this.mediaQueries.values()]).pipe(
      map(() => {
        return [...this.mediaQueries.entries()]
          .filter(([_, value]) => mediaMatcher.matchMedia(value).matches)
          .map(([key]) => key);
      })
    );
  }

  /**
   * Делает инъекцию классов, которые соответсвуют текущему вьюпорту,
   * в переданный пользовательский элемент
   *
   * @param element
   */
  public injectTo(element: HTMLElement | ElementRef<HTMLElement>): Observable<ScBreakpoints[]> {
    const htmlElement = coerceElement<HTMLElement>(element);
    return this.observe().pipe(
      startWith<ScBreakpoints[]>([]),
      pairwise(),
      tap(([previous, current]) => {
        const prevSet = new Set(previous);
        current.forEach(key => prevSet.delete(key));

        const currSet = new Set(current);
        previous.forEach(key => currSet.delete(key));

        /* передаем по одному элементу, тк IE не поддерживает несколько, прошу не удалять */

        const prev = [...prevSet.values()];
        prev.forEach(c => htmlElement.classList.remove(c));

        const curr = [...currSet.values()];
        curr.forEach(c => htmlElement.classList.add(c));
      }),
      map(([_, current]) => current)
    );
  }

  /**
   * Возвращает Observable, который испускает текущие ьрейкпоинты при изменении вьюпорта
   */
  public observe(): Observable<ScBreakpoints[]> {
    return this.breakpoints;
  }
}

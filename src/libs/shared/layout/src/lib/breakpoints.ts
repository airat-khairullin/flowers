/**
 * Основные брейкпоинты
 */
export enum Breakpoints {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  XXL = 'xxl',

  // less than
  lsSM = 'ls-sm',
  lsMD = 'ls-md',
  lsLG = 'ls-lg',
  lsXL = 'ls-xl',
  lsXXL = 'ls-xxl',

  // more than
  mrXS = 'mr-xs',
  mrSM = 'mr-sm',
  mrMD = 'mr-md',
  mrLG = 'mr-lg',
  mrXL = 'mr-xl',

  // devices
  Handset = 'handset',
  Tablet = 'tablet',
  Desktop = 'desktop'
}

/**
 * Сопоставления брейкпоинта и css медиа-запросов
 */
export const MediaQueries = new Map<Breakpoints, string>()
  .set(Breakpoints.XS, 'screen and (max-width: 479px)')
  .set(Breakpoints.SM, 'screen and (min-width: 480px) and (max-width: 767px)')
  .set(Breakpoints.MD, 'screen and (min-width: 768px) and (max-width: 1023px)')
  .set(Breakpoints.LG, 'screen and (min-width: 1024px) and (max-width: 1279px)')
  .set(Breakpoints.XL, 'screen and (min-width: 1280px) and (max-width: 1919px)')
  .set(Breakpoints.XXL, 'screen and (min-width: 1920px)')

  .set(Breakpoints.lsSM, 'screen and (max-width: 479px)')
  .set(Breakpoints.lsMD, 'screen and (max-width: 767px)')
  .set(Breakpoints.lsLG, 'screen and (max-width: 1023px)')
  .set(Breakpoints.lsXL, 'screen and (max-width: 1279px)')
  .set(Breakpoints.lsXXL, 'screen and (max-width: 1919px)')

  .set(Breakpoints.mrXS, 'screen and (min-width: 480px)')
  .set(Breakpoints.mrSM, 'screen and (min-width: 768px)')
  .set(Breakpoints.mrMD, 'screen and (min-width: 1024px)')
  .set(Breakpoints.mrLG, 'screen and (min-width: 1280px)')
  .set(Breakpoints.mrXL, 'screen and (min-width: 1920px)')

  .set(Breakpoints.Handset, '(max-width: 479px) and (orientation: portrait), (max-width: 959px) and (orientation: landscape)')
  .set(Breakpoints.Tablet, '(min-width: 478px) and (max-width: 839px) and (orientation: portrait), (min-width: 960px) and (max-width: 1279px) and (orientation: landscape)')
  .set(Breakpoints.Desktop, '(min-width: 840px) and (orientation: portrait), (min-width: 1280px) and (orientation: landscape)');

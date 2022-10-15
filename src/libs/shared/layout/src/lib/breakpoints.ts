/**
 * Основные брейкпоинты
 */
export enum ScBreakpoints {
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
export const MediaQueries = new Map<ScBreakpoints, string>()
  .set(ScBreakpoints.XS, 'screen and (max-width: 479px)')
  .set(ScBreakpoints.SM, 'screen and (min-width: 480px) and (max-width: 767px)')
  .set(ScBreakpoints.MD, 'screen and (min-width: 768px) and (max-width: 1023px)')
  .set(ScBreakpoints.LG, 'screen and (min-width: 1024px) and (max-width: 1279px)')
  .set(ScBreakpoints.XL, 'screen and (min-width: 1280px) and (max-width: 1919px)')
  .set(ScBreakpoints.XXL, 'screen and (min-width: 1920px)')

  .set(ScBreakpoints.lsSM, 'screen and (max-width: 479px)')
  .set(ScBreakpoints.lsMD, 'screen and (max-width: 767px)')
  .set(ScBreakpoints.lsLG, 'screen and (max-width: 1023px)')
  .set(ScBreakpoints.lsXL, 'screen and (max-width: 1279px)')
  .set(ScBreakpoints.lsXXL, 'screen and (max-width: 1919px)')

  .set(ScBreakpoints.mrXS, 'screen and (min-width: 480px)')
  .set(ScBreakpoints.mrSM, 'screen and (min-width: 768px)')
  .set(ScBreakpoints.mrMD, 'screen and (min-width: 1024px)')
  .set(ScBreakpoints.mrLG, 'screen and (min-width: 1280px)')
  .set(ScBreakpoints.mrXL, 'screen and (min-width: 1920px)')

  .set(ScBreakpoints.Handset, '(max-width: 479px) and (orientation: portrait), (max-width: 959px) and (orientation: landscape)')
  .set(ScBreakpoints.Tablet, '(min-width: 478px) and (max-width: 839px) and (orientation: portrait), (min-width: 960px) and (max-width: 1279px) and (orientation: landscape)')
  .set(ScBreakpoints.Desktop, '(min-width: 840px) and (orientation: portrait), (min-width: 1280px) and (orientation: landscape)');

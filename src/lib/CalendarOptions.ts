export interface ICalendarOptions {
  // Synced with Figma file variables
  textColorBase?: string;
  textColorSecondary?: string;
  textColorPrimary?: string;
  textColorMuted?: string;
  textColorBaseInverted?: string;
  textColorSecondaryInverted?: string;
  textColorPrimaryInverted?: string;

  lineColorPrimary?: string;

  surfaceColorBase?: string;
  surfaceColorDateActive100?: string;
  surfaceColorDateActive200?: string;
  surfaceColorDateFrame100?: string;
  surfaceColorDateFrame200?: string;
  surfaceColorDateSelection100?: string;
  surfaceColorDateSelection200?: string;

  spacingNull?: number;
  spacingSmall?: number;
  spacingBase?: number;
  spacingCalendarPadding?: number;
  spacingDateSize?: number;

  radiusNull?: number;
  radiusDay?: number;
  radiusControl?: number;
  radiusPanel?: number;


  // Synced with Figma styles
  otherMonthsOpacity?: string;
  baseFontSize?: string;

}

export const calendarOptions: ICalendarOptions = {
  textColorBase: "inherit",
  textColorSecondary: "#818181",
  textColorPrimary: "#0D7E2D",
  textColorMuted: "#b4b4b4",
  textColorBaseInverted: "#ffffff",
  textColorSecondaryInverted: "#ffffff99", // alpha
  textColorPrimaryInverted: "#faff00",

  lineColorPrimary: "#1b993e",

  surfaceColorBase: "#ffffff",
  surfaceColorDateActive100: "#f5f8fa",
  surfaceColorDateActive200: "#E8EDF0",
  surfaceColorDateFrame100: "#0e9233",
  surfaceColorDateFrame200: "#0D7E2D",
  surfaceColorDateSelection100: "#25b74e",
  surfaceColorDateSelection200: "#21b348",

  spacingNull: 0,
  spacingSmall: 4,
  spacingBase: 8,
  spacingCalendarPadding: 24,
  spacingDateSize: 24,

  radiusNull: 0,
  radiusDay: 0,
  radiusControl: 6,
  radiusPanel: 12,


  // Synced with Figma styles
  otherMonthsOpacity: "0.3",
  baseFontSize: "inherit",

};

export const variablesInStyle = `
  --textColorBase: ${calendarOptions.textColorBase};
  --textColorSecondary: ${calendarOptions.textColorSecondary};
  --textColorPrimary: ${calendarOptions.textColorPrimary};
  --textColorMuted: ${calendarOptions.textColorMuted};
  --textColorBaseInverted: ${calendarOptions.textColorBaseInverted};
  --textColorSecondaryInverted: ${calendarOptions.textColorSecondaryInverted};
  --textColorPrimaryInverted: ${calendarOptions.textColorPrimaryInverted};

  --lineColorPrimary: ${calendarOptions.lineColorPrimary};

  --surfaceColorBase: ${calendarOptions.surfaceColorBase};
  --surfaceColorDateActive100: ${calendarOptions.surfaceColorDateActive100};
  --surfaceColorDateActive200: ${calendarOptions.surfaceColorDateActive200};
  --surfaceColorDateFrame100: ${calendarOptions.surfaceColorDateFrame100};
  --surfaceColorDateFrame200: ${calendarOptions.surfaceColorDateFrame200};
  --surfaceColorDateSelection100: ${calendarOptions.surfaceColorDateSelection100};
  --surfaceColorDateSelection200: ${calendarOptions.surfaceColorDateSelection200};

  --inRangeBg100: ${calendarOptions.surfaceColorDateSelection100};
  --inRangeBg200: ${calendarOptions.surfaceColorDateSelection200};

  --spacingBase: ${calendarOptions.spacingBase}px;
  --spacingSmall: ${calendarOptions.spacingSmall}px;
  --spacingCalendarPadding: ${calendarOptions.spacingCalendarPadding}px;
  --spacingDateSize: ${calendarOptions.spacingDateSize}px;

  --radiusDay: ${calendarOptions.radiusDay}px;
  --radiusControl: ${calendarOptions.radiusControl}px;
  --radiusPanel: ${calendarOptions.radiusPanel}px;
  
  
  --otherMonthsOpacity: ${calendarOptions.otherMonthsOpacity};
  --baseFontSize: ${calendarOptions.baseFontSize};
`;

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
  disabledDaysOpacity?: string;
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
  disabledDaysOpacity: "0.4",
  otherMonthsOpacity: "0.1",
  baseFontSize: "inherit",

};


export const getStylingOptions = (reassignedOptions: ICalendarOptions) => {

  const calendarOptionsMerged: ICalendarOptions = {
    ...calendarOptions,
    ...reassignedOptions
  }

  return `
    --textColorBase: ${calendarOptionsMerged.textColorBase};
    --textColorSecondary: ${calendarOptionsMerged.textColorSecondary};
    --textColorPrimary: ${calendarOptionsMerged.textColorPrimary};
    --textColorMuted: ${calendarOptionsMerged.textColorMuted};
    --textColorBaseInverted: ${calendarOptionsMerged.textColorBaseInverted};
    --textColorSecondaryInverted: ${calendarOptionsMerged.textColorSecondaryInverted};
    --textColorPrimaryInverted: ${calendarOptionsMerged.textColorPrimaryInverted};
  
    --lineColorPrimary: ${calendarOptionsMerged.lineColorPrimary};
  
    --surfaceColorBase: ${calendarOptionsMerged.surfaceColorBase};
    --surfaceColorDateActive100: ${calendarOptionsMerged.surfaceColorDateActive100};
    --surfaceColorDateActive200: ${calendarOptionsMerged.surfaceColorDateActive200};
    --surfaceColorDateFrame100: ${calendarOptionsMerged.surfaceColorDateFrame100};
    --surfaceColorDateFrame200: ${calendarOptionsMerged.surfaceColorDateFrame200};
    --surfaceColorDateSelection100: ${calendarOptionsMerged.surfaceColorDateSelection100};
    --surfaceColorDateSelection200: ${calendarOptionsMerged.surfaceColorDateSelection200};
  
    --inRangeBg100: ${calendarOptionsMerged.surfaceColorDateSelection100};
    --inRangeBg200: ${calendarOptionsMerged.surfaceColorDateSelection200};
  
    --spacingBase: ${calendarOptionsMerged.spacingBase}px;
    --spacingSmall: ${calendarOptionsMerged.spacingSmall}px;
    --spacingCalendarPadding: ${calendarOptionsMerged.spacingCalendarPadding}px;
    --spacingDateSize: ${calendarOptionsMerged.spacingDateSize}px;
  
    --radiusDay: ${calendarOptionsMerged.radiusDay}px;
    --radiusControl: ${calendarOptionsMerged.radiusControl}px;
    --radiusPanel: ${calendarOptionsMerged.radiusPanel}px;
    
    
    --disabledDaysOpacity: ${calendarOptionsMerged.disabledDaysOpacity};
    --otherMonthsOpacity: ${calendarOptionsMerged.otherMonthsOpacity};
    --baseFontSize: ${calendarOptionsMerged.baseFontSize};
  `;
}

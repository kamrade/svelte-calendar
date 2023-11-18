export interface ICalendarOptions {
  // Synced with Figma file variables
  textColorBase?: string;
  textColorSecondary?: string;
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

  spacingNull?: string;
  spacingBase?: string;
  spacingCalendarPadding?: string;
  spacingDateSize?: string;

  radiusNull?: string;
  radiusDay?: string;
  radiusPanel?: string;


  // Synced with Figma styles
  otherMonthsOpacity?: string;
  baseFontSize?: string;

}

export const calendarOptions: ICalendarOptions = {
  textColorBase: "inherit",
  textColorSecondary: "#818181",
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

  spacingNull: "0",
  spacingBase: "8px",
  spacingCalendarPadding: "24px",
  spacingDateSize: "24px",

  radiusNull: "0",
  radiusDay: "0",
  radiusPanel: "12px",


  // Synced with Figma styles
  otherMonthsOpacity: "0.3",
  baseFontSize: "inherit",

};

export const variablesInStyle = `
  --textColorBase: ${calendarOptions.textColorBase};
  --textColorSecondary: ${calendarOptions.textColorSecondary};
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

  --spacingBase: ${calendarOptions.spacingBase};
  --spacingCalendarPadding: ${calendarOptions.spacingCalendarPadding};
  --spacingDateSize: ${calendarOptions.spacingDateSize};

  --radiusDay: ${calendarOptions.radiusDay};
  --radiusPanel: ${calendarOptions.radiusPanel};
  
  
  --otherMonthsOpacity: ${calendarOptions.otherMonthsOpacity};
  --baseFontSize: ${calendarOptions.baseFontSize};
`;

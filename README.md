# Svelte Date (Range) Picker

Simple and reusable date (range) picker. Project still in development.
It will be ready for use very soon.

## Installation

The package can be installed via npm:

```bash
npm install @kamrade/svelte-datepicker --save
```

or via yarn:

```bash
yarn add @kamrade/svelte-datepicker
```

## Figma Showcase

Duplicate [this](https://www.figma.com/file/4uDj3R8A2r9vXdIlkkveXl/Calendar?type=design&node-id=4%3A246&mode=design&t=vOZH9iLHEahf1MgX-1)
figma file. Change the variables and import to your figma project. Figma variables are synchronized with package.

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

## Roadmap

### All

- [ ] Unit tests

### Dropdown

[ ] Correct direction according to the position on the screen

### Calendar

- [x] value + onChange mechanism
- [x] styling options (css variables and js object)
- [x] reassign variables
- [x] week starts from ...
- [ ] value - only in Range
    - [ ] can't be bigger than
    - [ ] can't be smaller than
- [ ] additional buttons for change year
- [x] Custom icons
- [ ] Dropdown for Month and Year
- [ ] Internationalization
- [ ] 2 month
- [ ] Appearing animation
- [ ] Allow single date range
- [ ] Single date control

### DateRangePicker

- [x] value + onChange mechanism
- [x] Calendar props (styling, weekStarts)
- [ ] Disabled, disabled start date, disabled end date
- [ ] Readonly
- [ ] Clear dates button
- [ ] Custom display format
- [ ] Calendar icon, customization
- [ ] Control styling
- 

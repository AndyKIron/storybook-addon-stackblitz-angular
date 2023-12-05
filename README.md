# Storybook Addon storybook-addon-stackblitz
Open story example (angular only for now) on StackBlitz

- Install addon
```bash
npm i -D @ironsource/storybook-addon-stackblitz
```
- Add addon to your .storybook/main.js file
```js
module.exports = {
  ...
  addons: [
    ...
    '@ironsource/storybook-addon-stackblitz'
  ],
  ...
};
```

- In your project .storybook/preview.js file add dependency for your components in property ***stackblitzAdditionalDependency*** lib:
```ts
export const parameters = {
    actions: {argTypesRegex: '^on[A-Z].*'},
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/
        }
    },
    docs: {inlineStories: true},
    stackblitzAdditionalDependency: {
        "@ironsource/fusion-ui": '5.1.0-rc.5'
    },
    ...
};
```
- In your component story you need put standalone (angular 14+) component wrapper code in Story.parameters.docs.source.
- Example:
```ts
parameters: {
        docs: {
            source: {
                language: 'typescript',
                code: dedent`
    import { Component } from '@angular/core';
    import {
      CalendarModule,
      CalendarType,
      CalendarComponentConfigurations,
      Day,
    } from '@ironsource/fusion-ui/components/calendar';
    import { DaterangeSelection } from '@ironsource/fusion-ui/components/daterange';

    @Component({
      selector: 'fusion-story-wrapper',
      template: \`<div style="width: 250px; margin: auto">
            <fusion-calendar
                (daySelected)="daySelected($event)"
                [configuration]="configuration"
            >
            </fusion-calendar>
    </div>\`,
      standalone: true,
      imports: [CalendarModule],
    })
    export class FusionStoryWrapperComponent {
      configuration: CalendarComponentConfigurations = {
        parentDaterangeId: 'calendar_id_123',
        allowFutureSelection: true,
        calendarType: CalendarType.DATE_PICKER,
        month: new Date(),
        selection: { date: null } as DaterangeSelection,
      };

      daySelected(selectedDate: Day) {
        console.log('Date selected: ', selectedDate);
      }
    }
    `,
                format: true,
                type: 'code'
            }
        }
    }
```
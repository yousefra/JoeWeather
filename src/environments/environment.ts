// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    weatherApi: 'http://api.openweathermap.org/data/2.5/',
    weatherApiKey: '665ccf1ba2742dca552888bc677e12ff',
    colors: {
        '01': '#5F4EEA',
        '02': '#28E0AE',
        '03': '#FF0090',
        '04': '#FFAE01',
        '09': '#2299F9',
        '10': '#5F4EEA',
        '11': '#D0DDF7',
        '13': '#DA2727',
        '50': '#5F4EEA'
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

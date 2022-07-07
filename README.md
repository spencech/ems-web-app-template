# EMS Web Application Template

This is a foundational template for web applications developed by [Educational Media Solutions](https://educationalmediasolutions.com).

The template in its default/unextended state can be viewed here: [EMS Web Application Template](https://ems-web-app.educationalmediasolutions.com).


## Usage: Local Development

	npm i 
	ng serve

## Usage: Production

	cp src/html/index.prod.example src/html/index.prod.html
	ng build

The "index.prod.html" file can include analytics and other production only content. Note that this file is git-ignored.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

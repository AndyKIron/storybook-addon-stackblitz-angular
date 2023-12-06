const TSCONFIG_JSON = `{
"compileOnSave": false,
  "compilerOptions": {
    "outDir": "./dist/out-tsc",
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "ES2022",
    "module": "ES2022",
    "useDefineForClassFields": false,
    "lib": ["ES2022", "dom"]
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}`;
const ANGULAR_JSON = `{
"$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "cli": {
    "analytics": "1e1de97b-a744-405a-8b5a-0397bb3d01ce"
  },
  "newProjectRoot": "projects",
  "projects": {
    "demo": {
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:application",
          "configurations": {
            "development": {
              "extractLicenses": false,
              "namedChunks": true,
              "optimization": false,
              "sourceMap": true
            },
            "production": {
              "aot": true,
              "extractLicenses": true,
              "namedChunks": false,
              "optimization": true,
              "outputHashing": "all",
              "sourceMap": false
            }
          },
          "options": {
            "assets": [],
            "index": "src/index.html",
            "browser": "src/main.ts",
            "outputPath": "dist/demo",
            "scripts": [],
            "styles": ["src/global_styles.css"],
            "tsConfig": "src/tsconfig.app.json"
          }
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "configurations": {
            "development": {
              "buildTarget": "demo:build:development"
            },
            "production": {
              "buildTarget": "demo:build:production"
            }
          },
          "defaultConfiguration": "development"
        }
      },
      "prefix": "app",
      "projectType": "application",
      "root": "",
      "schematics": {},
      "sourceRoot": "src"
    }
  },
  "version": 1
}`;
const INDEX_HTML = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>My app</title>
    <meta charset="UTF-8" />
  </head>
  <body>
    <app-root>Loading...</app-root>
  </body>
</html>
`;
const MAIN_TS = `
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { FusionStoryWrapperComponent } from './wrapper.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WrapperComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}

bootstrapApplication(AppComponent).catch((err) => console.error(err));
`;
const STYLES_CSS = `/* Add application styles & imports to this file! */`;
const APP_COMPONENT_HTML = `<div class="component-wrapper">
  <!--FusionUI component story-->
  <fusion-story-wrapper></fusion-story-wrapper>
  <!--FusionUI component story-->
</div>`;
const APP_COMPONENT_CSS = `:host {
  display: block;
  position: relative;
  font-family: HelveticaNeue, helvetica;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.component-wrapper {
  margin: 25px;
}
`;
const WRAPPER_COMPONENT = `import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'fusion-story-wrapper',
  template: \`Story code not found\`,
  standalone: true,
  imports: [CommonModule],
})
export class FusionStoryWrapperComponent {}`;

export const ANGULAR_PROJECT_PLAYGROUND = {
  files: {
    'angular.json': ANGULAR_JSON,
    'tsconfig.json': TSCONFIG_JSON,
    'src/main.ts': MAIN_TS,
    'src/index.html': INDEX_HTML,
    'src/styles.css': STYLES_CSS,
    'src/app.component.html': APP_COMPONENT_HTML,
    'src/app.component.css': APP_COMPONENT_CSS,
    'src/wrapper.component.ts': WRAPPER_COMPONENT
  },
  title: "FusionUI {component} example",
  description: 'Created with <3 by the StackBlitz SDK!',
  template: 'angular-cli',
  dependencies: {
    "rxjs": "7.8.1",
    "tslib": "2.6.2",
    "zone.js": "0.14.2",
    "@angular/core": "17.0.5",
    "@angular/forms": "17.0.5",
    "@angular/common": "17.0.5",
    "@angular/router": "17.0.5",
    "@angular/compiler": "17.0.5",
    "@angular/animations": "17.0.5",
    "@angular/platform-browser": "17.0.5",
  },
  settings: {
    compile: {
      trigger: 'auto',
      action: 'hmr'
    }
  }
};

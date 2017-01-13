# Angular2 seed project using webpack

## Movation 
The goal of this repo is introduce how to setup an empty, prue clean angular 2 project using webpack 2

## Let's start
* Create an empty npm package
```bash
mkdir angular2-webpack-seed
cd angular2-webpack-seed
# Create package.json
npm init
```
`package.json` is generated, remove some properies like below
```json
{
  "name": "ng2demo",
  "version": "1.0.0",
  "description": "",
  "scripts": {
  },
  "author": ""
}
```

* Init Git repo
```bash
git init
```

* Install webpack 2
```bash
npm install webpack@beta --save-dev
```
webpack is a dev tool, it is not used in product souce code, so we use `--save-dev` option
* Create `.gitignore` file for ignore some careless files
```text
node_modules\
```

* Create file and folder structure for angular 2
```text
│   .gitignore
│   package.json
│
└───src
    │   index.html
    │   main.ts
    │
    └───app
            app.component.html
            app.component.less
            app.component.ts
            app.module.ts
```

* Enrich content for entry html, index.html
```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title></title>
  <base href="/">

  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <app-root>Loading...</app-root>
<script type="text/javascript" src="main.js"></script></body>
</html>
```
* Add simple html in app/app.component.html
```html
<h1>
    {{title}}
</h1>
```
* Add simple style in app/app.component.less
```less
h1 {
    color: red;
}
```

* Add component content in app/app.component.ts
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: require('./app.component.html'),
  styles: [require('./app.component.less')]
})
export class AppComponent {
  title = 'app works!';
}
```
require will extend refernce file's content to here, if don't use require, we can use `templateUrl` and `styleUrls`
```typescript
templateUrl: 'src/app/app.component.html',
styleUrls: ['src/app/app.component.less']
```

* Add component in module, app.module.ts
```typescript
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Now we import these stuff
```typescript
import { Component } from '@angular/core'; //in app.component.ts
import { NgModule } from '@angular/core'; //in app.module.ts
```

* These imports depend on `@angular/core`, let's install it
```bash
npm install @angular/core --save
```
`@angular/core` is used in souce code, it is not a dev tool, so we use `--save` option, not `--save-dev`

`@angular/core` also depends on `rxjs` and `zone.js`
```text
ng2demo@1.0.0 F:\dev\ng2demo
+-- @angular/core@2.4.3
+-- UNMET PEER DEPENDENCY rxjs@^5.0.1
`-- UNMET PEER DEPENDENCY zone.js@^0.7.2
```

* Let's install rxjs, zone.js
```bash
npm install rxjs zone.js --save
```

* Create `webpack.config.js` in root folder, add configuartion
```javacript
module.exports = {
    entry: './src/main.ts',
    output: {
        filename: '[name].js',
        path: 'dist'
    }
}
```
We just write a very simple webpack config file, we will meet many problems, let's fix them one by one. Running `webpack`, or runing `webpack --config webpack.config.js`. Due to ues default filename webpack.config.js, --config is optional. 

Errors
```text
ERROR in ./src/main.ts
Module not found: Error: Can't resolve './app/app.module' in 'F:\dev\ng2demo\src'
 @ ./src/main.ts 3:0-45

ERROR in ./src/main.ts
Module not found: Error: Can't resolve '@angular/platform-browser-dynamic' in 'F:\dev\ng2demo\src'
 @ ./src/main.ts 1:0-75
 ```
 * According to the message, need to add `resolve` property in webpack.config.js
 
 empty '' is removed from webpack2, in webpack1 need to add it, looks like extensions: ['', '.js', '.ts']
 
 ```javascript
 resolve: {
     extensions: ['.js', '.ts']
 }
 ```
 

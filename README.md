# Angular2 seed project using webpack

## Motivation 
The goal of this repo is introduce how to setup an empty, prue clean angular 2 project using webpack 2. The reason why we need an empty angular2+webpack project. Because the offical seed project is build up by angularcli, its disadvanage is lower configurable than webpack. The other hand, setup a seed project is a good practise to understand modules dependency of angular2, and good understand to webpack configuration
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
</body>
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

* Add content for root module main.ts
```typescript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
```

Now we have imported these stuff
```typescript
import { Component } from '@angular/core'; //in app.component.ts
import { NgModule } from '@angular/core'; //in app.module.ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'; //in main.ts
```

* These imports depend on `@angular/core` and `@angular/platform-browser-dynamic`, let's install it
```bash
npm install @angular/core @angular/platform-browser-dynamic --save
```
`@angular/core` and ``@angular/platform-browser-dynamic` is used in souce code, it is not a dev tool, so we use `--save` option, not `--save-dev`

`@angular/core` also depends on `rxjs` and `zone.js`
```text
ng2demo@1.0.0 F:\dev\ng2demo
+-- @angular/core@2.4.3
+-- UNMET PEER DEPENDENCY rxjs@^5.0.1
`-- UNMET PEER DEPENDENCY zone.js@^0.7.2
```
* Let's install `rxjs`, `zone.js`
```bash
npm install rxjs zone.js --save
```

`@angular/platform-browser-dynamic` also depends on `@angular/common`, `@angular/compiler` and `@angular/platform-browser`
```text
+-- UNMET PEER DEPENDENCY @angular/common@2.4.3
+-- UNMET PEER DEPENDENCY @angular/compiler@2.4.3
+-- UNMET PEER DEPENDENCY @angular/platform-browser@2.4.3
`-- @angular/platform-browser-dynamic@2.4.3
```

* Install `@angular/common`, `@angular/compiler` and `@angular/platform-browser`
```bash
npm install @angular/common @angular/compiler @angular/platform-browser --save
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
 
 Run webpack, still have errors
 ```text
 ERROR in ./src/app/app.module.ts
Module parse failed: F:\dev\ng2demo\src\app\app.module.ts Unexpected character '@' (5:0)
You may need an appropriate loader to handle this file type.
| import { AppComponent } from './app.component';
|
| @NgModule({
|   declarations: [
|     AppComponent
 @ ./src/main.ts 3:0-45
 ```
 
 `@NgModule` is not recognized, maybe typescript is not recogrnized, let's us add `ts-loader` to have a try.
 ```bash
 npm install ts-loader --save-dev
 ```
 * Add content in `webpack.config.js`
 ```javascript
  module: {
        rules: [
            {
                exclude: /node_modules/,
                loader: 'ts-loader',
                test: /\.ts$/,
            }
        ]
    }
```
Run webpack, still have errors
```text
ERROR in ./src/main.ts
Module build failed: Could not load TypeScript. Try installing with `npm install typescript`. If TypeScript is installed globally, try using `npm link typescript`.
```
* Install typescript
```bash
npm install typescript --save-dev
```
Run webpack, still have errors
```text
ERROR in error TS18002: The 'files' list in config file 'tsconfig.json' is empty.

ERROR in ./src/main.ts
Module build failed: error while parsing tsconfig.json
```

* New add tsconfig.json, can refer to [tsconfig.json](http://www.typescriptlang.org/docs/handbook/tsconfig-json.html) page
```json
{
    "compilerOptions": {
        "declaration": true,
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "module": "commonjs",
        "moduleResolution": "node",
        "removeComments": false,
        "sourceMap": true,
        "suppressImplicitAnyIndexErrors": true,
        "target": "es5"
    },
    "exclude": [
        "node_modules"
    ]
}
```

Run webpack, still have many errors
```text
ERROR in F:\dev\ng2demo\node_modules\@angular\compiler\src\i18n\extractor.d.ts
(14,33): error TS2304: Cannot find name 'Promise'.

ERROR in F:\dev\ng2demo\node_modules\@angular\compiler\src\output\output_ast.d.ts
(433,63): error TS2304: Cannot find name 'Set'.

ERROR in F:\dev\ng2demo\node_modules\@angular\core\src\di\reflective_provider.d.ts
(88,165): error TS2304: Cannot find name 'Map'.

ERROR in ./src/app/app.component.ts
(5,13): error TS2304: Cannot find name 'require'.
```
They are caused by no import typescript definition files, we can import a tool typings, it is a [typescript definition manager](https://github.com/typings/typings). Use typings to generate `.d.ts` files

* Install typings
```bash
npm install typings --save-dev
```
`require` is keyword of node, so we need to import typescript definition `.d.ts` file. I don't know where can be imported `Promise`, `Set`, `Map`. But refer to other project, it's imported from `core-js`.

* Search `node` typescript definition file 
```bash
typings search --name node
```
Search result
```text
Viewing 2 of 2

NAME SOURCE HOMEPAGE           DESCRIPTION VERSIONS UPDATED
node dt     http://nodejs.org/             2        2017-01-10T23:30:17.000Z
node env                                   4        2017-01-02T17:57:25.000Z
```
* Search `core-js` typescript definition file
```bash
typings search --name core-js
```
Search result
```text
Viewing 1 of 1

NAME    SOURCE HOMEPAGE                             DESCRIPTION VERSIONS UPDATED
core-js dt     https://github.com/zloirock/core-js/             2        2016-11-30T13:37:42.000Z
```
* Install `node` and `core-js` ts definition file
```bash
typings install dt~node dt~core-js --global --save
```
This will generate `typings.json` file. It stored configuration so we only need to typings install without more options next time. `typings install` will create a `typings` folder which has a `index.d.ts` file, the file recored its dependency.

typings.json content
```json
{
  "globalDependencies": {
    "core-js": "registry:dt/core-js#0.9.7+20161130133742",
    "node": "registry:dt/node#7.0.0+20170110233017"
  }
}
```

* Add `typings install` to `package.json`, as `build` command
```json
"scripts": {
    "build": "npm install && typings install"
  }
```

Continue run webpack, still found errors
```text
ERROR in ./src/app/app.component.html
Module parse failed: F:\dev\ng2demo\src\app\app.component.html Unexpected token (1:0)
You may need an appropriate loader to handle this file type.
| <h1>
|     {{title}}
| </h1>
 @ ./src/app/app.component.ts 18:18-49
 @ ./src/app/app.module.ts
 @ ./src/main.ts
 ```
 
 * According to error message, we know webpack need a loader for html parsing, add `raw-loader` for html
 
 ```bash
 npm install raw-loader --save-dev
 ```
* Add html loader in module->rules of `webpack.config.js`

```js
{
    exclude: /node_modules/,
    loader: 'raw-loader',
    test: /\.html$/,
},
```         
Running webpack, found that no errors. Actually we should meet less parse error, but now less file has no content. 

* Add content in `app.component.less`

```less
h1 {
  color: red;
}
```

Errors showing for webpack running

```text
ERROR in ./src/app/app.component.less
Module parse failed: F:\dev\ng2demo\src\app\app.component.less Unexpected token (1:3)
You may need an appropriate loader to handle this file type.
| h1 {
|     color: red;
| }
 @ ./src/app/app.component.ts 19:17-48
 @ ./src/app/app.module.ts
 @ ./src/main.ts
 ```
 
* Introduce `less-loader`
 
```bash
npm install less-loader --save-dev
```
 Less-loader has dependency with `less`
 
```text
 +-- UNMET PEER DEPENDENCY less@^2.3.1
`-- less-loader@2.2.3
```

* Install `less`
 
 ```bash
npm install less --save-dev
```

* Add less-loader configuration in webpack.config.js
```js
{
    exclude: /node_modules/,
    loader: 'less-loader',
    test: /\.less$/,
},
```

Only add `less-loader` can't fix less file parse error. Need to introduce `raw-loader`, raw-loader is for loading file as string.
* Install raw-loader
```bash
npm install raw-loader --save-dev
```

* Add raw-loader configuration in webpack.config.js
```js
{
    exclude: /node_modules/,
    loaders: ['raw-loader', 'less-loader'],
    test: /\.less$/,
},
```
Now all webpack executing errors are fixed. webpack command running successfully. Next step we will see what's result the simple web app running in browser. Firstly install a tool for running http service. We will use `webpack-dev-server`

webpack generated dist folder and some files etc bundles
```text
├───dist
│   │   main.js
│   │
│   └───src
│       │   main.d.ts
│       │
│       └───app
│               app.component.d.ts
│               app.module.d.ts
```

* Install webpack-dev-server
```bash
npm install webpack-dev-server --save-dev
```

* Add webpack-dev-server to package.json as npm start script
```json
"scripts": {
  "start": "webpack-dev-server --inline --progress --port 8080"
},
```

* Execute `npm start` command
```bash
npm start
```
webpack-dev-server hosts http service on port 8080, open browser, access "http://localhost:8080", only list some file structure, this is because http service doesn't find entry index html. Let's introduce a new tool [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin), it creates htmls to serve webpack bundles

* Install html-webpack-plugin
```bash
npm install html-webpack-plugin --save-dev
```

* Configure html-webpack-plugin in webpack.config.js
```js
// Add before module.exports
var HtmlWebpackPlugin = require('html-webpack-plugin');
// Add plugins property in module.exports
plugins: [
    new HtmlWebpackPlugin({
        template: 'src/index.html'
    })
],
```

Show these errors in chrome browser running `npm start` to start webpack-dev-server
```text
Uncaught reflect-metadata shim is required when using class decorators
```
This error denotes [reflect-metadata](https://github.com/rbuckton/reflect-metadata) is lost in our product source code. Here you can introduce `reflect-metadata`, add it to package.json. But we will use `core-js`, because we already used it's typescript definition file in typings.json

* Install core-js
```bash
npm install core-js --save
```

* New add a file in src folder, ployfills.ts
```typescript
import 'core-js/es6/reflect';

import 'core-js/es7/reflect';
```

* Import ployfills in main.ts, add one line in main.ts
```typescript
import './ployfills'
```

The next error is 
```text 
Uncaught (in promise) Error: Angular requires Zone.js prolyfill.
    at new NgZone (main.js:24049)
    at PlatformRef_._bootstrapModuleFactoryWithZone (main.js:30419)
```

* Add zone.js in ployfills.ts
```typescript
import 'zone.js/dist/zone';
```

Next errors
```text
Unhandled Promise rejection: No ErrorHandler. Is platform module (BrowserModule) included? ; Zone: <root> ; Task: Promise.then ; Value: ZoneAwareError {stack: "Error: No ErrorHandler. Is platform module (Browse…(http://localhost:8080/main.js:72809:35) [<root>]", message: "No ErrorHandler. Is platform module (BrowserModule) included?", originalStack: "Error: No ErrorHandler. Is platform module (Browse…askQueue (http://localhost:8080/main.js:72809:35)", zoneAwareStack: "Error: No ErrorHandler. Is platform module (Browse…(http://localhost:8080/main.js:72809:35) [<root>]", name: "Error"} Error: No ErrorHandler. Is platform module (BrowserModule) included?
    at http://localhost:8080/main.js:30427:23 [angular]
    at Object.onInvoke (http://localhost:8080/main.js:24226:37) [angular]
    at Zone.run (http://localhost:8080/main.js:72489:43) [<root> => angular]
    at NgZone.run (http://localhost:8080/main.js:24095:62) [<root>]
    at PlatformRef_._bootstrapModuleFactoryWithZone (http://localhost:8080/main.js:30422:23) [<root>]
    at http://localhost:8080/main.js:30473:59 [<root>]
    at Zone.run (http://localhost:8080/main.js:72489:43) [<root> => <root>]
    at http://localhost:8080/main.js:72911:57 [<root>]
    at Zone.runTask (http://localhost:8080/main.js:72527:47) [<root> => <root>]
    at drainMicroTaskQueue (http://localhost:8080/main.js:72809:35) [<root>]
```

Seem lost BrowserModule, Angular2 needs it.

* Import BrowserModule in app.module.ts
```typescript
import { BrowserModule } from '@angular/platform-browser';

// Add it to @NgModule
imports: [BrowserModule],
```

Now web page is showing successfully. You can have a try running the two commands `npm run build` and `npm start`. Next step, we will introduce `tslint` and `tslint-loader` for code style checking

* Install tslint and tslint-loader
```bash
npm install tslint tslint-loader --save-dev
```

* Init a tsling.json
```bash
tslint --init
```

* Add tslint-loader configuration in webpack.config.js
```javascript
{
    enforce: 'pre',
    exclude: /node_modules/,
    loader: 'tslint-loader',
    test: /\.ts$/,
},
```         

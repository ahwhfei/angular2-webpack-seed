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
package.json is generated, remove some properies like below
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

* Create .gitignore file for ignore some careless files
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
* App simple style in ap/app.component.less
```less
h1 {
    color: red;
}
```

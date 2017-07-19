![](https://media.giphy.com/media/woOxBpJ5FcndK/giphy.gif)

![node-version](https://img.shields.io/node/v/generator-yo-ng-js.svg)
![dependencies](https://david-dm.org/aarr0n/yo-ng-js.svg)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


Yeoman Generator for AngularJs. Generate either a component, directive, controller, service or a filter.

You'll get prompted with the follow questions; you can skip the first two questions by using arguments (see below):

- What you want to generate; controller, component etc
- It's name
- Whether an Angular module should also be generated
- The name of the Angular module

# Install

Install [Yeoman](http://yeoman.io/) and yo-ng-js.

```
npm install -g yo generator-yo-ng-js
```


# Usage

Run the generator by using the following:

```
yo yo-ng-js
```

For example, creating a component called `example` will produce the following (components and directives will generate an associated controller and template):

```
example/
  example.component.js
  example.controller.js
  example.html
  example.js
```

## Using Arguments

You can shortcut the first two questions by passing some arguments.

Pass what you want to generate as the first argument.

```
yo yo-ng-js component
```

Pass the name of your choice as the second argument.

```
yo yo-ng-js component my-component-name
```

# Create an Alias

Add the following to your `~/.bash_aliases`.

```
ng() {
  yo yo-ng-js "$1" "$2"
}
```

Then you can just run:

```
ng component my-component-name
```

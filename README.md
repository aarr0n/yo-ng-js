![](https://media.giphy.com/media/woOxBpJ5FcndK/giphy.gif)

![node-version](https://img.shields.io/node/v/generator-yo-ng-js.svg)
![dependencies](https://david-dm.org/aarr0n/yo-ng-js.svg)

Yeoman Generator for AngularJs. Generate either a component, directive, controller, service or a filter.

You'll get prompted for the following:

- What you want to generate; controller, component etc
- It's name
- Whether an Angular module should also be generated
- The name of the Angular application (to be used with the module)

# Generating Components and Directives

Components and directives will generate an associated controller and template.

# Usage

## Install

Install [Yeoman](http://yeoman.io/) and yo-ng-js.

```
npm install -g yo generator-yo-ng-js
```

## Get Prompted

Get prompted for what you need to generate; component, directive etc.

```
yo yo-ng-js
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

## Create an Alias

Add the following to your `/.bash_aliases`.

```
ng() {
  yo yo-ng-js "$1" "$2"
}
```

Then you can just run

```
ng component my-component-name
```

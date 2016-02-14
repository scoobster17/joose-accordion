# Joose Accordion Component

A lightweight, unstyled accordion component. This component belongs to the Joose component library, but can be used completely independently.

Please see [joose](https://github.com/scoobster17/joose) for the whole component library.

The package includes basic a basic CSS file (along with source Sass files) to handle the showing and hiding of content as an example. No styling has been applied other than simple show/hide. You can utilise the existing HTML as per the example, or you can add your own classes / selectors of your choice and customise as you wish, for example to add animations.

## Installation

To install this component independenty using [bower](http://bower.io/search/?q=joose-accordion) use the following command:

`bower install joose-accordion`

To install this component independently using [npm](https://www.npmjs.com/package/joose-accordion)

`npm install joose-accordion`

## Usage

There are two types of accordion that can be created; the only difference is whether you can open one or multiple sections at once.

  - Single view accordion (collapses other content)  
    `var componentAccordion = new joose.classes.Accordion('componentContainer', false);`  
    or  
    `<section id="accordionContainer" data-component="accordion" data-multiView="false">`

  - Multi-view accordion (can view more than one portion at a time)  
    `var componentAccordion = new joose.classes.Accordion('componentContainer', true);`  
    or  
    `<section id="accordionContainer" data-component="accordion" data-multiView="true">`

On page load the script searches the page for the `data-component` attribute to pick up any components that haven't been manually initialised using the `new` keyword as demonstrated above.

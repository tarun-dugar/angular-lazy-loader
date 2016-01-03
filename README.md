#angular-lazy-loader

AngularJS lazy loading directive for lazy loading images and videos(via iframe).

Description
-----------

A very basic and lightweight AngularJS directive to lazy load images and iframes inside the directive element. The media (iframe/image) gets loaded only when completely inside the viewport.

Installation
------------

```code
npm install angular-lazy-loader
```

Usage
-----------

1. Include angular-lazy-loader.min.js after the angularjs library.
2. Add the 'angular-lazy-loader' module to your app as follows:
    ```javascript
    angular.module('yourApp', ['angular-lazy-loader'])
    ```

3. Add the attribute (directive) 'angular-lazy-load' to the HTML element within which you want to lazy load images and iframes:
    ```javascript
    <div angular-lazy-load>
    </div>
    ```
    
4. Replace 'src' attribute of 'img' and 'iframe' tags with 'data-src':
    ```html
    <img data-src="<your_url>" />
    ```

Demo
-----------

An example has been included in the 'example' folder in the repository. 


Future Scope
------------

1. Will add basic animation support for DaneDen's 'animate.css': https://daneden.github.io/animate.css/

2. Support for lazy loading media element when it is partially in the viewport.

3. All suggestions and feature requests are welcome!



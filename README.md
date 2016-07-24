#angular-lazy-loader

AngularJS lazy loading directive for lazy loading images and videos(via iframe).

Description
-----------

A 1 kB minimalistic and lightweight AngularJS directive to lazy load images and iframes.

Installation
------------

```code
npm install angular-lazy-loader
```

Demo
-----------

http://tarun-dugar.github.io/angular-lazy-loader/

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

4. Optionally, set the threshold attribute that accepts a pixel value to load the asset when it is 'threshold' pixels away (vertically) from the viewport.

    ```javascript
    <div angular-lazy-load threshold="200">
    </div>
    ```
    
4. Replace 'src' attribute of 'img' and 'iframe' tags with 'data-src':
    ```html
    <img data-src="<your_url>" />
    ```



# jquery.overflow

Version 1.0.0

## Summary

A jQuery plugin for responding to elements that have overflowed the viewport.

jQuery.overflow allows you to fire two separate callbacks. One callback `over` which fires continuously when an 
element is outside of the viewport (fully or partially) and another `under` that fires once when an overflowed 
element is no longer overflowed from a direction (top, right, bottom, or left).

A practical usage example might be keeping a popup message box visible when a browser window is being resized: often
a popup message box should display to one side of an element in larger viewport conditions but when the viewport reaches
a smaller dimension that same message box should be able to intelligently relocate itself elsewhere. jQuery.overflow
provides an easy and semantic mechanism for responding to situations like these and many others.

## Author

Wil Neeley ( [@wilneeley](http://twitter.com/wilneeley) / [github.com](https://github.com/Xaxis) )

## Usage

Include `jquery.overflow.min.js` after jQuery.

### React to Overflowing Elements

The following example repositions an element based on the direction of its overflow. In this instance a message box 
overflows on the right side of the screen and is then repositioned above its target. When the message box would no 
longer overflow (upon continued screen resize) it is placed back where it started (using 
[jQuery.boxel](https://github.com/Xaxis/jquery.boxel)).

```css
#rel {
    width: 400px;
    height: 260px;
    float: right;
}
.box {
    width: 200px;
    border: 1px dashed black;
    position: absolute;
}
```

```html
<button id="rel">relative element</button>
<div id="box" class="box">message box</div>
```

```javascript
    var box = $('#box');
    var rel = $('#rel');

    // Position element using jQuery.boxel
    box.boxel({pos: 'r', rel: rel});
    $(window).on('resize', function() {
        box.boxel({pos: 'r', rel: rel});
    });

    // jQuery.overflow demo
    $('.box').overflow({
        load: true,
        over: function(dir, dist) {
            if (dir == 'right') {
                box.boxel({pos: 't', rel: rel});
            }
        },
        under: function(dir, dist) {
            if (dir == 'right') {
                box.boxel({pos: 'r', rel: rel});
            }
        }
    });
```

One other property `load` passed to jQuery.overflow determines if the `over` and `under` callbacks are to fire once on
load. By default `load` is `true`.

For a clearer example see `test/test.html`.

## Examples

See `test/test.html`.

## Changelog

### Version 1.0.0

* initial release

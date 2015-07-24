/**
 * jQuery.overflow
 *
 * (a) Wil Neeley
 * (c) Code may be freely distributed under the MIT license.
 */
;(function ( $, window, document, undefined ) {

  "use strict";

  var
    plugin_name   = 'overflow',
    defaults      = {
      load:       true,
      over:       function(){},
      under:      function(){}
    };

  // Plugin constructor
  function Plugin( element, options ) {
    this._name = plugin_name;
    this._defaults = defaults;
    this.element = element;
    this.options = $.extend({}, defaults, options);
    this.init();
  }

  // Extend plugin prototype
  $.extend(Plugin.prototype, {

    // Initialization method
    init: function() {
      var
        self      = this;
      if (this.options.load) this.watchForOverflows();
      $(window).on('resize', function() {
        self.watchForOverflows.call(self);
      });
    },

    /**
     * Triggers appropriate callbacks on elements upon overflow/underflow conditions.
     */
    watchForOverflows: function() {
      var
        self        = this,
        elms        = $(this.element);

      // Iterate over selected elements
      elms.each(function(idx, elm) {
        var
          $elm        = $(elm),
          e_offs      = $elm.offset(),
          e_y         = e_offs.top,
          e_x         = e_offs.left,
          e_h         = $elm.outerHeight(),
          e_w         = $elm.outerWidth(),
          w_h         = $(window).outerHeight(),
          w_w         = $(window).outerWidth(),
          dir         = false,
          dist        = 0;

        // Overflows right
        if (w_w < (e_x + e_w)) {
          dir = 'right';
          dist = (e_x + e_w) - w_w;
          self.options.over(dir, dist);
          $elm.data(dir, true);
        }
        else if ($elm.data('right')) {
          dir = 'right';
          dist = (e_x + e_w) - w_w;
          $elm.data(dir, false);
          self.options.under(dir, dist);
        }

        // Overflows left
        if (e_x < 0) {
          dir = 'left';
          dist = e_x;
          self.options.over(dir, dist);
          $elm.data(dir, true);
        }
        else if ($elm.data('left')) {
          dir = 'left';
          dist = e_x;
          $elm.data(dir, false);
          self.options.under(dir, dist);
        }

        // Overflows top
        if (e_y < 0) {
          dir = 'top';
          dist = e_y;
          self.options.over(dir, dist);
          $elm.data(dir, true);
        }
        else if ($elm.data('top')) {
          dir = 'top';
          dist = e_x;
          $elm.data(dir, false);
          self.options.under(dir, dist);
        }

        // Overflows bottom
        if (w_h < (e_y + e_h)) {
          dir = 'bottom';
          dist = (e_y + e_h) - w_h;
          self.options.over(dir, dist);
          $elm.data(dir, true);
        }
        else if ($elm.data('bottom')) {
          dir = 'bottom';
          dist = e_x;
          $elm.data(dir, false);
          self.options.under(dir, dist);
        }
      });
    }
  });

  // Plugin wrapper
  $.fn[plugin_name] = function ( options ) {
    return this.each(function () {
      $.data(this, 'plugin_' + plugin_name, new Plugin( this, options ));
    });
  };

})( jQuery, window, document );

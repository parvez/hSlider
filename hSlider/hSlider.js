/*!
 * jQuery Horizontal Slider 1.0
 * http://www.parvez.me/
 *
 * Copyright 2012, Parvez Husain
 * Licensed under the MIT License (http://opensource.org/licenses/MIT)
 *
 * Date: Feb 13 2013
 *
 * Usage:
 * 
 * $("#mydiv").hSlider({
 *   "ticks": [0, 10, 33.33, 50, 66.66, 100]                // Intervals
 * });
 * 
 * <div id="mydiv">
 *   <ul>
 *     <li style="background-color:pink;">Panel 1</li>       // large Top Panels
 *     <li style="background-color:green;">Panel 2</li>
 *     <li style="background-color:yellow;">Panel 3</li>
 *     <li style="background-color:pink;">Panel 4</li>
 *   </ul>
 *   <ul>
 *     <li style="background-color:pink;">Thumb Panel 1</li>       // Small Bottom Panels
 *     <li style="background-color:green;">Thumb Panel 2</li>
 *     <li style="background-color:yellow;">Thumb Panel 3</li>
 *     <li style="background-color:pink;">Thumb Panel 4</li>
 *   </ul>
 * </div>
 * 
 * $("#mydiv").hSlider('manual_move', 75, true)            // Manually slide to percent with animation
 *                           percent -^     ^- animation
 */
(function( $ ){

  var methods = {
    manual_move: function(perc, animate) {
      var obj = $(this);
      obj.hSlider('move', perc, animate);
      var t = $(".hSlider_scroll ul.ticks", obj);
      var h = $(".hSlider_scroll .hSlider_handle", obj);
      var w2 = h.width();
      if (animate) {
        h.animate({ left: (t.width() * perc / 100) - (w2/2) + 30}, 250);
      } else {
        h.css({ left: (t.width() * perc / 100) - (w2/2) + 30});
      }
    },
    move: function(perc, animate) {
      var obj = $(this);
      $.each( [".hSlider_top ul", ".hSlider_bottom ul"], function(i, el) {
        var el = $(el, obj);
        var that = $('li', el);
        var lp = parseFloat(perc/100 * (that.length-1) * that.width() );
        if (animate) {
          el.animate({'left':'-'+lp+'px'}, 250);
        } else {
          el.css({'left':'-'+lp+'px'});
        }
      });
    },
    init: function( options ) {
      var args = $.extend({}, options);
      return this.each(function() {
        var obj = $(this);
        $(obj).addClass("hSlider");
        $("ul", obj).addClass("clearfix");
        $("ul", obj).first().wrap('<div class="hSlider_top"></div>');
        $("ul", obj).last().wrap('<div class="hSlider_bottom"></div>');
        var hSlider_scroll = $("<div class='hSlider_scroll'></div>");
        var ticks = $('<ul class="ticks clearfix"></ul>')
        $.each(args.ticks, function(i,t) {
          ticks.append('<li pos="'+t+'" class="tick"></li>')
        });
        hSlider_scroll.append(ticks);
        hSlider_scroll.append('<div class="hSlider_handle"></div>');
        $(".hSlider_top", obj).after(hSlider_scroll);
        
        function document_bind(e) {
          var that = $(".hSlider_scroll .hSlider_handle", obj);
          var w1 = $('.hSlider_top ul li', obj).width();
          var w2 = that.width();
          var p = e.pageX - $(obj).offset().left + (w2/2);
          if (p < w2) {
            that.css({ left: 0 });
          } else if (p > w1) {
            that.css({ left: (w1-w2) });
          } else {
            that.css({ left: p - w2 });
          }
          var l = that.position().left + 30;
          var p = parseFloat((l - (w2/2)) / (w1-w2) * 100);
          obj.hSlider('move', p);
        };
        function document_unbind(e) {
          $(document).unbind("mousemove", document_bind);
        }
        function window_resize_bind(e) {
          $.each( [".hSlider_top ul", ".hSlider_bottom ul"], function(i, el) {
            $(el, obj).css("width", function() {
              var that = $('li', $(this));
              if (i == 0) {
                that.css("width", $(obj).width() + "px");
              }
              return that.length * $(obj).width();
            });
          });
          $(".hSlider_scroll ul.ticks li.tick", obj)
            .css("left", function() {
              var that = $(this);
              var l = (parseFloat(that.attr("pos")) / 100 * that.parent().width() ) - (that.width() / 2);
              return l  + "px" ;
            })
            .unbind("click").bind("click", function() {
              var that = $(this);
              var h = $(".hSlider_scroll .hSlider_handle", obj);
              var w2 = h.width();
              h.animate({ left: that.position().left + 6 });
              var p = parseFloat(that.attr("pos"));
              obj.hSlider('move', p, true);
            });
        }
        
        $(document).bind("mouseup", document_unbind);
        $(window).bind("resize", window_resize_bind).trigger("resize");
          
        $(".hSlider_handle", obj)
          .bind("mousedown", function() {
            var that = $(this);
            that.attr("is_dragging", "yes");
            $(document)
              .unbind("mousemove", document_bind)
              .bind("mousemove", document_bind);
          })
          .bind("mouseup", function() {
            var that = $(this);
            that.removeAttr("is_dragging");
            $(document).unbind("mousemove", document_bind);
          });

      });
    }
  };

  $.fn.hSlider = function( method ) {
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery hSlider.' );
    }
  }

})( jQuery );
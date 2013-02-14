/*!
 * jQuery Horizontal Slider 1.1
 * http://www.parvez.me/
 *
 * Copyright 2012, Parvez Husain
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Date: Feb 13 2013
 *
 *  Usage:
 *
 *  $("#mydiv").hSlider({
 *    "ticks": [0, 10, 33.33, 50, 66.66, 100]                // Intervals in percent
 *  });
 *  $("#mydiv").hSlider({
 *    "ticks": "all"                                        // Shows all Intervals
 *  });
 *
 *  <div id="mydiv">
 *    <ul>
 *      <li style="background-color:pink;">Page 1</li>       // large Top Panels
 *      <li style="background-color:green;">Page 2</li>
 *      <li style="background-color:yellow;">Page 3</li>
 *      <li style="background-color:pink;">Page 4</li>
 *    </ul>
 *    <ul>
 *      <li style="background-color:pink;">Page 1</li>       // Small Bottom Panels
 *      <li style="background-color:green;">Page 2</li>
 *      <li style="background-color:yellow;">Page 3</li>
 *      <li style="background-color:pink;">Page 4</li>
 *    </ul>
 *  </div>
 *
 *   $("#mydiv").hSlider('move_manual', 75, true)            // Manually slide to percent with animation
 *                             percent -^     ^- animation
 *
 *   $("#mydiv").hSlider('move_index', 5, true)            // Manually slide to element index with animation
 *                              index -^    ^- animation
 */
(function( $ ){

  var methods = {
    move_manual: function(perc, animate) {
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
    move_index: function(pos, animate) {
      pos = pos + 1;
      var obj = $(this);
      var all = $(".hSlider_top ul li", obj);
      var perc = 0;
      if (pos > 0 && pos < (all.length + 1)) {
        perc = (pos - 1) / (all.length - 1) * 100;
      }
      obj.hSlider('move_manual', perc, animate);
    },
    move: function(perc, animate) {
      var obj = $(this);
      $.each( [".hSlider_top ul", ".hSlider_bottom ul"], function(i, el) {
        var el = $(el, obj);
        var that = $('li', el);
        var lp = parseFloat(perc/100 * (that.length-1) * that.width() ).toFixed(2);
        if (animate) {
          el.animate({'left':'-'+lp+'px'}, 250, after_anim(el, lp));
        } else {
          el.css({'left':'-'+lp+'px'});
          after_anim(el, lp);
        }
      });
      function after_anim(el, px) {
        $('li', el).removeClass("hSlider_selected");
        $('li', el).each(function(i) {
          var that = $(this);
          if( that.position().left == px ) {
            that.addClass("hSlider_selected");
          }
        });
      }
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
        if (args.ticks == "all") {
          args.ticks = []; 
          var all = $(".hSlider_top ul li", obj);
          var perc = 0;
          $.each(all, function(pos, li) {
            pos = pos + 1;
            if (pos > 0 && pos < (all.length + 1)) {
              perc = (pos - 1) / (all.length - 1) * 100;
            }
            args.ticks.push(perc);
          });
          args.ticks.push(100);
        }
        $.each(args.ticks, function(i,t) {
          ticks.append('<li pos="'+t+'" class="tick"></li>')
        });
        hSlider_scroll.append(ticks);
        hSlider_scroll.append('<div class="hSlider_handle"></div>');
        $(".hSlider_top", obj).after(hSlider_scroll);
        
        function document_mousemove_bind(e) {
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
          var p = parseFloat((l - (w2/2)) / (w1-w2) * 100).toFixed(2);
          obj.hSlider('move', p);
        };
        function document_mousemove_unbind(e) {
          $(document).unbind("mousemove", document_mousemove_bind);
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
              var l = (parseFloat(that.attr("pos")).toFixed(2) / 100 * that.parent().width() ) - (that.width() / 2);
              return l  + "px" ;
            })
            .unbind("click").bind("click", function() {
              var that = $(this);
              var h = $(".hSlider_scroll .hSlider_handle", obj);
              var w2 = h.width();
              h.animate({ left: that.position().left + 6 });
              var p = parseFloat(that.attr("pos")).toFixed(2);
              obj.hSlider('move', p, true);
            });
        }
        function document_keydown_bind(e) {
          var all = $(".hSlider_top ul li", obj);
          var sel = all.index($(".hSlider_top .hSlider_selected", obj));
          if (e.keyCode == 37) {
            obj.hSlider('move_index', sel-1, true);
          } else if (e.keyCode == 39) {
            obj.hSlider('move_index', sel+1, true);
          }
        }

        $(document).bind("keydown", document_keydown_bind);
        $(document).bind("mouseup", document_mousemove_unbind);
        $(window).bind("resize", window_resize_bind).trigger("resize");
          
        $(".hSlider_handle", obj)
          .bind("mousedown", function() {
            var that = $(this);
            that.attr("is_dragging", "yes");
            $(document)
              .unbind("mousemove", document_mousemove_bind)
              .bind("mousemove", document_mousemove_bind);
          })
          .bind("mouseup", function() {
            var that = $(this);
            that.removeAttr("is_dragging");
            $(document).unbind("mousemove", document_mousemove_bind);
          });

        obj.hSlider('move', 0, true);
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
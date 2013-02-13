# jQuery Horizontal Slider 1.0

This repository contains the source code for jQuery Horizontal Slider 1.0

## Usage

Need to have two lists as follows:

	<div id="mydiv">
  	  <ul>
  		<li style="background-color:pink;">Panel 1</li>       // large Top Panels
  		<li style="background-color:green;">Panel 2</li>
    	<li style="background-color:yellow;">Panel 3</li>
    	<li style="background-color:pink;">Panel 4</li>
  	  </ul>
  	  <ul>
        <li style="background-color:pink;">Thumb Panel 1</li>       // Small Bottom Panels
        <li style="background-color:green;">Thumb Panel 2</li>
   		<li style="background-color:yellow;">Thumb Panel 3</li>
    	<li style="background-color:pink;">Thumb Panel 4</li>
  	  </ul>
	</div>


To initialize:

	$("#mydiv").hSlider({
 	 "ticks": [0, 10, 33.33, 50, 66.66, 100]                // Intervals
 	});

To manually move the slider

	 $("#mydiv").hSlider('manual_move', 75, true)   // need percent and/or animation
                               percent -^     ^- animation


# Legal

jQuery Horizontal Slider 1.0

http://www.parvez.me/

Copyright 2012, Parvez Husain
Licensed under the MIT License (http://opensource.org/licenses/MIT)

Date: Feb 13 2013

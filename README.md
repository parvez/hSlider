# jQuery Horizontal Slider 1.1

This repository contains the source code for jQuery Horizontal Slider 1.1

Demo: <a href="http://www.parvez.me">http://www.parvez.me</a>


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
 	  "ticks": [0, 10, 33.33, 50, 66.66, 100]               // Intervals in percent
 	});
 	$("#mydiv").hSlider({
 	  "ticks": "all"                                        // Shows all Intervals
 	});

To manually move the slider

	 $("#mydiv").hSlider('move_manual', 75, true)            // Manually slide to percent with animation
	                           percent -^     ^- animation
	 
	 $("#mydiv").hSlider('move_index', 5, true)            // Manually slide to element index with animation
	                            index -^    ^- animation


# Legal

jQuery Horizontal Slider 1.1

http://www.parvez.me/

Copyright 2012, Parvez Husain
Licensed under the MIT License (http://opensource.org/licenses/MIT)

Date: Feb 13 2013



This project was built using React, Mozilla pdf.js, and Redux.

  

##  Usages

  

###  Setting up Basic Config

There are input tabs included in the top of the sidebar in which you can save Topic ID, Subject ID, Difficulty, Summary for the questions you are about to process.

  

###  Modes of Content

  

1. Image Mode

2. Text Mode

###  Preview

You can click on the preview button to preview all the questions and options selected.

  

###  Steps Navigation

You can click on any stage of navigation to do it once again if something went wrong.

  

###  Reset

Click on the reset button to reset everything to default

  
  

##  Selection-Modes for selecting a question

  

**1. Normal Crop Mode**

This method is your general cropping method which you have to move your mouse from the initial position to the end position and select the area that you want to crop.

To use this simple method, please remember to disable all modes (block and pen-touch-mode) first, otherwise, it might give some glitches.

  

* Go over to initial point and press shift, then while holding shift drag the mouse to the end position.<kbd> ⇧ + Mouse Over</kbd>

* Release the shift and you'll have your image cropped.


**2. Normal Copy Mode**

* To use this method, select the text and copy it directly using <kbd>⌃+C</kbd> or <kbd>⌘ + C</kbd>

* Remember that all modes are switched off before selection, otherwise their behavior may interfere.

  
**3. Block Mode**

Block mode of selection is selecting a question based on properties (width, height, and unit) of block pre-defined/defined by the person using it.

  

* Turn on the block mode by either clicking on the switch or pressing <kbd>b</kbd>

* By default, the block width, height, and unit are set to 0.

* Click on the initial position and press shift, <kbd>⇧</kbd> and you'll see a block over the selected area per your defined config.

* You can increase the width by pressing <kbd>→</kbd>, decrease it by pressing <kbd>←</kbd>. You can increase height similarly, <kbd>↓</kbd> to increase height, and <kbd>↑</kbd> to decrease height. Remember that the width or height increases/decreases by the unit predefined in the config. You can also increase/decrease it by using a mouse.

* You can also switch the initial position by moving the mouse to another position and pressing shift again, <kbd>⇧</kbd>.

* To save the image, just press <kbd>s</kbd>

* Remeber that this mode follows the selection area to be, from top-left to bottom-right.

  

4. Pen Touch Mode

Pen Touch mode allows you to crop an image by pointing two points, initial and endpoint. It helps by decreasing the time of selection and faster progress in tablets and smartphones. When put in with Block mode it's even faster.

  

* Turn on the pen touch mode by clicking on the switch.

* Click on a point and that will be the initial point after which, click on another point and that will be the endpoint.

* After selecting two points the affected area would be visible if it's alright, press <kbd>s</kbd> to save it.

  

5. Pen Touch Mode + Block Mode

* When two of them are used together, they have both properties of block and pen touch mode.

 

##  Issues

If you find any issues, create an issue on Github and let me know. You can also email me on utkarshdix02@gmail.com. Currently, top-priority issues are:-

* Weird Behavior after switching some modes on/off.
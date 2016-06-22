# Neighborhood Map Project

A single page app for finding your way around some of my favorite places in Barcelona.

For the Udacity Front End Developer Nano Degree.

To view the live version of this app, navigate to [this site](http://n8finch.github.io/neighborhood-map-udacity/). 


## To Run This App...

1. Download (or clone) the repo.
2. Open the `index.html` file in your browser. 
3. Everything should load from here.

To install `node_modules` and `bower_components`:

1. Open the root folder in terminal.
2. Run `npm install` to install and update all `node_modules`.
3. Run `bower install` to install and update all `bower_components`.


## How to Use This App

I get a lot of friends and family asking me for Barcelona recommendations. So, I thought I'd put this together.  

1. Start by opening `index.html` in your browser of choice.
2. Once the map and markers are loaded, you can click and filter in a few different places. 
3. Use filter box in the menu to filter list items and map markers to display only what you're searching for.
4. Click on a list item or map marker to open an info window describing why I like this place and any tips I might have.
5. You'll notice that several other pieces of information pop up in the tabs below. This is information from Foursquare and Wikipedia. You can follow those links to learn more about the location or the area the location is in. 
6. Once you're done with the map, you can close the window. 

## To Add More Locations

1. Open the `model.js` file in the `js/src` directory.
2. Add another object to the `bcnArr`, making sure to use the same format.
3. You must supply the location name, latitude, longitude, info you want in the info window, and the Wikipedia search term (this is specified to return a relevant Wikipedia article.
4. Save the file.
5. Run `grunt` to recompile the `js` files and uglify them. 
6. Refresh the page and the app should run. 

**Make sure you don't have a trailing comma after the final object in the `bcnArr` array, as this will cause an error.**

## The Compiled JS files   

The JS files are in `js/src`. These files are concatinated and minified into the `dist/js/js.min.js` file. If you want to edit or add to these files, edit or add in the `src` folder.

## A Note About the SCSS Files...

I used Refills components to quickly build out the app. You can modify those in the `sass/refills_components` directory. Any other CSS/SCSS can be done in the `_1.main.scss` file.

Feel free to add other `scss/sass` files to the directory and `@import` them in the `style.scss` file. Make sure you load these files in the proper order.

Finally, if you do edit the files, run `grunt` in the terminal to compile all `scss/sass` files. 

## Resources

This app uses the following resources:

- jQuery
- Knockout.js
- Bourbon, Neat, Bitter and Refills components
- Fontawesome
- Grunt
- Bower
- Google Maps API
- Foursquare API
- Wikipedia API
- Some TLC from me!

### Known Bugs

- Hotwire API does not return...
- If you are on the second tab (More Info About This Area), and you click on another location, it loads the Wikipedia article and then loads the Foursquare information in the same tab, but doesn't load it in the What's Around Here tab.
- Markers don't bounce, even though they should. 
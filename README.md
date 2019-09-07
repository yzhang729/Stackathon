# What's in the Fridge?

Tired of thinking about what to make for dinner? Well now you don't have to with What's in the Fridge, a pantry management application that helps you make the most use of what you already have.

Make an account and easily add items to your inventory - either by typing it in or snapping a picture of your latest grocery haul. The recipe search lets you decide what you want to use first, whether it's that carton of eggs that's expiring next week or a tomato that's almost too ripe. Easily favorite recipes and find them again in your recipe box, where you'll have one click access to ingredients and directions.

Saving money and eating well has never been easier!

## How To Use

### Locally

To run the app locally, you will needto create your own Firebase Firestore, Clarifai API key, and Spoonacular API key. In the main folder, include a secrets.js file with the following:

```
//API keys
module.exports = {
  GFB_KEY: '',
  CLARIFAI: '',
  SPOONACULAR: '',
};

```

Run the following commands in the command line:

- npm install
- expo start

This will compile the JavaScript file and allow you to run the application from either your phone (via the Expo app) or your computer's iPhone simulator.

### Screenshots and Video

<p float="left">
<img src="https://i.imgur.com/yFEcThM.jpg" height="500px" style='display: inline-block'/>
<img src="https://i.imgur.com/T0by7nc.jpg" height="500px" style='display: inline-block'/>
</p>
<p float="left">
<img src="https://i.imgur.com/rdRwXGt.jpg" height="500px" style='display: inline-block'/>
<img src="https://i.imgur.com/Bdspvzp.jpg" height="500px" style='display: inline-block'/>
</p>

[Video here](https://i.imgur.com/h6ElnHj.mp4)

## Tech Stack

**Built with:**

- JavaScript
- React Native
- Firebase
- HTML5/CSS
- Clarifai
- Spoonacular

## Authors

**Built by:**

- [Yuting Zhang](https://github.com/yzhang729)

"use strict";

// The model of all features
const features = {
  drinksholder: false,
  led: false,
  propeller: false,
  shield: false,
  solarfan: false,
};

window.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("start");
  // register toggle-clicks

  document
    .querySelectorAll(".option")
    .forEach((option) => option.addEventListener("click", toggleOption));
}

function toggleOption(event) {
  const target = event.currentTarget;
  const feature = target.dataset.feature;
  if (features[feature] === false) {
    features[feature] = true;
  } else {
    features[feature] = false;
  }

  // TODO: Toggle feature in "model"

  // If feature is (now) turned on:
  // - mark target as chosen (add class "chosen")
  // - un-hide the feature-layer(s) in the #product-preview;
  // - create featureElement and append to #selected ul
  // - create FLIP-animation to animate featureElement from img in target, to
  //   its intended position. Do it with normal animation or transition class!

  // Else - if the feature (became) turned off:
  // - no longer mark target as chosen
  // - hide the feature-layer(s) in the #product-preview
  // - find the existing featureElement in #selected ul
  // - create FLIP-animation to animate featureElement to img in target
  // - when animation is complete, remove featureElement from the DOM
  let selectedFeature = createFeatureElement(feature);
  document.querySelector("ul").appendChild(selectedFeature);

  if (features[feature]) {
    target.classList.add("chosen");
    console.log(features[feature]);
    document
      .querySelector(`[data-feature='${feature}'`)
      .classList.remove("hide");

    selectedFeature.classList.add(`${feature}`);

    const firstFrame = target.getBoundingClientRect();
    console.log(firstFrame);

    const lastFrame = selectedFeature.getBoundingClientRect();
    console.log(lastFrame);

    const deltaX = firstFrame.left - lastFrame.left;
    const deltaY = firstFrame.top - lastFrame.top;
    const deltaWidth = firstFrame.width / lastFrame.width;
    const deltaHeight = firstFrame.height / lastFrame.height;

    selectedFeature.animate(
      [
        {
          transformOrigin: "top left",
          transform: `translateX(${deltaX}px)
      translateY(${deltaY}px) scaleX(${deltaWidth}) scaleY(${deltaHeight})`,
        },
        { transformOrigin: "top left", transform: "none" },
      ],
      {
        duration: 600,
        easing: "ease-in-out",
      }
    );

    // feature added
    console.log(`Feature ${feature} is turned on!`);

    // TODO: More code
  } else {
    features[feature] = false;
    // feature removed
    target.classList.remove("chosen");
    document.querySelector(`[data-feature='${feature}'`).classList.add("hide");
    theChild = document.querySelector(`.${feature}`);

    const firstFrame = theChild.getBoundingClientRect();
    console.log(firstFrame);

    const lastFrame = target.getBoundingClientRect();
    console.log(lastFrame);

    const deltaX = firstFrame.left - lastFrame.left;
    const deltaY = firstFrame.top - lastFrame.top;
    const deltaWidth = firstFrame.width / lastFrame.width;
    const deltaHeight = firstFrame.height / lastFrame.height;

    theChild.animate(
      [
        {
          transformOrigin: "top left",
          transform: `translateX(${deltaX}px)
      translateY(${deltaY}px) scaleX(${deltaWidth}) scaleY(${deltaHeight})`,
        },
        { transformOrigin: "top left", transform: "none" },
      ],
      {
        duration: 600,
        easing: "ease-in-out",
      }
    );

    console.log(`Feature ${feature} is turned off!`);
    //document.querySelector("ul").removeChild(theChild); - if I add it then the animation doesn't work :(

    // TODO: More code
  }
}

// Create featureElement to be appended to #selected ul - could have used a <template> instead
function createFeatureElement(feature) {
  const li = document.createElement("li");
  li.dataset.feature = feature;

  const img = document.createElement("img");
  img.src = `images/feature_${feature}.png`;
  img.alt = capitalize(feature);

  li.append(img);

  return li;
}

function capitalize(text) {
  return text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();
}

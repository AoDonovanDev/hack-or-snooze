"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

$('#navSubmit').on('click', showSubmitForm);

function showSubmitForm(){
  console.debug('showSubmitForm');
  $submitForm.show();
}

$('#navFav').on('click', showFavorites);
function showFavorites(){
  $submitForm.hide();
  $allStoriesList.empty();
  for(let story of currentUser.favorites){
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }
}

$('#navMyStories').on('click', showOwnStories);
function showOwnStories(){
  $submitForm.hide();
  $allStoriesList.empty();
  for(let story of currentUser.ownStories){
    const $story = generateStoryMarkup(story);
    $story.find('.star').prepend($(`<span class="trash-can">
    <i class="fas fa-trash-alt"></i>
    </span>`))
    $allStoriesList.append($story);
  }
}


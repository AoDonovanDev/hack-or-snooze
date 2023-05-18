"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);
  let favStatus = 'far';
  if(currentUser){
  for(let fav of currentUser.favorites){
    if(story.storyId === fav.storyId){
      favStatus = 'fas';
      break;
    }
  }
}
  /* const favStatus = currentUser.favorites.includes(fav => fav.id === story.id) ? 'fas' : 'far'; */
  const hostName = story.getHostName();
  return $(`
          <li id="${story.storyId}">
              <div class="listStyle">
                <div>
                  <span class="star listStar">
                    <i class="fa-star ${favStatus}"></i>
                  </span>
                  <a href="${story.url}" target="a_blank" class="story-link">
                    ${story.title}
                  </a>
                  <small class="story-hostname">(${hostName})</small>
                </div>               
                  <small class="story-author">by <b>${story.author}</b></small>
                  <small class="story-user">posted by ${story.username}</small>
              </div>
          </li>
      <hr>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}


$('#submitBtn').on('click', submitStory);
async function submitStory(){
  $('#submitForm').hide("slow");
  let author = $('#authorBox').val();
  let title = $('#titleBox').val();
  let url = $('#urlBox').val();
  await storyList.addStory(currentUser, {author, title, url})
  $submitForm.hide();
  getAndShowStoriesOnStart();
}




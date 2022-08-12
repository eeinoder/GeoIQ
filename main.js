// main.js

/*
  GeoIQ
    demo
      - components:
        title (centered)

*/

let score = 0;
let hi_score = 0;
let correct_answer = 'left'; // left or right, updated in chooseTwoStates()

let start_button = document.getElementById('start_button');
let left_button = document.getElementById('left_button');
let right_button = document.getElementById('right_button');

let menu_window = document.getElementById('menu_div');
let game_window = document.getElementById('game_div');
let report_window = document.getElementById('report_div');

function start_game() {
  // TODO: reset other things like 'answer_wrong', 'answer_correct' hidden at start of new game
  // Make menu window hidden
  menu_window.classList.add('hidden');
  // make game window visible, interactable
  game_window.classList.remove('hidden');
  document.getElementById('restart_button').classList.add('hidden'); // TODO: group these in div, make accessing->hiding cleaner
  document.getElementById('report_button').classList.add('hidden');
  // Set starting parameters
  score = 0;
  document.getElementById('score_p').innerHTML = 'Score: ' + score;
  document.getElementById('hi_score_p').innerHTML = 'High Score: ' + hi_score;
  // Populate button label and answer response with state data: two random states
  chooseTwoStates();
}

function chooseTwoStates() {
  let left = Math.floor(Math.random() * state_data.length);
  let right = Math.floor(Math.random() * state_data.length);
  while (right == left) {
    right = Math.floor(Math.random() * state_data.length);
  }
  let left_data = state_data[left];
  let right_data = state_data[right];
  // Label game buttons
  left_button.innerHTML = left_data.state_name;
  right_button.innerHTML = right_data.state_name;
  // Add text to prompt after user enters answer
  document.getElementById('state_data_p1').innerHTML = left_data.state_name + " is " + left_data.state_area_mi2 + " square miles.";
  document.getElementById('state_data_p2').innerHTML = right_data.state_name + " is " + right_data.state_area_mi2 + " square miles.";
  // Update correct answer
  correct_answer = parseInt(left_data.state_area_mi2) > parseInt(right_data.state_area_mi2) ? 'left' : 'right';
}

function verify_answer(clicked_str) {

  // CORRECT!
  if (clicked_str === correct_answer) {
    // Update scores
    score++;
    document.getElementById('score_p').innerHTML = 'Score: ' + score;
    if (score > hi_score) {
      hi_score = score;
      document.getElementById('hi_score_p').innerHTML = 'High Score: ' + score;
    }
    // Show user prompt and state data
    document.getElementById('answer_correct').classList.remove('hidden');
    document.getElementById('answer_wrong').classList.add('hidden');
    // TODO: make better end game state, add way to restart game and keep hi score
    document.getElementById('next_question_button').classList.remove('hidden'); // next question accessible

    // INCORRECT
  } else {
    document.getElementById('answer_correct').classList.add('hidden');
    document.getElementById('answer_wrong').classList.remove('hidden');
    // TODO: make better end game state, add way to restart game and keep hi score
    document.getElementById('next_question_button').classList.add('hidden'); // next question NOT accessible
    document.getElementById('restart_button').classList.remove('hidden');
    document.getElementById('report_button').classList.remove('hidden');
    // Generate report:
    generate_report();
  }
  document.getElementById('next_question_div').classList.remove('hidden');
}

function next_question() {
  // TODO: put 'correct', 'wrong' answers in div -> center correctlty
  // Hide elements
  hide_non_game();
  // Choose two new states
  chooseTwoStates();
}

function hide_non_game() {
  document.getElementById('answer_correct').classList.add('hidden');
  document.getElementById('answer_wrong').classList.add('hidden');
  document.getElementById('next_question_div').classList.add('hidden');
}

function generate_report() {
  let title = "";
  let iq = "";
  let text = "";

  if (score < 3) {
    title = "Geo-Dumbass";
    iq = 10 * score;
    text = "How are you breathing?";
  }
  else if (score < 6) {
    title = "Geo-Shortbus";
    iq = 10 * score + 30;
    text = "Legally not r****ded.";
  }
  else if (score < 9) {
    title = "Geo-Mid";
    iq = 10 * score + 30;
    text = "Aggressively Average.";
  }
  else if (score < 16) {
    title = "Geo-Bachelor";
    iq = 120;
    text = "A real globetrotter."
  }
  else if (score < 25) {
    title = "Geo-Master";
    iq = 150;
    text = "Legit map-fondler."
  }
  else {
    title = "Geo-Wiz";
    iq = 300;
    text = "You are the Map Morphius.";
  }
  // Update dom
  document.getElementById('iq_title').innerHTML = "Title: " + title;
  document.getElementById('iq_score').innerHTML = "IQ: " + iq;
  document.getElementById('iq_text').innerHTML = "Eval: " + text;
}

function open_report() {
  game_window.classList.add('hidden');
  report_window.classList.remove('hidden');
}

function close_report() {
  game_window.classList.remove('hidden');
  report_window.classList.add('hidden');
}


/* ************************************************************************** */

/* GAME BUTTONS EVENT LISTENERS */
start_button.addEventListener("click", start_game);

left_button.addEventListener("click", function() {
  verify_answer('left');
});

right_button.addEventListener("click", function() {
  verify_answer('right');
});

next_question_button.addEventListener("click", next_question);

restart_button.addEventListener("click", function() {
  hide_non_game();
  start_game();
});

report_button.addEventListener("click", open_report);

close_report_button.addEventListener("click", close_report);



/* ************************************************************************** */
// TODO: replace this with call to json -> hosted on github pages

/* APPENDIX */
const state_data = [
  {"state_name":"Alabama","state_code":"AL","state_area_mi2":"52419"},
  {"state_name":"Alaska","state_code":"AK","state_area_mi2":"663267"},
  {"state_name":"Arizona","state_code":"AZ","state_area_mi2":"113998"},
  {"state_name":"Arkansas","state_code":"AR","state_area_mi2":"53179"},
  {"state_name":"California","state_code":"CA","state_area_mi2":"163695"},
  {"state_name":"Colorado","state_code":"CO","state_area_mi2":"104093"},
  {"state_name":"Connecticut","state_code":"CT","state_area_mi2":"5544"},
  {"state_name":"Delaware","state_code":"DE","state_area_mi2":"2489"},
  {"state_name":"DC","state_code":"DC","state_area_mi2":"68"},
  {"state_name":"Florida","state_code":"FL","state_area_mi2":"65755"},
  {"state_name":"Georgia","state_code":"GA","state_area_mi2":"59425"},
  {"state_name":"Hawaii","state_code":"HI","state_area_mi2":"10931"},
  {"state_name":"Idaho","state_code":"ID","state_area_mi2":"83570"},
  {"state_name":"Illinois","state_code":"IL","state_area_mi2":"57914"},
  {"state_name":"Indiana","state_code":"IN","state_area_mi2":"36418"},
  {"state_name":"Iowa","state_code":"IA","state_area_mi2":"56271"},
  {"state_name":"Kansas","state_code":"KS","state_area_mi2":"82276"},
  {"state_name":"Kentucky","state_code":"KY","state_area_mi2":"40410"},
  {"state_name":"Louisiana","state_code":"LA","state_area_mi2":"51840"},
  {"state_name":"Maine","state_code":"ME","state_area_mi2":"35385"},
  {"state_name":"Maryland","state_code":"MD","state_area_mi2":"12407"},
  {"state_name":"Massachussets","state_code":"MA","state_area_mi2":"10555"},
  {"state_name":"Michigan","state_code":"MI","state_area_mi2":"96716"},
  {"state_name":"Minnesota","state_code":"MN","state_area_mi2":"86938"},
  {"state_name":"Mississippi","state_code":"MS","state_area_mi2":"48431"},
  {"state_name":"Missouri","state_code":"MO","state_area_mi2":"69704"},
  {"state_name":"Montana","state_code":"MT","state_area_mi2":"147042"},
  {"state_name":"Nebraska","state_code":"NE","state_area_mi2":"77353"},
  {"state_name":"Nevada","state_code":"NV","state_area_mi2":"110560"},
  {"state_name":"New Hampshire","state_code":"NH","state_area_mi2":"9350"},
  {"state_name":"New Jersey","state_code":"NJ","state_area_mi2":"8722"},
  {"state_name":"New Mexico","state_code":"NM","state_area_mi2":"121589"},
  {"state_name":"New York","state_code":"NY","state_area_mi2":"54556"},
  {"state_name":"North Carolina","state_code":"NC","state_area_mi2":"53818"},
  {"state_name":"North Dakota","state_code":"ND","state_area_mi2":"70700"},
  {"state_name":"Ohio","state_code":"OH","state_area_mi2":"44825"},
  {"state_name":"Oklahoma","state_code":"OK","state_area_mi2":"69899"},
  {"state_name":"Oregon","state_code":"OR","state_area_mi2":"98380"},
  {"state_name":"Pennysylvania","state_code":"PA","state_area_mi2":"46056"},
  {"state_name":"Puerto Rico","state_code":"PR","state_area_mi2":"3515"},
  {"state_name":"Rhode Island","state_code":"RI","state_area_mi2":"1545"},
  {"state_name":"South Carolina","state_code":"SC","state_area_mi2":"32020"},
  {"state_name":"South Dakota","state_code":"SD","state_area_mi2":"77353"},
  {"state_name":"Tennessee","state_code":"TN","state_area_mi2":"42144"},
  {"state_name":"Texas","state_code":"TX","state_area_mi2":"268580"},
  {"state_name":"United States","state_code":"US","state_area_mi2":"3794083"},
  {"state_name":"Utah","state_code":"UT","state_area_mi2":"84898"},
  {"state_name":"Vermont","state_code":"VT","state_area_mi2":"9615"},
  {"state_name":"Virginia","state_code":"VA","state_area_mi2":"42774"},
  {"state_name":"Washington","state_code":"WA","state_area_mi2":"71300"},
  {"state_name":"West Virginia","state_code":"WV","state_area_mi2":"24230"},
  {"state_name":"Wisconsin","state_code":"WI","state_area_mi2":"65498"},
  {"state_name":"Wyoming","state_code":"WY","state_area_mi2":"97813"}];

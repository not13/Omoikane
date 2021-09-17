// Get API responses from a local storage.
function get_api_response() {
  chrome.storage.local.get(['res_actor_aka', 'selected_text'], function (result) {

    const resData = result.res_actor_aka;
    const selectedText = result.selected_text;

    console.log('[LOG] ' + resData.length + 'records have got from storage.');
    console.log('[LOG] Selected text "' + selectedText + '" get from storage.');

    if (resData.length == 0) {
      alert(strAlert + selectedText);
    }

    replace_html(resData);
  });
  return;
};

// Construct HTML strings to replace a result html file.
function replace_html(resData) {
  let replaceText = '';

  for (let i = 0; i < resData.length; i++) {
    let rnum = i + 1;

    console.log("[LOG] Set record No. " + rnum + " to variable for replacement.");

    replaceText += '<h2>';
    replaceText += rnum + '. ' + resData[i].common_name;
    replaceText += ' <font size="-2">/ ';
    replaceText += '<a href="./actor_report.html?' + resData[i].name + '">' + strCreateReport + '</a>';
    replaceText += ' or ';
    replaceText += '<a href="https://malpedia.caad.fkie.fraunhofer.de/actor/';
    replaceText += resData[i].name
      + '" target="_blank" rel="noopener noreferrer">' + strOpenMalpedia + '</a>'
      + '</font></h2>';
    replaceText += '<div style="margin-left: 20px;">';
    replaceText += '<h4>' + strSynonyms + '</h3>';

    if (resData[i].synonyms.length == 0) {
      resData[i].synonyms = strNone;
      replaceText += resData[i].synonyms;
    } else {

      for (let l = 0; l < resData[i].synonyms.length; l++) {
        replaceText += resData[i].synonyms[l] + " , "
      }
    }

    replaceText += "</div>"
  };

  elm = document.getElementById('result_body');
  elm.innerHTML = replaceText;
  console.log(("[LOG] Actor's a.k.a search report creation complete!"))
};

function message_to_background(query) {
  chrome.runtime.sendMessage({
    mode: "actor_search",
    query: query,
  }, function (response) {
    console.log('[LOG] ' + response + 'is OK');

    // Check storage values every 1 second, and if values are set, run getApi.
    let count = 0;
    const countUp = () => {
      console.log('Count: ' + count++);
    }

    const intervalId = setInterval(function () {
      countUp();

      // Check flag.
      chrome.storage.local.get(['flg'], function (result) {

        if (result.flg == 'ok') {
          console.log('[LOG] Data fetching OK.');
          clearInterval(intervalId);
          get_api_response()
        }

      });

      if (count > 10) {
        console.log('[LOG] Timeout.');
        alert(strTimeout);
        clearInterval(intervalId);
      };

    }, 1000);

  });
};


// Main process when open html.
// Get query parameter.
const query = document.location.search.substring(1);
console.log('[LOG] Page query=' + query);

// Get localization text.
const strTimeout = chrome.i18n.getMessage('global_timeout')
const strTitle = chrome.i18n.getMessage('actor_search_str_title');
const strInput = chrome.i18n.getMessage('actor_search_str_input');
const strAlert = chrome.i18n.getMessage('actor_search_str_alert');
const strCreateReport = chrome.i18n.getMessage('actor_search_str_create_report');
const strOpenMalpedia = chrome.i18n.getMessage('actor_search_str_open_malpedia');
const strSynonyms = chrome.i18n.getMessage('actor_search_str_synonyms');
const strNone = chrome.i18n.getMessage('actor_search_str_none');

// Localize a page title and a input text.
let elm = document.getElementById('str_title');
elm.innerHTML = strTitle;

elm = document.getElementById('str_input');
elm.innerHTML = strInput + query;

message_to_background(query);

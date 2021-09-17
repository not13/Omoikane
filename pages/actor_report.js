// Get API responses from a local storage.
function getApiResponse() {
  chrome.storage.local.get(['res_actor_details'], function (result) {
    const resData = result.res_actor_details;

    console.log("[LOG] " + resData.value + "'s data have got from storage.");
    console.log(resData);

    replace_html(resData);
  });
  return;
};

// Construct HTML strings to replace a report html file.
function replace_html(resData) {
  let replaceText = '<h2>' + resData.value;
  replaceText += '<font size="-2">'
    + ' (<a href="https://malpedia.caad.fkie.fraunhofer.de/actor/' + query
    + '">' + strOpenMalpedia + '</a>)</font>' + '</h2>';

  // Actor's synonyms.
  if ("synonyms" in resData.meta) {

    if (resData.meta.synonyms.length == 0) {
    }
    else {
      replaceText += '<h3>' + strSynonyms + '</h3>';
      replaceText += '<div style="margin-left: 20px">';

      for (let i = 0; i < resData.meta.synonyms.length; i++) {
        replaceText += resData.meta.synonyms[i] + ' , ';
      }

      replaceText += '</div>';
    }
  }

  // Actor's home country.
  if ("country" in resData.meta) {
    replaceText += '<h3>' + strCountry + '</h3>';
    replaceText += '<div style="margin-left: 20px">'
      + resData.meta.country + '</div>';
  }

  // Country suspected to support.
  if ("cfr-suspected-state-sponsor" in resData.meta) {
    replaceText += '<h3>' + strSuspectedStateSponsor + '</h3>';
    replaceText += '<div style="margin-left: 20px">'
      + resData.meta['cfr-suspected-state-sponsor'] + '</div>';
  }

  // Country suspected to be victims.
  if ("cfr-suspected-victims" in resData.meta) {

    if (resData.meta['cfr-suspected-victims'].length == 0) {
    }
    else {
      replaceText += '<h3>' + strSuspectedVictims + '</h3>';
      replaceText += '<div style="margin-left: 20px">';

      for (let i = 0; i < resData.meta['cfr-suspected-victims'].length; i++) {
        replaceText += resData.meta['cfr-suspected-victims'][i] + ' , ';
      }

      replaceText += '</div>';
    }
  }

  // Category to be attacked target.
  if ("cfr-target-category" in resData.meta) {

    if (resData.meta['cfr-target-category'].length == 0) {
    }
    else {
      replaceText += '<h3>' + strTargetCategory + '</h3>';
      replaceText += '<div style="margin-left: 20px">'
        + resData.meta['cfr-target-category'] + '</div>';
    }
  }

  // Type of incident that occurred.
  if ("cfr-type-of-incident" in resData.meta) {

    if (resData.meta['cfr-type-of-incident'].length == 0) {
    }
    else {
      replaceText += '<h3>' + strTypeOfIncident + '</h3>';
      replaceText += '<div style="margin-left: 20px">'
        + resData.meta['cfr-type-of-incident'] + '</div>';
    }
  }

  // Actor's description.
  if ("description" in resData) {

    if (resData.description.length == 0) {
    }
    else {
      replaceText += '<h3>' + strDescription + '</h3>';
      replaceText += '<div style="margin-left: 20px">'
        + resData.description + '</div>';
    }
  }

  // Malware families to be used.
  if ("families" in resData) {

    if (Object.keys(resData.families).length == 0) {
    }
    else {
      replaceText += '<h3>' + strMalwareFamiliesToUse + '<font size="-2">'
        + ' (' + strLinkToMalpediaPage + ')</font></h3>';
      replaceText += '<div style="margin-left: 20px">';

      for (let i = 0; i < Object.keys(resData.families).length; i++) {
        replaceText += '<a href="https://malpedia.caad.fkie.fraunhofer.de/details/'
          + Object.keys(resData.families)[i]
          + '" target="_blank" rel="noopener noreferrer">';

        let malName = Object.keys(resData.families)[i];
        replaceText += resData.families[malName].common_name + '</a> , ';
      }

      replaceText += '</div>';
    }
  }

  // References of an actor.
  if ("refs" in resData.meta) {

    if (resData.meta.refs.length == 0) {
    }
    else {
      replaceText += '<h3>' + strReferences + '<font size="-2">'
        + ' (' + strLinkToExternalPage + ')</font></h3>';
      replaceText += '<div style="margin-left: 20px">';

      for (let i = 0; i < resData.meta.refs.length; i++) {
        replaceText += '<a href="' + resData.meta.refs[i]
          + '" target="_blank" rel="noopener noreferrer">'
          + resData.meta.refs[i] + '</a><br>';
      }

      replaceText += '</div>';
    }
  }

  elm = document.getElementById('result_body');
  elm.innerHTML = replaceText;
  // document.body.innerHTML = document.body.innerHTML.replace(/Now loading... \(Please wait about 5 seconds.\)/g, replaceText);
  console.log(("[LOG] Actor's details report creation complete!"))
};

function message_to_background(query) {
  chrome.runtime.sendMessage({
    mode: "actor_report",
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
          getApiResponse()
        }

      });

      if (count > 10) {
        console.log('[LOG] Timeout.');
        alert(strTimeout);
        clearInterval(intervalId);
      };

    }, 1000);

  })
};


// Main process when open html.
const query = document.location.search.substring(1);
console.log('[LOG] Page query=' + query);

// Get localization text.
const strTimeout = chrome.i18n.getMessage('global_timeout')
const strTitle = chrome.i18n.getMessage('actor_report_str_title');
const strOpenMalpedia = chrome.i18n.getMessage('actor_report_str_open_malpedia');
const strSynonyms = chrome.i18n.getMessage('actor_report_str_synonyms');
const strCountry = chrome.i18n.getMessage('actor_report_str_country');
const strSuspectedStateSponsor = chrome.i18n.getMessage('actor_report_str_suspected_sponsor');
const strSuspectedVictims = chrome.i18n.getMessage('actor_report_str_suspected_victims');
const strTargetCategory = chrome.i18n.getMessage('actor_report_str_target_category');
const strTypeOfIncident = chrome.i18n.getMessage('actor_report_str_incident_type');
const strDescription = chrome.i18n.getMessage('actor_report_str_description');
const strMalwareFamiliesToUse = chrome.i18n.getMessage('actor_report_str_malware');
const strLinkToMalpediaPage = chrome.i18n.getMessage('actor_report_str_malpedia_link');
const strReferences = chrome.i18n.getMessage('actor_report_str_references');
const strLinkToExternalPage = chrome.i18n.getMessage('actor_report_str_external_link');

// Localize a page title.
let elm = document.getElementById('str_title');
elm.innerHTML = strTitle;

message_to_background(query);

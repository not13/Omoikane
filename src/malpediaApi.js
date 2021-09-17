// Import to background.js
const apiUrl = 'https://malpedia.caad.fkie.fraunhofer.de/api/';

// Search a actor's a.k.a.
function actor_search(selectedText) {
  const url = apiUrl + 'find/actor/' + selectedText;

  chrome.storage.local.get(['previous_time'], function (result) {

    const curDate = new Date().getTime();
    const preDate = result.previous_time;
    const time = curDate - preDate;

    if (time < 5000) {
      popup_window('./pages/error.html?toofast', 800, 800)
    }
    else {
      chrome.storage.local.set({ "previous_time": curDate });

      fetch(url).then(function (res) { return res.json(); })
        .then(function (jsonData) {
          chrome.storage.local.set({ 'res_actor_aka': jsonData, 'selected_text': selectedText, 'flg': 'ok' }, function () {
            console.log('[LOG] ' + jsonData.length + 'records set to storage.');
            console.log('[LOG] string "' + selectedText + '" set to storage.');
          })
        })
    }
  });
};

// Get the actor's details to create a report
function get_actor_details(actorName) {
  const url = apiUrl + 'get/actor/' + actorName;


  chrome.storage.local.get(['previous_time'], function (result) {

    const curDate = new Date().getTime();
    const preDate = result.previous_time;
    const time = curDate - preDate;

    if (time < 5000) {
      popup_window('./pages/error.html?toofast', 800, 800)
    }
    else {
      chrome.storage.local.set({ "previous_time": curDate });

      fetch(url).then(function (res) { return res.json(); })
        .then(function (jsonData) {
          chrome.storage.local.set({ 'res_actor_details': jsonData, 'flg': 'ok' }, function () {
            console.log('[LOG] Set ' + actorName + "'s detail to storage.");
          })
        })
    }
  });
};

// Search malware
function malware_search(selectedText) {
  const url = apiUrl + 'find/family/' + selectedText;

  chrome.storage.local.get(['previous_time'], function (result) {

    const curDate = new Date().getTime();
    const preDate = result.previous_time;
    const time = curDate - preDate;

    if (time < 5000) {
      popup_window('./pages/error.html?toofast', 800, 800)
    }
    else {
      chrome.storage.local.set({ "previous_time": curDate });

      fetch(url).then(function (res) { return res.json(); })
        .then(function (jsonData) {
          chrome.storage.local.set({ 'res_malware': jsonData, 'selected_text': selectedText, 'flg': 'ok' }, function () {
            console.log('[LOG] ' + jsonData.length + 'records set to storage.');
          })
        });
    }
  });
};

// Get the malware details to create a report
function get_malware_details(malName) {
  const url = apiUrl + 'get/family/' + malName;

  chrome.storage.local.get(['previous_time'], function (result) {

    const curDate = new Date().getTime();
    const preDate = result.previous_time;
    const time = curDate - preDate;

    if (time < 5000) {
      popup_window('./pages/error.html?toofast', 800, 800)
    }
    else {
      chrome.storage.local.set({ "previous_time": curDate });
      fetch(url).then(function (res) { return res.json(); })
        .then(function (jsonData) {
          chrome.storage.local.set({ 'res_malware_details': jsonData, 'flg': 'ok' }, function () {
            console.log('[LOG] Set ' + malName + "'s detail to storage.");
          })
        })
    }
  });
};

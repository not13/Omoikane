// Import to background.js
// Run functions to fetch API data.
function get_domain_report(selectedText) {
  chrome.storage.local.set({ 'selected_text': selectedText });

  chrome.storage.local.get(['previous_time'], function (result) {

    const curDate = new Date().getTime();
    const preDate = result.previous_time;
    const time = curDate - preDate;

    if (time < 10000) {
      popup_window('./pages/error.html?toofast', 800, 800)
    }
    else {
      chrome.storage.local.set({ "previous_time": curDate });
      get_domain_who(selectedText);
    }

  });
};

// API data fetching functions.
// whoisproxy API (whois info)
function get_domain_who(selectedText) {
  const url = ['https://api.whoisproxy.info/whois/' + selectedText];

  fetch(url).then(function (res) { return res.json(); })
    .then(function (jsonData) {
      console.log(jsonData);
      chrome.storage.local.set({ 'res_who': jsonData });
      console.log('[LOG] Data from whoisproxy (whois) is saved to storage.')
      get_domain_sub(selectedText);
    })
};

// Threat Crowd API
function get_domain_sub(selectedText) {
  const url = ['https://www.threatcrowd.org/searchApi/v2/domain/report/?domain=' + selectedText];

  fetch(url).then(function (res) { return res.json(); })
    .then(function (jsonData) {
      console.log(jsonData);
      chrome.storage.local.set({ 'res_sub': jsonData });
      console.log('[LOG] Data from ThreatCrowd is saved to storage.')
      get_domain_dig(selectedText);
    })
};

// whoisproxy (dig info)
function get_domain_dig(selectedText) {
  const url = ['https://api.whoisproxy.info/dig/' + selectedText];

  fetch(url).then(function (res) { return res.json(); })
    .then(function (jsonData) {
      console.log(jsonData);
      chrome.storage.local.set({ 'res_dig': jsonData, 'flg': 'ok' });
      console.log('[LOG] Data from whoisproxy (dig) is saved to storage.')
    })
};

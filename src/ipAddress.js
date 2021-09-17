// Import to background.js
// Run functions to fetch API data.
function get_ip_report(selectedText) {
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
      check_api_keys(selectedText);
    }

  });

};

function check_api_keys(selectedText) {
  // Get API keys and check
  // key_sho: Shodan, key_pro: proxycheck.io, key_abu: AbuseIPDB
  chrome.storage.local.get(['key_sho', 'key_pro', 'key_abu'], function (result) {
    let flg = '';
    if (result.key_sho == void 0 || result.key_sho == '') {
      flg += 'Shodan,'
    };
    if (result.key_pro == void 0 || result.key_sho == '') {
      flg += 'proxycheck.io,'
    };
    if (result.key_abu == void 0 || result.key_sho == '') {
      flg += 'AbuseIPDB'
    };
    if (flg != '') {
      // If API keys are not set, popup a error page and process.
      popup_window('../pages/error.html?noApiKey:' + flg, 800, 800)
    }
    else {
      get_ip_pro(selectedText);
    }
  });
};

// API data fetching functions.
// proxycheck.io API
function get_ip_pro(selectedText) {
  chrome.storage.local.get(['key_pro'], function (result) {
    const url = ['https://proxycheck.io/v2/'
      + selectedText
      + '?key=' + result.key_pro
      + '&asn=1'];

    fetch(url).then(function (res) { return res.json(); })
      .then(function (jsonData) {
        chrome.storage.local.set({ 'res_pro': jsonData });
        console.log('[LOG] Data from proxycheck.io API is saved to storage.')
        get_ip_sho(selectedText);
      })
  })
};

// Shodan API (must use API-Key)
function get_ip_sho(selectedText) {
  chrome.storage.local.get(['key_sho'], function (result) {
    const url = ['https://api.shodan.io/shodan/host/'
      + selectedText
      + '?key=' + result.key_sho];

    fetch(url).then(function (res) { return res.json(); })
      .then(function (jsonData) {
        chrome.storage.local.set({ 'res_sho': jsonData });
        console.log('[LOG] Data from Shodan API is saved to storage.')
        get_ip_abu(selectedText);
      })
  })
};

// AbuseIPDB API (must use API-Key)
function get_ip_abu(selectedText) {
  chrome.storage.local.get(['key_abu'], function (result) {
    const url = ['https://api.abuseipdb.com/api/v2/check?'
      + 'ipAddress=' + selectedText
      + '&key=' + result.key_abu
      + '&maxAgeInDays=365'];

    fetch(url).then(function (res) { return res.json(); })
      .then(function (jsonData) {
        chrome.storage.local.set({ 'res_abu': jsonData });
        console.log('[LOG] Data from AbuseIPDB API is saved to storage.')
        get_ip_rev(selectedText);
      })
  })
};

// Threat Crowd API
function get_ip_rev(selectedText) {
  const url = ['https://www.threatcrowd.org/searchApi/v2/ip/report/?ip=' + selectedText];

  fetch(url).then(function (res) { return res.json(); })
    .then(function (jsonData) {
      chrome.storage.local.set({ 'res_rev': jsonData, 'flg': 'ok' });
      console.log('[LOG] Data from ThreatCrowd API is saved to storage.')
    })
};

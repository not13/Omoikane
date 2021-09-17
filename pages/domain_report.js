// Get API responses from a local storage.
function get_api_response() {
  chrome.storage.local.get(['selected_text', 'res_who', 'res_sub', 'res_dig'], function (result) {

    const selectedText = result.selected_text;
    const res_who = result.res_who;
    const res_sub = result.res_sub;
    const res_dig = result.res_dig;

    console.log(selectedText);
    console.log(res_who);
    console.log(res_sub);
    console.log(res_dig);

    replace_html(selectedText, res_who, res_sub, res_dig);
  })
};

function replace_html(selectedText, res_who, res_sub, res_dig) {

  // Whois info
  let replaceText = '<h2>' + strServerInfo + '</h2>';
  replaceText += '<div style="margin-left: 20px">';

  if (res_who.state == 'fail') {
    replaceText += strDataFetchFailed
  }
  else {
    replaceText += '<code>';
    replaceText += '<b><font size="+1">' + strDate + ':</font></b><br>';

    if ('date' in res_who.results.detail) {

      for (let i = 0; i < res_who.results.detail.date.length; i++) {
        replaceText += res_who.results.detail.date[i] + '<br>';
      }

      replaceText += '<br>';
    }

    if ('registrant' in res_who.results.detail) {
      replaceText += '<b><font size="+1">' + strRegistrant + ':</font></b><br>';

      for (let i = 0; i < res_who.results.detail.registrant.length; i++) {
        replaceText += res_who.results.detail.registrant[i] + '<br>';
      }

      replaceText += '<br>';
    }

    if ('admin' in res_who.results.detail) {
      replaceText += '<b><font size="+1">' + strAdmin + ':</font></b><br>';

      for (let i = 0; i < res_who.results.detail.admin.length; i++) {
        replaceText += res_who.results.detail.admin[i] + '<br>';
      }

      replaceText += '<br>';
    }

    if ('name_server' in res_who.results.detail) {
      replaceText += '<b><font size="+1">' + strNameServers + ':</font></b><br>';

      for (let i = 0; i < res_who.results.detail.name_server.length; i++) {
        replaceText += res_who.results.detail.name_server[i] + '<br>';
      }

      replaceText += '<br>';
    }
    replaceText += '</code>';
  }

  replaceText += '</div>';

  // Subdomains
  replaceText += '<h2>' + strSubdomains + '</h2>';
  replaceText += '<div style="margin-left: 20px">';

  if (res_sub.response_code == 0) {
    replaceText += strDataFetchFailed
  }

  else {

    if (res_sub.subdomains.length == 0) {
      replaceText += 'None';
    }
    else {

      for (let i = 0; i < res_sub.subdomains.length; i++) {
        replaceText += res_sub.subdomains[i] + '<br>';
      }

    }
  }

  replaceText += '</div>';

  // Resolutions
  replaceText += '<h2>' + strResolutions + '</h2>';
  replaceText += '<div style="margin-left: 20px">';

  if (res_dig.state == 'fail') {
    replaceText += strDataFetchFailed
  }
  else {

    if (res_dig.results.length == 0) {
      replaceText += strNone;
    }
    else {

      for (let i = 0; i < res_dig.results.length; i++) {
        replaceText += res_dig.results[i] + '<br>';
      }

    }
  }

  replaceText += '</div>';

  // Resolution Histories
  replaceText += '<h2>' + strResolutionHistories + '</h2>';
  replaceText += '<div style="margin-left: 20px">';

  if (res_sub.response_code == 0) {
    replaceText += strDataFetchFailed
  }
  else {

    if (res_sub.resolutions.length == 0) {
      replaceText += strNone;
    }
    else {

      for (let i = 0; i < res_sub.resolutions.length; i++) {
        replaceText += '<b>' + res_sub.resolutions[i].ip_address + '</b>';
        replaceText += ' ---(' + strLastResolved + ': ' + res_sub.resolutions[i].last_resolved + ')<br>';
      }

    }
  }

  // Recommendations
  replaceText += '</div>';
  replaceText += '<h2>' + strRecommendations + ' <font size="-1"> (' + strManualSearch + ')</font></h2>';
  replaceText += '<div style="margin-left: 20px">';
  replaceText += '<a href="https://sitereport.netcraft.com/" target="_blank" rel="noopener noreferrer">Netcraft</a> (' + strHostingHistory + ')<br>';
  replaceText += '<a href="https://whois-history.whoisxmlapi.com/lookup" target="_blank" rel="noopener noreferrer">WhoisXML</a> (' + strWhoisHistory + ')<br>';
  replaceText += '<a href="https://whoisrequest.com/history/" target="_blank" rel="noopener noreferrer">Domain History Checker</a> (' + strDomainInfoHistory + ')<br>';
  replaceText += '<a href="https://www.virustotal.com/gui/domain/' + selectedText + '/relations" target="_blank" rel="noopener noreferrer">VirusTotal: relation page</a> (' + strFilesReferring + ')<br>';
  replaceText += '</div>';
  replaceText += '<h2>' + strDomainSearchWith + '</h2>';
  replaceText += '<div style="margin-left: 20px">';
  replaceText += '<a href="https://whois.domaintools.com/' + selectedText + '" target="_blank" rel="noopener noreferrer">DomainTools</a><br>';
  replaceText += '<a href="https://urlscan.io/search/#' + selectedText + '" target="_blank" rel="noopener noreferrer">urlscan.io</a><br>';
  replaceText += '<a href="https://urlhaus.abuse.ch/browse.php?search=' + selectedText + '" target="_blank" rel="noopener noreferrer">URLhaus</a><br>';
  replaceText += '<a href="https://www.shodan.io/search?query=' + selectedText + '" target="_blank" rel="noopener noreferrer">Shodan</a><br>';
  replaceText += '<a href="https://www.threatcrowd.org/domain.php?domain=' + selectedText + '" target="_blank" rel="noopener noreferrer">Threat Crowd</a><br>';
  replaceText += '<a href="https://www.virustotal.com/gui/domain/' + selectedText + '" target="_blank" rel="noopener noreferrer">VirusTotal</a><br>';
  replaceText += '</div>';

  elm = document.getElementById('result_body');
  elm.innerHTML = replaceText;
  console.log(('[LOG] IP investigation report creation complete!'))
};

function message_to_background(query) {
  chrome.runtime.sendMessage({
    mode: 'domain_report',
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
const query = document.location.search.substring(1);
console.log('[LOG] Page query=' + query);

// Get localization text.
const strTimeout = chrome.i18n.getMessage('global_timeout')
const strTitle = chrome.i18n.getMessage('domain_report_str_title');
const strTargetDomain = chrome.i18n.getMessage('domain_report_str_target_domain');
const strServerInfo = chrome.i18n.getMessage('domain_report_str_server_info');
const strDataFetchFailed = chrome.i18n.getMessage('domain_report_str_data_fetch_failed');
const strDate = chrome.i18n.getMessage('domain_report_str_date');
const strRegistrant = chrome.i18n.getMessage('domain_report_str_registrant');
const strAdmin = chrome.i18n.getMessage('domain_report_str_admin');
const strNameServers = chrome.i18n.getMessage('domain_report_str_name_servers');
const strSubdomains = chrome.i18n.getMessage('domain_report_str_subdomains');
const strResolutions = chrome.i18n.getMessage('domain_report_str_resolutions');
const strNone = chrome.i18n.getMessage('domain_report_str_none');
const strResolutionHistories = chrome.i18n.getMessage('domain_report_str_resolution_histories');
const strLastResolved = chrome.i18n.getMessage('domain_report_str_last_resolved');
const strRecommendations = chrome.i18n.getMessage('domain_report_str_recommendations');
const strManualSearch = chrome.i18n.getMessage('domain_report_str_manual_search');
const strHostingHistory = chrome.i18n.getMessage('domain_report_str_hosting_history');
const strWhoisHistory = chrome.i18n.getMessage('domain_report_str_whois_history');
const strDomainInfoHistory = chrome.i18n.getMessage('domain_report_str_domain_info_history');
const strFilesReferring = chrome.i18n.getMessage('domain_report_str_files_referring');
const strDomainSearchWith = chrome.i18n.getMessage('domain_report_str_domain_search_with');

// Localize a page title and a input text.
let elm = document.getElementById('str_title');
elm.innerHTML = strTitle;

elm = document.getElementById('str_target_domain');
elm.innerHTML = strTargetDomain + ': ' + query;


message_to_background(query);
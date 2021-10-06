// Get API responses from a local storage.
function get_api_response() {
  chrome.storage.local.get(['selected_text', 'res_pro', 'res_sho', 'res_abu', 'res_rev'], function (result) {

    const selectedText = result.selected_text;
    const resPro = result.res_pro;
    const resSho = result.res_sho;
    const resAbu = result.res_abu;
    const resRev = result.res_rev;

    console.log(selectedText);
    console.log(resPro);
    console.log(resSho);
    console.log(resAbu);
    console.log(resRev);

    replace_html(selectedText, resPro, resSho, resAbu, resRev);
  })
};

function replace_html(selectedText, resPro, resSho, resAbu, resRev) {

  // Server info
  let replaceText = '<h2>' + strServerInfo + '</h2>';
  replaceText += '<div style="margin-left: 20px">';

  if (resPro.status != 'ok') {
    replaceText += strDataFetchFailed
  }
  else {
    replaceText += '<code>';

    if ('hostnames' in resSho && resSho.hostnames != void 0) {
      replaceText += strHostname + ': ' + resSho.hostnames + '<br>';
    }

    replaceText += 'AS: ' + resPro[selectedText].asn + '<br>';
    replaceText += 'ISP: ' + resPro[selectedText].provider + '<br>';
    replaceText += 'ORG: ' + resPro[selectedText].continent + '<br>';
    replaceText += 'Region: ' + resPro[selectedText].region + '<br>';
    replaceText += 'City: ' + resPro[selectedText].city + '<br>';
    replaceText += 'Country: ' + resPro[selectedText].country + '<br>';
    replaceText += 'Latitude: ' + resPro[selectedText].latitude + ', Longitude: ' + resPro[selectedText].longitude + '<br>';
    replaceText += '</code>';
    replaceText += '</div>';
    replaceText += '<h2>' + strGeolocationMap + '</h2>';
    replaceText += '<div style="margin-left: 20px">';
    replaceText += '<iframe src="https://maps.google.com/maps?output=embed&z=10&';
    replaceText += 'll=' + resPro[selectedText].latitude + ', ' + resPro[selectedText].longitude;
    replaceText += '&q=' + resPro[selectedText].latitude + ', ' + resPro[selectedText].longitude;
    replaceText += '&hl=en" width="600" height="400" style="border:1;" allowfullscreen="" loading="lazy">';
    replaceText += '</iframe>'
  };
  replaceText += '</div>';

  // Open ports
  replaceText += '<h2>' + strOpenPorts + '<font size="-2"> (' + strReferenceFromShodan + ')</font></h2>';
  replaceText += '<div style="margin-left: 20px">';

  if ('error' in resSho) {
    replaceText += resSho.error
  }
  else {

    if ('ports' in resSho) {
      replaceText += strOpenPorts + ': ' + resSho.ports;
    }
    else {
      replaceText += strNoOpenPorts;
    }
  }
  replaceText += '</div>';

  // Proxy check
  replaceText += '<h2>' + strProxyCheck + '</h2>';
  replaceText += '<div style="margin-left: 20px">';

  if (resPro.status != 'ok') {
    replaceText += strDataFetchFailed
  }
  else {
    replaceText += strProxy + ': ' + resPro[selectedText].proxy;

    if (resPro[selectedText].proxy == 'yes')
      replaceText += ' , ' + strType + ': ' + resPro[selectedText].type
  }
  replaceText += '</div>';

  // Abuse report
  replaceText += '<h2>' + strAbuseReport + '<font size="-2"> (' + strReferenceFromAbuse + ')</font></h2>';
  replaceText += '<div style="margin-left: 20px">';

  if ('data' in resAbu) {

    if (resAbu.data.totalReports > 0) {
      replaceText += '<a href="https://www.abuseipdb.com/check/' + selectedText + '" target="_blank" rel="noopener noreferrer">' + strAbuseReports + ': ';
      replaceText += resAbu.data.totalReports + '</a><br>';
      replaceText += strUsageType + ': ' + resAbu.data.usageType;
    }
    else {
      strNoAbuseReports
    }
  }
  replaceText += '</div>';

  // Reverse DNS
  replaceText += '<h2>' + strReverseDns + '</h2>';
  replaceText += '<div style="margin-left: 20px">';

  if (resRev.response_code == 0) {
    replaceText += 'None';
  }
  else {

    for (let i = 0; i < resRev.resolutions.length; i++) {
      replaceText += '<b>' + resRev.resolutions[i].domain;
      replaceText += '</b> --- (' + strLastResolved + ': ' + resRev.resolutions[i].last_resolved + ')<br>';
    }

  };
  replaceText += '</div>';

  // Recommendations
  replaceText += '<h2>' + strRecommendations + '</h2>';
  replaceText += '<div style="margin-left: 20px">';
  replaceText += '<a href="https://www.virustotal.com/gui/ip-address/' + selectedText + '/relations" target="_blank" rel="noopener noreferrer">VirusTotal: relation page</a> (' + strIpUsedHistory + ')<br>';
  replaceText += '</div>';
  replaceText += '<h2>' + strIpAddressSearchWith + '</h2>';
  replaceText += '<div style="margin-left: 20px">';
  replaceText += '<a href="https://whois.domaintools.com/' + selectedText + '" target="_blank" rel="noopener noreferrer">DomainTools</a><br>';
  replaceText += '<a href="https://urlscan.io/search/#' + selectedText + '" target="_blank" rel="noopener noreferrer">urlscan.io</a><br>';
  replaceText += '<a href="https://urlhaus.abuse.ch/browse.php?search=' + selectedText + '" target="_blank" rel="noopener noreferrer">URLhaus</a><br>';
  replaceText += '<a href="https://www.abuseipdb.com/check/' + selectedText + '" target="_blank" rel="noopener noreferrer">AbuseIPDB</a><br>';
  replaceText += '<a href="https://www.shodan.io/host/' + selectedText + '" target="_blank" rel="noopener noreferrer">Shodan</a><br>';
  replaceText += '<a href="https://www.threatcrowd.org/ip.php?ip=' + selectedText + '" target="_blank" rel="noopener noreferrer">Threat Crowd</a><br>';
  replaceText += '<a href="https://www.virustotal.com/gui/ip-address/' + selectedText + '" target="_blank" rel="noopener noreferrer">VirusTotal</a><br>';
  replaceText += '</div>';

  elm = document.getElementById('result_body');
  elm.innerHTML = replaceText;
  console.log(('[LOG] IP investigation report creation complete!'))
};

function message_to_background(query) {
  chrome.runtime.sendMessage({
    mode: 'ip_report',
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
          get_api_response();
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
const strTitle = chrome.i18n.getMessage('ip_report_str_title');
const strTargetIp = chrome.i18n.getMessage('ip_report_str_target_ip');
const strServerInfo = chrome.i18n.getMessage('ip_report_str_server_info');
const strDataFetchFailed = chrome.i18n.getMessage('ip_report_str_data_fetch_failed');
const strHostname = chrome.i18n.getMessage('ip_report_str_hostname');
const strGeolocationMap = chrome.i18n.getMessage('ip_report_str_geolocation_map');
const strOpenPorts = chrome.i18n.getMessage('ip_report_str_open_ports');
const strNoOpenPorts = chrome.i18n.getMessage('ip_report_str_no_open_ports');
const strReferenceFromShodan = chrome.i18n.getMessage('ip_report_str_reference_from_shodan');
const strProxyCheck = chrome.i18n.getMessage('ip_report_str_proxy_check');
const strProxy = chrome.i18n.getMessage('ip_report_str_proxy');
const strType = chrome.i18n.getMessage('ip_report_str_type');
const strAbuseReport = chrome.i18n.getMessage('ip_report_str_abuse_report');
const strReferenceFromAbuse = chrome.i18n.getMessage('ip_report_str_reference_from_abuse');
const strAbuseReports = chrome.i18n.getMessage('ip_report_str_abuse_reports');
const strUsageType = chrome.i18n.getMessage('ip_report_str_usage_type');
const strNoAbuseReports = chrome.i18n.getMessage('ip_report_str_no_abuse_reports');
const strReverseDns = chrome.i18n.getMessage('ip_report_str_reverse_dns');
const strLastResolved = chrome.i18n.getMessage('ip_report_str_last_resolved');
const strRecommendations = chrome.i18n.getMessage('ip_report_str_recommendations');
const strIpUsedHistory = chrome.i18n.getMessage('ip_report_str_ip_used_history');
const strIpAddressSearchWith = chrome.i18n.getMessage('ip_report_str_ip_address_search_with');

// Localize a page title and a input text.
let elm = document.getElementById('str_title');
elm.innerHTML = strTitle;

elm = document.getElementById('str_target_ip');
elm.innerHTML = strTargetIp + ': ' + query;

message_to_background(query);
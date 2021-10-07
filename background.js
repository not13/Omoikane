importScripts('src/contextMenus.js');
importScripts('src/commonFunction.js');
importScripts('src/malpediaApi.js');
importScripts('src/ipAddress.js');
importScripts('src/domainName.js');


chrome.runtime.onInstalled.addListener(function () {
  // Version check and open a start page (README.html).
  chrome.storage.local.get(['version'], function (result) {
    const currentVersion = get_manifest_data('version');

    if (result.version == void 0 || result.version < currentVersion) {
      open_tab('https://github.com/not13/Omoikane/blob/master/README.md');
      chrome.storage.local.set({ 'version': currentVersion });
    }
  });
});


// What to do when the context menu is clicked.
chrome.contextMenus.onClicked.addListener(function (item) {
  console.log(
    '[LOG] Selected text= "' + item.selectionText + '" , ' +
    'Selected menu= "' + item.menuItemId + '"'
  );

  const selectedText = item.selectionText;

  // Delete previous results.
  storage_cleaner();

  switch (item.menuItemId) {
    // Actor / Malware search and report creation.
    case 'actor_name': // Actor's a.k.a search.
      popup_window('pages/actor_search.html?' + selectedText, 800, 800);
      break;

    case 'malware_name': // Malware family search.
      popup_window('pages/malware_search.html?' + selectedText, 800, 800);
      break;

    case 'strings_vt': // Search strings on VirusTotal.
      open_tab('https://www.virustotal.com/gui/search/' + selectedText);
      break;

    case 'strings_ha': // Search strings on HybridAnalytics.
      open_tab('https://www.hybrid-analysis.com/search?query=' + selectedText);
      break;

    case 'strings_joe': // Search strings on JoeSandbox.
      open_tab('https://www.joesandbox.com/search?q=' + selectedText);
      break;

    // IP / Domain Report Creation
    case 'ip_report': // IP investigation report creation.
      popup_window('pages/ip_report.html?' + selectedText, 800, 800);
      break;

    case 'domain_report': // Domain investigation report creation.
      popup_window('pages/domain_report.html?' + selectedText, 800, 800);
      break;

    // IP Search
    case 'ip_domaintools': // Search IP address with DomainTools.
      open_tab('https://whois.domaintools.com/' + selectedText);
      break;

    case 'ip_urlscan': // Search IP address with urlscan.io.
      open_tab('https://urlscan.io/search/#' + selectedText);
      break;

    case 'ip_urlhaus': // Search IP address with URLhaus.
      open_tab('https://urlhaus.abuse.ch/browse.php?search=' + selectedText);
      break;

    case 'ip_abuseipdb': // Search IP address with AbuseIPDB.
      open_tab('https://www.abuseipdb.com/check/' + selectedText);
      break;

    case 'ip_shodan': // Search IP address with Shodan.
      open_tab('https://www.shodan.io/host/' + selectedText);
      break;

    case 'ip_threatcrowd': // Search IP address with Treat Crowd.
      open_tab('https://www.threatcrowd.org/ip.php?ip=' + selectedText);
      break;

    case 'ip_virustotal': // Search the IP address with VirusTotal.
      open_tab('https://www.virustotal.com/gui/ip-address/' + selectedText);
      break;

    // Domain Search
    case 'domain_domaintools': // Search the domain name with DomainTools.
      open_tab('https://whois.domaintools.com/' + selectedText);
      break;

    case 'domain_urlscan': // Search the domain name with urlscan.io.
      open_tab('https://urlscan.io/search/#' + selectedText);
      break;

    case 'domain_urlhaus': // Search the domain name with URLhaus.
      open_tab('https://urlhaus.abuse.ch/browse.php?search=' + selectedText);
      break;

    case 'domain_shodan': // Search the domain name with Shodan.
      open_tab('https://www.shodan.io/search?query=' + selectedText);
      break;

    case 'domain_threatcrowd': // Search the domain name with Threat Crowd.
      open_tab('https://www.threatcrowd.org/domain.php?domain=' + selectedText);
      break;

    case 'domain_virustotal': // Search the domain name with VirusTotal.
      open_tab('https://www.virustotal.com/gui/domain/' + selectedText);
      break;

    // Hash Search
    case 'hash_virustotal': // Search the hash value with VirusTotal.
      open_tab('https://www.virustotal.com/gui/file/' + selectedText + '/details');
      break;

    case 'hash_hybridanalysis': // Search the hash value with HybridAnalysis.
      open_tab('https://www.hybrid-analysis.com/search?query=' + selectedText);
      break;

    case 'hash_anyrun': // Search the hash value with ANY.RUN.
      open_tab('https://app.any.run/submissions/#filehash:' + selectedText);
      break;

    case 'hash_joesandbox': // Search the hash value with JoeSandbox.
      open_tab('https://www.joesandbox.com/search?q=' + selectedText);
      break;

    // Fingerprint Search
    case 'fingerprint_search': // Search the fingerprint strings with Shodan.
      const encText = encodeURIComponent(selectedText);
      open_tab('https://www.shodan.io/search?query=Fingerprint%3A+' + encText);
      break;

    // Help menu
    case 'help': // Open README.md.
      open_tab('https://github.com/not13/Omoikane/blob/master/README.md');
      break;

    default:
      break;
  }
});


// Message receiver: Receive the message from content scripts.
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('[LOG] Received message (mode)= "' + request.mode + '"')

  switch (request.mode) {

    // Construct context menus to fit the selected text when select strings.
    // Receive the message from src/contextMenus.js
    case 'const_init_menus': {
      construct_init_menus();
      break;
    }
    case 'const_menus': {
      const strSel = request.selected_text;

      if (strSel != 0) {
        const resSel = check_selection_str(remove_brackets(strSel));
        construct_menus(resSel, request.titles);
      };
      break;
    }

    // Check the strings from popup.html
    case 'check_str': {
      const strPop = request.query;
      const resPop = check_selection_str(remove_brackets(strPop));
      sendResponse(resPop);
      break;
    }

    // Receive the message from pages/actor_search.js.
    case 'actor_search': {
      storage_cleaner();
      actor_search(request.query);
      sendResponse('Response from BG.js');
      break;
    }

    case 'actor_report': {
      storage_cleaner();
      get_actor_details(request.query);
      sendResponse('Response from BG.js');
      break;
    }

    case 'malware_search': {
      storage_cleaner();
      malware_search(request.query);
      sendResponse('Response from BG.js');
      break;
    }

    case 'malware_report': {
      storage_cleaner();
      get_malware_details(request.query);
      sendResponse('Response from BG.js');
      break;
    }

    case 'ip_report': {
      storage_cleaner();
      get_ip_report(request.query);
      sendResponse('Response from BG.js');
      break;
    }

    case 'domain_report': {
      storage_cleaner();
      get_domain_report(request.query);
      sendResponse('Response from BG.js');
      break;
    }

    default: {
      break;
    }
  }
  return true;
});

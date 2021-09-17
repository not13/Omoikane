// Set variables.
let divAct = document.getElementById('actor_search');
let divMal = document.getElementById('malware_search');
let divIp = document.getElementById('ip_search');
let divDom = document.getElementById('domain_search');
let divHas = document.getElementById('hash_search');
let divFin = document.getElementById('fingerprint_search');
let btnFlg = document.getElementById('btn_keep_str');
let inpBox = document.getElementById('input_box');

// Remove square brackets and spaces.
function remove_brackets(str) {
  return str.replace(/\[|\]| /g, '')
};

// Open a new tab with the specific url.
function open_tab(url) {
  const urlStrings = remove_brackets(url);
  chrome.tabs.create({ url: urlStrings });
}

// Popup a window with the specific url and size.
function popup_window(popUrl, popWidth, popHeight) {
  const urlStrings = remove_brackets(popUrl);
  chrome.windows.create({
    url: urlStrings,
    type: 'popup',
    width: popWidth,
    height: popHeight
  });
};

function switch_btn_visibility(response) {

  if (response == 'ip') {
    divIp.style.display = ''
    divAct.style.display = 'none';
    divMal.style.display = 'none';
    divDom.style.display = 'none';
    divHas.style.display = 'none';
    divFin.style.display = 'none';
  }

  if (response == 'domain') {
    divAct.style.display = 'none';
    divMal.style.display = 'none';
    divIp.style.display = 'none';
    divDom.style.display = '';
    divHas.style.display = 'none';
    divFin.style.display = 'none';
  }

  if (response == 'md5' || response == 'sha1' || response == 'sha256') {
    divAct.style.display = 'none';
    divMal.style.display = 'none';
    divIp.style.display = 'none';
    divDom.style.display = 'none';
    divHas.style.display = '';
    divFin.style.display = 'none';
  }

  if (response == 'fingerprint') {
    divAct.style.display = 'none';
    divMal.style.display = 'none';
    divIp.style.display = 'none';
    divDom.style.display = 'none';
    divHas.style.display = 'none';
    divFin.style.display = '';
  }

  if (response == 'text') {
    divAct.style.display = '';
    divMal.style.display = '';
    divIp.style.display = 'none';
    divDom.style.display = 'none';
    divHas.style.display = 'none';
    divFin.style.display = 'none';
  }

}

window.addEventListener('DOMContentLoaded', function () {

  divIp.style.display = 'none';
  divDom.style.display = 'none';
  divHas.style.display = 'none';
  divFin.style.display = 'none';

  chrome.storage.local.get(['input_str', 'keep_text_flg'], function (result) {
    btnFlg.textContent = chrome.i18n.getMessage('popup_btn_keep_str_off');

    if (result.keep_text_flg == 'on') {
      inpBox.value = result.input_str;
      btnFlg.textContent = chrome.i18n.getMessage('popup_btn_keep_str_on');

      chrome.runtime.sendMessage({
        mode: 'check_str',
        query: inpBox.value
      }, function (response) {
        switch_btn_visibility(response);
      })

    };
  });

  inpBox.focus();

  btnFlg.addEventListener('click', function (e) {

    chrome.storage.local.get(['input_str', 'keep_text_flg'], function (result) {

      if (result.keep_text_flg == 'off' || result.keep_text_flg == void 0) {
        btnFlg.textContent = chrome.i18n.getMessage('popup_btn_keep_str_on');
        chrome.storage.local.set({ 'input_str': inpBox.value });
        chrome.storage.local.set({ 'keep_text_flg': 'on' });
      };

      if (result.keep_text_flg == 'on') {
        btnFlg.textContent = chrome.i18n.getMessage('popup_btn_keep_str_off');
        chrome.storage.local.set({ 'input_str': '' });
        chrome.storage.local.set({ 'keep_text_flg': 'off' });
      };

    });
  });

  // /Show / hide buttons.
  inpBox.addEventListener('input', function (e) {
    chrome.storage.local.set({ 'input_str': e.target.value });
    chrome.runtime.sendMessage({
      mode: 'check_str',
      query: e.target.value

    }, function (response) {

      switch_btn_visibility(response);

    })
  });

  // Buttons function.
  // Report creation
  document.getElementById('btn_actor').addEventListener('click', function (event) {
    const val = inpBox;
    if (inpBox.value != '') {
      popup_window('pages/actor_search.html?' + val.value, 800, 800);
    };
  });

  document.getElementById('btn_malware').addEventListener('click', function (event) {
    const val = inpBox;
    if (inpBox.value != '') {
      popup_window('pages/malware_search.html?' + val.value, 800, 800);
    };
  });

  document.getElementById('btn_ip_report').addEventListener('click', function (event) {
    const val = inpBox;
    popup_window('pages/ip_report.html?' + val.value, 800, 800);
  });

  document.getElementById('btn_domain_report').addEventListener('click', function (event) {
    const val = inpBox;
    popup_window('pages/domain_report.html?' + val.value, 800, 800);
  });

  // Strings search
  document.getElementById('btn_str_virustotal').addEventListener('click', function (event) {
    const val = inpBox;
    if (inpBox.value != '') {
      open_tab('https://www.virustotal.com/gui/search/' + val.value);
    };
  });

  document.getElementById('btn_str_hybridanalysis').addEventListener('click', function (event) {
    const val = inpBox;
    if (inpBox.value != '') {
      open_tab('https://www.hybrid-analysis.com/search?query=' + val.value);
    };
  });

  document.getElementById('btn_str_joesandbox').addEventListener('click', function (event) {
    const val = inpBox;
    if (inpBox.value != '') {
      open_tab('https://www.joesandbox.com/search?q=' + val.value);
    };
  });

  // IP search
  document.getElementById('btn_ip_domaintools').addEventListener('click', function (event) {
    const val = inpBox;
    open_tab('https://whois.domaintools.com/' + val.value);
  });

  document.getElementById('btn_ip_urlscan').addEventListener('click', function (event) {
    const val = inpBox;
    open_tab('https://urlscan.io/search/#' + val.value);
  });

  document.getElementById('btn_ip_urlhaus').addEventListener('click', function (event) {
    const val = inpBox;
    open_tab('https://urlhaus.abuse.ch/browse.php?search=' + val.value);
  });

  document.getElementById('btn_ip_abuse').addEventListener('click', function (event) {
    const val = inpBox;
    open_tab('https://www.abuseipdb.com/check/' + val.value);
  });

  document.getElementById('btn_ip_shodan').addEventListener('click', function (event) {
    const val = inpBox;
    open_tab('https://www.shodan.io/host/' + val.value);
  });

  document.getElementById('btn_ip_threatcrowd').addEventListener('click', function (event) {
    const val = inpBox;
    open_tab('https://www.threatcrowd.org/ip.php?ip=' + val.value);
  });

  document.getElementById('btn_ip_virustotal').addEventListener('click', function (event) {
    const val = inpBox;
    open_tab('https://www.virustotal.com/gui/ip-address/' + val.value);
  });

  // Domain searach
  document.getElementById('btn_domain_domaintools').addEventListener('click', function (event) {
    const val = inpBox;
    open_tab('https://whois.domaintools.com/' + val.value);
  });

  document.getElementById('btn_domain_urlscan').addEventListener('click', function (event) {
    const val = inpBox;
    open_tab('https://urlscan.io/search/#' + val.value);
  });

  document.getElementById('btn_domain_urlhaus').addEventListener('click', function (event) {
    const val = inpBox;
    open_tab('https://urlhaus.abuse.ch/browse.php?search=' + val.value);
  });

  document.getElementById('btn_domain_shodan').addEventListener('click', function (event) {
    const val = inpBox;
    open_tab('https://www.shodan.io/search?query=' + val.value);
  });

  document.getElementById('btn_domain_threatcrowd').addEventListener('click', function (event) {
    const val = inpBox;
    open_tab('https://www.threatcrowd.org/domain.php?domain=' + val.value);
  });

  document.getElementById('btn_domain_virustotal').addEventListener('click', function (event) {
    const val = inpBox;
    open_tab('https://www.virustotal.com/gui/file/' + val.value);
  });

  // Hash search
  document.getElementById('btn_hash_virustotal').addEventListener('click', function (event) {
    const val = inpBox;
    open_tab('https://www.virustotal.com/gui/file/' + val.value);
  });

  document.getElementById('btn_hash_hybridanalysis').addEventListener('click', function (event) {
    const val = inpBox;
    open_tab('https://www.hybrid-analysis.com/search?query=' + val.value);
  });

  document.getElementById('btn_hash_anyrun').addEventListener('click', function (event) {
    const val = inpBox;
    open_tab('https://app.any.run/submissions/#filehash:' + val.value);
  });

  document.getElementById('btn_hash_joesandbox').addEventListener('click', function (event) {
    const val = inpBox;
    open_tab('https://www.joesandbox.com/search?q=' + val.value);
  });

  // Fingerprint search
  document.getElementById('btn_ssh_shodan').addEventListener('click', function (event) {
    const val = inpBox;
    open_tab('https://www.shodan.io/search?query=Fingerprint%3A+' + val.value);
  });

});

function send_message(str, menuTitles) {
  chrome.runtime.sendMessage({
    mode: 'const_menus',
    titles: menuTitles,
    selected_text: str
  }, function (response) {
    console.log(response);
  });
};

// Import to browsing sites.
// Initial menu construction.
chrome.runtime.sendMessage({
  mode: 'const_init_menus',
}, function (response) {
  console.log(response);
});

const lang =  chrome.i18n.getUILanguage()

// Survey the mouse action (mouseup.)
document.addEventListener("mouseup", function (event) {
  const str = window.getSelection().toString();

  // Set context menus title to var.

    if ( lang == 'ja') {
      // Construct Japanese titles.
      const menuTitles = {
        ip_search: 'IP アドレス検索',
        ip_report: 'IP 調査レポートを作成',
        domain_search: 'ドメイン名検索',
        domain_report: 'ドメイン名調査レポートを作成',
        hash_search: 'ハッシュ値検索',
        fingerprint_search: 'SSH フィンガープリント検索 (Shodan)',
        selection_menu: '文字列検索',
        actor_name: 'アクター名として検索（別名検索）',
        malware_name: 'マルウェア名として検索',
        strings_vt: '文字列として検索 (VirusTotal)',
        strings_ha: '文字列として検索 (Hybrid Analysis)',
        strings_joe: '文字列として検索 (Joe Sandbox)',
      }

      send_message(str, menuTitles);
    }

    else {
      // Construct English titles.
      const menuTitles = {
        ip_search: 'IP search with',
        ip_report: 'IP investigation report creation',
        domain_search: 'Domain search with',
        domain_report: 'Domain investigation report creation',
        hash_search: 'Hash search with',
        fingerprint_search: 'Fingerprint search with Shodan',
        selection_menu: 'Strings search',
        actor_name: 'as a Actor name (a.k.a. search)',
        malware_name: 'as a Malware name',
        strings_vt: 'as strings (with VirusTotal)',
        strings_ha: 'as strings (with Hybrid Analysis)',
        strings_joe: 'as strings (with Joe Sandbox)',
      }

      send_message(str, menuTitles);
    }


  // When a mouse is up, send a message to background.js to construct menus.

  //  chrome.runtime.sendMessage({
  //    mode: 'const_menus',
  //    help_title: 'Open Read Me!',
  //    selected_text: str
  //  }, function (response) {
  //    console.log(response);
  //  });

});

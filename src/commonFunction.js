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

// Delete previous results which in the local storage.
// Selected text
// API responses for IP report.
// API responses for Domain report.
// API responses for Actor's search and report.
// API responses for Malware search and report.
function storage_cleaner() {
  const keyName = [
    'flg',
    'selected_text',
    'res_pro', 'res_sho', 'res_abu', 'res_rev',
    'res_who', 'res_sub', 'res_dig',
    'res_actor_aka', 'res_actor_details',
    'res_malware', 'res_malware_details'];

  for (let i = 0; i < keyName.length; i++) {
    chrome.storage.local.set({ [keyName[i]]: '' })
  };
}

// Get manifest data in this extension's manifest.json.
function get_manifest_data(keyName) {
  const manifestData = chrome.runtime.getManifest();
  return manifestData[keyName];
};

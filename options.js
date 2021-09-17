window.addEventListener('DOMContentLoaded', function () {
  // Get the API keys (Shodan, proxycheck.io, AbuseIPDB.)
  chrome.storage.local.get(['key_sho', 'key_pro', 'key_abu'], function (result) {
    if (result.key_sho != void 0) {
      document.getElementById('key_sho').value = result.key_sho
    };
    if (result.key_pro != void 0) {
      document.getElementById('key_pro').value = result.key_pro
    }
    if (result.key_abu != void 0) {
      document.getElementById('key_abu').value = result.key_abu
    }
  });

  let btnSho = document.getElementById('btn_sho');
  let btnPro = document.getElementById('btn_pro');
  let btnAbu = document.getElementById('btn_abu');
  let keySho = document.getElementById('key_sho');
  let keyPro = document.getElementById('key_pro');
  let keyAbu = document.getElementById('key_abu');

  // View/Mask the API key when a button is pushed. (Shodan)
  // Shodan
  btnSho.addEventListener('click', function (e) {
    e.preventDefault();
    if (keySho.type === 'password') {
      keySho.type = 'text';
      btnSho.textContent = 'Mask';
    } else {
      keySho.type = 'password';
      btnSho.textContent = 'View';
    }
  });

  // proxycheck.io
  btnPro.addEventListener('click', function (event) {
    event.preventDefault();
    if (keyPro.type === 'password') {
      keyPro.type = 'text';
      btnPro.textContent = 'Mask';
    } else {
      keyPro.type = 'password';
      btnPro.textContent = 'View';
    }
  });

  // AbuseIPDB
  btnAbu.addEventListener('click', function (event) {
    event.preventDefault();
    if (keyAbu.type === 'password') {
      keyAbu.type = 'text';
      btnAbu.textContent = 'Mask';
    } else {
      keyAbu.type = 'password';
      btnAbu.textContent = 'View';
    }
  });

  // Set the API key to storage when input text have changed.
  // Shodan
  document.getElementById('key_sho').addEventListener('change', function (e) {
    chrome.storage.local.set({ 'key_sho': e.target.value })
  });

  // proxycheck.io
  document.getElementById('key_pro').addEventListener('change', function (e) {
    chrome.storage.local.set({ 'key_pro': e.target.value })
  })

  // AbuseIPDB
  document.getElementById('key_abu').addEventListener('change', function (e) {
    chrome.storage.local.set({ 'key_abu': e.target.value })
  })
});
const query = document.location.search.substring(1);
console.log('[LOG] Page query=' + query);
alert('Error message: ' + query)


  let elm = document.getElementById('str_title');
  let val = chrome.i18n.getMessage('error_str_title');
  elm.innerHTML = val;

  elm = document.getElementById('str_reason');
  val = chrome.i18n.getMessage('error_str_reason');
  elm.innerHTML = val;

  elm = document.getElementById('str_error_messages');
  val = chrome.i18n.getMessage('error_str_error_messages') + ': ' + query;
  elm.innerHTML = val;

  elm = document.getElementById('str_toofast_title');
  val = chrome.i18n.getMessage('error_str_toofast_title');
  elm.innerHTML = val;

  elm = document.getElementById('str_toofast_body');
  val = chrome.i18n.getMessage('error_str_toofast_body');
  elm.innerHTML = val;

  elm = document.getElementById('str_limitationreached_title');
  val = chrome.i18n.getMessage('error_str_limitationreached_title');
  elm.innerHTML = val;

  elm = document.getElementById('str_limitationreached_body');
  val = chrome.i18n.getMessage('error_str_limitationreached_body');
  elm.innerHTML = val;

  elm = document.getElementById('str_noapikey_title');
  val = chrome.i18n.getMessage('error_str_noapikey_title');
  elm.innerHTML = val;

  elm = document.getElementById('str_noapikey_body');
  val = chrome.i18n.getMessage('error_str_noapikey_body');
  elm.innerHTML = val;
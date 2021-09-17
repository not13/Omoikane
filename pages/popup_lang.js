window.addEventListener('DOMContentLoaded', function () {

  let elm = document.getElementById('str_title');
  let val = chrome.i18n.getMessage('popup_title');
  elm.innerHTML = val;

  elm = document.getElementById('btn_keep_str');
  val = chrome.i18n.getMessage('popup_btn_keep_str_on');
  elm.innerHTML = val;

  elm = document.getElementById('input_box');
  val = chrome.i18n.getMessage('popup_input_box');
  elm.placeholder = val;

  elm = document.getElementById('btn_str_virustotal');
  val = chrome.i18n.getMessage('popup_btn_str_virustotal');
  elm.innerHTML = val;

  elm = document.getElementById('btn_str_hybridanalysis');
  val = chrome.i18n.getMessage('popup_btn_str_hybridanalysis');
  elm.innerHTML = val;

  elm = document.getElementById('btn_str_joesandbox');
  val = chrome.i18n.getMessage('popup_btn_str_joesandbox');
  elm.innerHTML = val;

  elm = document.getElementById('btn_actor');
  val = chrome.i18n.getMessage('popup_btn_actor');
  elm.innerHTML = val;

  elm = document.getElementById('btn_malware');
  val = chrome.i18n.getMessage('popup_btn_malware');
  elm.innerHTML = val;

  elm = document.getElementById('btn_ip_report');
  val = chrome.i18n.getMessage('popup_btn_ip_report');
  elm.innerHTML = val;

  elm = document.getElementById('btn_ip_domaintools');
  val = chrome.i18n.getMessage('popup_btn_ip_domaintools');
  elm.innerHTML = val;

  elm = document.getElementById('btn_ip_urlscan');
  val = chrome.i18n.getMessage('popup_btn_ip_urlscan');
  elm.innerHTML = val;

  elm = document.getElementById('btn_ip_urlhaus');
  val = chrome.i18n.getMessage('popup_btn_ip_urlhaus');
  elm.innerHTML = val;

  elm = document.getElementById('btn_ip_abuse');
  val = chrome.i18n.getMessage('popup_btn_ip_abuse');
  elm.innerHTML = val;

  elm = document.getElementById('btn_ip_shodan');
  val = chrome.i18n.getMessage('popup_btn_ip_shodan');
  elm.innerHTML = val;

  elm = document.getElementById('btn_ip_threatcrowd');
  val = chrome.i18n.getMessage('popup_btn_ip_threatcrowd');
  elm.innerHTML = val;

  elm = document.getElementById('btn_ip_virustotal');
  val = chrome.i18n.getMessage('popup_btn_ip_virustotal');
  elm.innerHTML = val;

  elm = document.getElementById('btn_domain_report');
  val = chrome.i18n.getMessage('popup_btn_domain_report');
  elm.innerHTML = val;

  elm = document.getElementById('btn_domain_domaintools');
  val = chrome.i18n.getMessage('popup_btn_domain_domaintools');
  elm.innerHTML = val;

  elm = document.getElementById('btn_domain_urlscan');
  val = chrome.i18n.getMessage('popup_btn_domain_urlscan');
  elm.innerHTML = val;

  elm = document.getElementById('btn_domain_urlhaus');
  val = chrome.i18n.getMessage('popup_btn_domain_urlhaus');
  elm.innerHTML = val;

  elm = document.getElementById('btn_domain_shodan');
  val = chrome.i18n.getMessage('popup_btn_domain_shodan');
  elm.innerHTML = val;

  elm = document.getElementById('btn_domain_threatcrowd');
  val = chrome.i18n.getMessage('popup_btn_domain_threatcrowd');
  elm.innerHTML = val;

  elm = document.getElementById('btn_domain_virustotal');
  val = chrome.i18n.getMessage('popup_btn_domain_virustotal');
  elm.innerHTML = val;

  elm = document.getElementById('btn_hash_virustotal');
  val = chrome.i18n.getMessage('popup_btn_hash_virustotal');
  elm.innerHTML = val;


  elm = document.getElementById('btn_hash_hybridanalysis');
  val = chrome.i18n.getMessage('popup_btn_hash_hybridanalysis');
  elm.innerHTML = val;

  elm = document.getElementById('btn_hash_anyrun');
  val = chrome.i18n.getMessage('popup_btn_hash_anyrun');
  elm.innerHTML = val;

  elm = document.getElementById('btn_hash_joesandbox');
  val = chrome.i18n.getMessage('popup_btn_hash_joesandbox');
  elm.innerHTML = val;

  elm = document.getElementById('btn_ssh_shodan');
  val = chrome.i18n.getMessage('popup_btn_ssh_shodan');
  elm.innerHTML = val;

  elm = document.getElementById('href_option');
  val = chrome.i18n.getMessage('popup_href_option');
  elm.innerHTML = val;

  elm = document.getElementById('href_readme');
  val = chrome.i18n.getMessage('popup_href_readme');
  elm.innerHTML = val;

});

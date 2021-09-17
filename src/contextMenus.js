// 
function check_selection_str(str) {
    let flg = 'text';
    if (str.match(/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$/)) {
        console.log('[LOG] Selected Text Type = IP address');
        flg = 'ip'
    };
    if (str.match(/^([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/)) {
        console.log('[LOG] Selected Text Type = Domain name');
        flg = 'domain'
    };
    if (str.match(/^[a-f0-9]{32}$/)) {
        console.log('[LOG] Selected Text Type = MD5');
        flg = 'md5'
    };
    if (str.match(/b[0-9a-f]{5,40}/)) {
        console.log('[LOG] Selected Text Type = SHA1');
        flg = 'sha1'
    };
    if (str.match(/\b[A-Fa-f0-9]{64}\b/)) {
        console.log('[LOG] Selected Text Type = SHA256');
        flg = 'sha256'
    };
    if (str.match(/[a-f0-9]*\:[a-f0-9]*\:[a-f0-9]*\:[a-f0-9]*\:[a-f0-9]*\:[a-f0-9]*\:[a-f0-9]*\:[a-f0-9]*\:[a-f0-9]*\:[a-f0-9]*\:[a-f0-9]*\:[a-f0-9]*\:[a-f0-9]*\:[a-f0-9]*\:[a-f0-9]*\:[a-f0-9]*/)) {
        console.log('[LOG] Selected Text Type = SSH-Fingerprint');
        flg = 'fingerprint'
    };
    return flg;
};

function construct_init_menus() {
    // Create Help menu on context menus.
    chrome.contextMenus.removeAll();
    chrome.contextMenus.create({
        type: "normal",
        contexts: ["all"],
        id: "menu0",
        title: "Omoikane"
    });
    chrome.contextMenus.create({
        type: "normal",
        contexts: ["all"],
        parentId: "menu0",
        id: "help",
        title: "README"
    });
};

function construct_menus(strType, titles) {
    // Remove All current context menus.
    chrome.contextMenus.removeAll();

    // Root of menus.
    chrome.contextMenus.create({
        type: 'normal',
        contexts: ['all'],
        id: 'menu0',
        title: 'Omoikane'
    });

    // Create IP search menus when selection string type = IP address.
    if (strType == 'ip') {
        chrome.contextMenus.create({
            type: 'normal',
            contexts: ['selection'],
            parentId: 'menu0',
            id: 'ip_search',
            title: titles.ip_search
        });
        chrome.contextMenus.create({
            type: 'normal',
            contexts: ['selection'],
            parentId: 'ip_search',
            id: 'ip_domaintools',
            title: 'DomainTools'
        });
        chrome.contextMenus.create({
            type: 'normal',
            contexts: ['selection'],
            parentId: 'ip_search',
            id: 'ip_urlscan',
            title: 'urlscan.io'
        });
        chrome.contextMenus.create({
            type: 'normal',
            contexts: ['selection'],
            parentId: 'ip_search',
            id: 'ip_urlhaus',
            title: 'URLhaus'
        });
        chrome.contextMenus.create({
            type: 'normal',
            contexts: ['selection'],
            parentId: 'ip_search',
            id: 'ip_abuseipdb',
            title: 'AbuseIPDB'
        });
        chrome.contextMenus.create({
            type: 'normal',
            contexts: ['selection'],
            parentId: 'ip_search',
            id: 'ip_shodan',
            title: 'Shodan'
        });
        chrome.contextMenus.create({
            type: 'normal',
            contexts: ['selection'],
            parentId: 'ip_search',
            id: 'ip_threatcrowd',
            title: 'Threat Crowd'
        });
        chrome.contextMenus.create({
            type: 'normal',
            contexts: ['selection'],
            parentId: 'ip_search',
            id: 'ip_virustotal',
            title: 'VirusTotal'
        });
        chrome.contextMenus.create({
            type: 'normal',
            contexts: ['selection'],
            parentId: 'menu0',
            id: 'ip_report',
            title: titles.ip_report
        });
    };

    // Create Domain name search menus when selection string type = Domain name.
    if (strType == 'domain') {
        chrome.contextMenus.create({
            type: 'normal',
            contexts: ['selection'],
            parentId: 'menu0',
            id: 'domain_search',
            title: titles.domain_search
        });
        chrome.contextMenus.create({
            type: 'normal',
            contexts: ['selection'],
            parentId: 'domain_search',
            id: 'domain_domaintools',
            title: 'DomainTools'
        });
        chrome.contextMenus.create({
            type: 'normal',
            contexts: ['selection'],
            parentId: 'domain_search',
            id: 'domain_urlscan',
            title: 'urlscan.io'
        });
        chrome.contextMenus.create({
            type: 'normal',
            contexts: ['selection'],
            parentId: 'domain_search',
            id: 'domain_urlhaus',
            title: 'URLhaus'
        });
        chrome.contextMenus.create({
            type: 'normal',
            contexts: ['selection'],
            parentId: 'domain_search',
            id: 'domain_shodan',
            title: 'Shodan'
        });
        chrome.contextMenus.create({
            type: 'normal',
            contexts: ['selection'],
            parentId: 'domain_search',
            id: 'domain_threatcrowd',
            title: 'Threat Crowd'
        });
        chrome.contextMenus.create({
            type: 'normal',
            contexts: ['selection'],
            parentId: 'domain_search',
            id: 'domain_virustotal',
            title: 'VirusTotal'
        });
        chrome.contextMenus.create({
            type: 'normal',
            contexts: ['selection'],
            parentId: 'menu0',
            id: 'domain_report',
            title: titles.domain_report
        });
    };

    // Create Hash value search menus when selection string type = Hash value.
    if (strType == 'md5' || strType == 'sha1' || strType == 'sha256') {
        chrome.contextMenus.create({
            type: 'normal',
            contexts: ['selection'],
            parentId: 'menu0',
            id: 'hash_search',
            title: titles.hash_search
        });
        chrome.contextMenus.create({
            type: 'normal',
            contexts: ['selection'],
            parentId: 'hash_search',
            id: 'hash_virustotal',
            title: 'VirusTotal'
        });
        chrome.contextMenus.create({
            type: 'normal',
            contexts: ['selection'],
            parentId: 'hash_search',
            id: 'hash_hybridanalysis',
            title: 'Hybrid Analysis'
        });
        chrome.contextMenus.create({
            type: 'normal',
            contexts: ['selection'],
            parentId: 'hash_search',
            id: 'hash_anyrun',
            title: 'ANY.RUN'
        });
        chrome.contextMenus.create({
            type: 'normal',
            contexts: ['selection'],
            parentId: 'hash_search',
            id: 'hash_joesandbox',
            title: 'Joe Sandbox'
        });
    };

    if (strType == 'fingerprint') {
        // Fingerprint Search
        chrome.contextMenus.create({
            type: 'normal',
            contexts: ['selection'],
            parentId: 'menu0',
            id: 'fingerprint_search',
            title: titles.fingerprint_search
        });
    };

    // Create a free text search menu anytime.
    chrome.contextMenus.create({
        type: 'normal',
        contexts: ['selection'],
        parentId: 'menu0',
        id: 'selection_menu',
        title: titles.selection_menu
    });
    chrome.contextMenus.create({
        type: 'normal',
        contexts: ['selection'],
        parentId: 'selection_menu',
        id: 'actor_name',
        title: titles.actor_name
    });
    chrome.contextMenus.create({
        type: 'normal',
        contexts: ['selection'],
        parentId: 'selection_menu',
        id: 'malware_name',
        title: titles.malware_name
    });
    chrome.contextMenus.create({
        type: 'normal',
        contexts: ['selection'],
        parentId: 'selection_menu',
        id: 'strings_vt',
        title: titles.strings_vt
    });
    chrome.contextMenus.create({
        type: 'normal',
        contexts: ['selection'],
        parentId: 'selection_menu',
        id: 'strings_ha',
        title: titles.strings_ha
    });
    chrome.contextMenus.create({
        type: 'normal',
        contexts: ['selection'],
        parentId: 'selection_menu',
        id: 'strings_joe',
        title: titles.strings_joe
    });

    // Create Help menu anytime.
    chrome.contextMenus.create({
        type: 'normal',
        contexts: ['all'],
        parentId: 'menu0',
        id: 'help',
        title: 'README'
        // title: titles.help_title
    });
};
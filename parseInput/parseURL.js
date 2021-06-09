/**
 * parse URL to object
 * @param   string url
 * @returns object
 */
function parseURL(url) {
    let a =  document.createElement('a');
    a.href = url;

    return {
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function () {
            let ret = {},
                seg = a.search.replace(/^\?/,'').split('&'),
                len = seg.length, i = 0, s;
            for (; i<len ; i++) {
                if (!seg[i]) { continue; }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }

            return ret;
        })(),
        hash: a.hash.replace('#', '')
    };
}

// console.log(parseURL('https://marketplace.visualstudio.com/items?itemName=Equinusocio.vsc-material-theme&itemLast=abc#hashtag1'))

// {
//     "host": "marketplace.visualstudio.com",
//     "port": "",
//     "query": "?itemName=Equinusocio.vsc-material-theme&itemLast=abc",
//     "params": {
//         "itemName": "Equinusocio.vsc-material-theme",
//         "itemLast": "abc"
//     },
//     "hash": "hashtag1"
// }

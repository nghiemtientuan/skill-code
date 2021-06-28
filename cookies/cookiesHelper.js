/*
* set cookie value
* @param name  :cookie_name
* @param value :cookie_value
* @param days  :days, default 30 days
* */
function setCookie(name, value, days = 30) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }

    let valueString = JSON.stringify(value);
    document.cookie = name + "=" + (valueString || "")  + expires + "; path=/";
}

/*
* get cookie value
* @param  name   :cookie_name
* @return string :value
* */
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
        c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0)
        return JSON.parse(c.substring(nameEQ.length, c.length));
    }

    return null;
}

/*
* delete cookie
* */
function deleteCookie(name) {
    setCookie(name, {}, -1);
}

export {
    getCookie,
    setCookie,
    deleteCookie
};

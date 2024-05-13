// 获取系统信息
export function getOs() {
    const ua = navigator.userAgent;
    if (ua.indexOf('Windows NT 10.0') !== -1) return 'Windows 10';
    if (ua.indexOf('Windows NT 6.2') !== -1) return 'Windows 8';
    if (ua.indexOf('Windows NT 6.1') !== -1) return 'Windows 7';
    if (ua.indexOf('Windows NT 6.0') !== -1) return 'Windows Vista';
    if (ua.indexOf('Windows NT 5.1') !== -1) return 'Windows XP';
    if (ua.indexOf('Windows NT 5.0') !== -1) return 'Windows 2000';
    if (ua.indexOf('Mac') !== -1) return 'Mac/iOS';
    if (ua.indexOf('X11') !== -1) return 'UNIX';
    if (ua.indexOf('Linux') !== -1) return 'Linux';
    return 'Other';
}

// 获取浏览器类型
export function getBrowser() {
    let ua = navigator.userAgent.toLocaleLowerCase();
    let browser = null;
    if (ua.match(/msie/) != null || ua.match(/trident/) != null) {
        browser = 'IE';
    } else if (ua.match(/firefox/) != null) {
        browser = 'Firefox';
    } else if (ua.match(/ucbrowser/) != null) {
        browser = 'UC';
    } else if (ua.match(/opera/) != null || ua.match(/opr/) != null) {
        browser = 'Opera';
    } else if (ua.match(/bidubrowser/) != null) {
        browser = 'Baidu';
    } else if (ua.match(/metasr/) != null) {
        browser = 'Sougou';
    } else if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
        browser = 'QQ';
    } else if (ua.match(/maxthon/) != null) {
        browser = 'Maxthon';
    } else if (ua.match(/edg/) != null) {
        browser = 'Edge';
    } else if (ua.match(/chrome/) != null && ua.match(/chromium/) != null) {
        browser = 'Chrome';
    } else if (ua.match(/safari/) != null) {
        browser = 'Safari';
    } else {
        browser = 'Other';
    }
    return browser;
}

import { UAParser } from 'ua-parser-js';
const parser = new UAParser();

// 获取系统信息
export function getOs() {
    let os = parser.getOS();
    if (os.name && os.version) return os.name + ' ' + os.version;
    if (os.name) return os.name;
    return '';
}

// 获取浏览器类型
export function getBrowser() {
    return parser.getBrowser().name;
}

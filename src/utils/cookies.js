export default function getCookie(cname) {
    const reg = new RegExp("(^| )" + cname + "=([^;]*)(;|$)");
    const val = document.cookie.match(reg);
    if(val) {
        return val[2]
    } else {
        return null
    }
}
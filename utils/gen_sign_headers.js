import CryptoJS from './crypto-js.min'
/**
 * 返回携带签名的headers
 * @param app_id    应用标识
 * @param app_key   应用秘钥
 * @param method  HTTP 协议中定义的求方法
 * @param uri 传入URL的URI   比如：/vivogpt/completions/stream
 * @param url 传入url会自动转换查询 query    例如：https://api-ai.vivo.com.cn/vivogpt/completions/stream?requestId=9c607d54-a8d4-453b-8dcb-d6fc71251925
 * @returns {{"X-AI-GATEWAY-SIGNATURE", "X-AI-GATEWAY-APP-ID", "X-AI-GATEWAY-NONCE": string, "X-AI-GATEWAY-SIGNED-HEADERS": string, "X-AI-GATEWAY-TIMESTAMP": string}}
 */
function gen_Sign_Headers(app_id, app_key, method, uri, url) {
    //生成8位随机字符串
    function gen_Nonce(length = 8) {
        var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for (var i = 0; i < length; i++) {
            //0-"a"; 35-"9"
            // Math.floor(Math.random() * chars.length)返回0·35的随机数
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    // 请求时的Unix时间戳，以秒为单位
    function getUTCTime() {
        var currentDate = new Date();
        var utcTimestamp = Date.UTC(
            currentDate.getUTCFullYear(),
            currentDate.getUTCMonth(),
            currentDate.getUTCDate(),
            currentDate.getUTCHours(),
            currentDate.getUTCMinutes(),
            currentDate.getUTCSeconds()
        ) / 1000; // 将毫秒转换为秒
        return utcTimestamp.toString();
    }

    //如果query项只有key没有value时，转换成params[key] = ''传入
    function gen_canonical_query_string(url) {
        // 提取URL中的query项部分
        let queryIndex = url.indexOf("?");
        if (queryIndex === -1) {
            return '';
        }

        let query = url.substring(queryIndex + 1);
        let params = query.split('&');

        // 编码处理每一项
        let escape_uri = encodeURIComponent;
        let raw = [];
        for (let param of params) {
            let pair = param.split('=');
            if (pair.length === 1) {
                raw.push([escape_uri(pair[0]), '']);
            } else {
                raw.push([escape_uri(pair[0]), escape_uri(pair[1])]);
            }
        }
        // 按key排序并连接成canonical_query_string
        raw.sort();
        return raw.map(kv => kv.join("=")).join("&");
    }

    // 生成签名,需要引用crypto-js.min.js库
    function gen_signature(appSecret, signingString) {
        return CryptoJS.HmacSHA256(signingString, appSecret).toString(CryptoJS.enc.Base64);
    }
    // Unicode to UTF-8 编码函数
    function utf8Encode(str) {
        return unescape(encodeURIComponent(str));
    }
    // ----------------------------------------------------------------
    method = method.toString().toUpperCase();//必须使用全大写的形式
    const timestamp = getUTCTime();
    const nonce = gen_Nonce(8);
    // const timestamp ="1629255133";
    // const nonce = "le1qqjex";
    // 获取url的query项
    const canonical_query_string = gen_canonical_query_string(url);
    const signed_headers_string =
        `x-ai-gateway-app-id:${app_id}\nx-ai-gateway-timestamp:${timestamp}\n` +
        `x-ai-gateway-nonce:${nonce}`;
    const signing_string = `${method}\n${uri}\n${canonical_query_string}\n${app_id}\n${timestamp}\n${signed_headers_string}`;
    // signing_stringx需要转为UTF-8编码
    // 对 signing_string 进行 UTF-8 编码
    var signing_string_bytes = utf8Encode(signing_string);
    // 计算签名
    let signature = gen_signature(app_key, signing_string_bytes);
    //console.log(signature); 
    return {
        'X-AI-GATEWAY-APP-ID': app_id,
        'X-AI-GATEWAY-TIMESTAMP': timestamp,
        'X-AI-GATEWAY-NONCE': nonce,
        'X-AI-GATEWAY-SIGNED-HEADERS': "x-ai-gateway-app-id;x-ai-gateway-timestamp;x-ai-gateway-nonce",
        'X-AI-GATEWAY-SIGNATURE': signature
    };
}
module.exports = {
    gen_Sign_Headers
}

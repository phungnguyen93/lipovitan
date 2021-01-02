
// location.href = `https://www.facebook.com/dialog/share?app_id=307867787003947&display=popup&href=${shareUrl}&hashtag=${encodedHashtag}&redirect_uri=${redirectUrl}`;

/**
 * 
 * INITIALIZE
 */
const fb = (callback) => {
    if (scriptInjected) {
        if (typeof window !== "undefined") {

            callback(window.FB);
        } else {
            console.log("[button] window is undefined");
        }
    } else {
        setQueue([...queue, callback]);
        if (!window.fbAsyncInit) {
            window.fbAsyncInit = () => {
                window.FB.init({
                    // appId: CONFIG.NEXT_PUBLIC_FB_APP_ID,
                    autoLogAppEvents: true,
                    xfbml: true,
                    cookie: true,
                    version: 'v6.0'
                });
                setScriptInjected(true);
                queue.forEach(cb => cb(window.FB))
                setQueue(null);
            };
            const script = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js"
            var js, fjs = document.getElementsByTagName('script')[0];
            if (document.getElementById('facebook-jssdk')) return;
            js = document.createElement('script'); js.id = 'facebook-jssdk';
            js.src = script;
            fjs.parentNode.insertBefore(js, fjs);
        }
    }
}

/**
 * START SHARING EVENT
 */

try {
    FB.ui({
        method: 'share',
        href: shareUrl,
        app_id: CONFIG.api.fbAppId,
        redirect_uri: `${Config.site.domain}/?from_fb_share=${39}`,
        display: 'dialog',
        hashtag: '#hashtag',
    }, function (response) {

        if (response && !response.error_message) {
            console.log('Posting completed.');
            console.log("Share thành công!");

            if (callback) callback(true);
            return;
        } else {
            console.error(response);
            console.log("shareUrl:", shareUrl);
            if (callback) callback(false);

            window.open("https://www.facebook.com/sharer/sharer.php?u=#" + shareUrl);
            return;
        }
    });
} catch (e) {
    console.error(e);
    console.log("shareUrl:", shareUrl);
    if (callback) callback(false);
    window.open("https://www.facebook.com/sharer/sharer.php?u=#" + shareUrl);

    return;

}
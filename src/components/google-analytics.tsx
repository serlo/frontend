export function GoogleAnalytics() {
  if (process.env.GA_TRACKING_ID === undefined) return null
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
   var disableStr = "ga-disable-${process.env.GA_TRACKING_ID}";
   if (document.cookie.indexOf(disableStr + "=true") > -1) {
     window[disableStr] = true;
   }
   function gaOptout() {
     document.cookie =
       disableStr + "=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/";
     window[disableStr] = true;
   }
   (function (i, s, o, g, r, a, m) {
       i["GoogleAnalyticsObject"] = r;
       (i[r] =
         i[r] ||
         function () {
           (i[r].q = i[r].q || []).push(arguments);
         }),
         (i[r].l = 1 * new Date());
       (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
       a.async = 1;
       a.src = g;
       m.parentNode.insertBefore(a, m);
     })(window, document, "script", "//www.google-analytics.com/analytics.js", "ga");
   ga("create", "${process.env.GA_TRACKING_ID}", "auto");
   ga("require", "displayfeatures");
   ga("require", "linkid", "linkid.js");
   ga("set", "anonymizeIp", true);
   ga('set', 'dimension1', 'redesign');
   ga("send", "pageview");
   var visitTookTime = false;
   var didScroll = false;
   var bounceSent = false;
   var scrollCount = 0;
   function testScroll() {
     ++scrollCount;
     if (scrollCount == 2) {
       didScroll = true;
     }
     sendNoBounce();
   }
   function timeElapsed() {
     visitTookTime = true;
     sendNoBounce();
   }
   function sendNoBounce() {
     if (didScroll && visitTookTime && !bounceSent) {
       bounceSent = true;
       ga(
         "send",
         "event",
         "no bounce",
         "resist",
         "User scrolled and spent 30 seconds on page."
       );
     }
   }
   setTimeout("timeElapsed()", 3e4);
   window.addEventListener
     ? window.addEventListener("scroll", testScroll, false)
     : window.attachEvent("onScroll", testScroll);
`,
      }}
    />
  )
}

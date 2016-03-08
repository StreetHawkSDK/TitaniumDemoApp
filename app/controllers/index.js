var analytics = require("com.streethawk.shanalytics");
var push = require("com.streethawk.shpush");



function doClick(e) {
    alert($.label.text);
}

$.index.open();

analytics.setAppKey("MyFirstApp");
push.registerForPushMessaging("491295755890");
analytics.streethawkinit();
analytics.tagCuid("Anurag@Titanium");
console.log("InstallId"+analytics.getInstallId());
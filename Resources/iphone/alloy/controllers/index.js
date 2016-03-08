function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function openurlCallback(e) {
        alert("Callback for open url: " + e.url);
    }
    function registerInstallCallback(e) {
        alert("Register install: " + e.installId);
    }
    function buttonShowVersionClicked() {
        alert(shAnalytics.getSHLibraryVersion);
    }
    function buttonInstallIdClicked() {
        alert(shAnalytics.getInstallId);
    }
    function buttonItunesIdClicked() {
        alert(shAnalytics.shiTunesId);
    }
    function buttonTagClicked() {
        var tagSuccess = shAnalytics.tagCuid("cuid_titanium");
        tagSuccess || alert("tag cuid wrong");
        tagSuccess = shAnalytics.tagNumeric("Key_Numeric", 100);
        tagSuccess || alert("tag numeric wrong");
        tagSuccess = shAnalytics.tagString("Key_String", "abc");
        tagSuccess || alert("tag string wrong");
        tagSuccess = shAnalytics.tagDatetime("Key_Date", shAnalytics.getCurrentFormattedDateTime);
        tagSuccess || alert("tag datetime wrong");
        tagSuccess = shAnalytics.tagDatetime("Key_Date1970", shAnalytics.getFormattedDateTime(36e4));
        tagSuccess || alert("tag datetime of 1970 wrong");
        tagSuccess = shAnalytics.incrementTag("Key_Numeric", 68);
        tagSuccess || alert("tag increment wrong");
        tagSuccess = shAnalytics.removeTag("Key_Remove");
        tagSuccess || alert("tag remove wrong");
        tagSuccess = shAnalytics.tagString("sh_phone", "+123456");
        tagSuccess || alert("tag sh_phone with valid number wrong");
        tagSuccess = shAnalytics.tagString("sh_phone", "abc");
        tagSuccess && alert("tag sh_phone with invalid number wrong");
    }
    function buttonSimpleFeedbackClicked() {
        shAnalytics.shSendSimpleFeedback("feedback title", "feedback message");
    }
    function buttonPageEnterExitClicked() {
        shAnalytics.notifyViewEnter("page_name");
        shAnalytics.notifyViewExit("page_name");
    }
    function growthShareCallback(e) {
        alert("Callback for growth share url: " + e.result);
    }
    function buttonShareCallbackClicked() {
        shGrowth.originateShareWithCampaign("ShareViaFacebook", "Facebook", "cpc", "best chocolate chip cookie recipe", "facebookAdd", "tisample://homepage?recipe=chocolatechipcookie", "http://recipeApp.com/chocolatechipcookie", {
            shareurl: growthShareCallback
        });
    }
    function buttonShareByChannelClicked() {
        shGrowth.originateShareWithSourceSelection("ShareViaFacebook", "tisample://homepage?recipe=chocolatechipcookie", "http://recipeApp.com/chocolatechipcookie");
    }
    function buttonPushEnableClicked() {
        shPush.notificationEnabled = !shPush.notificationEnabled;
        $.buttonPushEnable.title = shPush.notificationEnabled ? "Push is Enabled  " : "Push is Disabled";
    }
    function loadpageCallback(e) {
        alert("Callback to show page: " + e.page);
    }
    function jsonCallback(e) {
        alert("Callback for json notification:\nTitle: " + e.title + "\nMessage: " + e.message + "\nJson: " + e.json);
    }
    function registerForPush() {
        Ti.Network.registerForPushNotifications({
            success: deviceTokenSuccess,
            error: deviceTokenError,
            callback: receivePush
        });
        Ti.App.iOS.removeEventListener("usernotificationsettings", registerForPush);
    }
    function receivePush() {}
    function deviceTokenSuccess(e) {
        var deviceToken = e.deviceToken;
        Ti.API.info("Push notification device token is: " + deviceToken);
    }
    function deviceTokenError(e) {
        alert("Failed to register for push notifications! " + e.error);
    }
    function buttonLocationEnableClicked() {
        shLocation.locationEnabled = !shLocation.locationEnabled;
        $.buttonLocationEnable.title = shLocation.locationEnabled ? "Location is Enabled  " : "Location is Disabled";
    }
    function newFeedCallback() {
        alert("Callback for new feed available.");
    }
    function fetchFeedCallback(e) {
        Ti.API.info("Fetch feed items: " + JSON.stringify(e));
    }
    function buttonFetchFeedClicked() {
        shFeed.shGetFeedDataFromServer(0, {
            feed: fetchFeedCallback
        });
    }
    function buttonFeedAckResultClicked() {
        shFeed.reportFeedAck(0);
        shFeed.reportFeedRead(0, 1);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.__alloyId0 = Ti.UI.createButton({
        title: "Show StreetHawk Library Version",
        top: "40",
        id: "__alloyId0"
    });
    $.__views.index.add($.__views.__alloyId0);
    buttonShowVersionClicked ? $.addListener($.__views.__alloyId0, "click", buttonShowVersionClicked) : __defers["$.__views.__alloyId0!click!buttonShowVersionClicked"] = true;
    $.__views.__alloyId1 = Ti.UI.createButton({
        title: "Show Install Id",
        top: "80",
        id: "__alloyId1"
    });
    $.__views.index.add($.__views.__alloyId1);
    buttonInstallIdClicked ? $.addListener($.__views.__alloyId1, "click", buttonInstallIdClicked) : __defers["$.__views.__alloyId1!click!buttonInstallIdClicked"] = true;
    $.__views.__alloyId2 = Ti.UI.createButton({
        title: "Show iTunes Id",
        top: "120",
        id: "__alloyId2"
    });
    $.__views.index.add($.__views.__alloyId2);
    buttonItunesIdClicked ? $.addListener($.__views.__alloyId2, "click", buttonItunesIdClicked) : __defers["$.__views.__alloyId2!click!buttonItunesIdClicked"] = true;
    $.__views.__alloyId3 = Ti.UI.createButton({
        title: "Send Tags",
        top: "160",
        id: "__alloyId3"
    });
    $.__views.index.add($.__views.__alloyId3);
    buttonTagClicked ? $.addListener($.__views.__alloyId3, "click", buttonTagClicked) : __defers["$.__views.__alloyId3!click!buttonTagClicked"] = true;
    $.__views.__alloyId4 = Ti.UI.createButton({
        title: "Send Simple Feedback",
        top: "200",
        id: "__alloyId4"
    });
    $.__views.index.add($.__views.__alloyId4);
    buttonSimpleFeedbackClicked ? $.addListener($.__views.__alloyId4, "click", buttonSimpleFeedbackClicked) : __defers["$.__views.__alloyId4!click!buttonSimpleFeedbackClicked"] = true;
    $.__views.__alloyId5 = Ti.UI.createButton({
        title: "Send Page Enter/Exit",
        top: "240",
        id: "__alloyId5"
    });
    $.__views.index.add($.__views.__alloyId5);
    buttonPageEnterExitClicked ? $.addListener($.__views.__alloyId5, "click", buttonPageEnterExitClicked) : __defers["$.__views.__alloyId5!click!buttonPageEnterExitClicked"] = true;
    $.__views.__alloyId6 = Ti.UI.createButton({
        title: "Growth Share by Callback",
        top: "280",
        id: "__alloyId6"
    });
    $.__views.index.add($.__views.__alloyId6);
    buttonShareCallbackClicked ? $.addListener($.__views.__alloyId6, "click", buttonShareCallbackClicked) : __defers["$.__views.__alloyId6!click!buttonShareCallbackClicked"] = true;
    $.__views.__alloyId7 = Ti.UI.createButton({
        title: "Growth Share by Channel",
        top: "320",
        id: "__alloyId7"
    });
    $.__views.index.add($.__views.__alloyId7);
    buttonShareByChannelClicked ? $.addListener($.__views.__alloyId7, "click", buttonShareByChannelClicked) : __defers["$.__views.__alloyId7!click!buttonShareByChannelClicked"] = true;
    $.__views.buttonPushEnable = Ti.UI.createButton({
        title: "Notification Enabled?",
        id: "buttonPushEnable",
        top: "360"
    });
    $.__views.index.add($.__views.buttonPushEnable);
    buttonPushEnableClicked ? $.addListener($.__views.buttonPushEnable, "click", buttonPushEnableClicked) : __defers["$.__views.buttonPushEnable!click!buttonPushEnableClicked"] = true;
    $.__views.buttonLocationEnable = Ti.UI.createButton({
        title: "Location Enabled?",
        id: "buttonLocationEnable",
        top: "400"
    });
    $.__views.index.add($.__views.buttonLocationEnable);
    buttonLocationEnableClicked ? $.addListener($.__views.buttonLocationEnable, "click", buttonLocationEnableClicked) : __defers["$.__views.buttonLocationEnable!click!buttonLocationEnableClicked"] = true;
    $.__views.__alloyId8 = Ti.UI.createButton({
        title: "Fetch Feeds",
        top: "440",
        id: "__alloyId8"
    });
    $.__views.index.add($.__views.__alloyId8);
    buttonFetchFeedClicked ? $.addListener($.__views.__alloyId8, "click", buttonFetchFeedClicked) : __defers["$.__views.__alloyId8!click!buttonFetchFeedClicked"] = true;
    $.__views.__alloyId9 = Ti.UI.createButton({
        title: "Send Feed Ack and Result",
        top: "480",
        id: "__alloyId9"
    });
    $.__views.index.add($.__views.__alloyId9);
    buttonFeedAckResultClicked ? $.addListener($.__views.__alloyId9, "click", buttonFeedAckResultClicked) : __defers["$.__views.__alloyId9!click!buttonFeedAckResultClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var shPush = require("com.streethawk.shpush");
    Ti.API.info("load module => " + shPush);
    shPush.defaultNotificationService = false;
    shPush.defaultNotificationService && alert("Test Fail: defaultNotificationService is not expected: " + shPush.defaultNotificationService);
    var shBeacon = require("com.streethawk.shbeacon");
    Ti.API.info("load module => " + shBeacon);
    shBeacon.defaultLocationService = false;
    shBeacon.defaultLocationService && alert("Test Fail: defaultLocationService is not expected: " + shBeacon.defaultLocationService);
    var shGeofence = require("com.streethawk.shgeofence");
    Ti.API.info("load module => " + shGeofence);
    shGeofence.defaultLocationService = false;
    shGeofence.defaultLocationService && alert("Test Fail: defaultLocationService is not expected: " + shGeofence.defaultLocationService);
    var shLocation = require("com.streethawk.shlocations");
    Ti.API.info("load module => " + shLocation);
    shLocation.defaultLocationService = false;
    shLocation.defaultLocationService && alert("Test Fail: defaultLocationService is not expected: " + shLocation.defaultLocationService);
    var shAnalytics = require("com.streethawk.shanalytics");
    Ti.API.info("load module => " + shAnalytics);
    shAnalytics.appKey = "TiSample";
    "TiSample" != shAnalytics.appKey && alert("Test Fail: appKey is not expected: " + shAnalytics.appKey);
    shAnalytics.enableLogs = true;
    shAnalytics.enableLogs || alert("Test Fail: enableLogs is not expected: " + shAnalytics.enableLogs);
    shAnalytics.shiTunesId = "507040546";
    shAnalytics.advertisementId = "BEE83220-9385-4B36-81E1-BF4305834093";
    "BEE83220-9385-4B36-81E1-BF4305834093" != shAnalytics.advertisementId && alert("Test Fail: advertisementId is not expected: " + shAnalytics.advertisementId);
    shAnalytics.shDeeplinking({
        openurl: openurlCallback
    });
    shAnalytics.registerEventCallBack({
        registerInstall: registerInstallCallback
    });
    shAnalytics.streethawkinit();
    var shGrowth = require("com.streethawk.shgrowth");
    Ti.API.info("load module => " + shGrowth);
    $.buttonPushEnable.title = shPush.notificationEnabled ? "Push is Enabled  " : "Push is Disabled";
    shPush.shRegisterViewCallback({
        loadpage: loadpageCallback
    });
    shPush.shRawJsonCallback({
        rawjson: jsonCallback
    });
    true && parseInt(Ti.Platform.version.split(".")[0]) >= 8 ? Ti.App.iOS.addEventListener("usernotificationsettings", registerForPush) : Ti.Network.registerForPushNotifications({
        types: [ Ti.Network.NOTIFICATION_TYPE_BADGE, Ti.Network.NOTIFICATION_TYPE_ALERT, Ti.Network.NOTIFICATION_TYPE_SOUND ],
        success: deviceTokenSuccess,
        error: deviceTokenError,
        callback: receivePush
    });
    $.buttonLocationEnable.title = shLocation.locationEnabled ? "Location is Enabled  " : "Location is Disabled";
    var shFeed = require("com.streethawk.shfeeds");
    Ti.API.info("load module => " + shFeed);
    shFeed.notifyNewFeedCallback({
        newfeed: newFeedCallback
    });
    $.index.open();
    __defers["$.__views.__alloyId0!click!buttonShowVersionClicked"] && $.addListener($.__views.__alloyId0, "click", buttonShowVersionClicked);
    __defers["$.__views.__alloyId1!click!buttonInstallIdClicked"] && $.addListener($.__views.__alloyId1, "click", buttonInstallIdClicked);
    __defers["$.__views.__alloyId2!click!buttonItunesIdClicked"] && $.addListener($.__views.__alloyId2, "click", buttonItunesIdClicked);
    __defers["$.__views.__alloyId3!click!buttonTagClicked"] && $.addListener($.__views.__alloyId3, "click", buttonTagClicked);
    __defers["$.__views.__alloyId4!click!buttonSimpleFeedbackClicked"] && $.addListener($.__views.__alloyId4, "click", buttonSimpleFeedbackClicked);
    __defers["$.__views.__alloyId5!click!buttonPageEnterExitClicked"] && $.addListener($.__views.__alloyId5, "click", buttonPageEnterExitClicked);
    __defers["$.__views.__alloyId6!click!buttonShareCallbackClicked"] && $.addListener($.__views.__alloyId6, "click", buttonShareCallbackClicked);
    __defers["$.__views.__alloyId7!click!buttonShareByChannelClicked"] && $.addListener($.__views.__alloyId7, "click", buttonShareByChannelClicked);
    __defers["$.__views.buttonPushEnable!click!buttonPushEnableClicked"] && $.addListener($.__views.buttonPushEnable, "click", buttonPushEnableClicked);
    __defers["$.__views.buttonLocationEnable!click!buttonLocationEnableClicked"] && $.addListener($.__views.buttonLocationEnable, "click", buttonLocationEnableClicked);
    __defers["$.__views.__alloyId8!click!buttonFetchFeedClicked"] && $.addListener($.__views.__alloyId8, "click", buttonFetchFeedClicked);
    __defers["$.__views.__alloyId9!click!buttonFeedAckResultClicked"] && $.addListener($.__views.__alloyId9, "click", buttonFeedAckResultClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
//--------------------------- Push module (pre-init) --------------------------- 
var shPush = require('com.streethawk.shpush');
Ti.API.info("load module => " + shPush);

//Optional, set disable push by default.
shPush.defaultNotificationService = false;

//--------------------------- Beacon module (pre-init) --------------------------- 
var shBeacon = require('com.streethawk.shbeacon');
Ti.API.info("load module => " + shBeacon);

//Optional, set disable location by default.
shBeacon.defaultLocationService = false;

//--------------------------- Geofence module (pre-init) --------------------------- 
var shGeofence = require('com.streethawk.shgeofence');
Ti.API.info("load module => " + shGeofence);

//Optional, set disable location by default.
shGeofence.defaultLocationService = false;

//--------------------------- Location module (pre-init) --------------------------- 
var shLocation = require('com.streethawk.shlocations');
Ti.API.info("load module => " + shLocation);

//Optional, set disable location by default.
shLocation.defaultLocationService = false;

//--------------------------- Analytics module --------------------------- 
var shAnalytics = require('com.streethawk.shanalytics');
Ti.API.info("load module => " + shAnalytics);

//Mandatory, set app_key. If not set up by API code, set by Info.plist, key = APP_KEY
shAnalytics.appKey = "MyFirstApp";

//Optional, set console debug mode.
shAnalytics.enableLogs = true;
 
//Optional, set itunes id.
shAnalytics.shiTunesId = "507040546";

//Optional, set advertisement id.
shAnalytics.advertisementId = "BEE83220-9385-4B36-81E1-BF4305834093";

//shDeeplinking Open url handler
function openurlCallback(e)
{
	alert("Callback for open url: " + e.url);
}
shAnalytics.shDeeplinking({openurl: openurlCallback}); //must use key "openurl"

//registerEventCallBack handler
function registerInstallCallback(e)
{
	alert("Register install: " + e.installId);
}
shAnalytics.registerEventCallBack({registerInstall: registerInstallCallback}); //must use key "registerInstall"

//Mandatory, initialize streethawk SDK.
shAnalytics.streethawkinit();

function buttonShowVersionClicked(e) {
    alert(shAnalytics.getSHLibraryVersion);
}

function buttonInstallIdClicked(e) {
    alert(shAnalytics.getInstallId);
}

function buttonItunesIdClicked(e) {
    alert(shAnalytics.shiTunesId);
}

function buttonTagClicked(e) {
	//Tag cuid sample
	var tagSuccess = shAnalytics.tagCuid("cuid_titanium");
    //Tag numeric sample
	tagSuccess = shAnalytics.tagNumeric("Key_Numeric", 100);
	//Tag string sample
	tagSuccess = shAnalytics.tagString("Key_String", "abc");
	//Tag date sample
	tagSuccess = shAnalytics.tagDatetime("Key_Date", shAnalytics.getCurrentFormattedDateTime);
	tagSuccess = shAnalytics.tagDatetime("Key_Date1970", shAnalytics.getFormattedDateTime(6*60*1000));
	//Increment tag sample
	tagSuccess = shAnalytics.incrementTag("Key_Numeric", 68);
	//Remove tag sample
	tagSuccess = shAnalytics.removeTag("Key_Remove");
	//Tag sh_phone
	tagSuccess = shAnalytics.tagString("sh_phone", "+123456");
}

function buttonSimpleFeedbackClicked(e) {
    //Send simple feedback sample
	shAnalytics.shSendSimpleFeedback("feedback title", "feedback message");
}

function buttonPageEnterExitClicked(e) {
    //log enter page.
	shAnalytics.notifyViewEnter("page_name");
	//log exit page.
	shAnalytics.notifyViewExit("page_name");
}

//--------------------------- Growth module --------------------------- 
var shGrowth = require('com.streethawk.shgrowth');
Ti.API.info("load module => " + shGrowth);

//Get growth url callback handler
function growthShareCallback(e)
{
	alert("Callback for growth share url: " + e.result);
}
function buttonShareCallbackClicked(e) {
    //Get growth share url by callback
	shGrowth.originateShareWithCampaign("ShareViaFacebook", "Facebook", "cpc", "best chocolate chip cookie recipe", "facebookAdd", "tisample://homepage?recipe=chocolatechipcookie", "http://recipeApp.com/chocolatechipcookie", {shareurl: growthShareCallback}); //must use key "shareurl"
}

function buttonShareByChannelClicked(e) {
    //Get growth share url and share by predefined channels
	shGrowth.originateShareWithSourceSelection("ShareViaFacebook", "tisample://homepage?recipe=chocolatechipcookie", "http://recipeApp.com/chocolatechipcookie");
}

//--------------------------- Push module --------------------------- 

$.buttonPushEnable.title = shPush.notificationEnabled ? "Push is Enabled  " : "Push is Disabled";
function buttonPushEnableClicked(e) {
	//Enable or disable notification
	shPush.notificationEnabled = !shPush.notificationEnabled;
	$.buttonPushEnable.title = shPush.notificationEnabled ? "Push is Enabled  " : "Push is Disabled";
}

//Register load page callback to StreetHawk SDK
//Callback for Titanium App to load page for remote notification launch activity. Currently it shows page name, not actually load the page.
function loadpageCallback(e)
{
	alert("Callback to show page: " + e.page);
}
shPush.shRegisterViewCallback({loadpage: loadpageCallback}); //must use key "loadpage"

//Callback for handle json notification.
function jsonCallback(e)
{
	alert("Callback for json notification:\nTitle: " + e.title + "\nMessage: " + e.message + "\nJson: " + e.json);
}
//Register json callback to StreetHawk SDK
shPush.shRawJsonCallback({rawjson: jsonCallback}); //must use key "rawjson"

//Callback for handle push data.
function pushdataCallback(e)
{
	Ti.API.warn("Callback for push data:\nAction: " + e.action + "\nMsgId: " + e.msgid + "\nTitle: " + e.title + "\nMessage: " + e.message + "\nData: " + e.data + "\nPortion: " + e.portion + "\nOrientation: " + e.orientation + "\nSpeed: " + e.speed + "\nSound: " + e.sound + "\nBadge: " + e.badge + "\nDisplaywihtoutdialog: " + e.displaywihtoutdialog);
	shPush.sendPushResult(e.msgid, 1); //let continue as accept
}
//Register push data callback to StreetHawk SDK
//shPush.pushDataCallback({pushdata: pushdataCallback}); //must use key "pushdata"

//Callback for handle push result
function pushresultCallback(e)
{
	alert("Callback for push result:\nResult: " + e.result + "\nAction: " + e.action + "\nMsgId: " + e.msgid + "\nTitle: " + e.title + "\nMessage: " + e.message + "\nData: " + e.data + "\nPortion: " + e.portion + "\nOrientation: " + e.orientation + "\nSpeed: " + e.speed + "\nSound: " + e.sound + "\nBadge: " + e.badge + "\nDisplaywihtoutdialog: " + e.displaywihtoutdialog);	
}
//Register push result callback to StreetHawk SDK
//shPush.pushResultCallback({pushresult: pushresultCallback}); //must use key "pushresult"

// Check if the device is running iOS 8 or later
if (Ti.Platform.name == "iPhone OS" && parseInt(Ti.Platform.version.split(".")[0]) >= 8) 
{
    function registerForPush() 
    {
        Ti.Network.registerForPushNotifications( {
            success: deviceTokenSuccess,
            error: deviceTokenError,
            callback: receivePush  //needs to register this otherwise App crash due to [TiApp application:didReceiveRemoteNotification:]: unrecognized selector.
        });
        // Remove event listener once registered for push notifications
        Ti.App.iOS.removeEventListener('usernotificationsettings', registerForPush); 
    }; 
	// Wait for user settings to be registered before registering for push notifications
    Ti.App.iOS.addEventListener('usernotificationsettings', registerForPush);
} 
else 
{
    // For iOS 7 and earlier
    Ti.Network.registerForPushNotifications({
        // Specifies which notifications to receive
        types: [
            Ti.Network.NOTIFICATION_TYPE_BADGE,
            Ti.Network.NOTIFICATION_TYPE_ALERT,
            Ti.Network.NOTIFICATION_TYPE_SOUND
        ],
        success: deviceTokenSuccess,
        error: deviceTokenError,
        callback: receivePush  //needs to register this otherwise App crash due to [TiApp application:didReceiveRemoteNotification:]: unrecognized selector.
    });
}

// Process incoming push notifications
function receivePush(e) 
{
    //No need to call "shPush.handleRemoteNotification(e);", StreetHawk auto-integration automatically handle this.
}

// Save the device token for subsequent API calls
function deviceTokenSuccess(e) 
{
	var deviceToken = e.deviceToken;
	Ti.API.info("Push notification device token is: "+ deviceToken);
	//No need to call "shPush.setApnsDeviceToken(deviceToken);", StreetHawk auto-integration automatically handle this.
}

function deviceTokenError(e) 
{
    alert('Failed to register for push notifications! ' + e.error);
}

//--------------------------- Beacon module --------------------------- 
//--------------------------- Geofence module --------------------------- 
//--------------------------- Location module --------------------------- 

//$.buttonLocationEnable.title = shBeacon.locationEnabled ? "Location is Enabled  " : "Location is Disabled";
//$.buttonLocationEnable.title = shGeofence.locationEnabled ? "Location is Enabled  " : "Location is Disabled";
$.buttonLocationEnable.title = shLocation.locationEnabled ? "Location is Enabled  " : "Location is Disabled";
function buttonLocationEnableClicked(e) {
	//Enable or disable location
	//use Beacon module
	//shBeacon.locationEnabled = !shBeacon.locationEnabled;
	//$.buttonLocationEnable.title = shBeacon.locationEnabled ? "Location is Enabled  " : "Location is Disabled";
	//use Geofence module
	//shGeofence.locationEnabled = !shGeofence.locationEnabled;
	//$.buttonLocationEnable.title = shGeofence.locationEnabled ? "Location is Enabled  " : "Location is Disabled";
	//use Location module
	shLocation.locationEnabled = !shLocation.locationEnabled;
	$.buttonLocationEnable.title = shLocation.locationEnabled ? "Location is Enabled  " : "Location is Disabled";
}

// Location not report logline 20
//shLocation.reportWorkHomeLocationOnly = true;

//--------------------------- Feed module --------------------------- 
var shFeed = require('com.streethawk.shfeeds');
Ti.API.info("load module => " + shFeed);

//Callback for new feed available.
function newFeedCallback(e)
{
	alert("Callback for new feed available.");
}
//Register new feed callback to StreetHawk SDK
shFeed.notifyNewFeedCallback({newfeed: newFeedCallback}); //must use key "newfeed"

//Callback for fetching feed items.
function fetchFeedCallback(e)
{
	Ti.API.info("Fetch feed items: " + JSON.stringify(e));
}
function buttonFetchFeedClicked(e) {
	//Send request to fetch feed items.
	shFeed.shGetFeedDataFromServer(0, {feed: fetchFeedCallback}); //must use key "feed"
}

function buttonFeedAckResultClicked(e) {
	//Send request for feed ack.
	shFeed.reportFeedAck(0);
	//Send request for feed result.
	shFeed.reportFeedRead(0, 1);
}

$.index.open();

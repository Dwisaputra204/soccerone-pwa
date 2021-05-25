var webPush = require('web-push');
 
const vapidKeys = {
    "publicKey":"BGJi5igsIaLzAhtkC5PxdRGjdRNXghYPpqwGYQ8NA3zTvvRhDEkB8FNq5n5zNzT0RFgO6_IPTKRc1VQ6c92r3Ms",
    "privateKey":"rmrZBHAY2EhBHWj0-xhaOgrVDn9eAoOMV1dcanSg4wg"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/cYm0d_iVn2M:APA91bEPH2SybUp_WrI8i-Nd1W8OTOkA1pIRuS_ZwASxKeYkQLqPkvnj-N5xncoft8mPiNwlj-3Doduvozh0yYri9_m5cGRz1DVk2MenO8deFVCrxrrPizc9GvHJdKShmdZYrRbEFgJ5",
   "keys": {
       "p256dh": "BDjsYtdsVE3u+AEj6jHQJgDdfnnvZquDI6GPim+4qFkIqFe2joOsvsKpZ2rvb+JNVTpKTaZKcbtb7rcCKX0sAUc=",
       "auth": "AArlzCm3PDnzysKvtrXa2A=="
   }
};
var payload = 'Pastikan anda tidak terlewatkan pertandingan hari ini!';
 
var options = {
   gcmAPIKey: '284491947769',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);
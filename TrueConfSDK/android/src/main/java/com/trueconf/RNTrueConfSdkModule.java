package com.trueconf;

import android.content.Intent;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.view.WindowManager;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.UiThreadUtil;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.trueconf.sdk.TrueConfSDK;
import com.trueconf.sdk.data.TCSDKExtraButton;
import com.trueconf.sdk.interfaces.TrueConfListener;
import com.vc.data.contacts.PeerDescription;
import com.vc.data.enums.ConnectionEvents;
import com.vc.data.enums.PeerStatus;

import java.util.ArrayList;

import javax.annotation.Nullable;

public class RNTrueConfSdkModule extends ReactContextBaseJavaModule implements TrueConfListener.LoginEventsCallback, TrueConfListener.ConferenceEventsCallback, TrueConfListener.ServerStatusEventsCallback, TrueConfListener.ChatEventsCallback, TrueConfListener.UserStatusEventsCallback {

    private final static String MODULE_NAME = "RNTrueConfSdk";

    private ReactApplicationContext context;

    private final static String CONNECTED = "connected";
    private final static String SERVER_NAME = "serverName";
    private final static String SERVER_PORT = "serverPort";
    private final static String IS_LOGGED_IN = "loggedIn";
    private final static String USER_ID = "userID";
    private final static String USER_NAME = "userName";
    private final static String USER_STATUS = "state";
    private final static String FROM_USER_ID = "fromUserID";
    private final static String FROM_USER_NAME = "fromUserName";
    private final static String MESSAGE = "message";
    private final static String TO_USER_ID = "toUserID";
    private final static String ON_SERVER_STATUS = "onServerStatus";
    private final static String ON_LOGIN = "onLogin";
    private final static String ON_LOGOUT = "onLogout";
    private final static String ON_SERVER_STATE_CHANGED = "onServerStateChanged";
    private final static String ON_CONFERENCE_START = "onConferenceStart";
    private final static String ON_CONFERENCE_END = "onConferenceEnd";
    private final static String ON_INVITE = "onInvite";
    private final static String ON_RECORD_REQUEST = "onRecordRequest";
    private final static String ON_ACCEPT = "onAccept";
    private final static String ON_REJECT = "onReject";
    private final static String ON_REJECT_TIMEOUT = "onRejectTimeout";
    private final static String ON_USER_STATUS_UPDATE = "onUserStatusUpdate";
    private final static String ON_CHAT_MESSAGE_RECEIVED = "onChatMessageReceived";
    private  final  static  String ON_EXTRA_BUTTON_PRESSED = "onExtraButtonPressed";

    @Override
    public void onServerStatus(final boolean connected, final String serverName, final int serverPort) {
        UiThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                WritableMap params = Arguments.createMap();
                params.putBoolean(CONNECTED, connected);
                params.putString(SERVER_NAME, serverName);
                params.putInt(SERVER_PORT, serverPort);
                emitMessageToRN(context, ON_SERVER_STATUS, params);
            }
        });
    }

    @Override
    public void onLogin(final boolean isLoggedIn, final String userId) {
        UiThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                WritableMap params = Arguments.createMap();
                params.putBoolean(IS_LOGGED_IN, isLoggedIn);
                params.putString(USER_ID, userId);
                emitMessageToRN(context, ON_LOGIN, params);
            }
        });
    }

    @Override
    public void onLogout() {
        UiThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                emitMessageToRN(context, ON_LOGOUT, null);
            }
        });
    }

    @Override
    public void onStateChanged(final ConnectionEvents connectionEvents, final int i) {
        UiThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                emitMessageToRN(context, ON_SERVER_STATE_CHANGED, null);
            }
        });
    }

    @Override
    public void onConferenceStart() {
        UiThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                emitMessageToRN(context, ON_CONFERENCE_START, null);
            }
        });
    }

    @Override
    public void onConferenceEnd() {
        UiThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                emitMessageToRN(context, ON_CONFERENCE_END, null);
            }
        });
    }

    @Override
    public void onInvite(final String userId, final String userName) {
        UiThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                WritableMap params = Arguments.createMap();
                params.putString(USER_ID, userId);
                params.putString(USER_NAME, userName);
                emitMessageToRN(context, ON_INVITE, params);
            }
        });
    }

    @Override
    public void onRecordRequest(final String userId, final String userName) {
        UiThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                WritableMap params = Arguments.createMap();
                params.putString(USER_ID, userId);
                params.putString(USER_NAME, userName);
                emitMessageToRN(context, ON_RECORD_REQUEST, params);
            }
        });
    }

    @Override
    public void onAccept(final String userId, final String userName) {
        UiThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                WritableMap params = Arguments.createMap();
                params.putString(USER_ID, userId);
                params.putString(USER_NAME, userName);
                emitMessageToRN(context, ON_ACCEPT, params);
            }
        });
    }

    @Override
    public void onReject(final String userId, final String userName) {
        UiThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                WritableMap params = Arguments.createMap();
                params.putString(USER_ID, userId);
                params.putString(USER_NAME, userName);
                emitMessageToRN(context, ON_REJECT, params);
            }
        });
    }

    @Override
    public void onRejectTimeout(final String userId, final String userName) {
        UiThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                WritableMap params = Arguments.createMap();
                params.putString(USER_ID, userId);
                params.putString(USER_NAME, userName);
                emitMessageToRN(context, ON_REJECT_TIMEOUT, params);
            }
        });
    }

    @Override
    public void onUserStatusUpdate(final String userId, final PeerStatus state) {
        UiThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                WritableMap params = Arguments.createMap();
                params.putString(USER_ID, userId);
                params.putInt(USER_STATUS, getUnifiedUserStatus(state));
                emitMessageToRN(context, ON_USER_STATUS_UPDATE, params);
            }
        });
    }

    @Override
    public void onContactListUpdate() {
        UiThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                var peerList = TrueConfSDK.getInstance().getUsers();
                for (PeerDescription p : peerList) {
                    WritableMap params = Arguments.createMap();
                    params.putString(USER_ID, p.getId());
                    params.putInt(USER_STATUS, getUnifiedUserStatus(p.getPeerStatusInfo().getPeerStatus()));
                    emitMessageToRN(context, ON_USER_STATUS_UPDATE, params);
                }
            }
        });
    }

    @Override
    public void onChatMessageReceived(final String fromUserID, final String fromUserName, final String message, final String toUserID) {
        UiThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                WritableMap params = Arguments.createMap();
                params.putString(FROM_USER_ID, fromUserID);
                params.putString(FROM_USER_NAME, fromUserName);
                params.putString(MESSAGE, message);
                params.putString(TO_USER_ID, toUserID);
                emitMessageToRN(context, ON_CHAT_MESSAGE_RECEIVED, params);
            }
        });
    }

    private int getUnifiedUserStatus(PeerStatus state) {
        switch(state.ordinal()) {
            case 0:
                return -127;
            case 1:
                return -1;
            case 2:
                return 0;
            case 3:
                return 1;
            case 4:
                return 2;
            case 5:
                return 3;
            case 6:
                return 4;
            case 7:
                return 5;
        }
        return -127;
    }

    public RNTrueConfSdkModule(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
    }

    private void emitMessageToRN(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void start(String serverList) {
        if(serverList != null && !serverList.isEmpty()) {
            TrueConfSDK.getInstance().start(serverList, true);
        } else {
            TrueConfSDK.getInstance().start(true);
        }
        TrueConfSDK.getInstance().addTrueconfListener(this);
    }

    @ReactMethod
    public void stop() {
        TrueConfSDK.getInstance().stop();
        TrueConfSDK.getInstance().removeTrueconfListener(this);
    }

    @ReactMethod
    public void initCustomViews() {
        final float scale = context.getResources().getDisplayMetrics().density;
        int height = (int) (400 * scale + 0.5f);
        WindowManager.LayoutParams params = new WindowManager.LayoutParams();
        params.width = WindowManager.LayoutParams.MATCH_PARENT;
        params.height = height;
        params.gravity = Gravity.BOTTOM;
        params.y = 150;
        TrueConfSDK.getInstance().setCallLayoutParams(params);
        TrueConfSDK.getInstance().setConferenceFragment(new ConferenceFragmentCast(R.layout.fragment_conference_cast));
    }

    @ReactMethod
    public void addExtraButton(String title, Promise promise) {
        try {
            ArrayList<TCSDKExtraButton> buttons = new ArrayList<>();
            View.OnClickListener onClickListener = btn -> {
                UiThreadUtil.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        RNTrueConfSdkModule.this.emitMessageToRN(context, ON_EXTRA_BUTTON_PRESSED, null);
                    }
                });
            };
            buttons.add(new TCSDKExtraButton(title, onClickListener));
            TrueConfSDK.getInstance().setNewExtraButtons(buttons);
            promise.resolve(true);
        } catch(Exception e) {
            promise.reject("failed to set extra button: " + e.getMessage());
        }
    }

    @ReactMethod
    public void showAlertPage(String text) {
        try {
            Intent intent = new Intent(context, DialogActivity.class);
            intent.putExtra("ALERT_TEXT", text);
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_NO_HISTORY);
            context.startActivity(intent);
        } catch (Exception e) {
            Log.e(getClass().getName(), "failed to display alert activity: " + e.getMessage());
        }
    }

    @ReactMethod
    public void loginAs(String user, String pwd, boolean encryptPassword, boolean enableAutoLogin, Promise promise) {
        boolean result = TrueConfSDK.getInstance().loginAs(user, pwd, encryptPassword, enableAutoLogin);
        promise.resolve(result);
    }

    @ReactMethod
    public void logout(Promise promise) {
        boolean result = TrueConfSDK.getInstance().logout();
        promise.resolve(result);
    }

    @ReactMethod
    public void callTo(String userId, Promise promise) {
        boolean result = TrueConfSDK.getInstance().callTo(userId);
        promise.resolve(result);
    }

    @ReactMethod
    public void joinConf(String conf_ID, Promise promise) {
        boolean result = TrueConfSDK.getInstance().joinConf(conf_ID);
        promise.resolve(result);
    }

    @ReactMethod
    public void hangup(boolean forAll, Promise promise) {
        boolean result = TrueConfSDK.getInstance().hangup(forAll);
        promise.resolve(result);
    }

    @ReactMethod
    public void acceptCall(boolean accept, Promise promise) {
        boolean result = TrueConfSDK.getInstance().acceptCall(accept);
        promise.resolve(result);
    }

    @ReactMethod
    public void acceptRecord(boolean accept, String userID) {
        TrueConfSDK.getInstance().acceptRecord(accept, userID);
    }

    @ReactMethod
    public void sendChatMessage(String userID, String message, Promise promise) {
        TrueConfSDK.getInstance().sendChatMessage(userID, message);
    }

    @ReactMethod
    public void parseProtocolLink(String cmd) {
        TrueConfSDK.getInstance().parseProtocolLink(context, cmd);
    }

    @ReactMethod
    public void scheduleLoginAs(String login, String pwd, boolean encryptPassword, String callToUser, boolean autoClose, boolean loginTemp, boolean loginForce, String domain, String serversList, boolean isPublic) {
        TrueConfSDK.getInstance().scheduleLoginAs(login, pwd, encryptPassword, callToUser, autoClose, loginTemp, loginForce, domain, serversList, isPublic);
    }

    @ReactMethod
    public void muteMicrophone(boolean mute) {
        TrueConfSDK.getInstance().muteMicrophone(mute);
    }

    @ReactMethod
    public void muteCamera(boolean mute) {
        TrueConfSDK.getInstance().muteCamera(mute);
    }

    @ReactMethod
    public void getMyId(Promise promise) {
        String myId = TrueConfSDK.getInstance().getMyId();
        promise.resolve(myId);
    }

    @ReactMethod
    public void getMyName(Promise promise) {
        String myName = TrueConfSDK.getInstance().getMyName();
        promise.resolve(myName);
    }

    @ReactMethod
    public void isStarted(Promise promise) {
        boolean result = TrueConfSDK.getInstance().isStarted();
        promise.resolve(result);
    }

    @ReactMethod
    public void isConnectedToServer(Promise promise) {
        boolean result = TrueConfSDK.getInstance().isConnectedToServer();
        promise.resolve(result);
    }

    @ReactMethod
    public void isLoggedIn(Promise promise) {
        boolean result = TrueConfSDK.getInstance().isLoggedIn();
        promise.resolve(result);
    }

    @ReactMethod
    public void isInConference(Promise promise) {
        boolean result = TrueConfSDK.getInstance().isInConference();
        promise.resolve(result);
    }

    @ReactMethod
    public void getUserStatus(String user, Promise promise) {
        int userStatus = getUnifiedUserStatus(TrueConfSDK.getInstance().getUserStatus(user));
        promise.resolve(userStatus);
        UiThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                WritableMap params = Arguments.createMap();
                params.putString(USER_ID, user);
                params.putInt(USER_STATUS, userStatus);
                emitMessageToRN(context, ON_USER_STATUS_UPDATE, params);
            }
        });
    }

    @ReactMethod
    public void microphoneMuted(Promise promise) {
        boolean result = TrueConfSDK.getInstance().isMicrophoneMuted();
        promise.resolve(result);
    }

    @ReactMethod
    public void cameraMuted(Promise promise) {
        boolean result = TrueConfSDK.getInstance().isCameraMuted();
        promise.resolve(result);
    }

    @ReactMethod
    public void addListener(String eventName) {
        // Required for RN built in Event Emitter Calls.
    }

    @ReactMethod
    public void removeListeners(Integer count) {
        // Required for RN built in Event Emitter Calls.
    }
}
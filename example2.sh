PROJECT=Example2

echo --------------------create $PROJECT--------------------
npx react-native init $PROJECT --version 0.72
rm -f -- $PROJECT/App.tsx
cp -rfv "$PROJECT"_source/App.js $PROJECT/App.js
cp -rfv "$PROJECT"_source/src $PROJECT/

echo ---------add react-native-trueconf-sdk module----------
cd $PROJECT
npm install ../TrueConfSDK
cd ios && pod install && cd .. # CocoaPods on iOS needs this extra step

echo ------------------add ios permissions------------------
cd ios/$PROJECT
plutil -insert NSCameraUsageDescription -string '' Info.plist
plutil -insert NSMicrophoneUsageDescription -string '' Info.plist

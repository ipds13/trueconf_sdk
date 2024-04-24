echo ------------------create example 7----------------------
npx react-native init Example7 --version 0.72
IF EXIST Example7/App.tsx DEL /F Example7/App.tsx
xcopy Example7_source Example7 /y/i/e

echo ----------add react-native-trueconf-sdk module----------
cd Example7
npm install ../TrueConfSDK

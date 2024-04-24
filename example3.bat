echo ------------------create example 3----------------------
npx react-native init Example3 --version 0.72
IF EXIST Example3/App.tsx DEL /F Example3/App.tsx
xcopy Example3_source Example3 /y/i/e

echo ----------add react-native-trueconf-sdk module----------
cd Example3
npm install ../TrueConfSDK

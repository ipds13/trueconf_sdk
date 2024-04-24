echo ------------------create example 1----------------------
npx react-native init Example1 --version 0.72
IF EXIST Example1/App.tsx DEL /F Example1/App.tsx
xcopy Example1_source Example1 /y/i/e

echo ----------add react-native-trueconf-sdk module----------
cd Example1
npm install ../TrueConfSDK

echo ------------------create example 5----------------------
npx react-native init Example5 --version 0.72
IF EXIST Example5/App.tsx DEL /F Example5/App.tsx
xcopy Example5_source Example5 /y/i/e

echo ----------add react-native-trueconf-sdk module----------
cd Example5
npm install ../TrueConfSDK

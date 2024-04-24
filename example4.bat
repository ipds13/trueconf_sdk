echo ------------------create example 4----------------------
npx react-native init Example4 --version 0.72
IF EXIST Example4/App.tsx DEL /F Example4/App.tsx
xcopy Example4_source Example4 /y/i/e

echo ----------add react-native-trueconf-sdk module----------
cd Example4
npm install ../TrueConfSDK

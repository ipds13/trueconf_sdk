echo ------------------create example 6----------------------
npx react-native init Example6 --version 0.72
IF EXIST Example6/App.tsx DEL /F Example6/App.tsx
xcopy Example6_source Example6 /y/i/e

echo ----------add react-native-trueconf-sdk module----------
cd Example6
npm install ../TrueConfSDK

echo ------------------create example 2----------------------
npx react-native init Example2 --version 0.72
IF EXIST Example2/App.tsx DEL /F Example2/App.tsx
xcopy Example2_source Example2 /y/i/e

echo ----------add react-native-trueconf-sdk module----------
cd Example2
npm install ../TrueConfSDK

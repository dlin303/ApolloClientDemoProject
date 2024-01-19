Demo app to reproduce Type Policy cache behavior

1. yarn install
2. yarn start -> 'a' to run on Android emulator
3. Click 'Click Here' button
4. Observe that the console.log for typePolicy is invoked
```
   "TypePolicy Invoked: Returning computed value for code: pt {some random number}"
```
6. Observe the country language code + random number rendered on screen
7. Hit back button to pop component off react-navigation stack
8. Click 'Click Here' button again.

Expected Behavior: 
- Type Policy console.log is reprinted with new random number
- New random number appears next to language code on screen

Actual Behavior:
- Type Policy console.log is not invoked
- Same random number as before is displayed

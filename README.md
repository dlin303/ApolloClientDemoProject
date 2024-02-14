Demo app to reproduce Type Policy cache behavior

1. yarn install
2. yarn start -> 'a' to run on Android emulator
3. Click 'Click Here' button
4. Observe whether we return `undefined` in the read policy for `code` for any number of languages
5. Observe the country language code and testField value on the string ex: 'sp --- This is a test string'

Expected Behavior: 
- regardless of whether `undefined` is returned in the read policy of `code`, testField should always return `This is a test string` consistently 

Actual Behavior:
- If there's at least 1 instance of `code` which returns `undefined`, then all the @client fields from Apollo return `undefined`
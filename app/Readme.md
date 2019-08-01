### Main component Library: shoutem

docs:
https://shoutem.github.io/docs/ui-toolkit/components/typography

Easy clean reinstall node modules
rm -rf node_modules %% npm install

Hard clean:
watchman watch-del-all
rm -rf /tmp/metro-bundler-cache-_
rm -rf /tmp/haste-map-react-native-packager-_
react-native start --reset-cache

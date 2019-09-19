# expo-image-cache

**[doshidak](https://github.com/doshidak)'s fork of [wcandillon/react-native-expo-image-cache](https://github.com/wcandillon/react-native-expo-image-cache)**

React Native image cache and progressive loading for iOS and Android. Updated for [**Expo SDK 34**](https://blog.expo.io/expo-sdk-34-is-now-available-4f7825239319).

This fork was originally created to get rid of the following (annoying) deprecation warning:

```
The following APIs have moved to separate packages and importing them from the "expo" package is deprecated: BlurView, FileSystem.

1. Add correct versions of these packages to your project using:

   expo install expo-blur expo-file-system

   If "install" is not recognized as an expo command, update your expo-cli installation.

2. Change your imports so they use specific packages instead of the "expo" package:

 - import { BlurView } from 'expo' -> import { BlurView } from 'expo-blur'
 - import { FileSystem } from 'expo' -> import * as FileSystem from 'expo-file-system'
```

> **UPDATE:**  
> The original repository is now updated to support Expo's new modular imports (i.e., updated for Expo SDK 33).

This package has been renamed to `expo-image-cache` in order to avoid any potential naming conflicts with `react-native-expo-image-cache` (i.e., the original package name).

### What's Different?

I made some modifications that best suit my projects, but if you're curious, here are all the differences between the original repository and this fork:

* The package name (`expo-image-cache`), *obviously*.
* All images fade-in once loaded, regardless of the platform (essentially `<Image>`'s `fadeDuration` prop, which is only available on Android).
  - This means `expo-blur` is not used here, sorry! I really wanted the `fadeDuration` on iOS since it looked nice on Android.
  - If you really want the "un-blurring" effect, then use the original repository instead :)
  - On the flip-side, you don't need to specify the `preview` prop to have this effect, namely on iOS (Android has this enabled by default).

### (ﾉ◕ヮ◕)ﾉ\*:･ﾟ✧ Enjoy! ✧ﾟ･: \*ヽ(◕ヮ◕ヽ)

## Installation

This package has peer dependencies with React, React Native, and Expo SDK 34.

```
$ yarn add doshidak/expo-image-cache
```

Additionally, if you haven't already done so, you will need to install the following:

```
$ expo install expo-file-system
```

## Usage

### Props

Prop | Type | Default | Description
--- | --- | --- | ---
`style` | `ImageStyle` | | Styles to apply to the outer container `<View>`. Only `borderRadius` (along with each individual corner) will be passed to the inner `<Image>`.
`transitionDuration` | `number` | `300` | Duration of the fade-in animation once the image has loaded.
`preview` | `ImageSourcePropType` | | If specified, a blurred preview will be shown while the image loads.
`uri` | `string` | | **Required.** A direct link to an external image. Once downloaded, the image is cached locally on the device and loaded from the cache on subsequent renders.

All other standard React Native `<Image>` props (`defaultSource`, `resizeMethod`, `onLoad`, etc.) except for `source` can be passed in.

### `<Image>`

```js
import { Image } from 'expo-image-cache';

// preview can be a local image or a data uri
const preview = { uri: 'data:image/png;base64,...' };
const uri = 'https://.../image.png';

<Image style={{ height: 100, width: 100 }} {...{ preview, uri }} />
```

### `CacheManager`

Get the local image from a remote URI:

```js
import { CacheManager } from 'expo-image-cache';

const { uri } = this.props;
const path = await CacheManager.get(uri).getPath();
// if path is undefined, the image download has failed
```

You can also clear the local cache:

```js

import { CacheManager } from 'expo-image-cache';

await CacheManager.clearCache();
```

# expo-image-cache

**[doshidak](https://github.com/doshidak)'s fork of [wcandillon/react-native-expo-image-cache](https://github.com/wcandillon/react-native-expo-image-cache)**

React Native image cache and progressive loading for iOS and Android. Updated for [**Expo SDK 33**](https://blog.expo.io/expo-sdk-v33-0-0-is-now-available-52d1c99dfe4c).

This fork was mainly created to get rid of the following (annoying) deprecation warning:

```
The following APIs have moved to separate packages and importing them from the "expo" package is deprecated: BlurView, FileSystem.

1. Add correct versions of these packages to your project using:

   expo install expo-blur expo-file-system

   If "install" is not recognized as an expo command, update your expo-cli installation.

2. Change your imports so they use specific packages instead of the "expo" package:

 - import { BlurView } from 'expo' -> import { BlurView } from 'expo-blur'
 - import { FileSystem } from 'expo' -> import * as FileSystem from 'expo-file-system'
```

This package has been renamed to `expo-image-cache` in order to avoid any potential naming conflicts with `react-native-expo-image-cache` (i.e., the original package name).

**(◕‿◕ ✿)**

## Installation

This package has peer dependencies with React, React Native, and Expo SDK 33.

```
$ yarn add doshidak/expo-image-cache
```

Additionally, if you haven't already done so, you will need to install the following:

```
$ expo install expo-blur expo-file-system
```

## Usage

### Props

| Props        | Default     | Options  |
| ------------- |:-------------:| -----:|
| `tint`      | dark | light, dark, default |
| `transitionDuration`     | 300      | custom in ms |


### `<Image>`

```js
import { Image } from 'expo-image-cache';

// preview can be a local image or a data uri
const preview = { uri: 'data:image/png;base64,...' };
const uri = 'https://.../image.png';

<Image style={{ height: 100, width: 100 }} {...{preview, uri}} />
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

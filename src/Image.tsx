// @flow
import React from 'react';
import {
  View,
  Image as RNImage,
  Animated,
  Platform,
  StyleSheet,
  StyleProp,
  ImageStyle,
  ImageURISource,
  ImageSourcePropType,
} from 'react-native';
import * as _ from 'lodash';
import CacheManager, { DownloadOptions } from './CacheManager';

interface ImageProps {
  style?: StyleProp<ImageStyle>;
  transitionDuration?: number;
  source?: ImageSourcePropType;
  defaultSource?: ImageURISource | number;
  preview?: ImageSourcePropType;
  options?: DownloadOptions;
  uri: string;
  onLoad?(): void;
  onLoadStart?(): void;
  onLoadEnd?(): void;
}

interface ImageState {
  uri: string | undefined;
  intensity: Animated.Value;
}

const propsToCopy = [
  'borderRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'borderTopLeftRadius',
  'borderTopRightRadius',
];

class Image extends React.Component<ImageProps, ImageState> {
  static defaultProps = {
    transitionDuration: 300,
  };

  mounted = true;
  state = {
    uri: undefined,
    intensity: new Animated.Value(0),
  };

  componentDidMount() {
    const { uri, options } = this.props;

    this.load({ uri, options });
  }

  componentDidUpdate(prevProps: ImageProps) {
    const { uri, options } = this.props;
    const { uri: prevUri } = prevProps;

    if (uri !== prevUri) this.load({ uri, options });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  setVisibility(visible: boolean) {
    const { transitionDuration } = this.props;
    const { intensity } = this.state;

    Animated.timing(intensity, {
      duration: transitionDuration,
      toValue: visible ? 100 : 0,
      useNativeDriver: Platform.OS === 'android',
    }).start();
  }

  async load({ uri, options = {} }: ImageProps): Promise<void> {
    if (!uri) return;

    this.setVisibility(false);
    const path = await CacheManager.get(uri, options).getPath();
    if (this.mounted) this.setState({ uri: path });
  }

  handleLoadEnd() {
    const { onLoadEnd } = this.props;

    if (typeof onLoadEnd === 'function') onLoadEnd();
    this.setVisibility(true);
  }

  render() {
    const {
      style,
      source, // not used, only present to destructure from otherProps
      defaultSource,
      preview,
      onLoad,
      onLoadStart,
      onLoadEnd, // not used in render(), but destructured from otherProps
      ...otherProps
    } = this.props;
    const {
      uri,
      intensity,
    } = this.state;

    const isImageReady = !!uri;
    const flattenedStyle = StyleSheet.flatten(style);
    const computedStyle: StyleProp<ImageStyle> = [
      StyleSheet.absoluteFill,
      _.transform(
        _.pickBy(flattenedStyle, (_val, key) => propsToCopy.includes(key)),
        (result, value: any, key) => ({
          ...(result as object),
          [key]: value - (flattenedStyle.borderWidth || 0),
        }),
      ),
    ];

    return (
      <View style={style}>
        {
          (!!defaultSource && !isImageReady) &&
          <RNImage
            style={computedStyle}
            source={defaultSource}
            {...otherProps}
          />
        }
        {
          !!preview &&
          <RNImage
            style={computedStyle}
            source={preview}
            blurRadius={0.5}
            {...otherProps}
          />
        }
        {
          isImageReady &&
          <Animated.Image
            style={[computedStyle, {
              opacity: intensity.interpolate({
                inputRange: [0, 100],
                outputRange: [0, 1],
              }),
            }]}
            source={{ uri }}
            fadeDuration={0} // Android only
            onLoad={onLoad}
            onLoadStart={onLoadStart}
            onLoadEnd={() => this.handleLoadEnd()}
            {...otherProps}
          />
        }
      </View>
    );
  }
}

export default Image;

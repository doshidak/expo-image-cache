import React from 'react';
import { Animated, StyleProp, ImageStyle, ImageURISource, ImageSourcePropType } from 'react-native';
import { DownloadOptions } from './CacheManager';
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
declare class Image extends React.Component<ImageProps, ImageState> {
    static defaultProps: {
        transitionDuration: number;
    };
    mounted: boolean;
    state: {
        uri: undefined;
        intensity: Animated.Value;
    };
    componentDidMount(): void;
    componentDidUpdate(prevProps: ImageProps): void;
    componentWillUnmount(): void;
    setVisibility(visible: boolean): void;
    load({ uri, options }: ImageProps): Promise<void>;
    handleLoadEnd(): void;
    render(): JSX.Element;
}
export default Image;

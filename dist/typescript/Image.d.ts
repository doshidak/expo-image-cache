import * as React from "react";
import { Animated, ImageStyle, ImageURISource, ImageSourcePropType, StyleProp } from "react-native";
import { DownloadOptions } from "./CacheManager";
interface ImageProps {
    style?: StyleProp<ImageStyle>;
    defaultSource?: ImageURISource | number;
    preview?: ImageSourcePropType;
    options?: DownloadOptions;
    uri: string;
    transitionDuration?: number;
    tint?: "dark" | "light";
}
interface ImageState {
    uri: string | undefined;
    intensity: Animated.Value;
}
export default class Image extends React.Component<ImageProps, ImageState> {
    mounted: boolean;
    static defaultProps: {
        transitionDuration: number;
        tint: string;
    };
    state: {
        uri: undefined;
        intensity: Animated.Value;
    };
    componentDidMount(): void;
    componentDidUpdate(prevProps: ImageProps): void;
    componentWillUnmount(): void;
    load({ uri, options }: ImageProps): Promise<void>;
    handleLoadEnd(): void;
    render(): JSX.Element;
}
export {};

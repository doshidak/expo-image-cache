import _defineProperty from"@babel/runtime/helpers/defineProperty";import _extends from"@babel/runtime/helpers/extends";import _objectWithoutProperties from"@babel/runtime/helpers/objectWithoutProperties";import _regeneratorRuntime from"@babel/runtime/regenerator";import _classCallCheck from"@babel/runtime/helpers/classCallCheck";import _createClass from"@babel/runtime/helpers/createClass";import _possibleConstructorReturn from"@babel/runtime/helpers/possibleConstructorReturn";import _getPrototypeOf from"@babel/runtime/helpers/getPrototypeOf";import _inherits from"@babel/runtime/helpers/inherits";var _jsxFileName="/Users/keith/Documents/Projects/node/expo-image-cache/src/Image.tsx";import*as _ from"lodash";import*as React from"react";import{Image as RNImage,Animated,StyleSheet,View,Platform}from"react-native";import{BlurView}from"expo-blur";import CacheManager from"./CacheManager";var Image=function(_React$Component){_inherits(Image,_React$Component);function Image(){var _getPrototypeOf2;var _this;_classCallCheck(this,Image);for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}_this=_possibleConstructorReturn(this,(_getPrototypeOf2=_getPrototypeOf(Image)).call.apply(_getPrototypeOf2,[this].concat(args)));_this.mounted=true;_this.state={uri:undefined,intensity:new Animated.Value(100)};return _this;}_createClass(Image,[{key:"componentDidMount",value:function componentDidMount(){this.load(this.props);}},{key:"componentDidUpdate",value:function componentDidUpdate(prevProps,prevState){var _this$props=this.props,preview=_this$props.preview,transitionDuration=_this$props.transitionDuration,newURI=_this$props.uri;var _this$state=this.state,uri=_this$state.uri,intensity=_this$state.intensity;if(newURI!==prevProps.uri){this.load(this.props);}else if(uri&&preview&&prevState.uri===undefined){Animated.timing(intensity,{duration:transitionDuration,toValue:0,useNativeDriver:Platform.OS==="android"}).start();}}},{key:"componentWillUnmount",value:function componentWillUnmount(){this.mounted=false;}},{key:"load",value:function load(_ref){var uri,_ref$options,options,path;return _regeneratorRuntime.async(function load$(_context){while(1){switch(_context.prev=_context.next){case 0:uri=_ref.uri,_ref$options=_ref.options,options=_ref$options===void 0?{}:_ref$options;if(!uri){_context.next=6;break;}_context.next=4;return _regeneratorRuntime.awrap(CacheManager.get(uri,options).getPath());case 4:path=_context.sent;if(this.mounted){this.setState({uri:path});}case 6:case"end":return _context.stop();}}},null,this);}},{key:"render",value:function render(){var _this$props2=this.props,preview=_this$props2.preview,style=_this$props2.style,defaultSource=_this$props2.defaultSource,tint=_this$props2.tint,useBlurView=_this$props2.useBlurView,otherProps=_objectWithoutProperties(_this$props2,["preview","style","defaultSource","tint","useBlurView"]);var _this$state2=this.state,uri=_this$state2.uri,intensity=_this$state2.intensity;var isImageReady=!!uri;var opacity=intensity.interpolate({inputRange:[0,100],outputRange:[0,0.5]});var flattenedStyle=StyleSheet.flatten(style);var computedStyle=[StyleSheet.absoluteFill,_.transform(_.pickBy(flattenedStyle,function(_val,key){return propsToCopy.indexOf(key)!==-1;}),function(result,value,key){return _extends(result,_defineProperty({},key,value-(flattenedStyle.borderWidth||0)));})];return React.createElement(View,_extends({style:style},{__source:{fileName:_jsxFileName,lineNumber:96}}),!!defaultSource&&!isImageReady&&React.createElement(RNImage,_extends({source:defaultSource,style:computedStyle},otherProps,{__source:{fileName:_jsxFileName,lineNumber:97}})),!!preview&&React.createElement(RNImage,_extends({source:preview,style:computedStyle,blurRadius:Platform.OS==="android"?0.5:0},otherProps,{__source:{fileName:_jsxFileName,lineNumber:99}})),isImageReady&&React.createElement(RNImage,_extends({source:{uri:uri},style:computedStyle},otherProps,{__source:{fileName:_jsxFileName,lineNumber:106}})),!!preview&&Platform.OS==="ios"&&useBlurView&&React.createElement(AnimatedBlurView,_extends({style:computedStyle},{intensity:intensity,tint:tint},{__source:{fileName:_jsxFileName,lineNumber:107}})),!!preview&&(Platform.OS==="android"||!useBlurView)&&React.createElement(Animated.View,{style:[computedStyle,{backgroundColor:tint==="dark"?black:white,opacity:opacity}],__source:{fileName:_jsxFileName,lineNumber:109}}));}}]);return Image;}(React.Component);Image.defaultProps={transitionDuration:300,tint:"dark",useBlurView:false};export{Image as default};var black="black";var white="white";var propsToCopy=["borderRadius","borderBottomLeftRadius","borderBottomRightRadius","borderTopLeftRadius","borderTopRightRadius"];var AnimatedBlurView=Animated.createAnimatedComponent(BlurView);
//# sourceMappingURL=Image.js.map
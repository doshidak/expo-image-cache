import _regeneratorRuntime from"@babel/runtime/regenerator";import _classCallCheck from"@babel/runtime/helpers/classCallCheck";import _createClass from"@babel/runtime/helpers/createClass";import*as FileSystem from'expo-file-system';import*as _ from'lodash';import SHA1 from'crypto-js/sha1';var BASE_DIR=FileSystem.cacheDirectory+"expo-image-cache/";export var CacheEntry=function(){function CacheEntry(uri,options){_classCallCheck(this,CacheEntry);this.uri=uri;this.options=options;}_createClass(CacheEntry,[{key:"getPath",value:function getPath(){var uri,options,_ref,path,exists,tmpPath,result;return _regeneratorRuntime.async(function getPath$(_context){while(1){switch(_context.prev=_context.next){case 0:uri=this.uri,options=this.options;_context.next=3;return _regeneratorRuntime.awrap(getCacheEntry(uri));case 3:_ref=_context.sent;path=_ref.path;exists=_ref.exists;tmpPath=_ref.tmpPath;if(!exists){_context.next=9;break;}return _context.abrupt("return",path);case 9:_context.next=11;return _regeneratorRuntime.awrap(FileSystem.createDownloadResumable(uri,tmpPath,options).downloadAsync());case 11:result=_context.sent;if(!(result&&result.status!==200)){_context.next=14;break;}return _context.abrupt("return",undefined);case 14:_context.next=16;return _regeneratorRuntime.awrap(FileSystem.moveAsync({from:tmpPath,to:path}));case 16:return _context.abrupt("return",path);case 17:case"end":return _context.stop();}}},null,this);}}]);return CacheEntry;}();var CacheManager=function(){function CacheManager(){_classCallCheck(this,CacheManager);}_createClass(CacheManager,null,[{key:"get",value:function get(uri,options){if(!CacheManager.entries[uri]){CacheManager.entries[uri]=new CacheEntry(uri,options);}return CacheManager.entries[uri];}},{key:"clearCache",value:function clearCache(){return _regeneratorRuntime.async(function clearCache$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:_context2.next=2;return _regeneratorRuntime.awrap(FileSystem.deleteAsync(BASE_DIR,{idempotent:true}));case 2:_context2.next=4;return _regeneratorRuntime.awrap(FileSystem.makeDirectoryAsync(BASE_DIR));case 4:case"end":return _context2.stop();}}});}},{key:"getCacheSize",value:function getCacheSize(){var result;return _regeneratorRuntime.async(function getCacheSize$(_context3){while(1){switch(_context3.prev=_context3.next){case 0:_context3.next=2;return _regeneratorRuntime.awrap(FileSystem.getInfoAsync(BASE_DIR));case 2:result=_context3.sent;if(result.exists){_context3.next=5;break;}throw new Error(BASE_DIR+" not found");case 5:return _context3.abrupt("return",result.size);case 6:case"end":return _context3.stop();}}});}}]);return CacheManager;}();CacheManager.entries={};var getCacheEntry=function getCacheEntry(uri){var filename,ext,exists,path,tmpPath,_ref2;return _regeneratorRuntime.async(function getCacheEntry$(_context4){while(1){switch(_context4.prev=_context4.next){case 0:filename=uri.substring(uri.lastIndexOf('/'),uri.indexOf('?')<0?uri.length:uri.indexOf('?'));ext=filename.indexOf('.')<0?'.jpg':filename.substring(filename.lastIndexOf('.'));exists=false;path=""+BASE_DIR+SHA1(uri)+ext;tmpPath=""+BASE_DIR+SHA1(uri)+"-"+_.uniqueId()+ext;_context4.prev=5;_context4.next=8;return _regeneratorRuntime.awrap(FileSystem.makeDirectoryAsync(BASE_DIR));case 8:_context4.next=10;return _regeneratorRuntime.awrap(FileSystem.getInfoAsync(path));case 10:_ref2=_context4.sent;exists=_ref2.exists;_context4.next=16;break;case 14:_context4.prev=14;_context4.t0=_context4["catch"](5);case 16:return _context4.abrupt("return",{exists:exists,path:path,tmpPath:tmpPath});case 17:case"end":return _context4.stop();}}},null,null,[[5,14]]);};export default CacheManager;
//# sourceMappingURL=CacheManager.js.map
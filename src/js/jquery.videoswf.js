/**
 * v1.0.0
 * video-swf，视频播放插件
 * 组件依赖：jquery1.7.2+
 */
(function(){

    var $video;

    function Video(opts){
        this._opts = opts || {};
        this._opts.wrapper = opts.wrapper;
        this._opts.width = opts.width || 600;
        this._opts.height = opts.height || 350;
        this._opts.name = opts.name;
        this._opts.swfdir = opts.swfdir || 'media/flvplayer.swf';
        this._opts.swfparam = opts.swfparam || '&IsAutoPlay=1&IsContinue=1&BarPosition=3&BarTransparent=40&IsShowBar=3';
        this._opts.flashLoadError = opts.flashLoadError;
        this._init(this._opts);
    }

    Video.prototype = {
        // 友好提示flash的信息
        _addFlashTips: function(str){
            // 一般提示安装或者更新flash提示
            var html = '<div class="video-tip"><p>'+str+'请您<a href="http://www.adobe.com/go/getflashplayer" target="_blank">立即安装</a></p></div>';
            return html;
        },
        // flash检测
        _flashChecker: function(){
            var hasFlash = 0;　　　　 //是否安装了flash
            var flashVersion = 0;　　 //flash版本
            if (document.all) {
                var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
                if (swf) {
                    hasFlash = 1;
                    VSwf = swf.GetVariable("$version");
                    flashVersion = parseInt(VSwf.split(" ")[1].split(",")[0]);
                }
            } else {
                if (navigator.plugins && navigator.plugins.length > 0) {
                    var swf = navigator.plugins["Shockwave Flash"];
                    if (swf) {
                        hasFlash = 1;
                        var words = swf.description.split(" ");
                        for (var i = 0; i < words.length; ++i) {
                            if (isNaN(parseInt(words[i]))) continue;
                            flashVersion = parseInt(words[i]);
                        }
                    }
                }
            }
            return {
                f: hasFlash,
                v: flashVersion
            };
        },
        // 视频配置
        _flashObj: function(o) {
            return '<embed width="' + o.width + 'px" height="' + o.height + 'px" loop="true" ' +
                'title="" wmode="transparent" ' +
                'src="' + o.swfdir+'' + '" ' +
                'allowfullscreen="true" ' +
                'flashvars="vcastr_file=' + o.name + o.swfparam +''+
                '&quality="high" ' +
                'pluginspage="http://get.adobe.com/cn/flashplayer" ' +  //http://www.macromedia.com/go/getflashplayer
                'type="application/x-shockwave-flash">';
        },
        _init: function(args){
            var _this = this;
            var videohtml;
            var obj = {
                width: args.width,
                height: args.height,
                name: args.name,
                swfdir: args.swfdir,
                swfparam: args.swfparam
            };
            var fls = _this._flashChecker();
            $video = $(args.wrapper);  
            if(fls.f && fls.v > 20){
                videohtml = _this._flashObj(obj);
            }else if(fls.f && fls.v < 20){
                if($.isFunction(_this._opts.flashLoadError)){
                    videohtml = _this._addFlashTips("主人~您安装了flash,当前flash版本太低~~");
                }else{
                    _this._opts.flashLoadError();
                }
            }else{
                if($.isFunction(_this._opts.flashLoadError)){
                    videohtml = _this._addFlashTips("主人~您没有安装flash~~");
                }else{
                    _this._opts.flashLoadError();
                }
            }
            $video.append(videohtml);
        }
    };

    window.Video = Video;
})();





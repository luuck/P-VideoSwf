## P-VideoSwf
一款网页版使用flvplayer.swf播放器播放flv视频文件，兼容各大主流浏览器（包括ie6、7）。

[demo](https://luuck.github.io/video-swf/src/index.html)

### 如何使用？
1、引入文件
```css
<link href="css/index.css"/>
```
```Javascript
<script src="https://cdn.bootcss.com/jquery/1.7.2/jquery.min.js"></script>
<script src="js/jquery.videoswf.js"></script>
```

2、HTML
```HTML
<div class="video"></div>
```

3、Javascript
```Javascript
var video = new Video({
    // 必填，选择器
    wrapper: '.video',
    // 可选，默认宽度：600
    width: 680,
    // 可选，默认高度：350
    height: 350,

    // 必填，路径放置和flvplayer.swf同级
    name: 'brand.flv',
    // 可选，视频播放器路径，默认路径'media/flvplayer.swf'
    swfdir: 'media/flvplayer.swf',

    // 可选，flvplayer.swf播放器的配置参数按如下格式传入
    // 可配置的参数说明参考http://blog.csdn.net/joyhen/article/details/23001487
    swfparam: '&IsAutoPlay=1&IsContinue=1&BarPosition=1&BarTransparent=40&IsShowBar=3',

    // 可选，flash加载出错的回调函数，不配置则使用默认的操作
    flashLoadError: function(){ }
});
```

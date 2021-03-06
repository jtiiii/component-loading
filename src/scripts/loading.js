/**
 * 该loading插件为loading动画组件
 * 需要jQuery支持
 */

/**
 * Loading对象
 * @param el
 * @constructor
 */
(function (global,factory) {

    if(typeof module === 'object' && typeof module.exports === 'object' ){
        //当为commonjs（node）的环境时候
        module.exports = factory(global,true);
    }else{
        //不然为浏览器环境下
        factory(global);
    }
})(typeof window !== 'undefined' ? window : this,function(window,isGlobal){
    //如果为浏览器环境下，则window === global
    let Loading = function(el){
        this.el = el;
        this.$dom().addClass('loading');
        //是否是播放状态
        this.playing = false;
        //loading动画执行栈堆，解决异步大量访问造成class混乱的问题
        this.playStack = [];
    };
    let jq = undefined;
    Loading.setJQuery = $ => jq = $;
    Loading.prototype = {
        constructor: Loading,
        /**
         * 开始Loading动画
         */
        show: function(){
            let play = next =>{
                this.$dom().addClass('loading-begin');
                setTimeout( ()=> {
                    this.$dom().removeClass('loading-begin');
                    this.$dom().addClass('loading-run');
                    next();
                }, 300 );
            };
            //把将要执行的动画放入栈堆
            this.playStack.push(play);
            //异步播放
            setTimeout( this._play() , 10);
        },
        /**
         * 结束loading动画
         */
        hide: function(){
            let play = next => {
                this.$dom().removeClass('loading-run');
                this.$dom().addClass('loading-end');
                this.loading = false;
                setTimeout( ()=>{
                    this.$dom().removeClass('loading-end');
                    next();
                }, 300 );
            };
            //把将要执行的动画放入栈堆
            this.playStack.push(play);
            setTimeout( this._play() , 10);
        },
        $dom: function(){
            if(!jq){
                throw new Error("The jquery is required! You need use 'Loading.setJQuery()' first or global/window has jquery object -- '$'.");
            }
            return jq(this.el);
        },
        /**
         * 开始播放动画
         * @private
         */
        _play: function() {
            if (this.playing) {
                return;
            }
            this.playing = true;
            this._executeStack().then(() => {
                this.playing = false;
            });
        },
        /**
         * 递归执行栈堆动画
         * @returns {Promise<any>}
         * @private
         */
        _executeStack: function(){
            let next = this.playStack.shift();
            return new Promise( next ).then( () =>{
                if(this.playStack.length !== 0){
                    return this._executeStack();
                }
            });
        }
    };
    if(!isGlobal){
        window.Loading = Loading;
    }
    Loading.setJQuery(window.$);

    return Loading;
});
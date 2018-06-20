/**
 * 该loading插件为loading动画组件
 * 需要jQuery支持
 */

/**
 * Loading对象
 * @param el
 * @constructor
 */
let Loading = function({ el }){
    this.el = el;
    this.$dom().addClass('loading');
    //是否是播放状态
    this.playing = false;
    //loading动画执行栈堆，解决异步大量访问造成class混乱的问题
    this.playStack = [];
};
Loading.setJQuery = $ => Loading.$ = $;
Loading.prototype = {
    constructor: Loading,
    /**
     * 开始Loading动画
     */
    show: function(){
        let play = next =>{
            this.$dom().addClass('loading-begin');
            setTimeout( ()=> {
                console.info("show");
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
                console.info("hide");
                this.$dom().removeClass('loading-end');
                next();
            }, 300 );
        };
        //把将要执行的动画放入栈堆
        this.playStack.push(play);
        setTimeout( this._play() , 10);
    },
    $dom: function(){
        return Loading.$(this.el);
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

module.exports = Loading;


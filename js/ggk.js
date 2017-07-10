
var Ggk = _self = {

	// 数据
	data: {
		canvas: '',
		ctx: '',
		isMouseDown: false,   //鼠标是否按下
		isOk: 0,             //是否已刮开一半以上
		fontEm: parseInt(window.getComputedStyle(document.documentElement, null)['font-size'])
	},

	init: function(){
		// 调用ajax
		if(_self.data.isOk){
			var prize = document.getElementById('prize');
			prize.style.display = 'block';
			prize.style.zIndex = 3;
		}
	},

	load: function(){

		_self.data.canvas = document.getElementById('canvas');
		_self.data.ctx = _self.data.canvas.getContext('2d');

		_self.data.canvas.addEventListener('mousemove', _self.eventMove, false);
		_self.data.canvas.addEventListener('mousedown', _self.eventDown, false);
		_self.data.canvas.addEventListener('mouseup', _self.eventUp, false);

		_self.data.canvas.addEventListener('touchstart', _self.eventDown, false);
		_self.data.canvas.addEventListener('touchend', _self.eventUp, false);
		_self.data.canvas.addEventListener('touchmove', _self.eventMove, false);

		this.initCanvas();
	},
    
    //初始化画布
	initCanvas: function(){
		_self.data.ctx.globalCompositeOperation = 'source-over';
		_self.data.ctx.fillStyle = '#b9b9b9';
		_self.data.ctx.fillRect(0, 0, 300, 70);
		_self.data.ctx.fill();

		_self.data.ctx.font = 'Bold 30px Microsoft YaHei';
		_self.data.ctx.textAlign = 'center';
		_self.data.ctx.fillStyle = '#313131',
		_self.data.ctx.fillText('刮奖区', 150, 45);

		_self.data.ctx.globalCompositeOperation = 'destination-out';   // 圆形橡皮擦效果
	},
    
    // 鼠标按下
	eventDown: function(e){
		e.preventDefault();
		_self.data.isMouseDown = true;
	},
    
    // 鼠标弹起
	eventUp: function(e){
		e.preventDefault();

		var _data = _self.data.ctx.getImageData(0, 0, 300, 70);
		var half = 0;
		for(var i=3; i<_data.data.length; i+=4){
			if(_data.data[i] == 0){
				half++;
			}
		}
		if(half >= _data.data.length / 8){
			_self.data.isOk = 1;
			_self.init();
		}

		_self.data.isMouseDown = false;
	},

	// 移动鼠标
	eventMove: function(e){
		e.preventDefault();
		if(_self.data.isMouseDown){
			if(e.changedTouches){
				e = e.changedTouches[e.changedTouches.length - 1];
			}

			var topY = document.getElementById('ggk').offsetTop,
			    topX = document.getElementById('ggk').offsetLeft,
			    oX = _self.data.canvas.offsetLeft + topX,
			    oY = _self.data.canvas.offsetTop + topY;

			    x = (e.clientX + document.body.scrollLeft || e.pageX) - oX || 0;
			    y = (e.clientY + document.body.scrollTop || e.pageY) - oY || 0,
			    radius = _self.data.fontEm * 1.2;

			_self.data.ctx.beginPath();
			_self.data.ctx.arc(x, y, radius, 0, Math.PI * 2, true);

			_self.data.canvas.style.display = 'none';
			_self.data.canvas.offsetHeight;
			_self.data.canvas.style.display = 'inherit';

			_self.data.ctx.fill();	
		}

		if(_self.data.isOk){
			_self.init();
		}
	},
};

Ggk.load();
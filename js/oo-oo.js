function PlaceFieldEditor(id,value,parentEle){
	this.id = id;
	this.value = value;
	this.parentEle = parentEle;
	this.initValue = value;
	
	//初始化所有元素
	this.initElements();
	
	//初始化所有事件
	this.initEvents();
}

PlaceFieldEditor.prototype = {
	//设置构造函数prototype属性，让其constructor属性指向函数本身
	constructor: PlaceFieldEditor,
	
	//初始化所有元素
	initElements: function(){
		//初始化的span,初始数据为传入的value值
		this.txtEle = $('<span/>');
		this.txtEle.text(this.value);
		
		//初始化input
		this.textEle = $('<input type="text" />');
		this.textEle.val(this.value);
		
		//初始化按钮
		this.btnWapper = $('<div style="display:inline" />');
		this.saveBtn = $('<input type="button" value="保存" style="margin-right:10px" />');
		this.cancelBtn = $('<input type="button" value="取消" />');
		this.btnWapper.append(this.saveBtn).append(this.cancelBtn);
		
		this.parentEle.append(this.txtEle).append(this.textEle).append(this.btnWapper);
		
		//初始化元素后切换阅读模式
		this.convertToReadable()
		
	},
	
	//初始化所有事件
	initEvents: function(){
		//保存this，预防有其他方法调用this
		var that = this;
		
		//点击span出发事件，让表格输入显示
		this.txtEle.on("click",function(){
			//点击后切换到输入模式
			that.convertToEditable()
		});
		//点击保存按钮事件
		this.saveBtn.on("click",function(){
			//调用保存方法
			that.save()
		});
		//点击取消按钮事件
		this.cancelBtn.on("click",function(){
			//调用取消方法
			that.cancel()
		});
		
	},
	
	//编辑模式方法
	convertToEditable: function(){
		//span隐藏
		this.txtEle.hide();
		//input显示,同时获得焦点
		this.textEle.show();
		this.textEle.focus();
		if (this.getValue()==this.initValue) {
			this.textEle.val("")
		}
		//按钮模块显示
		this.btnWapper.show();
		
	},
	
	//保存
	save: function(){
		this.setValue(this.textEle.val());
		this.txtEle.html(this.getValue().replace(/\n/g,"<br />"));
		this.convertToReadable();
	},
	//取消
	cancel: function(){
		this.textEle.val(this.getValue());
		this.convertToReadable();
	},
	//编辑模式
	convertToReadable: function(){
		//span显示
		this.txtEle.show();
		//隐藏input元素
		this.textEle.hide();
		//隐藏按钮模块
		this.btnWapper.hide();
	},
	
	setValue: function(value){
		this.value = value;
	},
	getValue: function(){
		return this.value
	}
	
	
}



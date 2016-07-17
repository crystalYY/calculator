var oinput=document.getElementsByTagName('input')[0];
		//获取外部样式
		function getStyle(obj, name)
		{
			if(obj.currentStyle)
			{
				return obj.currentStyle[name];
			}
			else
			{
				return getComputedStyle(obj, false)[name];
			}
		}
		//渐变动画
		function move(obj,attr,tar){
			clearInterval(obj.timer);
			obj.timer=setInterval(function(){
				var cur=parseInt(getStyle(obj,attr));
				var itarget=parseInt(tar);
				var speed=(itarget-cur)/6;
				speed=speed>0?Math.ceil(speed):Math.floor(speed);
				obj.style[attr]=parseInt(getStyle(obj,attr))+speed+'px';
				if(speed==0){
					clearInterval(obj.timer);
				}
			},30);
		}
		//事件绑定函数
		function addEvent(obj,ev,fun){
			if(obj.attachEvent){
				obj.attachEvent('on'+ev,fun);
			}else{
				obj.addEventListener(ev,fun,false);
			}
		}
		//阻止默认行为
		function stopEvent(ev){
			var e=ev||window.event;
			if(e.preventDefault){
				e.preventDefault();
			}
			else{
				e.returnValue=false;//ie
			}
		}
		//计算最终结果
		function getResult(){
			function evalResult(){
				var result=eval(oinput.value);
				return result;			
			}
			//捕获异常
			try{
				var x=evalResult();
				return x;
			}
			catch (e){
				oinput.className='showError';
				var errorHint=document.getElementById('errorHint');
				move(errorHint,'top',0);
				setTimeout(function(){
					oinput.className='';
					move(errorHint,'top',-282);
				},2000);
				return oinput.value;
			}
		}
		//文本框获取焦点，错误提示消失
		//按下回车得到结果
		function enterResult(ev){
			var e=ev||window.event;
			if(e.keyCode==13){
				stopEvent(ev);//阻止enter键的默认行为
				var result=getResult();
				oinput.value=result;
			}
		}
		//绑定点击事件
		function init(){
			var otable=document.getElementsByTagName('table')[0];
			addEvent(otable,'keydown',function(ev){
				enterResult(ev);
			});
			addEvent(otable,'click',function(ev){
				stopEvent(ev);
				var e=ev||window.event;
				var itat=e.target||e.srcElement;
				var obtns=document.getElementsByTagName('button');
				if(itat.nodeName.toLowerCase()=='button'){
					for(var i=0;i<obtns.length;i++){
						obtns[i].style.borderColor='#000';
					}
					itat.style.borderColor='white';
					if(itat.className!='setChange'){
						if(oinput.value=='0'){
							oinput.value='';
							oinput.value+=itat.innerHTML;
						}
						else{
							oinput.value+=itat.innerHTML;
						}
					}else{
						if(itat.id=='backSpace'){
							oinput.value=oinput.value.toString().slice(0,-1);
						}
						else if(itat.id=='clearNum'){
							oinput.value='0';
						}else{
							var result=getResult();
							oinput.value=result;
						}
					}
				}
			});
		}
		init();
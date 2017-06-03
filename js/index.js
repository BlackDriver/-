var main = document.querySelector('.main');
var count = window.sessionStorage.length + 1;
var funstatus = 1;
print(1);

// 获取回车
document.onkeydown = function (event) {
     var e = event || window.event || arguments.callee.caller.arguments[0];
      if(e && e.keyCode==13){

            var addtext = document.querySelector(".addtext");

            if (addtext.value != ""){
                add(addtext.value);
                addtext.value = '';
            }
            
            
        }

}

//添加一个事项
function add (text) {
    var value = text.toString();
    var json = {
        "done":0,
        "value":value
    }
    var str = JSON.stringify(json);
    console.log(str);
    var keyname = "text" + count;
    sessionStorage.setItem(keyname,str);
    count ++;
    print(funstatus);
}

//打印出所有、正在做、已完成的事项
function print(how) {
    clear();
    var storage = window.sessionStorage;
    var leftcount = 0;
    for (var i = 0,len = storage.length; i < len; i++) {
        var key = storage.key(i);
        var text = JSON.parse(sessionStorage.getItem(key));
        if (how == 1) {   
            create(text,key,text);
            funstatus = 1;
        }
        if (how == 2) {
            if (!text.done) {
                create(text,key,text);
                funstatus = 2;
            }
        }
        if (how == 3) {
            if (text.done) {
                create(text,key,text);
                funstatus = 3;
            }
        }
        if (!text.done) {
            leftcount++;
        }
        
    }
    countleft(leftcount);       
    
}


//建立单个事项的div并打印
function create(jsonarg,key,text) {

    var div = document.createElement('div');
    
    var ball = document.createElement('div');
    var viewtext = document.createElement('input');
    var deleteit = document.createElement('div');
    deleteit.className = "deleteit";
    div.className = "view";
    viewtext.className = "view-text off";
    
    
    if (text.done) {
        ball.setAttribute("onclick","notdone(this)");
    }else{
        ball.setAttribute("onclick","isdone(this)");
    }
    
    if (jsonarg.done) {
        ball.className = "ball completed";
    }else{
        ball.className = "ball";
    }
    viewtext.setAttribute("ondblclick","fixthis(this)");
    viewtext.readOnly = true;
    deleteit.innerHTML = "X";
    deleteit.setAttribute("onclick","deletethis(this)");
    deleteit.setAttribute("index",key);
    ball.setAttribute("index",key);
    
    viewtext.value = jsonarg.value;
    
    div.appendChild(ball);
    div.appendChild(viewtext);
    div.appendChild(deleteit);
    main.appendChild(div);


}

// 清屏
function clear () {
    var len = document.querySelectorAll('.view').length;
    for (var i = 0 ;i < len;i ++) {      
            var deleteit = document.querySelector('.view');
            
            main.removeChild(deleteit);
    }
    
    
}

// 检查item left
function countleft (count) {
    var itemsleft = document.querySelector('.itemsleft');
    itemsleft.innerHTML = count;
}

// 标记为已完成
function isdone (it) {
    
    var data = it.getAttribute("index");
    var storage = JSON.parse(sessionStorage.getItem(data));
    storage.done = 1;
    var str = JSON.stringify(storage);
    sessionStorage.setItem(data,str);

    print(funstatus);   
}

// 标记为未完成
function notdone (it) {
    var data = it.getAttribute("index");
    var storage = JSON.parse(sessionStorage.getItem(data));
    storage.done = 0;
    var str = JSON.stringify(storage);
    sessionStorage.setItem(data,str);

    print(funstatus);
}

//删除事项
function deletethis (it) {
    var data = it.getAttribute("index");
    
    sessionStorage.removeItem(data);
    print(funstatus);
}

// 修改事项
function fixthis (it) {
    
    it.readOnly = false;
    var thisindex = it.parentNode.firstChild.getAttribute("index");
    
    window.onclick = function() {
        var text = it.value;
        var json = JSON.parse(sessionStorage.getItem(thisindex));
        json.value = text;
        var str = JSON.stringify(json);
        it.readOnly = true;
        sessionStorage.setItem(thisindex,str);
    }


}


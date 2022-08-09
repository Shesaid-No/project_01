window.addEventListener('load', function () {
    //1.当鼠标经过图片时，显示按钮，离开时隐藏
    var box = this.document.querySelector('.box');
    var butl = document.querySelector('.but-l');
    var butr = document.querySelector('.but-r');
    var focus = document.querySelector('.focus');

    box.addEventListener('mouseover', function () {
        butl.style.display = 'block';
        butr.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    box.addEventListener('mouseout', function () {
        butl.style.display = 'none';
        butr.style.display = 'none';
        timer = setInterval(function () {
            // 手动调用触发点击右键按钮
            butr.click();
        }, 2000);
    })
    // 2.生成小圆圈
    var ol = this.document.querySelector('.circle');
    var index = this.document.createAttribute('index');
    index = 0;
    var num = 0;
    for (var i = 0; i < focus.children.length; i++) {
        var oli = this.document.createElement('li');
        ol.appendChild(oli);
        ol.children[i].index = i;
    }
    ol.children[0].className = 'curent';

    var olli = ol.querySelectorAll('li');
    // 3.点击小圆圈移动图片
    for (var i = 0; i < ol.children.length; i++) {
        olli[i].addEventListener('click', function () {
            animate(focus, -focus.children[this.index].offsetWidth * this.index);
            //干掉其他小圆圈的curent属性
            for (var i = 0; i < olli.length; i++) {
                olli[i].className = '';
            }
            //保留当前小圆圈的curent属性
            this.className = 'curent';
            num = this.index;
        })
    }

    // 4.无缝转换
    focus.appendChild(focus.children[0].cloneNode(true));

    // 5.点击左右按钮移动图片

    var flag = true;// 节流阀控制
    butr.addEventListener('click', function () {
        if (flag) {
            flag = false;// 关闭节流阀
            if (num == focus.children.length - 1) {
                num = 0;
                focus.style.left = '0px';
            }
            num++;
            animate(focus, -focus.children[0].offsetWidth * num, function () {
                flag = true;
            });
            //干掉其他小圆圈的curent属性
            for (var i = 0; i < olli.length; i++) {
                olli[i].className = '';
            }
            //保留当前小圆圈的curent属性
            if (num == focus.children.length - 1) {
                olli[0].className = 'curent';
            } else {
                olli[num].className = 'curent';
            }
        }
    })
    butl.addEventListener('click', function () {
        if (flag) {
            flag = false;
            num--;
            if (num == -1) {
                num = focus.children.length - 2;
                focus.style.left = -(focus.children.length - 1) * focus.children[0].offsetWidth + 'px';
            }
            animate(focus, -focus.children[0].offsetWidth * num, function () {
                flag = true;
            });
            //干掉其他小圆圈的curent属性
            for (var i = 0; i < olli.length; i++) {
                olli[i].className = '';
            }
            //保留当前小圆圈的curent属性
            olli[num].className = 'curent';
        }
    })

    // 6.自动播放

    var timer = setInterval(function () {
        // 手动调用触发点击右键按钮
        butr.click();
    }, 2000);

    function mytimer() {
        clearInterval(timer)
    }

    box.addEventListener('mousever',function(){
        mytimer()
    })
    box.addEventListener('mouseout',function(){
        timer()
    })
})
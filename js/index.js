var keys = {
    '0': {
        0: 'q',
        1: 'w',
        2: 'e',
        3: 'r',
        4: 't',
        5: 'y',
        6: 'u',
        7: 'i',
        8: 'o',
        9: 'p',
        length: 10
    },
    '1': {
        0: 'a',
        1: 's',
        2: 'd',
        3: 'f',
        4: 'g',
        5: 'h',
        6: 'j',
        7: 'k',
        8: 'l',
        length: 9
    },
    '2': {
        0: 'z',
        1: 'x',
        2: 'c',
        3: 'v',
        4: 'b',
        5: 'n',
        6: 'm',
        length: 7
    },
    'length': 3
}

var hash = {
    'q': 'www.qq.com',
    'w': 'www.weibo.com',
    't': 'www.gitee.com',
    'i': 'www.iqiyi.com',
    'j': 'www.jianshu.com',
    'z': 'www.zhihu.com',
    'b': 'www.bilibili.com',
    'g': 'www.github.com',
    'l': 'leahzheng.gitee.io'

}

//取出localStorage中的对应的hash 是否为null
var hashInlocalStrage = JSON.parse(localStorage.getItem('newWeb') || 'null')
if (hashInlocalStrage) {
    hash = hashInlocalStrage
}
// 函数
function createSpan(litter) {
    let span = document.createElement('span');
    span.innerHTML = litter.toUpperCase();
    span.className = 'text'
    return span
}

function createBtn(litter) {
    let btn = document.createElement('button');
    btn.innerHTML = 'Edit';
    btn.className = 'edit';
    btn.onclick = function(e) {

        let key = e.target;
        let img = key.previousSibling;
        //hash变更
        hash[litter] = window.prompt('请设置网址');

        localStorage.setItem('newWeb', JSON.stringify(hash))

        img.src = `http://${hash[litter]}/favicon.ico`;
        img.onerror = function(e) {
            e.target.src = './img/error.png';
        }
    }
    return btn
}

function createImg(litter) {
    let img = document.createElement('img');
    let url = hash[litter]
    if (url) {
        img.src = `http://${url}/favicon.ico`;
    } else {
        img.src = './img/error.png'
    }
    img.onerror = function(e) {
        e.target.src = './img/error.png'
    }
    return img

}

// 遍历生成key
for (let r = 0; r < keys.length; r++) { //0 1 2
    var divRow = document.createElement('div');
    divRow.className = 'row';
    var keyboard = document.getElementById('keyboard');
    keyboard.appendChild(divRow);
    let row = keys[r];
    for (let i = 0; i < row.length; i++) {
        let kbSpan = createSpan(row[i]);
        let kbBtn = createBtn(row[i]);
        let kbImg = createImg(row[i]);

        let key = document.createElement('div');
        key.className = 'key';

        key.appendChild(kbSpan);
        key.appendChild(kbImg);
        key.appendChild(kbBtn);

        divRow.appendChild(key);

    }
}



// 监听事件
// 获取搜索框和按钮
var input = document.getElementById('keyword');
var btn = document.getElementById('sBtn');
// 获取input的value，拼接在baiduString后，回车打开新的搜索页面
input.addEventListener('keyup', function(e) {
        e.stopPropagation()
        if (e.keyCode == 13) {
            let baiduString = 'https://www.baidu.com/s?wd=';
            let iptVal = document.getElementById('keyword').value;
            baiduString = baiduString.concat(iptVal);
            window.open(url = `${baiduString}`, target = '_blank')
        }

    })
    // 点击搜索，打开新的搜索页面
btn.onclick = function(e) {
    e.stopPropagation()
    let baiduString = 'https://www.baidu.com/s?wd=';
    let iptVal = document.getElementById('keyword').value;
    baiduString = baiduString.concat(iptVal);
    window.open(url = `${baiduString}`, target = '_blank')
}

//按键盘上的字母，打开新的页面
document.addEventListener('keyup', function(e) {
    e.stopPropagation()
    let url = hash[e.key];
    if (url) {
        window.open(url = `http://${url}`, target = '_blank');
    } else {
        alert('该按键还未编辑网址，请在设置后按下。')
    }

})
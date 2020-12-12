var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var list = {
    message: [
        { images: 'http://127.0.0.1:8080/images/01.jpg', time: '2012-12-23', num: 89, theme: '阿萨德才', id: 1, pageIndex: 1 },
        { images: 'http://127.0.0.1:8080/images/02.jpg', time: '2014-06-06', num: 74, theme: 'saeradd', id: 2, pageIndex: 1 },
        { images: 'http://127.0.0.1:8080/images/03.jpg', time: '2015-06-06', num: 32, theme: 'sreaad', id: 3, pageIndex: 2 },
        { images: 'http://127.0.0.1:8080/images/04.jpg', time: '2017-05-06', num: 23, theme: 'sread', id: 4, pageIndex: 2 },
        { images: 'http://127.0.0.1:8080/images/05.jpg', time: '2014-09-05', num: 12, theme: 'serad', id: 5, pageIndex: 3 },
        { images: 'http://127.0.0.1:8080/images/06.jpg', time: '2019-06-06', num: 09, theme: 'serad', id: 6, pageIndex: 3 },
        { images: 'http://127.0.0.1:8080/images/07.jpg', time: '2019-06-09', num: 12, theme: 'sreead', id: 7, pageIndex: 4 },
        { images: 'http://127.0.0.1:8080/images/08.jpg', time: '2019-09-06', num: 09, theme: 'erewrsad', id: 8, pageIndex: 4 },
        { images: 'http://127.0.0.1:8080/images/09.jpg', time: '2019-08-06', num: 80, theme: 'errwsad', id: 9, pageIndex: 5 },
        { images: 'http://127.0.0.1:8080/images/10.jpg', time: new Date(), num: 23, theme: 'ersaewd', id: 10, pageIndex: 5 }
    ]
};
var list1 = {
    message: [
        { id: 1, title: '家居生活' },
        { id: 2, title: '摄影设计' },
        { id: 3, title: '学习摄影' },
        { id: 4, title: '摄影器材' },
        { id: 5, title: '动漫' }
    ]
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join(__dirname, 'images')))
app.get('/lunbotu', (req, res) => {
    res.send({
        images: [
            'http://127.0.0.1:8080/images/01.jpg',
            'http://127.0.0.1:8080/images/02.jpg',
            'http://127.0.0.1:8080/images/03.jpg'
        ],

    })
})
app.get('/newsList', (req, res) => {
    res.send(list)
})
app.get('/newsInfo/:id', function (req, res) {
    var shuju = [];

    var id = parseInt(req.params.id);
    for (let item of list.message) {
        if (item.id === id) {
            shuju.push(item)
        }
    }

    res.send(shuju);

})
app.get('/getGoodList/:ids', function (req, res) {
    var shuju = [];

    var id = req.params.ids;
    var ids = id.split(',');
    for (let i = 0; i < ids.length; i++) {
        for (let item of list.message) {

            if (item.id == ids[i]) {
                shuju.push(item)
            }

        }
    }

    res.send(shuju);

})
app.get('/getcomments/:id', function (req, res) {
    var shuju = [];

    var pageIndex = parseInt(req.query.pageIndex);

    for (let item of list.message) {
        if (item.pageIndex === pageIndex) {
            shuju.push(item)
        }
    }

    res.send(shuju);
})
app.get('/goodsList', function (req, res) {
    var shuju = [];

    var pageIndex = parseInt(req.query.pageIndex);

    for (let item of list.message) {
        if (item.pageIndex === pageIndex) {
            shuju.push(item)
        }
    }

    res.send(shuju);
})
app.get('/getcomments01/:id', function (req, res) {
    var shuju = [];
    var pageIndex = parseInt(req.params.id);

    for (let item of list.message) {
        if (item.pageIndex === pageIndex) {
            shuju.push(item)
        }
    }

    res.send(shuju);
})
// 获取请求数据
app.post('/postComment/:id', function (req, res) {
    console.log(req.body);
    if (req.body) {
        res.send('ok')
    }
})
// 渲染导航栏页面数据
app.get('/getimgcategory', (req, res) => {
    res.send(list1);
})
// 渲染图片列表
app.get('/getimages/:id', (req, res) => {
    var shuju = [];
    var id = parseInt(req.params.id);
    if (id == 0) {
        for (let item of list.message) {
            shuju.push(item)
        }
    } else {
        for (let item of list.message) {
            if (item.pageIndex === id) {
                shuju.push(item)
            }
        }
    }
    res.send(shuju)


})
app.listen('8080', () => {
    console.log('running');
})
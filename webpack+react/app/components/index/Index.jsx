//import $ from 'jquery';
import React from 'react';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
        /*this.state = {
            data: {
                baseInfo: {
                    id: 14085,
                    labels: "",
                    title: "北欧风情清新地中海浪漫卧室",
                    titlePicUrl: "",
                    articleType: "",
                    praisecount: "",
                    browsecount: "",
                    summary: "每个人的户型图都不一样，我最大的改动是把门口入户花 园的墙砸掉了。和客厅打通后做了开放式的书房。其它范 围就做了一些小范围的调。",
                    details: '<p>每个人的户型图都不一样，我最大的改动是把门口入户花</p><img src="../images/images/demo.jpg"><p>每个人的户型图都不一样，我最大的改动是把门口入户花</p><img src="../images/images/demo.jpg"><p>每个人的户型图都不一样，我最大的改动是把门口入户花</p><img src="../images/images/demo.jpg"><p>每个人的户型图都不一样，我最大的改动是把门口入户花</p><img src="../images/images/demo.jpg"><p>每个人的户型图都不一样，我最大的改动是把门口入户花</p>',
                    writerInfo: {
                        id: 33928,
                        nickName: "绵绵的兔兔",
                        headPicUrl: "../images/images/designer.png",
                        roleId: 1
                    },

                    articleVos: [
                        {
                            id: 1,
                            title: "客厅",
                            titlePicUrl: "../images/images/1.jpg",
                            content: "",
                            threeDimensionalImgInfo: "",
                            support3d: "",
                            extendJson: ""
                        },
                        {
                            id: 2,
                            title: "卧室",
                            titlePicUrl: "../images/images/2.jpg",
                            content: "",
                            threeDimensionalImgInfo: "",
                            support3d: "",
                            extendJson: ""
                        },
                        {
                            id: 2,
                            title: "厨房",
                            titlePicUrl: "../images/images/3.jpg",
                            content: "",
                            threeDimensionalImgInfo: "",
                            support3d: "",
                            extendJson: ""
                        }

                    ],
                    houses: {
                        name: "国风美仑",
                        provinceName: "",
                        cityName: "北京",
                        room: 3,
                        hall: 2,
                        cook: 1,
                        bathroom: 1,
                        houseImg: "../images/images/3.jpg",
                        houseArea: "100"
                    }
                },
                attentFlag: true,
                isAddCart: 1,
                isLogin: 1
            }
        }*/
    }

    componentWillMount() {
        /*var This = this;
        console.log("页面渲染前调用");
        fetch('http://ihome.m.jd.com/jiuxian/webpack+react/test/1.json')
            .then(function(response) {
                //console.log(response.text());
                return response.text();
            }).then(function(body) {
            console.log(JSON.parse(body));
            This.setState({
                data:JSON.parse(body)
            })
            console.log(This.state.data);
        })*/
        this.setState({
            data:{
                "baseInfo": {
                    "id": 91914,
                    "title": "京装家·俪莎公馆客餐厅+主卧+儿童房",
                    "titlePicUrl": "jfs/t5647/4/2490063507/252038/25db0f96/5930f642N68d1233f.jpg",
                    "summary": "任时光流转，唯有尊贵与浪漫恒久相随，历久弥新。设计以高贵浪漫的欧洲贵族情怀，营造出典雅臻美、优雅大气的居家氛围。居室以澄净的雅士白为基调，再以伯爵米黄做点缀，灵动的绿不时跳动在空间中。色彩的变奏，触发每一个美好的瞬间，谱出生活的无穷魅力，高雅奢华的经典贵族气息悠然荡漾。在这场视",
                    "writerPin": "shjshi9",
                    "writerId": 33921,
                    "writerInfo": {
                        "id": 33921,
                        "nickName": "霜白",
                        "headPicUrl": "jfs/t4711/227/3257847300/3477441/82e57de7/58f85fa7N113f1ebd.png",
                        "summary": "我相信，设计源于生活，也将回归于生活。\n设计费：150元/㎡",
                        "labelIds": "241,236,232",
                        "fullName": "薛霜霜",
                        "labels": [
                            "设计师",
                            "新中式",
                            "北欧",
                            "现代",
                            "创意人",
                            "设计师",
                            "潮流搭配师"
                        ],
                        "attentionFlag": 0,
                        "biz": 0,
                        "channel": 0,
                        "roleId": 2
                    },
                    "praiseCount": 0,
                    "articleType": 3,
                    "browsecount": 5644,
                    "labelIds": "264,269",
                    "details": "<img src=\"//img11.360buyimg.com/faner/jfs/t5815/158/2450707320/235796/8000ad82/5930fb8eNf54d63db.jpg\" alt=\"\" /> <img src=\"//img11.360buyimg.com/faner/jfs/t5680/75/2487193476/222145/b8feecfd/5930fb8eNdacfbbdc.jpg\" alt=\"\" /> <img src=\"//img11.360buyimg.com/faner/jfs/t5830/68/2439501387/254246/ea805e5b/5930fb8fNfd43a240.jpg\" alt=\"\" /> <img src=\"//img11.360buyimg.com/faner/jfs/t5623/193/2495810963/299969/e44ca1de/5930fb8dN1b4f8af3.jpg\" alt=\"\" /> <img src=\"//img11.360buyimg.com/faner/jfs/t5635/6/2424168943/328442/f2aa27a6/5930fb8eN535cd5b6.jpg\" alt=\"\" /><img src=\"//img11.360buyimg.com/faner/jfs/t6106/197/1207120261/184614/5a4fb1f0/5930fb9aNfdb86cec.jpg\" alt=\"\" /> <img src=\"//img11.360buyimg.com/faner/jfs/t5617/242/2437102800/247092/12275319/5930fb9bN9b9e2840.jpg\" alt=\"\" /> <img src=\"//img11.360buyimg.com/faner/jfs/t5683/238/2503241286/180566/d9320f3a/5930fb9bNde94c7cd.jpg\" alt=\"\" /> <img src=\"//img11.360buyimg.com/faner/jfs/t5923/86/1280210051/144153/f789e45d/5930fb9bNf7fc7818.jpg\" alt=\"\" /> <img src=\"//img11.360buyimg.com/faner/jfs/t6019/156/1173700545/228149/e9de9e72/5930fb9cNbe1f5551.jpg\" alt=\"\" /><img src=\"//img11.360buyimg.com/faner/jfs/t5767/242/2493440014/207432/d098643f/5930fba4N26bd0c4d.jpg\" alt=\"\" />",
                    "articleVos": [
                        {
                            "id": 91915,
                            "title": "客厅",
                            "viceTitle": null,
                            "titlePicUrl": "jfs/t5647/4/2490063507/252038/25db0f96/5930f642N68d1233f.jpg",
                            "content": "<img src=\"//img11.360buyimg.com/faner/s640x0_jfs/t5647/4/2490063507/252038/25db0f96/5930f642N68d1233f.jpg\" skuprice=\"京东价 ￥1680\">            <div class=\"tags\">                        <div class=\"item\" anchor=\"沙发\" style=\"left:33%;top:57.99999999999999%\"><b></b><span>沙发</span></div><div class=\"item\" anchor=\"电视柜1\" style=\"left:74%;top:60%\"><b></b><span>电视柜1</span></div><div class=\"item\" anchor=\"茶几\" style=\"left:51%;top:61%\"><b></b><span>茶几</span></div><div class=\"item item-follow-left\" anchor=\"边柜\" style=\"left:86%;top:56.00000000000001%\"><b></b><span>边柜</span></div><div class=\"item\" anchor=\"地毯\" style=\"left:45%;top:72%\"><b></b><span>地毯</span></div><div class=\"item\" anchor=\"台灯\" style=\"left:8%;top:39%\"><b></b><span>台灯</span></div></div>",
                            "count": 0,
                            "summary": null,
                            "positionId": 0,
                            "newFlag": 0,
                            "writerInfo": null,
                            "attentionFlag": 0,
                            "praiseFlag": 0,
                            "praiseCount": 0,
                            "articleType": 10,
                            "auditTime": "2017-06-02 13:46:40",
                            "praiseChannel": 0,
                            "favFlag": 0,
                            "labelIds": ",",
                            "mContent": null,
                            "threeDimensionalImgInfo": null,
                            "support3d": 1,
                            "creator": "shjshi9",
                            "modified": null,
                            "browsecount": null,
                            "extendJson": {
                                "3d": "{\"url\":\"jfs/t5929/87/1294847118/2409682/da97b7f5/5930f74eN8ebcd3bb.jpg\",\"yaw\":0,\"pitch\":0}"
                            },
                            "articleAnchorVos2D": [
                                {
                                    "id": 56440,
                                    "articleId": 91915,
                                    "anchorName": "台灯",
                                    "skus": [
                                        {
                                            "articleId": 91915,
                                            "skuId": 1204543684,
                                            "skuImgUrl": "jfs/t199/135/1583708418/368183/169f3182/53b27661Ne5b39320.jpg",
                                            "skuName": "奇居良品 北欧简约格迪尔绿色格子布艺灯罩卧室床头装饰台灯 台灯黄色灯体(高款)",
                                            "anchorId": 56440,
                                            "cid1": 0,
                                            "cid2": 0,
                                            "cid3": 0,
                                            "cpsUrl": null,
                                            "skuDesc": null
                                        }
                                    ],
                                    "anchorType": 1,
                                    "anchorPosition": null
                                },
                                {
                                    "id": 56441,
                                    "articleId": 91915,
                                    "anchorName": "地毯",
                                    "skus": [
                                        {
                                            "articleId": 91915,
                                            "skuId": 10341682379,
                                            "skuImgUrl": "jfs/t2773/315/1028543589/385126/246ee435/5731a4bfNb81b9456.jpg",
                                            "skuName": "优立地毯 欧式立体雕花地毯 客厅地毯卧室门厅茶几地毯 欧华04 160CMx230CM",
                                            "anchorId": 56441,
                                            "cid1": 0,
                                            "cid2": 0,
                                            "cid3": 0,
                                            "cpsUrl": null,
                                            "skuDesc": null
                                        }
                                    ],
                                    "anchorType": 1,
                                    "anchorPosition": null
                                },
                                {
                                    "id": 56442,
                                    "articleId": 91915,
                                    "anchorName": "边柜",
                                    "skus": [
                                        {
                                            "articleId": 91915,
                                            "skuId": 10847598821,
                                            "skuImgUrl": "jfs/t3373/272/293920629/464061/3ca76db5/5805c320N32afca8e.jpg",
                                            "skuName": "UVANART UvanAccent新古典二斗交叉脚玄关柜 蓝色柜",
                                            "anchorId": 56442,
                                            "cid1": 0,
                                            "cid2": 0,
                                            "cid3": 0,
                                            "cpsUrl": null,
                                            "skuDesc": null
                                        }
                                    ],
                                    "anchorType": 1,
                                    "anchorPosition": null
                                },
                                {
                                    "id": 56443,
                                    "articleId": 91915,
                                    "anchorName": "茶几",
                                    "skus": [
                                        {
                                            "articleId": 91915,
                                            "skuId": 12743192815,
                                            "skuImgUrl": "jfs/t5278/154/356320072/571806/28d31e20/58fdce1dN2e68296e.jpg",
                                            "skuName": "俪莎公馆茶几 欧式大理石茶几法式客厅储物茶桌家具 设计帮精选 1.2m象牙白(木面)",
                                            "anchorId": 56443,
                                            "cid1": 0,
                                            "cid2": 0,
                                            "cid3": 0,
                                            "cpsUrl": null,
                                            "skuDesc": null
                                        }
                                    ],
                                    "anchorType": 1,
                                    "anchorPosition": null
                                },
                                {
                                    "id": 56444,
                                    "articleId": 91915,
                                    "anchorName": "电视柜1",
                                    "skus": [
                                        {
                                            "articleId": 91915,
                                            "skuId": 12741064107,
                                            "skuImgUrl": "jfs/t4879/138/2389312324/643121/356b288e/58fdce28N74557820.jpg",
                                            "skuName": "俪莎公馆电视柜 欧式大理石电视柜法式客厅储物地柜家具 象牙白(象牙白木面) 2.0M",
                                            "anchorId": 56444,
                                            "cid1": 0,
                                            "cid2": 0,
                                            "cid3": 0,
                                            "cpsUrl": null,
                                            "skuDesc": null
                                        }
                                    ],
                                    "anchorType": 1,
                                    "anchorPosition": null
                                },
                                {
                                    "id": 56445,
                                    "articleId": 91915,
                                    "anchorName": "沙发",
                                    "skus": [
                                        {
                                            "articleId": 91915,
                                            "skuId": 12740142755,
                                            "skuImgUrl": "jfs/t5242/235/2366171597/436202/de540c12/591a6f42N66411d3a.jpg",
                                            "skuName": "俪莎公馆 沙发 欧式沙发布艺沙发实木沙发可拆洗转角客厅家具沙发组合 设计帮精选 沙发+1.8M电视柜+1.2M茶几",
                                            "anchorId": 56445,
                                            "cid1": 0,
                                            "cid2": 0,
                                            "cid3": 0,
                                            "cpsUrl": null,
                                            "skuDesc": null
                                        }
                                    ],
                                    "anchorType": 1,
                                    "anchorPosition": null
                                }
                            ],
                            "articleAnchorVos3D": [
                                {
                                    "id": 56446,
                                    "articleId": 91915,
                                    "anchorName": "沙发",
                                    "skus": [
                                        {
                                            "articleId": 91915,
                                            "skuId": 12740142755,
                                            "skuImgUrl": "jfs/t5242/235/2366171597/436202/de540c12/591a6f42N66411d3a.jpg",
                                            "skuName": "俪莎公馆 沙发 欧式沙发布艺沙发实木沙发可拆洗转角客厅家具沙发组合 设计帮精选 沙发+1.8M电视柜+1.2M茶几",
                                            "anchorId": 56446,
                                            "cid1": 0,
                                            "cid2": 0,
                                            "cid3": 0,
                                            "cpsUrl": null,
                                            "skuDesc": "俪莎公馆 欧式布艺转角沙发组合"
                                        }
                                    ],
                                    "anchorType": 2,
                                    "anchorPosition": "{\"pitch\":-18.925338201859642,\"yaw\":-37.84995583763693}"
                                },
                                {
                                    "id": 56447,
                                    "articleId": 91915,
                                    "anchorName": "电视柜1",
                                    "skus": [
                                        {
                                            "articleId": 91915,
                                            "skuId": 12741064107,
                                            "skuImgUrl": "jfs/t4879/138/2389312324/643121/356b288e/58fdce28N74557820.jpg",
                                            "skuName": "俪莎公馆电视柜 欧式大理石电视柜法式客厅储物地柜家具 象牙白(象牙白木面) 2.0M",
                                            "anchorId": 56447,
                                            "cid1": 0,
                                            "cid2": 0,
                                            "cid3": 0,
                                            "cpsUrl": null,
                                            "skuDesc": "俪莎公馆 欧式大理石法式电视柜"
                                        }
                                    ],
                                    "anchorType": 2,
                                    "anchorPosition": "{\"pitch\":-15.295710020324659,\"yaw\":54.2553330252308}"
                                },
                                {
                                    "id": 56448,
                                    "articleId": 91915,
                                    "anchorName": "茶几",
                                    "skus": [
                                        {
                                            "articleId": 91915,
                                            "skuId": 12743192815,
                                            "skuImgUrl": "jfs/t5278/154/356320072/571806/28d31e20/58fdce1dN2e68296e.jpg",
                                            "skuName": "俪莎公馆茶几 欧式大理石茶几法式客厅储物茶桌家具 设计帮精选 1.2m象牙白(木面)",
                                            "anchorId": 56448,
                                            "cid1": 0,
                                            "cid2": 0,
                                            "cid3": 0,
                                            "cpsUrl": null,
                                            "skuDesc": "俪莎公馆 欧式大理石茶几"
                                        }
                                    ],
                                    "anchorType": 2,
                                    "anchorPosition": "{\"pitch\":-26.048641319989727,\"yaw\":1.0271021571431094}"
                                },
                                {
                                    "id": 56449,
                                    "articleId": 91915,
                                    "anchorName": "地毯",
                                    "skus": [
                                        {
                                            "articleId": 91915,
                                            "skuId": 10341682379,
                                            "skuImgUrl": "jfs/t2773/315/1028543589/385126/246ee435/5731a4bfNb81b9456.jpg",
                                            "skuName": "优立地毯 欧式立体雕花地毯 客厅地毯卧室门厅茶几地毯 欧华04 160CMx230CM",
                                            "anchorId": 56449,
                                            "cid1": 0,
                                            "cid2": 0,
                                            "cid3": 0,
                                            "cpsUrl": null,
                                            "skuDesc": "优立地毯 欧式立体雕花地毯"
                                        }
                                    ],
                                    "anchorType": 2,
                                    "anchorPosition": "{\"pitch\":-59.70429829052719,\"yaw\":0.8842310653518659}"
                                },
                                {
                                    "id": 56450,
                                    "articleId": 91915,
                                    "anchorName": "边柜",
                                    "skus": [
                                        {
                                            "articleId": 91915,
                                            "skuId": 10847598821,
                                            "skuImgUrl": "jfs/t3373/272/293920629/464061/3ca76db5/5805c320N32afca8e.jpg",
                                            "skuName": "UVANART UvanAccent新古典二斗交叉脚玄关柜 蓝色柜",
                                            "anchorId": 56450,
                                            "cid1": 0,
                                            "cid2": 0,
                                            "cid3": 0,
                                            "cpsUrl": null,
                                            "skuDesc": "UVANART UvanAccent新古典二斗交叉脚玄关柜 蓝色柜"
                                        }
                                    ],
                                    "anchorType": 2,
                                    "anchorPosition": "{\"pitch\":-11.104250327902697,\"yaw\":87.65107721283721}"
                                },
                                {
                                    "id": 56451,
                                    "articleId": 91915,
                                    "anchorName": "台灯",
                                    "skus": [
                                        {
                                            "articleId": 91915,
                                            "skuId": 1204543684,
                                            "skuImgUrl": "jfs/t199/135/1583708418/368183/169f3182/53b27661Ne5b39320.jpg",
                                            "skuName": "奇居良品 北欧简约格迪尔绿色格子布艺灯罩卧室床头装饰台灯 台灯黄色灯体(高款)",
                                            "anchorId": 56451,
                                            "cid1": 0,
                                            "cid2": 0,
                                            "cid3": 0,
                                            "cpsUrl": null,
                                            "skuDesc": "奇居良品 北欧简约格迪尔绿色格子布艺灯罩台灯"
                                        }
                                    ],
                                    "anchorType": 2,
                                    "anchorPosition": "{\"pitch\":7.293310994124372,\"yaw\":-110.51821450518094}"
                                }
                            ],
                            "picList": [
                                "jfs/t6076/104/1222233774/312299/e1861a3c/5930f744N01004045.jpg",
                                "jfs/t5572/107/2428490829/305712/744307a/5930f739N83c020c5.jpg",
                                "jfs/t5755/327/2452735251/245026/ce2e0e59/5930f725N30d8d69d.jpg",
                                "jfs/t5965/272/1294064597/265464/52546578/5930f726N45254058.jpg"
                            ],
                            "commonAnchors": "[{\"id\":56440,\"articleId\":91915,\"anchorName\":\"台灯\",\"skus\":[{\"articleId\":91915,\"skuId\":1204543684,\"skuImgUrl\":\"jfs/t199/135/1583708418/368183/169f3182/53b27661Ne5b39320.jpg\",\"skuName\":\"奇居良品 北欧简约格迪尔绿色格子布艺灯罩卧室床头装饰台灯 台灯黄色灯体(高款)\",\"anchorId\":56440,\"cid1\":0,\"cid2\":0,\"cid3\":0,\"cpsUrl\":null,\"skuDesc\":null}],\"anchorType\":1,\"anchorPosition\":null},{\"id\":56441,\"articleId\":91915,\"anchorName\":\"地毯\",\"skus\":[{\"articleId\":91915,\"skuId\":10341682379,\"skuImgUrl\":\"jfs/t2773/315/1028543589/385126/246ee435/5731a4bfNb81b9456.jpg\",\"skuName\":\"优立地毯 欧式立体雕花地毯 客厅地毯卧室门厅茶几地毯 欧华04 160CMx230CM\",\"anchorId\":56441,\"cid1\":0,\"cid2\":0,\"cid3\":0,\"cpsUrl\":null,\"skuDesc\":null}],\"anchorType\":1,\"anchorPosition\":null},{\"id\":56442,\"articleId\":91915,\"anchorName\":\"边柜\",\"skus\":[{\"articleId\":91915,\"skuId\":10847598821,\"skuImgUrl\":\"jfs/t3373/272/293920629/464061/3ca76db5/5805c320N32afca8e.jpg\",\"skuName\":\"UVANART UvanAccent新古典二斗交叉脚玄关柜 蓝色柜\",\"anchorId\":56442,\"cid1\":0,\"cid2\":0,\"cid3\":0,\"cpsUrl\":null,\"skuDesc\":null}],\"anchorType\":1,\"anchorPosition\":null},{\"id\":56443,\"articleId\":91915,\"anchorName\":\"茶几\",\"skus\":[{\"articleId\":91915,\"skuId\":12743192815,\"skuImgUrl\":\"jfs/t5278/154/356320072/571806/28d31e20/58fdce1dN2e68296e.jpg\",\"skuName\":\"俪莎公馆茶几 欧式大理石茶几法式客厅储物茶桌家具 设计帮精选 1.2m象牙白(木面)\",\"anchorId\":56443,\"cid1\":0,\"cid2\":0,\"cid3\":0,\"cpsUrl\":null,\"skuDesc\":null}],\"anchorType\":1,\"anchorPosition\":null},{\"id\":56444,\"articleId\":91915,\"anchorName\":\"电视柜1\",\"skus\":[{\"articleId\":91915,\"skuId\":12741064107,\"skuImgUrl\":\"jfs/t4879/138/2389312324/643121/356b288e/58fdce28N74557820.jpg\",\"skuName\":\"俪莎公馆电视柜 欧式大理石电视柜法式客厅储物地柜家具 象牙白(象牙白木面) 2.0M\",\"anchorId\":56444,\"cid1\":0,\"cid2\":0,\"cid3\":0,\"cpsUrl\":null,\"skuDesc\":null}],\"anchorType\":1,\"anchorPosition\":null},{\"id\":56445,\"articleId\":91915,\"anchorName\":\"沙发\",\"skus\":[{\"articleId\":91915,\"skuId\":12740142755,\"skuImgUrl\":\"jfs/t5242/235/2366171597/436202/de540c12/591a6f42N66411d3a.jpg\",\"skuName\":\"俪莎公馆 沙发 欧式沙发布艺沙发实木沙发可拆洗转角客厅家具沙发组合 设计帮精选 沙发+1.8M电视柜+1.2M茶几\",\"anchorId\":56445,\"cid1\":0,\"cid2\":0,\"cid3\":0,\"cpsUrl\":null,\"skuDesc\":null}],\"anchorType\":1,\"anchorPosition\":null}]",
                            "threeDAnchors": "[{\"id\":56446,\"articleId\":91915,\"anchorName\":\"沙发\",\"skus\":[{\"articleId\":91915,\"skuId\":12740142755,\"skuImgUrl\":\"jfs/t5242/235/2366171597/436202/de540c12/591a6f42N66411d3a.jpg\",\"skuName\":\"俪莎公馆 沙发 欧式沙发布艺沙发实木沙发可拆洗转角客厅家具沙发组合 设计帮精选 沙发+1.8M电视柜+1.2M茶几\",\"anchorId\":56446,\"cid1\":0,\"cid2\":0,\"cid3\":0,\"cpsUrl\":null,\"skuDesc\":\"俪莎公馆 欧式布艺转角沙发组合\"}],\"anchorType\":2,\"anchorPosition\":\"{\\\"pitch\\\":-18.925338201859642,\\\"yaw\\\":-37.84995583763693}\"},{\"id\":56447,\"articleId\":91915,\"anchorName\":\"电视柜1\",\"skus\":[{\"articleId\":91915,\"skuId\":12741064107,\"skuImgUrl\":\"jfs/t4879/138/2389312324/643121/356b288e/58fdce28N74557820.jpg\",\"skuName\":\"俪莎公馆电视柜 欧式大理石电视柜法式客厅储物地柜家具 象牙白(象牙白木面) 2.0M\",\"anchorId\":56447,\"cid1\":0,\"cid2\":0,\"cid3\":0,\"cpsUrl\":null,\"skuDesc\":\"俪莎公馆 欧式大理石法式电视柜\"}],\"anchorType\":2,\"anchorPosition\":\"{\\\"pitch\\\":-15.295710020324659,\\\"yaw\\\":54.2553330252308}\"},{\"id\":56448,\"articleId\":91915,\"anchorName\":\"茶几\",\"skus\":[{\"articleId\":91915,\"skuId\":12743192815,\"skuImgUrl\":\"jfs/t5278/154/356320072/571806/28d31e20/58fdce1dN2e68296e.jpg\",\"skuName\":\"俪莎公馆茶几 欧式大理石茶几法式客厅储物茶桌家具 设计帮精选 1.2m象牙白(木面)\",\"anchorId\":56448,\"cid1\":0,\"cid2\":0,\"cid3\":0,\"cpsUrl\":null,\"skuDesc\":\"俪莎公馆 欧式大理石茶几\"}],\"anchorType\":2,\"anchorPosition\":\"{\\\"pitch\\\":-26.048641319989727,\\\"yaw\\\":1.0271021571431094}\"},{\"id\":56449,\"articleId\":91915,\"anchorName\":\"地毯\",\"skus\":[{\"articleId\":91915,\"skuId\":10341682379,\"skuImgUrl\":\"jfs/t2773/315/1028543589/385126/246ee435/5731a4bfNb81b9456.jpg\",\"skuName\":\"优立地毯 欧式立体雕花地毯 客厅地毯卧室门厅茶几地毯 欧华04 160CMx230CM\",\"anchorId\":56449,\"cid1\":0,\"cid2\":0,\"cid3\":0,\"cpsUrl\":null,\"skuDesc\":\"优立地毯 欧式立体雕花地毯\"}],\"anchorType\":2,\"anchorPosition\":\"{\\\"pitch\\\":-59.70429829052719,\\\"yaw\\\":0.8842310653518659}\"},{\"id\":56450,\"articleId\":91915,\"anchorName\":\"边柜\",\"skus\":[{\"articleId\":91915,\"skuId\":10847598821,\"skuImgUrl\":\"jfs/t3373/272/293920629/464061/3ca76db5/5805c320N32afca8e.jpg\",\"skuName\":\"UVANART UvanAccent新古典二斗交叉脚玄关柜 蓝色柜\",\"anchorId\":56450,\"cid1\":0,\"cid2\":0,\"cid3\":0,\"cpsUrl\":null,\"skuDesc\":\"UVANART UvanAccent新古典二斗交叉脚玄关柜 蓝色柜\"}],\"anchorType\":2,\"anchorPosition\":\"{\\\"pitch\\\":-11.104250327902697,\\\"yaw\\\":87.65107721283721}\"},{\"id\":56451,\"articleId\":91915,\"anchorName\":\"台灯\",\"skus\":[{\"articleId\":91915,\"skuId\":1204543684,\"skuImgUrl\":\"jfs/t199/135/1583708418/368183/169f3182/53b27661Ne5b39320.jpg\",\"skuName\":\"奇居良品 北欧简约格迪尔绿色格子布艺灯罩卧室床头装饰台灯 台灯黄色灯体(高款)\",\"anchorId\":56451,\"cid1\":0,\"cid2\":0,\"cid3\":0,\"cpsUrl\":null,\"skuDesc\":\"奇居良品 北欧简约格迪尔绿色格子布艺灯罩台灯\"}],\"anchorType\":2,\"anchorPosition\":\"{\\\"pitch\\\":7.293310994124372,\\\"yaw\\\":-110.51821450518094}\"}]"
                        },
                        {
                            "id": 91916,
                            "title": "卧室",
                            "viceTitle": null,
                            "titlePicUrl": "jfs/t5575/172/2435977477/266026/58fa992d/5930f87bNb47e71e2.jpg",
                            "content": "<img src=\"//img11.360buyimg.com/faner/s640x0_jfs/t5575/172/2435977477/266026/58fa992d/5930f87bNb47e71e2.jpg\" skuprice=\"京东价 ￥1680\">            <div class=\"tags\">                        <div class=\"item\" anchor=\"床\" style=\"left:52%;top:61%\"><b></b><span>床</span></div><div class=\"item\" anchor=\"地毯\" style=\"left:35%;top:84%\"><b></b><span>地毯</span></div><div class=\"item item-follow-left\" anchor=\"电视柜2\" style=\"left:85%;top:65%\"><b></b><span>电视柜2</span></div><div class=\"item\" anchor=\"梳妆台\" style=\"left:69%;top:53%\"><b></b><span>梳妆台</span></div><div class=\"item item-follow-left item-follow-bottom\" anchor=\"衣柜\" style=\"left:91%;top:90%\"><b></b><span>衣柜</span></div></div>",
                            "count": 0,
                            "summary": null,
                            "positionId": 0,
                            "newFlag": 0,
                            "writerInfo": null,
                            "attentionFlag": 0,
                            "praiseFlag": 0,
                            "praiseCount": 0,
                            "articleType": 10,
                            "auditTime": "2017-06-02 13:46:40",
                            "praiseChannel": 0,
                            "favFlag": 0,
                            "labelIds": ",",
                            "mContent": null,
                            "threeDimensionalImgInfo": null,
                            "support3d": 0,
                            "creator": "shjshi9",
                            "modified": null,
                            "browsecount": null,
                            "extendJson": null,
                            "articleAnchorVos2D": [
                                {
                                    "id": 56452,
                                    "articleId": 91916,
                                    "anchorName": "衣柜",
                                    "skus": [
                                        {
                                            "articleId": 91916,
                                            "skuId": 12652909225,
                                            "skuImgUrl": "jfs/t5350/83/462672254/248922/4293b5b6/58ffffbdNd120edec.jpg",
                                            "skuName": "俪莎公馆衣柜 韩式田园衣柜儿童房实木衣柜卧室衣橱家具组合 二门衣柜",
                                            "anchorId": 56452,
                                            "cid1": 0,
                                            "cid2": 0,
                                            "cid3": 0,
                                            "cpsUrl": null,
                                            "skuDesc": null
                                        }
                                    ],
                                    "anchorType": 1,
                                    "anchorPosition": null
                                },
                                {
                                    "id": 56453,
                                    "articleId": 91916,
                                    "anchorName": "梳妆台",
                                    "skus": [
                                        {
                                            "articleId": 91916,
                                            "skuId": 12662331976,
                                            "skuImgUrl": "jfs/t4972/253/2427471394/272872/272e4f78/58ffff47N3c7c66a2.jpg",
                                            "skuName": "俪莎公馆妆台 欧式梳妆台卧室化妆桌小户型妆台妆凳家具 510妆台+妆凳",
                                            "anchorId": 56453,
                                            "cid1": 0,
                                            "cid2": 0,
                                            "cid3": 0,
                                            "cpsUrl": null,
                                            "skuDesc": null
                                        }
                                    ],
                                    "anchorType": 1,
                                    "anchorPosition": null
                                },
                                {
                                    "id": 56454,
                                    "articleId": 91916,
                                    "anchorName": "电视柜2",
                                    "skus": [
                                        {
                                            "articleId": 91916,
                                            "skuId": 12662331963,
                                            "skuImgUrl": "jfs/t3421/187/1205140219/145016/fb0d2398/581fc5d7Ncc55b407.jpg",
                                            "skuName": "俪莎公馆电视柜 欧式电视柜法式储物地柜客厅家具组合 1.8M电视柜",
                                            "anchorId": 56454,
                                            "cid1": 0,
                                            "cid2": 0,
                                            "cid3": 0,
                                            "cpsUrl": null,
                                            "skuDesc": null
                                        }
                                    ],
                                    "anchorType": 1,
                                    "anchorPosition": null
                                },
                                {
                                    "id": 56455,
                                    "articleId": 91916,
                                    "anchorName": "地毯",
                                    "skus": [
                                        {
                                            "articleId": 91916,
                                            "skuId": 1255486848,
                                            "skuImgUrl": "jfs/t2743/365/3467129861/266020/a6858451/578f3f80Nebadaa05.jpg",
                                            "skuName": "优立地毯 土耳其进口波斯地毯 欧式现代地毯客厅地毯卧室茶几地毯 TH-221 1600MMx2300MM",
                                            "anchorId": 56455,
                                            "cid1": 0,
                                            "cid2": 0,
                                            "cid3": 0,
                                            "cpsUrl": null,
                                            "skuDesc": null
                                        }
                                    ],
                                    "anchorType": 1,
                                    "anchorPosition": null
                                },
                                {
                                    "id": 56456,
                                    "articleId": 91916,
                                    "anchorName": "床",
                                    "skus": [
                                        {
                                            "articleId": 91916,
                                            "skuId": 12662331965,
                                            "skuImgUrl": "jfs/t3424/271/2293108492/313450/b2274fe3/5850a096N9f1fc76f.jpg",
                                            "skuName": "俪莎公馆 床 欧式床法式双人床 婚床公主床高箱床卧室储物家具 套餐二    高箱床+15厚床垫+床头柜1个 1800*2000",
                                            "anchorId": 56456,
                                            "cid1": 0,
                                            "cid2": 0,
                                            "cid3": 0,
                                            "cpsUrl": null,
                                            "skuDesc": null
                                        }
                                    ],
                                    "anchorType": 1,
                                    "anchorPosition": null
                                }
                            ],
                            "articleAnchorVos3D": [],
                            "picList": [
                                "jfs/t5701/321/2414759170/247309/553ad7d0/5930f92fNd60139a0.jpg",
                                "jfs/t5734/145/2486212277/278604/55f960a3/5930f926N36211ba6.jpg",
                                "jfs/t5611/232/2461767475/284824/f881216c/5930f91dN116d93ea.jpg",
                                "jfs/t5692/270/2440204710/259251/f11ca0a9/5930f912N0ad3e50c.jpg"
                            ],
                            "commonAnchors": "[{\"id\":56452,\"articleId\":91916,\"anchorName\":\"衣柜\",\"skus\":[{\"articleId\":91916,\"skuId\":12652909225,\"skuImgUrl\":\"jfs/t5350/83/462672254/248922/4293b5b6/58ffffbdNd120edec.jpg\",\"skuName\":\"俪莎公馆衣柜 韩式田园衣柜儿童房实木衣柜卧室衣橱家具组合 二门衣柜\",\"anchorId\":56452,\"cid1\":0,\"cid2\":0,\"cid3\":0,\"cpsUrl\":null,\"skuDesc\":null}],\"anchorType\":1,\"anchorPosition\":null},{\"id\":56453,\"articleId\":91916,\"anchorName\":\"梳妆台\",\"skus\":[{\"articleId\":91916,\"skuId\":12662331976,\"skuImgUrl\":\"jfs/t4972/253/2427471394/272872/272e4f78/58ffff47N3c7c66a2.jpg\",\"skuName\":\"俪莎公馆妆台 欧式梳妆台卧室化妆桌小户型妆台妆凳家具 510妆台+妆凳\",\"anchorId\":56453,\"cid1\":0,\"cid2\":0,\"cid3\":0,\"cpsUrl\":null,\"skuDesc\":null}],\"anchorType\":1,\"anchorPosition\":null},{\"id\":56454,\"articleId\":91916,\"anchorName\":\"电视柜2\",\"skus\":[{\"articleId\":91916,\"skuId\":12662331963,\"skuImgUrl\":\"jfs/t3421/187/1205140219/145016/fb0d2398/581fc5d7Ncc55b407.jpg\",\"skuName\":\"俪莎公馆电视柜 欧式电视柜法式储物地柜客厅家具组合 1.8M电视柜\",\"anchorId\":56454,\"cid1\":0,\"cid2\":0,\"cid3\":0,\"cpsUrl\":null,\"skuDesc\":null}],\"anchorType\":1,\"anchorPosition\":null},{\"id\":56455,\"articleId\":91916,\"anchorName\":\"地毯\",\"skus\":[{\"articleId\":91916,\"skuId\":1255486848,\"skuImgUrl\":\"jfs/t2743/365/3467129861/266020/a6858451/578f3f80Nebadaa05.jpg\",\"skuName\":\"优立地毯 土耳其进口波斯地毯 欧式现代地毯客厅地毯卧室茶几地毯 TH-221 1600MMx2300MM\",\"anchorId\":56455,\"cid1\":0,\"cid2\":0,\"cid3\":0,\"cpsUrl\":null,\"skuDesc\":null}],\"anchorType\":1,\"anchorPosition\":null},{\"id\":56456,\"articleId\":91916,\"anchorName\":\"床\",\"skus\":[{\"articleId\":91916,\"skuId\":12662331965,\"skuImgUrl\":\"jfs/t3424/271/2293108492/313450/b2274fe3/5850a096N9f1fc76f.jpg\",\"skuName\":\"俪莎公馆 床 欧式床法式双人床 婚床公主床高箱床卧室储物家具 套餐二    高箱床+15厚床垫+床头柜1个 1800*2000\",\"anchorId\":56456,\"cid1\":0,\"cid2\":0,\"cid3\":0,\"cpsUrl\":null,\"skuDesc\":null}],\"anchorType\":1,\"anchorPosition\":null}]",
                            "threeDAnchors": "[]"
                        },
                        {
                            "id": 91917,
                            "title": "餐厅",
                            "viceTitle": null,
                            "titlePicUrl": "jfs/t5866/55/2466863546/297729/91edcc52/5930f966N7d04aa0a.jpg",
                            "content": "<img src=\"//img11.360buyimg.com/faner/s640x0_jfs/t5866/55/2466863546/297729/91edcc52/5930f966N7d04aa0a.jpg\" skuprice=\"京东价 ￥1680\">            <div class=\"tags\">                        <div class=\"item\" anchor=\"餐桌椅\" style=\"left:56.00000000000001%;top:56.00000000000001%\"><b></b><span>餐桌椅</span></div><div class=\"item item-follow-left\" anchor=\"餐边柜\" style=\"left:81%;top:41%\"><b></b><span>餐边柜</span></div><div class=\"item\" anchor=\"餐椅\" style=\"left:44%;top:70%\"><b></b><span>餐椅</span></div></div>",
                            "count": 0,
                            "summary": null,
                            "positionId": 0,
                            "newFlag": 0,
                            "writerInfo": null,
                            "attentionFlag": 0,
                            "praiseFlag": 0,
                            "praiseCount": 0,
                            "articleType": 10,
                            "auditTime": "2017-06-02 13:46:40",
                            "praiseChannel": 0,
                            "favFlag": 0,
                            "labelIds": ",",
                            "mContent": null,
                            "threeDimensionalImgInfo": null,
                            "support3d": 0,
                            "creator": "shjshi9",
                            "modified": null,
                            "browsecount": null,
                            "extendJson": null,
                            "articleAnchorVos2D": [
                                {
                                    "id": 56457,
                                    "articleId": 91917,
                                    "anchorName": "餐椅",
                                    "skus": [
                                        {
                                            "articleId": 91917,
                                            "skuId": 12840517769,
                                            "skuImgUrl": "jfs/t5611/187/1498077075/768137/8c7fa627/59269676N70f43e16.jpg",
                                            "skuName": "俪莎公馆餐桌 欧式实木餐桌法式大理石餐桌椅组合餐厅家具 配件 设计帮精选 皮餐椅无扶手( 带扶手+100)",
                                            "anchorId": 56457,
                                            "cid1": 0,
                                            "cid2": 0,
                                            "cid3": 0,
                                            "cpsUrl": null,
                                            "skuDesc": null
                                        }
                                    ],
                                    "anchorType": 1,
                                    "anchorPosition": null
                                },
                                {
                                    "id": 56458,
                                    "articleId": 91917,
                                    "anchorName": "餐边柜",
                                    "skus": [
                                        {
                                            "articleId": 91917,
                                            "skuId": 1253568928,
                                            "skuImgUrl": "jfs/t265/117/386742746/233283/3d21a14d/53eadb41N725435df.jpg",
                                            "skuName": "拉菲伯爵欧式餐边柜 法式碗柜 餐厅柜子酒柜餐厅柜 储物柜茶水柜FX010",
                                            "anchorId": 56458,
                                            "cid1": 0,
                                            "cid2": 0,
                                            "cid3": 0,
                                            "cpsUrl": null,
                                            "skuDesc": null
                                        }
                                    ],
                                    "anchorType": 1,
                                    "anchorPosition": null
                                },
                                {
                                    "id": 56459,
                                    "articleId": 91917,
                                    "anchorName": "餐桌椅",
                                    "skus": [
                                        {
                                            "articleId": 91917,
                                            "skuId": 12840517759,
                                            "skuImgUrl": "jfs/t5611/187/1498077075/768137/8c7fa627/59269676N70f43e16.jpg",
                                            "skuName": "俪莎公馆餐桌 欧式实木餐桌法式大理石餐桌椅组合餐厅家具 配件 设计帮精选 1.5M象牙白木面 一桌六椅",
                                            "anchorId": 56459,
                                            "cid1": 0,
                                            "cid2": 0,
                                            "cid3": 0,
                                            "cpsUrl": null,
                                            "skuDesc": null
                                        }
                                    ],
                                    "anchorType": 1,
                                    "anchorPosition": null
                                }
                            ],
                            "articleAnchorVos3D": [],
                            "picList": [],
                            "commonAnchors": "[{\"id\":56457,\"articleId\":91917,\"anchorName\":\"餐椅\",\"skus\":[{\"articleId\":91917,\"skuId\":12840517769,\"skuImgUrl\":\"jfs/t5611/187/1498077075/768137/8c7fa627/59269676N70f43e16.jpg\",\"skuName\":\"俪莎公馆餐桌 欧式实木餐桌法式大理石餐桌椅组合餐厅家具 配件 设计帮精选 皮餐椅无扶手( 带扶手+100)\",\"anchorId\":56457,\"cid1\":0,\"cid2\":0,\"cid3\":0,\"cpsUrl\":null,\"skuDesc\":null}],\"anchorType\":1,\"anchorPosition\":null},{\"id\":56458,\"articleId\":91917,\"anchorName\":\"餐边柜\",\"skus\":[{\"articleId\":91917,\"skuId\":1253568928,\"skuImgUrl\":\"jfs/t265/117/386742746/233283/3d21a14d/53eadb41N725435df.jpg\",\"skuName\":\"拉菲伯爵欧式餐边柜 法式碗柜 餐厅柜子酒柜餐厅柜 储物柜茶水柜FX010\",\"anchorId\":56458,\"cid1\":0,\"cid2\":0,\"cid3\":0,\"cpsUrl\":null,\"skuDesc\":null}],\"anchorType\":1,\"anchorPosition\":null},{\"id\":56459,\"articleId\":91917,\"anchorName\":\"餐桌椅\",\"skus\":[{\"articleId\":91917,\"skuId\":12840517759,\"skuImgUrl\":\"jfs/t5611/187/1498077075/768137/8c7fa627/59269676N70f43e16.jpg\",\"skuName\":\"俪莎公馆餐桌 欧式实木餐桌法式大理石餐桌椅组合餐厅家具 配件 设计帮精选 1.5M象牙白木面 一桌六椅\",\"anchorId\":56459,\"cid1\":0,\"cid2\":0,\"cid3\":0,\"cpsUrl\":null,\"skuDesc\":null}],\"anchorType\":1,\"anchorPosition\":null}]",
                            "threeDAnchors": "[]"
                        },
                        {
                            "id": 91918,
                            "title": "儿童房",
                            "viceTitle": null,
                            "titlePicUrl": "jfs/t5674/200/2432155028/171880/148804d8/5930faa0Nc566bb5b.jpg",
                            "content": "<img src=\"//img11.360buyimg.com/faner/s640x0_jfs/t5674/200/2432155028/171880/148804d8/5930faa0Nc566bb5b.jpg\" skuprice=\"京东价 ￥1680\">            <div class=\"tags\">                        <div class=\"item\" anchor=\"儿童床\" style=\"left:41%;top:44%\"><b></b><span>儿童床</span></div><div class=\"item\" anchor=\"儿童衣柜\" style=\"left:16%;top:34%\"><b></b><span>儿童衣柜</span></div><div class=\"item\" anchor=\"书桌\" style=\"left:4%;top:63%\"><b></b><span>书桌</span></div></div>",
                            "count": 0,
                            "summary": null,
                            "positionId": 0,
                            "newFlag": 0,
                            "writerInfo": null,
                            "attentionFlag": 0,
                            "praiseFlag": 0,
                            "praiseCount": 0,
                            "articleType": 10,
                            "auditTime": "2017-06-02 13:46:40",
                            "praiseChannel": 0,
                            "favFlag": 0,
                            "labelIds": ",",
                            "mContent": null,
                            "threeDimensionalImgInfo": null,
                            "support3d": 0,
                            "creator": "shjshi9",
                            "modified": null,
                            "browsecount": null,
                            "extendJson": null,
                            "articleAnchorVos2D": [
                                {
                                    "id": 56460,
                                    "articleId": 91918,
                                    "anchorName": "书桌",
                                    "skus": [
                                        {
                                            "articleId": 91918,
                                            "skuId": 12662331977,
                                            "skuImgUrl": "jfs/t4564/243/3599521198/230622/4677cccd/590000a4Nd809e665.jpg",
                                            "skuName": "俪莎公馆书桌 儿童转角直角欧式书桌韩式书架电脑桌家具 设计帮精选 1.2m转角书桌-AB可选",
                                            "anchorId": 56460,
                                            "cid1": 0,
                                            "cid2": 0,
                                            "cid3": 0,
                                            "cpsUrl": null,
                                            "skuDesc": null
                                        }
                                    ],
                                    "anchorType": 1,
                                    "anchorPosition": null
                                },
                                {
                                    "id": 56461,
                                    "articleId": 91918,
                                    "anchorName": "儿童衣柜",
                                    "skus": [
                                        {
                                            "articleId": 91918,
                                            "skuId": 12652909227,
                                            "skuImgUrl": "jfs/t3787/169/2293913339/189969/8dd0e019/5850a07bNce471750.jpg",
                                            "skuName": "俪莎公馆衣柜 韩式田园衣柜儿童房实木衣柜卧室衣橱家具组合 三门衣柜",
                                            "anchorId": 56461,
                                            "cid1": 0,
                                            "cid2": 0,
                                            "cid3": 0,
                                            "cpsUrl": null,
                                            "skuDesc": null
                                        }
                                    ],
                                    "anchorType": 1,
                                    "anchorPosition": null
                                },
                                {
                                    "id": 56462,
                                    "articleId": 91918,
                                    "anchorName": "儿童床",
                                    "skus": [
                                        {
                                            "articleId": 91918,
                                            "skuId": 1617163924,
                                            "skuImgUrl": "jfs/t3187/115/4700983188/291552/89ad80d7/5850a076N21ab04cf.jpg",
                                            "skuName": "俪莎公馆床 儿童床双层床上下床韩式高低子母床卧室家具 双层床+梯柜+拖床-1.2M",
                                            "anchorId": 56462,
                                            "cid1": 0,
                                            "cid2": 0,
                                            "cid3": 0,
                                            "cpsUrl": null,
                                            "skuDesc": null
                                        }
                                    ],
                                    "anchorType": 1,
                                    "anchorPosition": null
                                }
                            ],
                            "articleAnchorVos3D": [],
                            "picList": [],
                            "commonAnchors": "[{\"id\":56460,\"articleId\":91918,\"anchorName\":\"书桌\",\"skus\":[{\"articleId\":91918,\"skuId\":12662331977,\"skuImgUrl\":\"jfs/t4564/243/3599521198/230622/4677cccd/590000a4Nd809e665.jpg\",\"skuName\":\"俪莎公馆书桌 儿童转角直角欧式书桌韩式书架电脑桌家具 设计帮精选 1.2m转角书桌-AB可选\",\"anchorId\":56460,\"cid1\":0,\"cid2\":0,\"cid3\":0,\"cpsUrl\":null,\"skuDesc\":null}],\"anchorType\":1,\"anchorPosition\":null},{\"id\":56461,\"articleId\":91918,\"anchorName\":\"儿童衣柜\",\"skus\":[{\"articleId\":91918,\"skuId\":12652909227,\"skuImgUrl\":\"jfs/t3787/169/2293913339/189969/8dd0e019/5850a07bNce471750.jpg\",\"skuName\":\"俪莎公馆衣柜 韩式田园衣柜儿童房实木衣柜卧室衣橱家具组合 三门衣柜\",\"anchorId\":56461,\"cid1\":0,\"cid2\":0,\"cid3\":0,\"cpsUrl\":null,\"skuDesc\":null}],\"anchorType\":1,\"anchorPosition\":null},{\"id\":56462,\"articleId\":91918,\"anchorName\":\"儿童床\",\"skus\":[{\"articleId\":91918,\"skuId\":1617163924,\"skuImgUrl\":\"jfs/t3187/115/4700983188/291552/89ad80d7/5850a076N21ab04cf.jpg\",\"skuName\":\"俪莎公馆床 儿童床双层床上下床韩式高低子母床卧室家具 双层床+梯柜+拖床-1.2M\",\"anchorId\":56462,\"cid1\":0,\"cid2\":0,\"cid3\":0,\"cpsUrl\":null,\"skuDesc\":null}],\"anchorType\":1,\"anchorPosition\":null}]",
                            "threeDAnchors": "[]"
                        }
                    ],
                    "rooms": [
                        91915,
                        91916,
                        91917,
                        91918
                    ],
                    "houses": {
                        "name": "荣宝御园",
                        "provinceId": 13,
                        "provinceName": "山东",
                        "cityId": 1000,
                        "cityName": "济南市",
                        "countyId": 40490,
                        "countyName": "槐荫区",
                        "townId": null,
                        "townName": null,
                        "address": "齐州路",
                        "houseArea": "120.0",
                        "houseImg": "jfs/t5737/153/2473952089/638408/942e0e8a/5930fb82N626c1e36.jpg",
                        "room": 2,
                        "hall": 1,
                        "cook": 0,
                        "bathroom": 2
                    },
                    "support3d": 1
                }
            }
        })
    }

    componentDidMount() {
        console.log("第一次页面渲染后调用");

    }

    componentDidUpdate(prevProps, prevState) {
        console.log('在组件完成更新后立即调用')
    }

    componentWillUpdate(prevProps, prevState) {
        console.log('在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用')
    }

    render() {
        return (
            <div className="match-detail-page">
                <Baseinfo datainfo={this.state.data}/>
                <div className="pop-cart-mask"></div>
                <div className="pop-cart-box"></div>
            </div>
        )
    }
}


class Baseinfo extends React.Component {

    componentWillMount() {
        console.log("页面渲染前调用");

    }

    componentDidMount() {
        console.log("第一次页面渲染后调用");

    }

    componentDidUpdate(prevProps, prevState) {
        console.log('在组件完成更新后立即调用')
    }

    componentWillUpdate(prevProps, prevState) {
        console.log('在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用')
    }

    render() {
        var data = this.props.datainfo;
        return (
            <div>
                <div className="top-banner-box">
                    <div className="banner-slider-box swiper-container">
                        <div className="banner-slider-bg"></div>
                        <ul className="swiper-wrapper">
                            {
                                data.baseInfo.articleVos.map(function (value, i) {
                                    return <li className="swiper-slide" key={i}>
                                        <img src={value.titlePicUrl}/>
                                        <span className="title" data-roomId={value.id}>{value.title}</span>
                                    </li>
                                })
                            }
                        </ul>
                        <div className="swiper-pagination banner-swiper-pagination"></div>
                        <a href={"jing-room.html?articleId=" + data.baseInfo.id + "&roomId=" + data.baseInfo.articleVos[0].id}
                           className="goto-room">进入<span></span><i className="detail-icons"></i></a>
                    </div>
                </div>

                <div className="article-box">
                    <p className="article-title">
                        <span>{data.baseInfo.title}</span>
                        <em className="houseImage" data-url={data.baseInfo.houses.houseImg}><i
                            className="detail-icons"></i>户型图</em></p>
                    <p className="house-type"><span
                        className="border-r">{data.baseInfo.houses.cityName}{data.baseInfo.houses.name}</span>
                        <span className="border-r">
                <em>{data.baseInfo.houses.room}室</em><em>{data.baseInfo.houses.hall}厅</em><em>{data.baseInfo.houses.bathroom}卫</em>
              </span>
                        <span>{data.baseInfo.houses.houseArea}m²</span>
                    </p>
                    <p className="article-des">{data.baseInfo.summary}</p>

                    <p className="designer-detail border-t border-b">
                        <img src={data.baseInfo.writerInfo.headPicUrl}/>
                        <em className="user-title">{ data.baseInfo.writerInfo.roleId == 1 ? '达人' : '设计师'}</em>
                        <em className="user-name">{data.baseInfo.writerInfo.nickName}</em>
                        <span className={ data.attentFlag ? 'follow on' : 'follow'}
                              data-writerId={data.baseInfo.writerInfo.id}><i
                            className="detail-icons"></i><em>{data.attentFlag ? '已关注' : '关注TA'}</em></span>
                        <a className="consult" href="//dd1-m.jd.com/chat/index.action?venderId=147171&entry=m_shop"><i
                            className="detail-icons"></i>免费咨询</a>
                    </p>
                    <div className="article-detail" dangerouslySetInnerHTML={{__html: data.baseInfo.details}}></div>
                    <p className="show-more-detail"><span><i className="detail-icons"></i>点击展开更多图文详情</span></p>
                </div>
            </div>
        )

    }
}

//导出组件
export default Index;

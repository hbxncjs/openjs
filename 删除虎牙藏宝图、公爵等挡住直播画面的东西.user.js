// ==UserScript==
// @name         删除虎牙藏宝图、公爵等挡住直播画面的东西
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  删除虎牙藏宝图、公爵等挡住直播画面的东西
// @author       haha
// @match        *://www.huya.com/*
// @grant        none
// ==/UserScript==
function FindText(guanjianzi, model){
    if(!guanjianzi){throw "你要找什么都不写？"}
    model = model || false;
    var result = [];

    function search(nodes){
        if(!nodes){return}

        //当全字匹配时
        if(!model){
            for(var i=0; i<nodes.length; i++){
                var nodeText = nodes[i].innerText;
                var nodeValue = nodes[i].value;
                if( !nodeText && !nodeValue ){continue}
                if(nodeText){
                    if( nodeText==guanjianzi ){
                        if(nodes[i].tagName=="A"){nodes[i].target = "_top";}
                        result.push(nodes[i]);
                    }
                }
                if(nodeValue){
                    if( nodeValue==guanjianzi ){ result.push(nodes[i]) }
                }
            }
        }

        //当搜索关键字时
        else{
            for(var i=0; i<nodes.length; i++){
                var nodeText = nodes[i].innerText;
                var nodeValue = nodes[i].value;
                if( !nodeText && !nodeValue ){continue}
                if(nodeText){
                    if( nodeText.match(guanjianzi) ){
                        if(nodes[i].tagName=="A"){nodes[i].target = "_top";}
                        result.push(nodes[i]);
                    }
                }
                if(nodeValue){
                    if( nodeValue.match(guanjianzi) ){ result.push(nodes[i]) }
                }
            }
        }
    }

    if(!model){
        search(document.getElementsByTagName("a"));
        search(document.getElementsByTagName("p"));
        search(document.getElementsByTagName("span"));
        search(document.getElementsByTagName("h1"));
        search(document.getElementsByTagName("h2"));
        search(document.getElementsByTagName("h3"));
        search(document.getElementsByTagName("h4"));
        search(document.getElementsByTagName("h5"));
        search(document.getElementsByTagName("h6"));
        search(document.getElementsByTagName("input"));
    }
    else{
        search(document.getElementsByTagName("a"), true);
        search(document.getElementsByTagName("p"), true);
        search(document.getElementsByTagName("span"), true);
        search(document.getElementsByTagName("h1"), true);
        search(document.getElementsByTagName("h2"), true);
        search(document.getElementsByTagName("h3"), true);
        search(document.getElementsByTagName("h4"), true);
        search(document.getElementsByTagName("h5"), true);
        search(document.getElementsByTagName("h6"), true);
        search(document.getElementsByTagName("input"), true);
    }

    return result
}

function HuyaClear(){
    try{FindText("藏宝图",true)[0].parentNode.remove()} catch(e){}
    try{FindText("骑着",true)[0].parentNode.parentNode.remove()} catch(e){}
    try{FindText("能量箱",true)[0].parentNode.remove()} catch(e){}
    try{FindText("续费",true)[0].parentNode.remove()} catch(e){}
    try{FindText("礼盒",true)[0].parentNode.remove()} catch(e){}
    try{FindText("送出",true)[0].parentNode.remove()} catch(e){}
    try{FindText("砸下空投",true)[0].parentNode.remove()} catch(e){}
    try{FindText("点我一下",true)[0].parentNode.remove()} catch(e){}
    try{FindText("开通",true)[0].parentNode.remove()} catch(e){}
}

setInterval(HuyaClear, 200);

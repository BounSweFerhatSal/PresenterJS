/*
* Author : Ferhat SAL - 2018719219 
* Some Useful Funtionalities fro Iframe 
 for SWE Dynamic Web Assigment
*/

class IframeHelper {
 

    createIframe() {

        //create Iframe
        this.ifrm = document.createElement("iframe");
        this.ifrm.onload = this.iFrameLoad;
        document.getElementById("content").append(this.ifrm);
    }

    iFrameLoad = () => {

    }


    loadPage(_url) {
 
        this.ifrm.src = 'courseA/'+ _url;
        document.getElementById("curPage").innerText = " > " + 'courseA/'+ _url;

    }


}
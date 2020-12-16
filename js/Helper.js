
/*
* Author : Ferhat SAL - 2018719219 
*
* This class provides some common functionalities for reuse 
* In order to make code more readable use this class methods
*/
class Helper {

    createLi(id, text, link) {

        let a = document.createElement('a');
        // a.href = link;
        a.text = text;
        a.setAttribute('data-page', link);


        let li = document.createElement('li');
        if (id != "")
            li.id = id;
        li.append(a);

        return li;

    }
    createUl(id, classname) {

        let ul = document.createElement('ul');
        ul.id = id;
        ul.className = classname;
        return ul;

    }

    // css selector
    select(selector) {

        return document.querySelectorAll(selector);

    }

    enable(id) {

        let elem = document.getElementById(id);
        elem.disabled ="";

    }
    disable(id) {

        let elem = document.getElementById(id);
        elem.disabled ="disabled";

    }
}
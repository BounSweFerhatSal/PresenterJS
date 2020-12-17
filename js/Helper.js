
/*
* Author : Ferhat SAL - 2018719219 
*
* This class provides some common functionalities for reuse 
* In order to make code more readable use this class methods
*/
class Helper {

    static createLi(id, text, concept,page) {

        let a = document.createElement('a');
        // a.href = link;
        a.text = text;
        a.setAttribute('data-concept', concept);
        a.setAttribute('data-page', page);


        let li = document.createElement('li');
        if (id != "")
            li.id = id;
        li.append(a);

        return li;

    }
    static createUl(id, classname) {

        let ul = document.createElement('ul');
        ul.id = id;
        ul.className = classname;
        return ul;

    }

    // css selector
    static select(selector) {

        return document.querySelectorAll(selector);

    }

    static enable(id) {

        let elem = document.getElementById(id);
        elem.disabled ="";

    }
    static disable(id) {

        let elem = document.getElementById(id);
        elem.disabled ="disabled";

    }
}
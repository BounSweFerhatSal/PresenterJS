const course = function () {
    return {
        "id": "course",
        "arrConcept": [
            '*conceptA',
            '*conceptB',
            '*conceptC',
            '*conceptMixed',
            '*conceptOyOY'
        ]
    }
}

const conceptA = function () {
    return {
        "id": "conceptA",
        "arrPage": [
            'chA/secA/p1.html',
            'chA/secA/p2.html',
            'chA/secA/p3.html'
        ]
    }
}

const conceptB = function () {
    return {
        "id": "conceptB",
        "arrPage": [
            'chA/secB/c1.html',
            'chA/secB/c2.html',
            'chA/secB/c3.html'
        ]
    }
}

const conceptC = function () {
    return {
        "id": "conceptC",
        "arrPage": [
            'chB/secA/d1.html',
            'chB/secA/d2.html',
            'chB/secA/d3.html'
        ]
    }
}

const conceptMixed = function () {
    return {
        "id": "conceptA",
        "arrPage": [
            'chA/secA/p1.html',
            'chB/secA/d1.html',
            'chA/secA/p2.html',
            '*conceptB',
            'chB/secA/d4.html'
        ]
    }
}

const conceptOyOY = function () {
    return {
        "id": "conceptoyy",
        "arrPage": [
            'chA/secA/p1.html',
            '*conceptC',
            'chA/secA/p2.html',
            '*conceptB',
            'chB/secA/d4.html'
        ]
    }
}

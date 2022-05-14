/*
    Comments section
*/

const postButton = document.getElementById("post-button"); //post-a-comment-button
const commentForm = document.getElementById("comment-form"); //post-a-comment-field

if (!commentForm) {
    console.log("no commentform?!")
} else {
    console.log("it works i guess")
}

var maxPages = 6;

var currentPage = sessionStorage.getItem("currentPage");


var customComments = sessionStorage.getItem("commentsAmount");

if (!currentPage) {
    currentPage = 1;
    console.log("curntPage is 1")
}

if (!customComments) {
    sessionStorage.setItem("commentsAmount", 0);
    console.log("com amount is 0")
}

changePage(currentPage);

if (currentPage == "1") {
    printComments();
}

checkTextArea();

commentForm.addEventListener('input', checkTextArea)

postButton.onclick = () => {
    changePostButton(postButton, true);
    console.log("posting comment...");

    addComment(commentForm.value);
};

function changePostButton(button, toDisable) {
    const classes = ["submit-button-disabled", "submit-button-enabled"];
    button.disabled = toDisable;
    button.classList.remove(classes[toDisable % classes.length]);
    button.classList.add(classes[(toDisable + 1) % classes.length]);
    console.log("button disabled" + toDisable);
}

function checkTextArea() {
    console.log("checktextarea")
    if (commentForm.value) {
        changePostButton(postButton, false);
    }
    else {
        changePostButton(postButton, true);
    }
}

function printComment(elem, clone, text, date, id) {
    var image = clone.querySelector("#comment-image");

    if (image) {
        image.remove();
    }

    clone.querySelector("#comment-text").innerText = text;
    clone.querySelector("#comment-name").innerText = "Anonymous";

    if (!date) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        date = dd + '/' + mm + '/' + yyyy;
    }

    clone.querySelector("#comment-date").innerText = date;

    console.log(id);

    clone.id = "comment" + id;

    elem.before(clone);

    clone.animate([
        { transform: 'scale(1)', background: 'white', opacity: 1, offset: 0 },
        { transform: 'scale(.5) rotate(90deg)', background: 'gray', opacity: .5, offset: .2 },
        { transform: 'scale(1) rotate(0deg)', background: 'white', opacity: 1, offset: 1 },
    ], {
        duration: 2000,
        easing: 'ease-in-out',
        delay: 10,
        iterations: 1,
        direction: 'alternate',
        fill: 'forwards'
    });
}

function addComment(text, date = "") {
    customComments = sessionStorage.getItem("commentsAmount");

    changePage(1);

    var elem;
    if (customComments >= 1) {
        elem = document.querySelector('#comment' + customComments);
    }
    else {
        elem = document.querySelector('#last-comment');
    }
    var clone = elem.cloneNode(true);


    customComments++;

    console.log(customComments)

    printComment(elem, clone, text, date, customComments);

    sessionStorage.setItem("commentText" + customComments, text);
    sessionStorage.setItem("commentDate" + customComments, date);
    sessionStorage.setItem("commentsAmount", customComments);

}

function prevPage() {
    currentPage = sessionStorage.getItem("currentPage");
    if (currentPage > 1) {
        currentPage--;
        changePage(currentPage);
    }
}

function nextPage() {
    currentPage = sessionStorage.getItem("currentPage");
    if (currentPage < maxPages) {
        currentPage++;
        changePage(currentPage);
    }
}

function changePage(page) {
    var curPage = document.getElementById("current-page");
    /*if (!curPage) {
        curPage = 1;
        console.log("im 1")
    }
    */
    console.log("page is " + page);
    console.log("curPage is " + curPage.innerText);
    /*
    test LL
     */
    var futPage = page.toString();
    console.log("compariosn res = " + (page.toString() != curPage.innerText));
    if ('' + page != curPage.innerText) {
    /*if (futPage != curPage.innerText) {*/
        curPage.id = "page" + curPage.innerText;
        console.log("curPage id is " + curPage.id);
        var futureId = "page" + page;
        console.log("future id is "+futureId);
        document.getElementById(futureId).id ="current-page";
        /*if(!futurePage) {
            console.log("no future ")
        }
*/


        sessionStorage.setItem("currentPage", page);
        if (page === 1) {
            deleteComments();
            printComments();
        }
        if (curPage.innerText == '1') {
            deleteComments();
        }
    }
}

function printComments() {
    commentsAmount = sessionStorage.getItem("commentsAmount");

    var elem = document.querySelector('#last-comment');

    for (i = commentsAmount; i >= 1; i--) {
        var clone = elem.cloneNode(true);
        printComment(elem, clone, sessionStorage.getItem("commentText" + i), sessionStorage.getItem("commentDate" + i), i);
    }
}

function deleteComments() {
    commentsAmount = sessionStorage.getItem("commentsAmount");
    for (i = 1; i <= commentsAmount; i++) {
        var comment = document.querySelector('#comment' + i);
        if (comment) {
            comment.remove();
        }
    }
}
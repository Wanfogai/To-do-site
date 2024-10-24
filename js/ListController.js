
window.onload = function () {
    setTimeout(AddPage(), 0);
}



function RemoveChild(control, childNum) {
    control.removeChild(control.children[childNum])
    for (let index = 0; index < control.children.length; index++) {
        control.children[index].id = index;

    }
}


function GetContent(num) {
    return document.getElementsByClassName('page')[parseInt(num)].getElementsByClassName("content")[0];
}

function AddItem(event, parentNum) {

    const item = document.createElement("div");
    item.className = "item";

    const items = GetContent(parentNum - 1).children.length - 1;
    item.id = items + 1

    const description = document.createElement("span");
    description.className = "string";
    description.onclick = (event) => { event.target.contentEditable = true };
    description.onblur = (event) => { event.target.contentEditable = false };
    description.textContent = "Пункт " + (items + 1);

    const actionContainer = document.createElement("div");
    actionContainer.className = "actionContainer";

    const dellButt = document.createElement("spab");
    dellButt.textContent = "X";
    dellButt.className = "itemButt";
    dellButt.onclick = () => RemoveChild(GetContent(parentNum - 1), item.id);

    const check = document.createElement("input");
    check.type = "checkbox";

    actionContainer.appendChild(dellButt);
    actionContainer.appendChild(check);

    item.appendChild(description);
    item.appendChild(actionContainer);

    GetContent(parentNum - 1).children[items].after(item);
}

function AddPage(event) {

    const pages = document.getElementsByClassName("page");

    const newPage = document.createElement("div");
    newPage.id = pages.length + 1;
    newPage.className = "page page-" + (pages.length + 1);

    const pageTitle = document.createElement("div");
    pageTitle.id = "page-title";
    pageTitle.onclick = (event) => { event.target.contentEditable = true };
    pageTitle.onblur = (event) => { event.target.contentEditable = false };
    pageTitle.textContent = "Список " + newPage.id;

    const header = document.createElement("div");
    header.className = "header";

    const dellButt = document.createElement("span");
    dellButt.textContent = "X";
    dellButt.className = "pageButt";
    dellButt.onclick = () => document.body.removeChild(document.getElementsByClassName("page-" + newPage.id)[0])

    const content = document.createElement("div");
    content.className = "content";

    const newItem = document.createElement("div");
    newItem.id = 0;
    newItem.ondblclick = (event) => AddItem(event, newPage.id);
    newItem.className = "new-item";
    newItem.textContent = "....";

    content.appendChild(newItem)

    header.appendChild(pageTitle);
    header.appendChild(dellButt);

    newPage.appendChild(header);
    newPage.appendChild(content);

    document.body.insertBefore(
        newPage,
        document.getElementById(-pages.length)
    ); AddItem(event, newPage.id)
}
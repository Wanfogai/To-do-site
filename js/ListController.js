window.onload = function () {
  setTimeout(AddPage(), 0);
};

Pages = [];

function AddPage(event) {
  const NewPage = new Page(Pages.length);

  NewPage.AddItem();
  Pages.unshift(NewPage);

  if (Pages.length <= 1) document.body.appendChild(NewPage.Node);
  else document.body.insertBefore(NewPage.Node, Pages[1].Node);
}

class Page {
  Node;
  CurrentContent;
  Items = [];

  constructor(PageCount) {
    const newPage = document.createElement("div");
    newPage.className = "page page-" + (PageCount + 1);

    const pageTitle = document.createElement("div");
    pageTitle.id = "page-title";
    pageTitle.onclick = (event) => {
      event.target.contentEditable = true;
    };
    pageTitle.onblur = (event) => {
      event.target.contentEditable = false;
    };
    pageTitle.textContent = "Список " + (PageCount + 1);

    const header = document.createElement("div");
    header.className = "header";

    const dellButt = document.createElement("span");
    dellButt.textContent = "X";
    dellButt.className = "pageButt";
    dellButt.onclick = () => document.body.removeChild(this.Node);

    const content = document.createElement("div");
    content.className = "content";

    const newItem = document.createElement("div");
    newItem.id = 0;
    newItem.onclick = (event) => this.AddItem(event, newPage.id);
    newItem.className = "new-item";
    newItem.textContent = "Добавить";

    content.appendChild(newItem);

    header.appendChild(pageTitle);
    header.appendChild(dellButt);

    newPage.appendChild(header);
    newPage.appendChild(content);

    this.Node = newPage;
    this.CurrentContent = content;
  }

  AddItem() {
    const NewItem = new Item(this.Items.length, this.CurrentContent);
    this.CurrentContent.lastChild.after(NewItem.Node);
    this.Items.push(NewItem);
  }
}

class Item {
  Node;
  Parent;

  constructor(itemCount, parent) {
    const item = document.createElement("div");
    item.className = "item";

    const description = document.createElement("span");
    description.className = "string";
    description.onclick = (event) => {
      event.target.contentEditable = true;
    };
    description.onblur = (event) => {
      event.target.contentEditable = false;
    };
    description.textContent = "Пункт " + (itemCount + 1);

    const actionContainer = document.createElement("div");
    actionContainer.className = "actionContainer";

    const dellButt = document.createElement("spab");
    dellButt.textContent = "X";
    dellButt.className = "itemButt";
    dellButt.onclick = () => this.Parent.removeChild(this.Node);

    const check = document.createElement("input");
    check.type = "checkbox";

    actionContainer.appendChild(dellButt);
    actionContainer.appendChild(check);

    item.appendChild(description);
    item.appendChild(actionContainer);

    this.Node = item;
    this.Parent = parent;
  }
}

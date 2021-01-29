import { lazyLoad } from "./lazyLoad.js";

export default class SearchResult {
  $searchResult = null;
  data = null;
  state = "init";
  onClick = null;

  constructor({ $target, initialData, onClick }) {
    this.$searchResult = document.createElement("section");
    this.$searchResult.className = "SearchResult";

    this.data = initialData;
    this.onClick = onClick;

    $target.appendChild(this.$searchResult);

    this.render();
    lazyLoad();

    this.state = "running";
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
    lazyLoad();
  }

  findCatById(id) {
    const result = this.data.find((cat) => cat.id == id);
    return result;
  }

  render() {
    if ((this.data == null || this.data.length === 0) && this.state === "init")
      return;
    if (this.data == null || this.data.length === 0) {
      this.$searchResult.innerHTML = `
          <p class="no-result">검색 된 고양이가 없네요ㅠㅠ</p>
        `;
    } else {
      this.$searchResult.innerHTML = "";

      this.data.map((cat) => {
        const $item = document.createElement("article");
        $item.className = "item";
        const $img = document.createElement("img");
        $img.className = "item-img";
        $img.classList.add("lazy");
        $img.dataset.src = cat.url;
        $item.appendChild($img);
        this.$searchResult.appendChild($item);
      });

      // this.$searchResult.innerHTML = this.data
      //   .map(
      //     (cat) => `
      //       <article class="item">
      //         <img class="item-img" data-src=${cat.url}/>
      //       </article>
      //     `
      //   )
      //   .join("");

      // document.querySelectorAll(".item-img").forEach(($itemImg) => {
      //   $itemImg.classList.add("lazy");
      // });

      this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
        $item.addEventListener("click", () => {
          this.onClick(this.data[index]);
        });
      });
    }
  }
}

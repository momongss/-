export default class SearchInput {
  constructor({ $target, recentRecord, onSearch, onRandom }) {
    this.$searchSection = document.createElement("section");
    this.$searchSection.className = "search-section";

    $target.appendChild(this.$searchSection);

    this.onSearch = onSearch;
    this.onRandom = onRandom;

    this.recentRecord = recentRecord == null ? [] : recentRecord;

    this.render();
  }

  render() {
    this.$searchSection.innerHTML = "";

    const $randomBtn = document.createElement("button");
    $randomBtn.className = "random-search";
    $randomBtn.innerHTML = "랜덤검색";
    this.$randomBtn = $randomBtn;

    $randomBtn.addEventListener("click", () => {
      this.onRandom();
    });

    const $searchInput = document.createElement("input");
    $searchInput.placeholder = "고양이를 검색해보세요.|";
    $searchInput.className = "SearchInput";
    $searchInput.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        const keyword = e.target.value;
        this.onSearch(keyword);
        this.addRecord(keyword);
      }
    });
    $searchInput.addEventListener("click", () => {
      $searchInput.value = "";
    });

    const $recentRecord = document.createElement("ul");
    $recentRecord.className = "recent-record";
    this.recentRecord.forEach((keyword) => {
      const $li = document.createElement("li");
      $li.className = "keyword";
      $li.innerHTML = keyword;
      $li.addEventListener("click", (e) => {
        this.onSearch(keyword);
      });
      $recentRecord.appendChild($li);
    });

    const $searchWrapper = document.createElement("div");
    $searchWrapper.className = "search-wrapper";

    $searchWrapper.appendChild($randomBtn);
    $searchWrapper.appendChild($searchInput);

    this.$searchSection.appendChild($searchWrapper);
    this.$searchSection.appendChild($recentRecord);

    $searchInput.focus();

    console.log("SearchInput created.", this);
  }

  addRecord(keyword) {
    if (keyword == null || keyword.length === 0) return;

    this.recentRecord.push(keyword);
    if (this.recentRecord.length > 5) this.recentRecord.shift();

    this.render();
  }
}

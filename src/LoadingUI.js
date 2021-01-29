export default class LoadingUI {
  constructor({ $target }) {
    this.$loadingUI = document.createElement("div");
    this.$loadingUI.className = "loading-UI";
    this.$loadingUI.style.display = "none";

    $target.appendChild(this.$loadingUI);

    this.render();
  }

  setState(visible) {
    if (visible) this.$loadingUI.style.display = "flex";
    else this.$loadingUI.style.display = "none";
  }

  render() {
    this.$loadingUI.innerHTML = `<p class="loading-text">검색 중 입니다...</p>`;
  }
}

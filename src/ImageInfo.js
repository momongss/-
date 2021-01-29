export default class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.visible) {
      if (this.data.info) {
        const { temperament, origin } = this.data.info.data;
        document.querySelector(
          ".temperament"
        ).innerHTML = `성격: ${temperament}`;
        document.querySelector(".origin").innerHTML = `태생: ${origin}`;
        return;
      }

      const { name, url } = this.data.image;

      this.$imageInfo.innerHTML = `
          <div class="background"></div>
          <article class="content-wrapper">
            <header class="title">
              <h2>${name}</h2>
              <div class="close">x</div>
            </header>
            <img class="image-info lazy" src="${url}" alt="${name}"/>        
            <div class="description">
              <div class="temperament">성격: </div>
              <div class="origin">태생: </div>
            </div>
          </article>`;

      // document.querySelector(".image-info").classList.add("lazy");

      document.querySelector(".background").addEventListener("click", () => {
        this.$imageInfo.style.display = "none";
      });
      document.addEventListener("keydown", (e) => {
        if (e.keyCode === 27 || e.key === "Escape" || e.code === "Escape") {
          this.$imageInfo.style.display = "none";
        }
      });
      document.querySelector(".close").addEventListener("click", () => {
        this.$imageInfo.style.display = "none";
      });

      this.$imageInfo.style.display = "block";
    } else {
      this.$imageInfo.style.display = "none";
    }
  }
}

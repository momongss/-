import SearchInput from "./SearchInput.js";
import SearchResult from "./SearchResult.js";
import ImageInfo from "./ImageInfo.js";
import LoadingUI from "./LoadingUI.js";

import Session from "./sessionStorage.js";
import { api } from "./api.js";

export default class App {
  $target = null;
  data = [];

  constructor($target) {
    const total = document.createElement("div");
    total.className = "total";
    $target.appendChild(total);

    console.log("app is running!");

    this.$target = $target;

    const darkCheckBox = document.createElement("input");
    darkCheckBox.type = "checkbox";
    darkCheckBox.className = "darkModeBtn";
    darkCheckBox.addEventListener("click", () => {
      if (darkCheckBox.checked) {
        console.log("Checkbox is checked..");
        document.documentElement.style.setProperty(
          "background-color",
          "#000000"
        );
        document.documentElement.style.setProperty("color", "#FFFFFF");
      } else {
        document.documentElement.style.setProperty(
          "background-color",
          "#FFFFFF"
        );
        document.documentElement.style.setProperty("color", "#000000");
      }
    });
    $target.appendChild(darkCheckBox);

    const recentRecord = Session.getItem("recent-record");
    this.data = Session.getItem("data");

    console.log(recentRecord);
    console.log(this.data);

    this.searchInput = new SearchInput({
      $target,
      recentRecord,
      onSearch: (keyword) => {
        this.loadingUI.setState(true);
        api.fetchCats(keyword).then(({ data }) => {
          this.setState(data);
          this.loadingUI.setState(false);
          Session.setItem("data", data);
          Session.setItem("recent-record", this.searchInput.recentRecord);
        });
      },
      onRandom: () => {
        this.loadingUI.setState(true);
        api.fetchCatsRandom().then(({ data }) => {
          this.setState(data);
          this.loadingUI.setState(false);
          Session.setItem("data", data);
        });
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: async (image) => {
        this.imageInfo.setState({
          visible: true,
          image,
        });
        const info = await api.fetchInfo(image.id);
        this.imageInfo.setState({
          visible: true,
          info,
        });
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
    });

    this.loadingUI = new LoadingUI({
      $target,
    });
  }

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}

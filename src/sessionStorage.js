export default class Session {
  static getItem(key) {
    const value = sessionStorage.getItem(key);

    return value === undefined ? undefined : JSON.parse(value);
  }

  static setItem(key, value) {
    if (value == undefined) {
      console.log("비어있는 데이터... 저장하지 않음.");
      return;
    }

    const toJson = JSON.stringify(value);

    sessionStorage.setItem(key, toJson);
    console.log("저장중...");
  }
}

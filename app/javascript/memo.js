function memo() {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    const formData = new FormData(document.getElementById("form"));
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true); //openメソッドを使用して、リクエストの内容を引数へ追記
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const item = XHR.response.post;  //itemは、レスポンスとして返却されたメモのレコードデータを取得
      const list = document.getElementById("list");  //listは、HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素を取得
      const formText = document.getElementById("content");  //メモの入力フォームをリセットするため
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      list.insertAdjacentHTML("afterend", HTML);
      formText.value = "";  //「メモの入力フォームに入力されたままの文字」はリセットされます。正確には、空の文字列に上書きされるような仕組み
    };
    e.preventDefault();
  });
}
window.addEventListener("load", memo);
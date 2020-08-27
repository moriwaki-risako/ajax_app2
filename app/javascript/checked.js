function check() {
  const posts = document.querySelectorAll(".post"); //postをクラス名にもつ要素を取得できる
  posts.forEach(function (post) {   //要素1つずつに対して、「クリック」した際に動作する処理

    if (post.getAttribute("data-load") != null) { //すでに処理済みのイベントに対しては処理が実行されない
      return null;
    }
    post.setAttribute("data-load", "true");

    post.addEventListener("click", () => { //要素1つずつに対して、『クリック』した際に動作するイベント駆動」を設定
      const postId = post.getAttribute("data-id");
      const XHR = new XMLHttpRequest();
      XHR.open("GET", `/posts/${postId}`, true);    //どのようなリクエストをするのかを指定
      XHR.responseType = "json";       //レスポンスの形式を指定
      XHR.send();   //リクエストを送信

      XHR.onload = () => {
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          return null;          //JavaScriptの処理から抜け出す
        }
        const item = XHR.response.post;
        if (item.checked === true) {
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }
      };
    });
  });                
}
setInterval(check, 1000);


class PostsController < ApplicationController
  
  def index  # indexアクションを定義した
    @posts = Post.all.order(id: "DESC")
  end

  
  def create
    Post.create(content: params[:content])
    redirect_to action: :index
  end

  def checked
    post = Post.find(params[:id])　#URLパラメーターから既読したメモのidが渡す
    if post.checked                 #既読であるか否かを判定
      post.update(checked: false)  #既読であれば既読を解除するためにfalseへ変更
    else
      post.update(checked: true)   #既読でなければ「既読にするためtrueへ変更   update...ActiveRecordメソッドのひとつ
    end

    item = Post.find(params[:id])　　#更新したレコードをitem = Post.find(params[:id])で取得し直す
    render json: { post: item }　　 #JSON形式（データ）としてchecked.jsに返却
  end
end

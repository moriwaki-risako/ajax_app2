class PostsController < ApplicationController
  
  def index  # indexアクションを定義した
    @posts = Post.all 
  end

  def new
    @post = Post.new
  end

  def create
    Post.create(content: params[:content])
    
    # 旧カリキュラム
    # Post.create(post_params)  # Post.create()の()には、実際にテーブルに登録したいデータを記載
  end

  private
  def post_params
    params.permit(:content)
  end
end

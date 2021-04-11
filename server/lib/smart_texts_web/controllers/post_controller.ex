defmodule SmartTextsWeb.PostController do
  use SmartTextsWeb, :controller

  alias SmartTexts.Posts
  alias SmartTexts.Posts.Post

  alias SmartTextsWeb.Plugs
  plug Plugs.RequireAuth when action
    in [:create]

  action_fallback SmartTextsWeb.FallbackController

  def index(conn, _params) do
    posts = Posts.list_posts()
    render(conn, "index.json", posts: posts)
  end

  def create(conn, %{"post" => post_params}) do
    {:ok, photo_hash} = SmartTexts.Photos.save_photo(
      post_params["photo"].filename,
      post_params["photo"].path
    )
    user = conn.assigns[:current_user]
    post_params = post_params
    |> Map.put("user_id", user.id)
    |> Map.put("photo_hash", photo_hash)

    IO.inspect({:post, post_params})

    with {:ok, %Post{} = post} <- Posts.create_post(post_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.post_path(conn, :show, post))
      |> render("show.json", post: post)
    end
  end

  def show(conn, %{"id" => id}) do

    user = conn.assigns[:current_user]




    post = Posts.get_post!(id)
    #|> Posts.load_responses()


    # might not need this stuff below
    resp = %SmartTexts.Responses.Response{
      post_id: post.id,
      user_id: user.id
    }

    new_response = SmartTexts.Responses.change_response(resp)

    render(conn, "show.json", post: post, new_response: new_response)
  end

  def update(conn, %{"id" => id, "post" => post_params}) do
    post = Posts.get_post!(id)

    with {:ok, %Post{} = post} <- Posts.update_post(post, post_params) do
      render(conn, "show.json", post: post)
    end
  end

  def delete(conn, %{"id" => id}) do
    post = Posts.get_post!(id)

    with {:ok, %Post{}} <- Posts.delete_post(post) do
      send_resp(conn, :no_content, "")
    end
  end
end

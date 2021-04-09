defmodule SmartTextsWeb.PageController do
  use SmartTextsWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end

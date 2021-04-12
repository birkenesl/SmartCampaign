defmodule SmartTextsWeb.ResponseController do
  use SmartTextsWeb, :controller

  alias SmartTexts.Tones

  alias SmartTexts.Responses
  alias SmartTexts.Responses.Response

  alias SmartTextsWeb.Plugs
  plug Plugs.RequireAuth when action
    in [:create]

  action_fallback SmartTextsWeb.FallbackController

  def index(conn, _params) do
    responses = Responses.list_responses()
    render(conn, "index.json", responses: responses)
  end

  def create(conn, %{"response" => response_params}) do

    IO.puts("got here")
    IO.inspect(Tones.read_tones("This is great, I really like it. But that makes me sad for sure."))
    user = conn.assigns[:current_user]

    response_params = response_params
    |> Map.put("user_id", user.id)
    |> Map.put("analytical", 0.0)
    |> Map.put("anger", 0.0)
    |> Map.put("confident", 0.0)
    |> Map.put("fear", 0.0)
    |> Map.put("joy", 0.0)
    |> Map.put("sadness", 0.0)
    |> Map.put("tentative", 0.0)


    #IO.inspect({:response, response_params})


    with {:ok, %Response{} = response} <- Responses.create_response(response_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.response_path(conn, :show, response))
      |> render("show.json", response: response)
    end
  end

  def show(conn, %{"id" => id}) do
    response = Responses.get_response!(id)
    render(conn, "show.json", response: response)
  end

  def update(conn, %{"id" => id, "response" => response_params}) do
    response = Responses.get_response!(id)

    with {:ok, %Response{} = response} <- Responses.update_response(response, response_params) do
      render(conn, "show.json", response: response)
    end
  end

  def delete(conn, %{"id" => id}) do
    response = Responses.get_response!(id)

    with {:ok, %Response{}} <- Responses.delete_response(response) do
      send_resp(conn, :no_content, "")
    end
  end
end

defmodule SmartTextsWeb.ResponseView do
  use SmartTextsWeb, :view
  alias SmartTextsWeb.ResponseView

  def render("index.json", %{responses: responses}) do
    %{data: render_many(responses, ResponseView, "response.json")}
  end

  def render("show.json", %{response: response}) do
    %{data: render_one(response, ResponseView, "response.json")}
  end

  def render("response.json", %{response: response}) do
    %{id: response.id,
      body: response.body,
      rating: response.rating,
      anger: response.anger,
      fear: response.fear,
      joy: response.joy,
      sadness: response.sadness,
      analytical: response.analytical,
      confident: response.confident,
      tentative: response.tentative}
  end
end

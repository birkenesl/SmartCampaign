defmodule SmartTexts.Tones do
  require HTTPoison
  require Poison
  alias SmartTexts.Secret.Key


  def getPage(text) do
    url = "https://api.us-east.tone-analyzer.watson.cloud.ibm.com/instances/69afd9d0-97b4-46cf-82a1-dcc1910d77c9/v3/tone"
    key = Key.getKey()
    authText = "apikey:" <> key
    encoded = Base.encode64(authText)
    body = Poison.encode!(%{
      "body": text,
      })
    headers = [{"Content-Type", "text/plain"}, {"Authorization", "Basic " <> encoded}]
    options = [params: [version: "2017-09-21", sentences: false]]

    HTTPoison.post(url, body, headers, options)
    #case HTTPoison.post(url, body, headers, options) do
    #{:ok, %HTTPoison.Response{status_code: 200, body: myBody}} ->
      #%HTTPoison.Response{status_code: 200, body: myBody}
    #{:ok, %HTTPoison.Response{status_code: 401, body: myBody}} ->
      #%HTTPoison.Response{status_code: 401, body: myBody}
    #{:error, %HTTPoison.Error{reason: reason}} ->
      #IO.inspect reason
    #end

  end


  def read_tones(text) do
    getPage(text)

  end





end

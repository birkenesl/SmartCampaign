defmodule SmartTexts.Repo do
  use Ecto.Repo,
    otp_app: :smart_texts,
    adapter: Ecto.Adapters.Postgres
end

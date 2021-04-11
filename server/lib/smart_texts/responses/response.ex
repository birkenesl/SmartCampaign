defmodule SmartTexts.Responses.Response do
  use Ecto.Schema
  import Ecto.Changeset

  schema "responses" do
    field :analytical, :float
    field :anger, :float
    field :body, :string
    field :confident, :float
    field :fear, :float
    field :joy, :float
    field :rating, :integer
    field :sadness, :float
    field :tentative, :float

    belongs_to :post, SmartTexts.Posts.Post
    belongs_to :user, SmartTexts.Users.User

    timestamps()
  end

  @doc false
  def changeset(response, attrs) do
    response
    |> cast(attrs, [:body, :post_id, :user_id, :rating, :anger, :fear, :joy, :sadness, :analytical, :confident, :tentative])
    |> validate_required([:body, :post_id, :user_id, :rating, :anger, :fear, :joy, :sadness, :analytical, :confident, :tentative])
  end
end

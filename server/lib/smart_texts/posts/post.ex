defmodule SmartTexts.Posts.Post do
  use Ecto.Schema
  import Ecto.Changeset

  schema "posts" do
    field :offer, :string
    field :photo_hash, :string
    field :coupon, :string

    field :age, :string
    field :gender, :string
    field :education, :string
    field :employment, :string
    field :income, :string

    belongs_to :user, SmartTexts.Users.User

    timestamps()
  end

  @doc false
  def changeset(post, attrs) do
    post
    |> cast(attrs, [:offer, :photo_hash, :coupon, :age, :gender, :education, :employment, :income, :user_id])
    |> validate_required([:offer, :photo_hash, :user_id])
  end
end

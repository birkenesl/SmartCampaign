defmodule SmartTexts.Repo.Migrations.CreatePosts do
  use Ecto.Migration

  def change do
    create table(:posts) do
      add :offer, :text, null: false
      add :photo_hash, :string, null: false
      add :user_id, references(:users, on_delete: :nothing), null: false
      add :coupon, :string, null: false

      add :age, :string
      add :gender, :string
      add :education, :string
      add :employment, :string
      add :income, :string




      timestamps()
    end

    create index(:posts, [:user_id])
  end
end

defmodule SmartTexts.Repo.Migrations.CreateResponses do
  use Ecto.Migration

  def change do
    create table(:responses) do
      add :body, :text, null: false
      add :rating, :integer, null: false
      add :anger, :float
      add :fear, :float
      add :joy, :float
      add :sadness, :float
      add :analytical, :float
      add :confident, :float
      add :tentative, :float

      add :post_id, references(:posts, on_delete: :nothing), null: false
      add :user_id, references(:users, on_delete: :nothing), null: false

      timestamps()
    end

  end
end

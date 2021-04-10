defmodule SmartTexts.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name, :string, null: false
      add :password_hash, :string, null: false
      add :business, :boolean, null: false
      add :age, :string 
      add :gender, :string
      add :education, :string
      add :employment, :string
      add :income, :string

      timestamps()
    end

  end
end

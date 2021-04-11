# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     SmartTexts.Repo.insert!(%SmartTexts.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias SmartTexts.Repo
alias SmartTexts.Users.User
alias SmartTexts.Posts.Post
alias SmartTexts.Photos

defmodule Inject do
  def photo(name) do
    photos = Application.app_dir(:smart_texts, "priv/photos")
    path = Path.join(photos, name)
    {:ok, hash} = Photos.save_photo(name, path)
    hash
  end

  def user(name, email, pass, business, age, gender, education, employment, income) do
    hash = Argon2.hash_pwd_salt(pass)
    Repo.insert!(%User{name: name, email: email, password_hash: hash, business: business, age: age,
    gender: gender, education: education, employment: employment, income: income})
  end
end

alice = Inject.user("alice", "alice@test.com", "test1", true, "under-20", "female", "some college", "student", "$20,000 to $49,999")
bob = Inject.user("bob", "bob@test.com", "test2", true, "20-29", "male", "high school graduate", "military", "$50,000 to $74,999")

moon = Inject.photo("elephant.jpg")
nature = Inject.photo("elephant.jpg")

p1 = %Post{
  user_id: alice.id,
  photo_hash: moon,
  title: "Alice says Hi!",
  offer: "Free Stuff",
  coupon: "ASD23",
  age: "Any",
  gender: "Any",
  education: "Any",
  employment: "Any",
  income: "Any"

}
Repo.insert!(p1)

p2 = %Post{
  user_id: bob.id,
  photo_hash: nature,
  title: "Bob's Campaign",
  offer: "Cool Stuff",
  coupon: "234",
  age: "Any",
  gender: "Any",
  education: "Any",
  employment: "Any",
  income: "Any"
}
Repo.insert!(p2)

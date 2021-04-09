defmodule SmartTexts.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      SmartTexts.Repo,
      # Start the Telemetry supervisor
      SmartTextsWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: SmartTexts.PubSub},
      # Start the Endpoint (http/https)
      SmartTextsWeb.Endpoint
      # Start a worker by calling: SmartTexts.Worker.start_link(arg)
      # {SmartTexts.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: SmartTexts.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    SmartTextsWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end

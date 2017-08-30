class SearchController < ApplicationController
  before_action :bootstrap_client, only: :index

  def index
  end

  protected

  def bootstrap_client
    search_config = Rails.configuration.search

    gon.push(
      serviceTypes: search_config['service_types'],
      services: search_config['services']
    )
  end
end

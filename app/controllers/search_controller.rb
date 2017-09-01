class SearchController < ApplicationController
  include ReactOnRails::Controller

  before_action :set_props, :rover_client, only: :index

  def index
    search_response = @rover_client.search(
      @defaultProps[:service][:value],
      {
        centerlat: 47.60621,
        centerlng: -122.33207
      }
    )

    @props.merge!(searchResponse: search_response)

    redux_store('Store', props: @props)
  end

  private

  def set_props
    @defaultProps = {}

    service_types = Rails.configuration.search['services'].map do |k, v|
      {
        name: k,
        label: I18n.t("service_types.#{k}"),
        services: v.map do |vk, vv|
          service = {
            name: vk,
            label: I18n.t("services.#{vk.tr('-', '_')}"),
            value: vk
          }
          @defaultProps[:service] = service if vv['default']
          service
        end
      }
    end

    @props ||= {
      serviceTypes: service_types,
      selectedService: @defaultProps[:service]
    }
  end

  def rover_client
    @rover_client ||= Rover::Client.new
  end
end

class SearchController < ApplicationController
  before_action :set_props, :rover_client, only: :index

  def index
    search_response = @rover_client.search(
      @defaultProps[:service],
      { centerlat: 47.60621, centerlng: -122.33207 }
    )

    @props.merge!(searchResponse: search_response)
  end

  private

  def set_props
    @defaultProps = {}

    service_types = Rails.configuration.search['services'].map do |k, v|
      {
        name: k,
        label: I18n.t("service_types.#{k}"),
        services: v.map do |vk, vv|
          @defaultProps[:service] = vk if vv['default']
          {
            name: vk,
            label: I18n.t("services.#{vk.tr('-', '_')}"),
            value: vk
          }
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

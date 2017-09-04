class SearchController < ApplicationController
  include ReactOnRails::Controller

  before_action :set_location, :rover_client, only: [:index, :proxy]
  before_action :set_props, only: :index

  def index
    response = rover_search(@defaultProps[:service][:value])
    @props.merge!(searchResponse: response)
    redux_store('Store', props: @props)
  end

  def proxy
    response = rover_search(params.require(:type))
    render json: response, status: response.code
  end

  private

  def set_location
    @location = {
      centerlat: 47.60621,
      centerlng: -122.33207
    }
  end

  def set_props
    @defaultProps = {}

    service_types = Rails.configuration.search['services'].map do |k, v|
      {
        value: k,
        label: I18n.t("service_types.#{k}"),
        services: v.map do |vk, vv|
          service = {
            value: vk,
            label: I18n.t("services.#{vk.tr('-', '_')}")
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

  def rover_search(service_type)
    @rover_client.search(service_type, @location)
  end
end

class SearchController < ApplicationController
  before_action :set_props, only: :index

  def index
  end

  private

  def set_props
    # TODO: Make ActiveModel Serializer
    service_types = Rails.configuration.search['services'].map do |k, v|
      {
        name: k,
        label: I18n.t("service_types.#{k}"),
        services: v.map do |vk, vv|
          {
            name: vk,
            label: I18n.t("services.#{vk.tr('-', '_')}"),
            value: vk,
            defaultChecked: vv['default'] || false
          }
        end
      }
    end

    @props = {
      serviceTypes: service_types
    }
  end
end

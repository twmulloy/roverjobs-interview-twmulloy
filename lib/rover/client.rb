module Rover
  class Client
    include HTTParty
    base_uri 'https://www.rover.com/api'

    def initialize
      @baseOptions = {}
      search_endpoints
    end

    def search_discovery
      self.class.get(
        '/v3/search-endpoints',
        @baseOptions
      )
    end

    def search(service_type, params = {})
      self.class.get(
        @search_endpoints[service_type],
        @baseOptions.merge({ query: params })
      )
    end

    def search_endpoints
      @search_endpoints ||= search_discovery
    end
  end
end

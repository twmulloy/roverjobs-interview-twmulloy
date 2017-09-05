Rails.application.routes.draw do
  root 'search#index'

  get 'search/:service_type', to: 'search#proxy'
end

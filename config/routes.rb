Rails.application.routes.draw do
  namespace 'api' do
    #create all request types on resources
    resources :companies do
      resources :owners
    end
  end
end
get '*path', to: "application#fallback_index_html", constraints: ->(request) do
!request.xhr? && request.format.html?
end 
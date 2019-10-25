Rails.application.routes.draw do
  namespace 'api' do
    #create all request types on resources
    resources :companies do
      resources :owners
    end
  end
end

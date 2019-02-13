Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  scope '/api' do
    resources :reports
    # resources :campaigns

    get '/campaigns/summary', to: 'campaigns#all_summary'
    get '/campaigns/summary/:id', to: 'campaigns#show_summary'
    get '/campaigns/top-picks', to: 'campaigns#top_5'
  end
end

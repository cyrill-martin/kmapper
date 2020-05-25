Rails.application.routes.draw do
	root 'doaj#new'
	get '/doaj', to: 'doaj#show', constraints: { query_string: /query/ }
	get '/doaj', to: 'doaj#new'
	post '/doaj', to: 'doaj#show'
  	# For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

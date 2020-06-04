Rails.application.routes.draw do
	root 'doaj#new'
	get '/doaj', to: 'doaj#show', constraints: { query_string: /query/ }
	get '/doaj', to: 'doaj#new'
end

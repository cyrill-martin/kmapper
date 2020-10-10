Rails.application.routes.draw do
	get "about/show"
	root "home#home"
	get "/doaj", to: "doaj#show", constraints: { query_string: /q/ }
	get "/doaj", to: redirect("/")
	get "/about", to: "about#show"
end

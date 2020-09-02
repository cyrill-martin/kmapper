class HomeController < ApplicationController
  def home
  	@show_kmapper = false
  	@show_about = true
  	@show_download = false
  	@show_header_search = false
  end
end

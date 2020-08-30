class HomeController < ApplicationController
  def home
  	@show_kmapper = false
  	@show_about = true
  	@show_download = false
  end
end

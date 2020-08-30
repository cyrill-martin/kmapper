class AboutController < ApplicationController
  def show
  	@show_kmapper = true
  	@show_about = false
  	@show_download = false
  end
end
